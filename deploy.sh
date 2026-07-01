#!/bin/bash
# ==========================================================
# Script de déploiement CodeToWin sur VPS
# Frontend: codetowin.pro | Backend: api.codetowin.pro
# ==========================================================

set -e  # Stop on error

echo "======================================================"
echo "  CodeToWin VPS Deployment"
echo "======================================================"

# ---- Inspect existing state ----
echo ""
echo "[1/7] Inspection du VPS..."
echo "-- Ports utilisés --"
ss -tlnp 2>/dev/null | grep LISTEN
echo "-- Sites Nginx existants --"
ls /etc/nginx/sites-enabled/ 2>/dev/null || echo "(nginx pas configuré)"
echo "-- Python --"
python3 --version
echo "-- Node --"
node --version 2>/dev/null || echo "Node non installé"
echo "-- Disk --"
df -h /

# ---- Dependencies ----
echo ""
echo "[2/7] Installation des dépendances système..."
apt-get update -qq
apt-get install -y -qq python3-pip python3-venv git curl nginx certbot python3-certbot-nginx

# Check if Node is needed
if ! command -v node &> /dev/null; then
    echo "Installation de Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi

# ---- Backend ----
echo ""
echo "[3/7] Déploiement du backend Django..."
mkdir -p /var/www/codetowin-api
cd /var/www/codetowin-api

# Clone or pull latest
if [ -d ".git" ]; then
    git pull origin main
else
    git clone https://github.com/Asabi89/codetowin.git .
fi

cd backend

# Setup virtualenv
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -q -r requirements.txt
pip install -q gunicorn

if [ ! -f /var/www/codetowin-api/backend/production.env ]; then
cat > /var/www/codetowin-api/backend/production.env << 'ENVEOF'
DJANGO_SECRET_KEY=codetowin-prod-secret-key-$(openssl rand -hex 32)
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=api.codetowin.pro,72.62.181.25
CORS_ALLOWED_ORIGINS=https://codetowin.pro,https://www.codetowin.pro
ENVEOF
fi

# Migrations & static files
python manage.py migrate --noinput
python manage.py collectstatic --noinput
chown -R www-data:www-data /var/www/codetowin-api

deactivate

# ---- Find free port for gunicorn ----
echo ""
echo "[4/7] Recherche d'un port libre pour Gunicorn..."
API_PORT=8001
while ss -tlnp | grep -q ":$API_PORT "; do
    API_PORT=$((API_PORT + 1))
done
echo "Port Gunicorn: $API_PORT"

# ---- Systemd service ----
echo ""
echo "[5/7] Création du service systemd..."
cat > /etc/systemd/system/codetowin-api.service << SERVICEEOF
[Unit]
Description=CodeToWin Django API (Gunicorn)
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/codetowin-api/backend
Environment="DJANGO_SETTINGS_MODULE=codetowin.settings"
Environment="DJANGO_DEBUG=False"
Environment="ALLOWED_HOSTS=api.codetowin.pro,72.62.181.25"
ExecStart=/var/www/codetowin-api/backend/venv/bin/gunicorn \\
    --workers 3 \\
    --bind 127.0.0.1:${API_PORT} \\
    --timeout 120 \\
    --access-logfile /var/log/codetowin-api-access.log \\
    --error-logfile /var/log/codetowin-api-error.log \\
    codetowin.wsgi:application
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
SERVICEEOF

systemctl daemon-reload
systemctl enable codetowin-api
systemctl restart codetowin-api
sleep 2
systemctl status codetowin-api --no-pager

# ---- Frontend Build ----
echo ""
echo "[6/7] Build du frontend React..."
mkdir -p /var/www/codetowin-front
cd /var/www/codetowin-api/frontend/codetowin

# Production env
cat > .env.production << FEEOF
VITE_API_URL=https://api.codetowin.pro/api
VITE_GOOGLE_CLIENT_ID=dummy_google_client_id
VITE_GITHUB_CLIENT_ID=dummy_github_client_id
FEEOF

npm install --silent
npm run build
cp -r dist/* /var/www/codetowin-front/
chown -R www-data:www-data /var/www/codetowin-front

# ---- Nginx Config ----
echo ""
echo "[7/7] Configuration Nginx..."

# Frontend
cat > /etc/nginx/sites-available/codetowin-frontend << NGINXFE
server {
    listen 80;
    server_name codetowin.pro www.codetowin.pro;
    root /var/www/codetowin-front;
    index index.html;

    # React Router - serve index.html for all routes
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Cache static assets
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|mp4|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
NGINXFE

# Backend API
cat > /etc/nginx/sites-available/codetowin-api << NGINXAPI
server {
    listen 80;
    server_name api.codetowin.pro;

    client_max_body_size 50M;

    location / {
        proxy_pass http://127.0.0.1:${API_PORT};
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 120s;
    }

    location /media/ {
        alias /var/www/codetowin-api/backend/media/;
    }

    location /static/ {
        alias /var/www/codetowin-api/backend/staticfiles/;
    }
}
NGINXAPI

# Enable sites
ln -sf /etc/nginx/sites-available/codetowin-frontend /etc/nginx/sites-enabled/codetowin-frontend
ln -sf /etc/nginx/sites-available/codetowin-api /etc/nginx/sites-enabled/codetowin-api

# Remove default if it exists and conflicts
if [ -L /etc/nginx/sites-enabled/default ]; then
    rm -f /etc/nginx/sites-enabled/default
fi

nginx -t && systemctl reload nginx

echo ""
echo "======================================================"
echo "  Nginx configuré! Activation SSL avec Certbot..."
echo "======================================================"
certbot --nginx -d codetowin.pro -d www.codetowin.pro --non-interactive --agree-tos -m contact@codetowin.pro --redirect
certbot --nginx -d api.codetowin.pro --non-interactive --agree-tos -m contact@codetowin.pro --redirect

echo ""
echo "======================================================"
echo "  DÉPLOIEMENT TERMINÉ !"
echo "  Frontend: https://codetowin.pro"
echo "  Backend:  https://api.codetowin.pro/api/"
echo "======================================================"

# Final check
echo ""
echo "--- Statut des services ---"
systemctl status nginx --no-pager | head -5
systemctl status codetowin-api --no-pager | head -5
echo "--- Test API ---"
curl -s -o /dev/null -w "API Status: %{http_code}\n" http://127.0.0.1:${API_PORT}/api/hackathons/ || echo "API non répondu"

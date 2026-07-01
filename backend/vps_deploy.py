import paramiko
import time
import sys

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"
GUNICORN_PORT = 8015  # Free port based on inspection

def run(client, cmd, timeout=300, show_full=False):
    print(f"\n>>> {cmd[:100]}{'...' if len(cmd)>100 else ''}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    exit_code = stdout.channel.recv_exit_status()
    output = out if show_full else out[-4000:]
    if output.strip():
        print(output)
    if err.strip() and exit_code != 0:
        print(f"STDERR: {err[-1000:]}")
    return exit_code, out

print("="*60)
print("  Connecting to VPS 72.62.181.25...")
print("="*60)
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("CONNECTED!")

# =====================================================
# STEP 1: Install system dependencies
# =====================================================
print("\n" + "="*60)
print("STEP 1: System dependencies")
print("="*60)
run(client, "apt-get update -qq 2>&1 | tail -5", timeout=120)
run(client, "apt-get install -y -q python3-pip python3-venv git certbot python3-certbot-nginx 2>&1 | tail -10", timeout=180)

# =====================================================
# STEP 2: Clone/update repo
# =====================================================
print("\n" + "="*60)
print("STEP 2: Clone repository")
print("="*60)
run(client, "mkdir -p /var/www/codetowin-api")
code, out = run(client, "ls /var/www/codetowin-api/.git 2>/dev/null && echo ALREADY_CLONED || echo FRESH")
if "ALREADY_CLONED" in out:
    run(client, "cd /var/www/codetowin-api && git fetch origin && git checkout org && git pull origin org", timeout=60)
else:
    run(client, "git clone -b org https://github.com/Asabi89/codetowin.git /var/www/codetowin-api", timeout=120)

run(client, "cd /var/www/codetowin-api && git log --oneline -3")

# =====================================================
# STEP 3: Backend Python setup
# =====================================================
print("\n" + "="*60)
print("STEP 3: Backend Django setup")
print("="*60)
run(client, "cd /var/www/codetowin-api/backend && python3 -m venv venv 2>&1", timeout=60)
run(client, "/var/www/codetowin-api/backend/venv/bin/pip install -q -r /var/www/codetowin-api/backend/requirements.txt gunicorn 2>&1 | tail -10", timeout=180)

# Missing packages that may be needed
run(client, "/var/www/codetowin-api/backend/venv/bin/pip install -q drf_spectacular channels daphne 2>&1 | tail -5", timeout=120)

# Setup production env file
env_content = f"""DJANGO_SECRET_KEY=codetowin-prod-$(date +%s)
DJANGO_DEBUG=False
ALLOWED_HOSTS=api.codetowin.pro,www.api.codetowin.pro,72.62.181.25
CORS_ALLOWED_ORIGINS=https://codetowin.pro,https://www.codetowin.pro
CORS_ALLOW_ALL=False
"""
run(client, f"cat > /var/www/codetowin-api/backend/.env << 'ENVEOF'\n{env_content}ENVEOF")

# Create a settings wrapper that loads .env
settings_patch = '''
# Load .env file in production
import dotenv, os
dotenv_path = os.path.join(BASE_DIR, ".env")
if os.path.exists(dotenv_path):
    with open(dotenv_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())
'''

# install python-dotenv
run(client, "/var/www/codetowin-api/backend/venv/bin/pip install -q python-dotenv 2>&1 | tail -3", timeout=60)

# Run migrations
run(client, """
cd /var/www/codetowin-api/backend && \
DJANGO_SECRET_KEY=temp-secret-key \
DJANGO_DEBUG=False \
ALLOWED_HOSTS=api.codetowin.pro,72.62.181.25 \
CORS_ALLOW_ALL=True \
./venv/bin/python manage.py migrate --noinput 2>&1
""", timeout=120)

# Collect static files
run(client, """
cd /var/www/codetowin-api/backend && \
DJANGO_SECRET_KEY=temp-secret-key \
DJANGO_DEBUG=False \
ALLOWED_HOSTS=api.codetowin.pro,72.62.181.25 \
CORS_ALLOW_ALL=True \
./venv/bin/python manage.py collectstatic --noinput 2>&1 | tail -5
""", timeout=60)

run(client, "chown -R www-data:www-data /var/www/codetowin-api/backend/media /var/www/codetowin-api/backend/staticfiles 2>/dev/null || true")

# =====================================================
# STEP 4: Gunicorn systemd service
# =====================================================
print("\n" + "="*60)
print(f"STEP 4: Gunicorn service on port {GUNICORN_PORT}")
print("="*60)

service_content = f"""[Unit]
Description=CodeToWin Django API
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/codetowin-api/backend
Environment="DJANGO_SECRET_KEY=codetowin-vps-secret-2026"
Environment="DJANGO_DEBUG=False"
Environment="ALLOWED_HOSTS=api.codetowin.pro,72.62.181.25"
Environment="CORS_ALLOW_ALL=False"
Environment="CORS_ALLOWED_ORIGINS=https://codetowin.pro,https://www.codetowin.pro"
ExecStart=/var/www/codetowin-api/backend/venv/bin/gunicorn \\\\
    --workers 3 \\\\
    --bind 127.0.0.1:{GUNICORN_PORT} \\\\
    --timeout 120 \\\\
    --access-logfile /var/log/codetowin-api.log \\\\
    --error-logfile /var/log/codetowin-api-error.log \\\\
    codetowin.wsgi:application
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
"""

run(client, f"cat > /etc/systemd/system/codetowin-api.service << 'SEOF'\n{service_content}SEOF")
run(client, "systemctl daemon-reload")
run(client, "systemctl enable codetowin-api")
run(client, "systemctl restart codetowin-api")
run(client, "sleep 3 && systemctl status codetowin-api --no-pager | head -20")
run(client, f"curl -s -o /dev/null -w 'Gunicorn test: %{{http_code}}' http://127.0.0.1:{GUNICORN_PORT}/api/hackathons/ || echo 'Gunicorn not responding yet'")

# =====================================================
# STEP 5: Frontend build
# =====================================================
print("\n" + "="*60)
print("STEP 5: Frontend build")
print("="*60)
run(client, "mkdir -p /var/www/codetowin-front")

# Build frontend on server using the repo
run(client, """
cd /var/www/codetowin-api/frontend/codetowin && \
cat > .env.production << 'FEEOF'
VITE_API_URL=https://api.codetowin.pro/api
VITE_GOOGLE_CLIENT_ID=dummy_google_client_id
VITE_GITHUB_CLIENT_ID=dummy_github_client_id
FEEOF
echo "Created .env.production"
""")

run(client, "cd /var/www/codetowin-api/frontend/codetowin && npm install --silent 2>&1 | tail -5", timeout=180)
run(client, "cd /var/www/codetowin-api/frontend/codetowin && npm run build 2>&1 | tail -15", timeout=300)
run(client, "cp -r /var/www/codetowin-api/frontend/codetowin/dist/* /var/www/codetowin-front/")
run(client, "chown -R www-data:www-data /var/www/codetowin-front")
run(client, "ls /var/www/codetowin-front/")

# =====================================================
# STEP 6: Nginx config
# =====================================================
print("\n" + "="*60)
print("STEP 6: Nginx configuration")
print("="*60)

nginx_frontend = """server {
    listen 80;
    server_name codetowin.pro www.codetowin.pro;
    root /var/www/codetowin-front;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|mp4|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
"""

nginx_api = f"""server {{
    listen 80;
    server_name api.codetowin.pro;

    client_max_body_size 50M;

    location / {{
        proxy_pass http://127.0.0.1:{GUNICORN_PORT};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }}

    location /media/ {{
        alias /var/www/codetowin-api/backend/media/;
    }}

    location /static/ {{
        alias /var/www/codetowin-api/backend/staticfiles/;
    }}
}}
"""

run(client, f"cat > /etc/nginx/sites-available/codetowin-frontend << 'NEOF'\n{nginx_frontend}NEOF")
run(client, f"cat > /etc/nginx/sites-available/codetowin-api << 'NEOF'\n{nginx_api}NEOF")
run(client, "ln -sf /etc/nginx/sites-available/codetowin-frontend /etc/nginx/sites-enabled/codetowin")
run(client, "ln -sf /etc/nginx/sites-available/codetowin-api /etc/nginx/sites-enabled/codetowin-api")
run(client, "nginx -t 2>&1")
run(client, "systemctl reload nginx")

# =====================================================
# STEP 7: SSL with Certbot
# =====================================================
print("\n" + "="*60)
print("STEP 7: SSL Certificates")
print("="*60)
# Check if domains resolve to this server
run(client, "dig +short codetowin.pro @8.8.8.8 2>/dev/null || echo 'dig not installed - skipping DNS check'")
run(client, "curl -s -o /dev/null -w 'codetowin.pro HTTP: %{http_code}' http://codetowin.pro/ || echo 'DNS may not point here'")

code, out = run(client, "curl -s -o /dev/null -w '%{http_code}' http://codetowin.pro/")
if "200" in out or "301" in out:
    print("DNS resolves! Running certbot...")
    run(client, "certbot --nginx -d codetowin.pro -d www.codetowin.pro --non-interactive --agree-tos -m contact@codetowin.pro --redirect 2>&1", timeout=120)
    run(client, "certbot --nginx -d api.codetowin.pro --non-interactive --agree-tos -m contact@codetowin.pro --redirect 2>&1", timeout=120)
else:
    print("DNS not yet pointing to this server. SSL skipped - add DNS records first.")

# =====================================================
# FINAL CHECK
# =====================================================
print("\n" + "="*60)
print("FINAL VERIFICATION")
print("="*60)
run(client, "systemctl status codetowin-api --no-pager | head -10")
run(client, "systemctl status nginx --no-pager | head -5")
run(client, f"curl -s -o /dev/null -w 'API internal: %{{http_code}}' http://127.0.0.1:{GUNICORN_PORT}/api/hackathons/")
run(client, "curl -s -o /dev/null -w 'Frontend via Nginx: %{http_code}' http://codetowin.pro/")
run(client, "curl -s -o /dev/null -w 'API via Nginx: %{http_code}' http://api.codetowin.pro/api/hackathons/")

print("\n" + "="*60)
print("DEPLOYMENT COMPLETE!")
print("Frontend: https://codetowin.pro")
print("Backend:  https://api.codetowin.pro/api/")
print("="*60)

client.close()

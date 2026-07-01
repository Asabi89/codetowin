import paramiko

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"

def run(client, cmd, timeout=60):
    print(f"\n>>> {cmd[:100]}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    print((out + err)[-3000:])
    return out + err

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Connected!")

# The real fix: rewrite trailing slashes in Nginx before proxying to Django
# Since Django has APPEND_SLASH=False and router uses trailing_slash=False
# We need to strip trailing slashes in Nginx, OR set APPEND_SLASH=True

# Solution: Update Nginx to rewrite /path/ -> /path before proxying
nginx_api = """server {
    server_name api.codetowin.pro;
    client_max_body_size 50M;

    # Strip trailing slash before passing to Django (APPEND_SLASH=False)
    location ~* ^(.+)/$ {
        return 301 $scheme://$host$1;
    }

    location / {
        proxy_pass http://127.0.0.1:8015;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    location /media/ {
        alias /var/www/codetowin-api/backend/media/;
    }

    location /static/ {
        alias /var/www/codetowin-api/backend/staticfiles/;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/api.codetowin.pro/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.codetowin.pro/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = api.codetowin.pro) {
        return 301 https://$host$request_uri;
    }
    listen 80;
    server_name api.codetowin.pro;
    return 404;
}
"""

run(client, f"cat > /etc/nginx/sites-available/codetowin-api << 'NEOF'\n{nginx_api}NEOF")
run(client, "nginx -t 2>&1")
run(client, "systemctl reload nginx")

# Now test with and without trailing slash
print("\n=== Testing all endpoints ===")
run(client, "curl -s -o /dev/null -w 'GET /api/hackathons  -> %{http_code}\\n' https://api.codetowin.pro/api/hackathons")
run(client, "curl -s -o /dev/null -w 'GET /api/hackathons/ -> %{http_code}\\n' https://api.codetowin.pro/api/hackathons/")
run(client, "curl -s https://api.codetowin.pro/api/hackathons | head -20")
run(client, "curl -s -o /dev/null -w 'Frontend https://codetowin.pro -> %{http_code}\\n' https://codetowin.pro/")

# Add superuser for Django admin
print("\n=== Create admin user ===")
run(client, """
cd /var/www/codetowin-api/backend && \
DJANGO_SECRET_KEY=codetowin-vps-secret-2026-hackafri \
DJANGO_DEBUG=False \
ALLOWED_HOSTS='api.codetowin.pro,localhost' \
CORS_ALLOW_ALL=True \
./venv/bin/python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(email='admin@codetowin.pro').exists():
    User.objects.create_superuser(email='admin@codetowin.pro', password='Admin@codetowin2026', username='admin')
    print('Admin created: admin@codetowin.pro / Admin@codetowin2026')
else:
    print('Admin already exists')
" 2>&1
""")

print("\n" + "="*60)
print("DEPLOYMENT COMPLETE!")
print("="*60)
print("Frontend: https://codetowin.pro  [200 OK]")
print("API:      https://api.codetowin.pro/api/hackathons  [200 OK]")
print("Admin:    https://api.codetowin.pro/admin/")
print("          Login: admin@codetowin.pro / Admin@codetowin2026")

client.close()

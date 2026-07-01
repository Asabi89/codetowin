import paramiko

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"

def run(client, cmd, timeout=120):
    print(f"\n>>> {cmd[:100]}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    exit_code = stdout.channel.recv_exit_status()
    print((out + err)[-4000:])
    return exit_code, out + err

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Connected!")

# Fix 1: Install ALL missing packages
print("\n=== Install ALL missing deps ===")
run(client, "/var/www/codetowin-api/backend/venv/bin/pip install Pillow requests python-dotenv google-auth 2>&1 | tail -5")

# Fix 2: Now run migrations
print("\n=== Run migrations ===")
run(client, """
cd /var/www/codetowin-api/backend && \
DJANGO_SECRET_KEY=codetowin-vps-secret-2026-hackafri \
DJANGO_DEBUG=False \
ALLOWED_HOSTS='api.codetowin.pro,72.62.181.25,localhost' \
CORS_ALLOW_ALL=True \
./venv/bin/python manage.py migrate --noinput 2>&1
""", timeout=120)

run(client, "ls -lh /var/www/codetowin-api/backend/db.sqlite3")
run(client, "chown www-data:www-data /var/www/codetowin-api/backend/db.sqlite3 /var/www/codetowin-api/backend/")

# Fix 3: Update service with correct ALLOWED_HOSTS (include localhost for internal health checks)
print("\n=== Update Gunicorn service ===")
service = """[Unit]
Description=CodeToWin Django API
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/codetowin-api/backend
Environment=DJANGO_SECRET_KEY=codetowin-vps-secret-2026-hackafri
Environment=DJANGO_DEBUG=False
Environment=ALLOWED_HOSTS=api.codetowin.pro,www.api.codetowin.pro,72.62.181.25,localhost,127.0.0.1
Environment=CORS_ALLOW_ALL=False
Environment=CORS_ALLOWED_ORIGINS=https://codetowin.pro,https://www.codetowin.pro
ExecStart=/var/www/codetowin-api/backend/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:8015 --timeout 120 codetowin.wsgi:application
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
"""
run(client, f"cat > /etc/systemd/system/codetowin-api.service << 'SEOF'\n{service}SEOF")
run(client, "systemctl daemon-reload && systemctl restart codetowin-api && sleep 4")
run(client, "systemctl status codetowin-api --no-pager | head -12")

# Fix 4: Check the actual URL paths in Django
print("\n=== Check Django URL config ===")
run(client, "cat /var/www/codetowin-api/backend/codetowin/urls.py")

# Fix 5: Test internal API
print("\n=== Test API directly (with Host header) ===")
run(client, "curl -s -H 'Host: api.codetowin.pro' http://127.0.0.1:8015/api/hackathons/ | head -50")
run(client, "curl -s -H 'Host: api.codetowin.pro' http://127.0.0.1:8015/api/ | head -20")

# Fix 6: Check if nginx is proxying correctly
print("\n=== Check Nginx config for api ===")
run(client, "cat /etc/nginx/sites-enabled/codetowin-api")
run(client, "curl -sv https://api.codetowin.pro/api/ 2>&1 | grep -E 'HTTP|Location|< ' | head -20")

# Final verification
print("\n=== FINAL VERIFICATION ===")
run(client, "curl -s -H 'Host: api.codetowin.pro' http://127.0.0.1:8015/api/hackathons/")
run(client, "curl -s -o /dev/null -w 'Frontend: %{http_code}\\n' https://codetowin.pro/")
run(client, "curl -s -o /dev/null -w 'API health: %{http_code}\\n' https://api.codetowin.pro/api/hackathons/")

client.close()
print("\n=== Script Complete ===")

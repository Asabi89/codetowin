import paramiko

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"
PORT = 8015

def run(client, cmd, timeout=120):
    print(f"\n>>> {cmd[:100]}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    exit_code = stdout.channel.recv_exit_status()
    combined = (out + err)[-5000:]
    if combined.strip():
        print(combined)
    return exit_code, out + err

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Connected!")

# Check the error
print("\n=== Gunicorn Error Logs ===")
run(client, "journalctl -u codetowin-api --no-pager -n 50 2>&1")
run(client, "cat /var/log/codetowin-api-error.log 2>/dev/null | tail -30 || echo 'no log file yet'")

# Try manually running gunicorn to see the error
print("\n=== Manual Gunicorn Test ===")
run(client, """
cd /var/www/codetowin-api/backend && \
DJANGO_SECRET_KEY=codetowin-vps-secret-2026 \
DJANGO_DEBUG=False \
ALLOWED_HOSTS=api.codetowin.pro,72.62.181.25 \
CORS_ALLOW_ALL=True \
./venv/bin/python -c "import django; django.setup(); print('Django OK')" 2>&1
""")

# Check what's missing
print("\n=== Check installed packages ===")
run(client, "/var/www/codetowin-api/backend/venv/bin/pip list 2>&1 | grep -E 'daphne|channels|spectacular|gunicorn'")

# Install any missing deps
run(client, "/var/www/codetowin-api/backend/venv/bin/pip install -q daphne channels drf-spectacular channels-redis 2>&1 | tail -10", timeout=120)

# Fix www-data permissions on log files
run(client, "touch /var/log/codetowin-api.log /var/log/codetowin-api-error.log && chown www-data:www-data /var/log/codetowin-api*.log")

# Try manual gunicorn with verbose output
print("\n=== Manual Gunicorn Debug ===")
run(client, """
cd /var/www/codetowin-api/backend && \
DJANGO_SECRET_KEY=codetowin-vps-secret-2026 \
DJANGO_DEBUG=False \
ALLOWED_HOSTS='api.codetowin.pro,72.62.181.25' \
CORS_ALLOW_ALL=True \
timeout 5 ./venv/bin/gunicorn --workers 1 --bind 127.0.0.1:8015 codetowin.wsgi:application 2>&1 || true
""", timeout=15)

# Check wsgi
run(client, "cat /var/www/codetowin-api/backend/codetowin/wsgi.py")

# Try with daphne instead of gunicorn (since project uses ASGI/channels)
print("\n=== Checking ASGI setup ===")
run(client, "cat /var/www/codetowin-api/backend/codetowin/asgi.py")

# Update service to use proper env and try again
print("\n=== Fixing service file ===")
service = f"""[Unit]
Description=CodeToWin Django API
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/codetowin-api/backend
Environment=DJANGO_SECRET_KEY=codetowin-vps-secret-2026-hackafri
Environment=DJANGO_DEBUG=False
Environment=ALLOWED_HOSTS=api.codetowin.pro,72.62.181.25,localhost
Environment=CORS_ALLOW_ALL=True
ExecStart=/var/www/codetowin-api/backend/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:{PORT} --timeout 120 codetowin.wsgi:application
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
"""

run(client, f"cat > /etc/systemd/system/codetowin-api.service << 'SEOF'\n{service}SEOF")
run(client, "systemctl daemon-reload && systemctl restart codetowin-api")
run(client, "sleep 4 && systemctl status codetowin-api --no-pager")
run(client, "journalctl -u codetowin-api --no-pager -n 30 2>&1")

print("\n=== Final API Test ===")
run(client, f"curl -sv http://127.0.0.1:{PORT}/api/hackathons/ 2>&1 | tail -20", timeout=15)
run(client, "curl -s -o /dev/null -w 'HTTPS Frontend: %{http_code}' https://codetowin.pro/")
run(client, "curl -s -o /dev/null -w 'HTTPS API: %{http_code}' https://api.codetowin.pro/api/hackathons/")

client.close()

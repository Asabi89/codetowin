import paramiko
import time

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect("72.62.181.25", username="root", password="Asitech2026@", timeout=15)

service_content = """[Unit]
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
ExecStart=/var/www/codetowin-api/backend/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:8015 --timeout 120 --access-logfile /var/log/codetowin-api.log --error-logfile /var/log/codetowin-api-error.log codetowin.wsgi:application
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
"""

print("Fixing service...")
stdin, stdout, stderr = client.exec_command(f"cat > /etc/systemd/system/codetowin-api.service << 'SEOF'\n{service_content}SEOF")
print(stdout.read().decode())
client.exec_command("systemctl daemon-reload")
client.exec_command("pkill -f gunicorn")
time.sleep(2)
client.exec_command("systemctl restart codetowin-api")
time.sleep(2)
stdin, stdout, stderr = client.exec_command("systemctl status codetowin-api --no-pager | head -15")
print(stdout.read().decode())
client.close()

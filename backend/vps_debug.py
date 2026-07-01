import paramiko

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"

def run(client, cmd, timeout=60):
    print(f"\n>>> {cmd[:120]}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    exit_code = stdout.channel.recv_exit_status()
    print((out + err)[-5000:])
    return exit_code, out + err

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Connected!")

# Get the actual Django error by enabling DEBUG temporarily
print("\n=== Checking Django error with DEBUG=True ===")
run(client, """
cd /var/www/codetowin-api/backend && \
DJANGO_SECRET_KEY=codetowin-vps-secret-2026-hackafri \
DJANGO_DEBUG=True \
ALLOWED_HOSTS=* \
CORS_ALLOW_ALL=True \
./venv/bin/python -c "
import django, os
os.environ['DJANGO_SETTINGS_MODULE'] = 'codetowin.settings'
os.environ['DJANGO_SECRET_KEY'] = 'test-key'
os.environ['DJANGO_DEBUG'] = 'True'
os.environ['ALLOWED_HOSTS'] = '*'
os.environ['CORS_ALLOW_ALL'] = 'True'
django.setup()
from django.test import RequestFactory
from django.core.handlers.wsgi import WSGIHandler
app = WSGIHandler()
print('Django loaded OK')
from hackathons import views
print('Views OK')
" 2>&1
""")

# Try with DEBUG True curl to see real error
print("\n=== Check actual 500 error content ===")
run(client, """
cd /var/www/codetowin-api/backend && \
DJANGO_SECRET_KEY=codetowin-vps-secret-2026-hackafri \
DJANGO_DEBUG=True \
ALLOWED_HOSTS=* \
CORS_ALLOW_ALL=True \
timeout 10 ./venv/bin/gunicorn --workers 1 --bind 127.0.0.1:8016 codetowin.wsgi:application --daemon 2>&1; sleep 3; \
curl -s http://127.0.0.1:8016/api/hackathons/ | head -100; \
pkill -f "gunicorn.*8016" 2>/dev/null; echo DONE
""", timeout=30)

# Also check the error log
run(client, "journalctl -u codetowin-api --no-pager -n 20 | grep -E 'ERROR|Exception|error' 2>&1 | head -30")

# Check if there's a missing migration or db issue
run(client, """
cd /var/www/codetowin-api/backend && \
DJANGO_SECRET_KEY=test \
DJANGO_DEBUG=True \
ALLOWED_HOSTS='*' \
CORS_ALLOW_ALL=True \
./venv/bin/python manage.py check --deploy 2>&1 | head -30
""")

# Check for sqlite permissions
run(client, "ls -la /var/www/codetowin-api/backend/db.sqlite3")
run(client, "chown www-data:www-data /var/www/codetowin-api/backend/db.sqlite3")
run(client, "chmod 664 /var/www/codetowin-api/backend/db.sqlite3")
run(client, "chown www-data:www-data /var/www/codetowin-api/backend/")

# Restart and test again
run(client, "systemctl restart codetowin-api && sleep 3")
run(client, "curl -s http://127.0.0.1:8015/api/hackathons/ | head -50")
run(client, "curl -s -o /dev/null -w 'Status: %{http_code}' https://api.codetowin.pro/api/hackathons/")

client.close()

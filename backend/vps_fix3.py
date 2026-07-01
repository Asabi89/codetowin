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

ENV = "DJANGO_SECRET_KEY=codetowin-vps-secret-2026-hackafri DJANGO_DEBUG=False ALLOWED_HOSTS='api.codetowin.pro,72.62.181.25,localhost' CORS_ALLOW_ALL=True"

# Fix 1: Install missing 'requests' package
print("\n=== Fix 1: Install missing packages ===")
run(client, "/var/www/codetowin-api/backend/venv/bin/pip install requests python-dotenv google-auth 2>&1 | tail -10")

# Fix 2: Run migrations now that deps are fixed
print("\n=== Fix 2: Run migrations ===")
run(client, f"cd /var/www/codetowin-api/backend && {ENV} ./venv/bin/python manage.py migrate --noinput 2>&1", timeout=120)

# Fix 3: Collect static
run(client, f"cd /var/www/codetowin-api/backend && {ENV} ./venv/bin/python manage.py collectstatic --noinput 2>&1 | tail -5")

# Fix 4: Fix permissions
run(client, """
chown -R www-data:www-data /var/www/codetowin-api/backend/
chmod 664 /var/www/codetowin-api/backend/db.sqlite3
chmod 775 /var/www/codetowin-api/backend/
ls -lh /var/www/codetowin-api/backend/db.sqlite3
""")

# Fix 5: Verify Django starts cleanly
print("\n=== Fix 5: Verify Django starts ===")
run(client, f"""cd /var/www/codetowin-api/backend && {ENV} ./venv/bin/python -c "
import os
os.environ['DJANGO_SECRET_KEY'] = 'codetowin-vps-secret-2026-hackafri'
os.environ['DJANGO_DEBUG'] = 'False'
os.environ['ALLOWED_HOSTS'] = 'api.codetowin.pro,72.62.181.25,localhost'
os.environ['CORS_ALLOW_ALL'] = 'True'
os.environ['DJANGO_SETTINGS_MODULE'] = 'codetowin.settings'
import django
django.setup()
print('Django setup OK')
import codetowin.urls
print('URLs loaded OK')
from hackathons.models import Hackathon
print('Hackathon model OK, count:', Hackathon.objects.count())
" 2>&1
""")

# Fix 6: Restart service
print("\n=== Fix 6: Restart and verify ===")
run(client, "systemctl restart codetowin-api && sleep 4")
run(client, "systemctl status codetowin-api --no-pager | head -12")

# Final test
print("\n=== FINAL TESTS ===")
run(client, "curl -s http://127.0.0.1:8015/api/hackathons/ | head -50")
run(client, "curl -s -o /dev/null -w 'Frontend HTTPS: %{http_code}\\n' https://codetowin.pro/")
run(client, "curl -s -o /dev/null -w 'API HTTPS: %{http_code}\\n' https://api.codetowin.pro/api/hackathons/")
run(client, "curl -s https://api.codetowin.pro/api/hackathons/ | head -100")

client.close()
print("\n=== DONE ===")

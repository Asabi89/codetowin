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
    print((out + err)[-6000:])
    return exit_code, out + err

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Connected!")

ENV = """DJANGO_SECRET_KEY=codetowin-vps-secret-2026-hackafri \\
DJANGO_DEBUG=True \\
ALLOWED_HOSTS='*' \\
CORS_ALLOW_ALL=True"""

# Step 1: Get the FULL traceback from authentication.urls
print("\n=== FULL Error Traceback ===")
run(client, f"""
cd /var/www/codetowin-api/backend && \\
{ENV} \\
./venv/bin/python -c "
import traceback, os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codetowin.settings')
try:
    from django.core.management import call_command
    import django; django.setup()
    from django.urls import get_urlconf
    import codetowin.urls
except Exception as e:
    traceback.print_exc()
" 2>&1
""")

# Step 2: Check what's in authentication/urls.py
print("\n=== authentication/urls.py ===")
run(client, "cat /var/www/codetowin-api/backend/authentication/urls.py")

# Step 3: Check what packages might be missing
print("\n=== Check missing imports in authentication ===")
run(client, f"""
cd /var/www/codetowin-api/backend && \\
{ENV} \\
./venv/bin/python -c "
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codetowin.settings')
import django; django.setup()
try:
    import authentication.urls
    print('authentication.urls OK')
except Exception as e:
    import traceback; traceback.print_exc()
" 2>&1
""")

# Step 4: Fix db - run migrations properly with full env
print("\n=== Fix DB: Run Migrations ===")
run(client, f"""
cd /var/www/codetowin-api/backend && \\
{ENV} \\
./venv/bin/python manage.py migrate --run-syncdb 2>&1
""", timeout=120)

# Step 5: Check db size after migration
run(client, "ls -lh /var/www/codetowin-api/backend/db.sqlite3")
run(client, "chown www-data:www-data /var/www/codetowin-api/backend/db.sqlite3 /var/www/codetowin-api/backend/")

# Step 6: Try full test with curl verbose to get more info
print("\n=== Direct Python WSGI test ===")
run(client, f"""
cd /var/www/codetowin-api/backend && \\
{ENV} \\
./venv/bin/python -c "
import os, sys
os.environ['DJANGO_SECRET_KEY'] = 'codetowin-vps-secret-2026-hackafri'
os.environ['DJANGO_DEBUG'] = 'True'
os.environ['ALLOWED_HOSTS'] = '*'
os.environ['CORS_ALLOW_ALL'] = 'True'
os.environ['DJANGO_SETTINGS_MODULE'] = 'codetowin.settings'
import django
django.setup()
from django.test import RequestFactory
from django.core.handlers.wsgi import WSGIHandler
app = WSGIHandler()
factory = RequestFactory()
request = factory.get('/api/hackathons/')
request.META['SERVER_NAME'] = 'localhost'
request.META['SERVER_PORT'] = '80'
try:
    from hackathons.views import HackathonViewSet
    from rest_framework.test import APIRequestFactory
    f = APIRequestFactory()
    req = f.get('/api/hackathons/')
    view = HackathonViewSet.as_view({'get': 'list'})
    response = view(req)
    print('Status:', response.status_code)
    print('Data:', str(response.data)[:500])
except Exception as e:
    import traceback; traceback.print_exc()
" 2>&1
""")

# Restart with corrected config
print("\n=== Restart Service ===")
run(client, "systemctl restart codetowin-api && sleep 4")
run(client, "systemctl status codetowin-api --no-pager | head -15")
run(client, "curl -s http://127.0.0.1:8015/api/hackathons/ | python3 -c 'import sys,json; d=json.load(sys.stdin); print(\"API OK! Count:\", len(d) if isinstance(d,list) else d)' 2>/dev/null || curl -s http://127.0.0.1:8015/api/hackathons/ | head -30")

client.close()
print("\nDone.")

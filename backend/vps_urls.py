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

# Check what URLs are registered
run(client, "cat /var/www/codetowin-api/backend/hackathons/urls.py 2>/dev/null || echo 'No hackathons/urls.py found'")
run(client, "ls /var/www/codetowin-api/backend/hackathons/")

# List all registered URLs
run(client, """
cd /var/www/codetowin-api/backend && \
DJANGO_SECRET_KEY=codetowin-vps-secret-2026-hackafri \
DJANGO_DEBUG=True \
ALLOWED_HOSTS='*' \
CORS_ALLOW_ALL=True \
./venv/bin/python manage.py show_urls 2>/dev/null | grep -i hackathon | head -20 || \
./venv/bin/python -c "
import os
os.environ['DJANGO_SECRET_KEY'] = 'test'
os.environ['DJANGO_DEBUG'] = 'True'
os.environ['ALLOWED_HOSTS'] = '*'
os.environ['CORS_ALLOW_ALL'] = 'True'
os.environ['DJANGO_SETTINGS_MODULE'] = 'codetowin.settings'
import django; django.setup()
from django.urls import get_resolver
resolver = get_resolver()
def show_urls(urlpatterns, prefix=''):
    for p in urlpatterns:
        try:
            if hasattr(p, 'url_patterns'):
                show_urls(p.url_patterns, prefix + str(p.pattern))
            else:
                print(prefix + str(p.pattern))
        except: pass
show_urls(resolver.url_patterns)
" 2>&1 | grep -i hackathon | head -30
""")

# Also test the actual API root endpoint
run(client, "curl -s -H 'Host: api.codetowin.pro' http://127.0.0.1:8015/ | head -20")
run(client, "curl -s -H 'Host: api.codetowin.pro' http://127.0.0.1:8015/api/schema/swagger-ui/ -o /dev/null -w '%{http_code}'")

# Try with /api/hackathons (no trailing slash since APPEND_SLASH=False)
run(client, "curl -s -H 'Host: api.codetowin.pro' http://127.0.0.1:8015/api/hackathons -w ' HTTP:%{http_code}' | tail -5")

# Test auth endpoint to confirm API is working
run(client, """curl -s -H 'Host: api.codetowin.pro' -X POST http://127.0.0.1:8015/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@test.com","password":"wrong"}' -w ' HTTP:%{http_code}'""")

# Check if media should be served (settings.DEBUG=False means no media serving via urls)
# Need to add static/media in non-debug mode too
run(client, """
cd /var/www/codetowin-api/backend && \
DJANGO_SECRET_KEY=codetowin-vps-secret-2026-hackafri \
DJANGO_DEBUG=False \
ALLOWED_HOSTS='api.codetowin.pro,localhost' \
CORS_ALLOW_ALL=True \
./venv/bin/python -c "
import os
os.environ['DJANGO_SECRET_KEY'] = 'test'
os.environ['DJANGO_DEBUG'] = 'False'
os.environ['ALLOWED_HOSTS'] = 'api.codetowin.pro,localhost'
os.environ['CORS_ALLOW_ALL'] = 'True'
os.environ['DJANGO_SETTINGS_MODULE'] = 'codetowin.settings'
import django; django.setup()
from django.urls import get_resolver
resolver = get_resolver()
def show_urls(urlpatterns, prefix=''):
    for p in urlpatterns:
        try:
            if hasattr(p, 'url_patterns'):
                show_urls(p.url_patterns, prefix + str(p.pattern))
            else:
                print(prefix + str(p.pattern))
        except: pass
show_urls(resolver.url_patterns)
" 2>&1 | head -40
""")

client.close()

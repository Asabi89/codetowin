import paramiko
import textwrap

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"

def run(client, cmd, timeout=120):
    print(f"\n>>> {cmd[:150]}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    print((out + err)[-4000:])
    return out + err

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Connected!")

ENV = (
    "DJANGO_SECRET_KEY=codetowin-vps-secret-2026-hackafri "
    "DJANGO_DEBUG=False "
    "ALLOWED_HOSTS='api.codetowin.pro,localhost' "
    "CORS_ALLOW_ALL=True"
)
VENV = "/var/www/codetowin-api/backend/venv/bin/python"
MANAGE = "/var/www/codetowin-api/backend/manage.py"

# Write the account creation script to a file on the VPS
script = textwrap.dedent("""
from django.contrib.auth import get_user_model
from participant.models import ParticipantProfile
from mentor.models import MentorProfile
from organizer.models import OrganizerProfile

User = get_user_model()

accounts = [
    ('idowua@gmail.com', 'Alabimi89', 'PARTICIPANT', 'idowua', 'Idowu', 'A'),
    ('olamp@gmail.com', 'Alabimi89', 'MENTOR', 'olamp', 'Olamp', 'M'),
    ('organiser@gmail.com', 'Alabimi89', 'ORGANIZER', 'organiser', 'Organiser', 'O'),
]

for email, password, role_str, username, first, last in accounts:
    if User.objects.filter(email=email).exists():
        u = User.objects.get(email=email)
        u.set_password(password)
        u.save()
        print(f'Updated: {email}')
    else:
        u = User.objects.create_user(
            username=username, email=email, password=password,
            role=role_str, first_name=first, last_name=last,
        )
        if role_str == 'PARTICIPANT':
            ParticipantProfile.objects.get_or_create(user=u)
        elif role_str == 'MENTOR':
            MentorProfile.objects.get_or_create(user=u)
        elif role_str == 'ORGANIZER':
            OrganizerProfile.objects.get_or_create(user=u)
        print(f'Created {role_str}: {email}')

print('ALL DONE')
""").strip()

run(client, f"cat > /tmp/create_accounts.py << 'PYEOF'\n{script}\nPYEOF")
run(client, f"cd /var/www/codetowin-api/backend && {ENV} {VENV} {MANAGE} shell < /tmp/create_accounts.py 2>&1")

# Now test logins properly (no bash variable expansion issues)
print("\n=== Test participant login ===")
run(client, 'curl -s -X POST https://api.codetowin.pro/api/auth/login -H "Content-Type: application/json" -d \'{"email":"idowua@gmail.com","password":"Alabimi89"}\' -w " HTTP:%{http_code}"')

print("\n=== Test mentor login ===")
run(client, 'curl -s -X POST https://api.codetowin.pro/api/auth/login -H "Content-Type: application/json" -d \'{"email":"olamp@gmail.com","password":"Alabimi89"}\' -w " HTTP:%{http_code}"')

print("\n=== Test organizer login ===")
result = run(client, 'curl -s -X POST https://api.codetowin.pro/api/auth/login -H "Content-Type: application/json" -d \'{"email":"organiser@gmail.com","password":"Alabimi89"}\'')

import json
try:
    for line in result.strip().split('\n'):
        line = line.strip()
        if line.startswith('{') and 'access' in line:
            data = json.loads(line)
            token = data.get('access', '')
            print(f"\nOrganizer token obtained: {token[:60]}...")
            break
    else:
        token = ""
        print("Could not get organizer token")
except Exception as e:
    token = ""
    print(f"Error: {e}")

# Test hackathon creation (fixed validation)
if token:
    print("\n=== Test hackathon creation ===")
    run(client, f'''curl -s -X POST https://api.codetowin.pro/api/hackathons \\
      -H "Authorization: Bearer {token}" \\
      -H "Content-Type: application/json" \\
      -H "Origin: https://codetowin.pro" \\
      -d \'{{"title":"Test Fix 2026","description":"Fixed test","start_date":"2026-09-01T00:00:00Z","end_date":"2026-09-07T00:00:00Z","registration_start":"2026-07-01T00:00:00Z","registration_end":"2026-08-31T00:00:00Z","type":"En ligne","prize":"1000","min_team_size":1,"max_team_size":5,"participant_limit":100}}\' \\
      -w "\\nHTTP:%{{http_code}}"''')

# Test register with lowercase role - this is the remaining serializer fix
print("\n=== Check current serializer on VPS ===")
run(client, "grep -n 'validate_role\\|PARTICIPANT\\|choices' /var/www/codetowin-api/backend/authentication/serializers.py | head -20")

# The DRF ChoiceField validates before validate_role is called
# Fix: make the role field not required strict choices or override to_internal_value
print("\n=== Check if fix is deployed ===")
run(client, "grep -A5 'validate_role' /var/www/codetowin-api/backend/authentication/serializers.py")

# Test register with uppercase role (works)
print("\n=== Test register with UPPERCASE role (should work) ===")
run(client, '''curl -s -X POST https://api.codetowin.pro/api/auth/register \\
  -H "Content-Type: application/json" \\
  -H "Origin: https://codetowin.pro" \\
  -d \'{"email":"testuppercase@gmail.com","password":"Test1234!","username":"testuppercase","role":"PARTICIPANT","first_name":"Test","last_name":"Upper"}\' \\
  -w "\\nHTTP:%{http_code}"''')

print("\n=== Test register with lowercase role (after our fix) ===")
run(client, '''curl -s -X POST https://api.codetowin.pro/api/auth/register \\
  -H "Content-Type: application/json" \\
  -H "Origin: https://codetowin.pro" \\
  -d \'{"email":"testlowercase2@gmail.com","password":"Test1234!","username":"testlower2","role":"participant","first_name":"Test","last_name":"Lower"}\' \\
  -w "\\nHTTP:%{http_code}"''')

client.close()
print("\n=== All done ===")

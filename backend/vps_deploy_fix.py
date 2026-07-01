import paramiko

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"

def run(client, cmd, timeout=120):
    print(f"\n>>> {cmd[:120]}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    print((out + err)[-5000:])
    return out + err

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Connected!")

# Pull latest code
print("\n=== Pull latest fixes from GitHub ===")
run(client, "cd /var/www/codetowin-api && git fetch origin && git checkout org && git pull origin org")

# Restart gunicorn to pick up new code
print("\n=== Restart Gunicorn ===")
run(client, "systemctl restart codetowin-api && sleep 3")
run(client, "systemctl status codetowin-api --no-pager | head -8")

# Create the 3 test accounts
print("\n=== Create test accounts ===")
run(client, """
cd /var/www/codetowin-api/backend && \
DJANGO_SECRET_KEY=codetowin-vps-secret-2026-hackafri \
DJANGO_DEBUG=False \
ALLOWED_HOSTS='api.codetowin.pro,localhost' \
CORS_ALLOW_ALL=True \
./venv/bin/python manage.py shell -c "
from django.contrib.auth import get_user_model
from participant.models import ParticipantProfile
from mentor.models import MentorProfile
from organizer.models import OrganizerProfile

User = get_user_model()

accounts = [
    {'email': 'idowua@gmail.com', 'password': 'Alabimi89', 'role': 'PARTICIPANT', 'username': 'idowua', 'first_name': 'Idowu', 'last_name': 'A'},
    {'email': 'olamp@gmail.com',  'password': 'Alabimi89', 'role': 'MENTOR',      'username': 'olamp',  'first_name': 'Olamp', 'last_name': 'M'},
    {'email': 'organiser@gmail.com', 'password': 'Alabimi89', 'role': 'ORGANIZER', 'username': 'organiser', 'first_name': 'Organiser', 'last_name': 'O'},
]

for acc in accounts:
    email = acc['email']
    if User.objects.filter(email=email).exists():
        u = User.objects.get(email=email)
        u.set_password(acc['password'])
        u.save()
        print(f'Updated password for {email}')
    else:
        u = User.objects.create_user(
            username=acc['username'],
            email=email,
            password=acc['password'],
            role=acc['role'],
            first_name=acc['first_name'],
            last_name=acc['last_name'],
        )
        # Create profile
        if acc['role'] == 'PARTICIPANT':
            ParticipantProfile.objects.get_or_create(user=u)
        elif acc['role'] == 'MENTOR':
            MentorProfile.objects.get_or_create(user=u)
        elif acc['role'] == 'ORGANIZER':
            OrganizerProfile.objects.get_or_create(user=u)
        print(f'Created {acc[\"role\"]} account: {email}')

print('Done.')
" 2>&1
""")

# Test all 3 logins
print("\n=== Test all logins ===")
run(client, """
for email in idowua@gmail.com olamp@gmail.com organiser@gmail.com; do
  echo -n "Login $email: "
  curl -s -X POST https://api.codetowin.pro/api/auth/login \
    -H 'Content-Type: application/json' \
    -d "{\"email\":\"$email\",\"password\":\"Alabimi89\"}" \
    -w ' HTTP:%{http_code}' | python3 -c "
import sys, json
line = sys.stdin.read()
try:
    d = json.loads(line.split(' HTTP:')[0])
    code = line.split(' HTTP:')[1] if ' HTTP:' in line else 'unknown'
    if 'access' in d:
        print(f'LOGIN OK (HTTP:{code}) token={d[\"access\"][:30]}...')
    else:
        print(f'FAILED (HTTP:{code}) -> {d}')
except:
    print(line[:200])
"
done
""")

# Test register with lowercase role
print("\n=== Test register with lowercase role ===")
run(client, """curl -s -X POST https://api.codetowin.pro/api/auth/register \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://codetowin.pro' \
  -d '{"email":"new_test@gmail.com","password":"Test1234!","username":"newtest","role":"participant","first_name":"New","last_name":"Test"}' \
  -w '\\nHTTP:%{http_code}'""")

# Test hackathon creation
print("\n=== Get organizer token ===")
result = run(client, """curl -s -X POST https://api.codetowin.pro/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"organiser@gmail.com","password":"Alabimi89"}'""")

import json
try:
    data = json.loads([l for l in result.strip().split('\n') if l.strip().startswith('{')][-1])
    token = data.get('access', '')
    print(f"Token: {token[:50]}..." if token else "No token")
except Exception as e:
    token = ""
    print(f"Parse error: {e}")

if token:
    print("\n=== Test hackathon creation (with registration_end > start_date) ===")
    run(client, f"""curl -s -X POST https://api.codetowin.pro/api/hackathons \
      -H 'Authorization: Bearer {token}' \
      -H 'Content-Type: application/json' \
      -H 'Origin: https://codetowin.pro' \
      -d '{{"title":"Test Hackathon 2026","description":"Test","start_date":"2026-09-01T00:00:00Z","end_date":"2026-09-07T00:00:00Z","registration_start":"2026-07-01T00:00:00Z","registration_end":"2026-08-31T00:00:00Z","type":"En ligne","prize":"1000","min_team_size":1,"max_team_size":5,"participant_limit":100}}' \
      -w '\\nHTTP:%{{http_code}}'""")

print("\n\n=== FINAL STATUS ===")
run(client, "curl -s -o /dev/null -w 'Frontend: %{http_code}\\n' https://codetowin.pro/")
run(client, "curl -s -o /dev/null -w 'API: %{http_code}\\n' https://api.codetowin.pro/api/hackathons")

client.close()
print("\n=== Done ===")

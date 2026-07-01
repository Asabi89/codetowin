import paramiko
import json

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"

def run(client, cmd, timeout=60):
    print(f"\n>>> {cmd[:150]}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    print((out + err)[-5000:])
    return out + err

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Connected!")

BASE = "https://api.codetowin.pro"

print("\n=== TEST 1: Login ===")
run(client, f"""curl -s -X POST {BASE}/api/auth/login \\
  -H 'Content-Type: application/json' \\
  -H 'Origin: https://codetowin.pro' \\
  -d '{{"email":"organiser@gmail.com","password":"Alabimi89"}}' \\
  -w '\\nHTTP:%{{http_code}}'""")

print("\n=== TEST 2: Register new user ===")
run(client, f"""curl -s -X POST {BASE}/api/auth/register \\
  -H 'Content-Type: application/json' \\
  -H 'Origin: https://codetowin.pro' \\
  -d '{{"email":"test_vps@gmail.com","password":"TestVps123!","full_name":"Test VPS","role":"participant","country":"SN"}}' \\
  -w '\\nHTTP:%{{http_code}}'""")

print("\n=== TEST 3: Get JWT token then test protected endpoint ===")
result = run(client, f"""curl -s -X POST {BASE}/api/auth/login \\
  -H 'Content-Type: application/json' \\
  -d '{{"email":"organiser@gmail.com","password":"Alabimi89"}}'""")

# Extract token
try:
    data = json.loads(result.strip().split('\n')[-1] if '\n' in result else result)
    token = data.get('access', '')
    print(f"Token obtained: {token[:50]}..." if token else "No token found")
except:
    token = ""
    print("Could not parse token from response")

if token:
    print("\n=== TEST 4: Authenticated request - organizer hackathons ===")
    run(client, f"""curl -s -H 'Authorization: Bearer {token}' \\
      -H 'Origin: https://codetowin.pro' \\
      {BASE}/api/hackathons -w '\\nHTTP:%{{http_code}}'""")

    print("\n=== TEST 5: Organizer profile ===")
    run(client, f"""curl -s -H 'Authorization: Bearer {token}' \\
      {BASE}/api/auth/me -w '\\nHTTP:%{{http_code}}'""")

    print("\n=== TEST 6: Participant registration for hackathon ===")
    run(client, f"""curl -s -X POST -H 'Authorization: Bearer {token}' \\
      -H 'Content-Type: application/json' \\
      -H 'Origin: https://codetowin.pro' \\
      {BASE}/api/registrations \\
      -d '{{"hackathon":1}}' -w '\\nHTTP:%{{http_code}}'""")

print("\n=== TEST 7: CORS headers check ===")
run(client, f"""curl -s -I -X OPTIONS {BASE}/api/hackathons \\
  -H 'Origin: https://codetowin.pro' \\
  -H 'Access-Control-Request-Method: POST' \\
  -H 'Access-Control-Request-Headers: Content-Type,Authorization' \\
  | grep -E 'HTTP|Access-Control|Allow'""")

print("\n=== CHECK: journalctl for any 500 errors ===")
run(client, "journalctl -u codetowin-api --no-pager -n 100 | grep -E '500|ERROR|Exception|Traceback' | head -30")

print("\n=== CHECK: Nginx access log for failed requests ===")
run(client, "tail -50 /var/log/nginx/access.log 2>/dev/null | grep -E ' 4[0-9][0-9] | 5[0-9][0-9] '")

client.close()

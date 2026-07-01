import paramiko

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"

def run(client, cmd, timeout=60):
    print(f"\n>>> {cmd[:120]}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    print((out + err)[-3000:])
    return out + err

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Connected!")

# Pull and restart
run(client, "cd /var/www/codetowin-api && git pull origin org")
run(client, "systemctl restart codetowin-api && sleep 3")
run(client, "systemctl status codetowin-api --no-pager | grep -E 'Active|Main PID'")

print("\n=== TEST 1: Login participant (idowua) ===")
run(client, 'curl -s -X POST https://api.codetowin.pro/api/auth/login -H "Content-Type: application/json" -d \'{"email":"idowua@gmail.com","password":"Alabimi89"}\' -w " HTTP:%{http_code}" | python3 -c "import sys,json; d=sys.stdin.read(); code=d.split(\'HTTP:\')[-1]; body=json.loads(d.split(\' HTTP:\')[0]); print(\'LOGIN OK\' if \'access\' in body else f\'FAILED: {body}\')"')

print("\n=== TEST 2: Login organizer ===")
run(client, 'curl -s -X POST https://api.codetowin.pro/api/auth/login -H "Content-Type: application/json" -d \'{"email":"organiser@gmail.com","password":"Alabimi89"}\' | python3 -c "import sys,json; d=json.load(sys.stdin); print(\'LOGIN OK, role:\', d.get(\'role\',\'?\')) if \'access\' in d else print(\'FAILED:\', d)"')

print("\n=== TEST 3: Register with lowercase role ===")
run(client, 'curl -s -X POST https://api.codetowin.pro/api/auth/register -H "Content-Type: application/json" -H "Origin: https://codetowin.pro" -d \'{"email":"lowtest99@gmail.com","password":"Test1234!","username":"lowtest99","role":"participant","first_name":"Low","last_name":"Test"}\' -w "\\nHTTP:%{http_code}"')

print("\n=== TEST 4: Register with mentor role ===")
run(client, 'curl -s -X POST https://api.codetowin.pro/api/auth/register -H "Content-Type: application/json" -d \'{"email":"mentortest99@gmail.com","password":"Test1234!","username":"mentortest99","role":"mentor","first_name":"Mentor","last_name":"Test"}\' -w "\\nHTTP:%{http_code}"')

print("\n=== TEST 5: List hackathons (public) ===")
run(client, 'curl -s https://api.codetowin.pro/api/hackathons | python3 -c "import sys,json; d=json.load(sys.stdin); print(f\'{len(d)} hackathons found\')"')

print("\n\n=== ALL TESTS COMPLETE ===")
print("Frontend: https://codetowin.pro")
print("API:      https://api.codetowin.pro/api/")
print("")
print("Accounts ready:")
print("  Participant: idowua@gmail.com / Alabimi89")
print("  Mentor:      olamp@gmail.com  / Alabimi89")
print("  Organizer:   organiser@gmail.com / Alabimi89")

client.close()

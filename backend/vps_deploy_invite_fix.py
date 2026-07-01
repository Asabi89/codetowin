import paramiko

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"

def run(client, cmd, timeout=30):
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

# Pull latest code
run(client, "cd /var/www/codetowin-api && git fetch origin && git checkout org && git pull origin org")

# Restart gunicorn to pick up new python backend code (views.py)
run(client, "systemctl restart codetowin-api && sleep 3")

# We don't need to rebuild frontend because the frontend is served via Vercel or locally
# The user's local terminal is running "npm run dev"

print("\n=== Backend pull and restart complete ===")

client.close()

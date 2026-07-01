import paramiko

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"

def run(client, cmd, timeout=60):
    print(f"\n>>> {cmd[:120]}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    print((out + err)[-6000:])
    return out + err

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Connected!")

print("\n=== Gunicorn Service Status ===")
run(client, "systemctl status codetowin-api --no-pager")

print("\n=== Recent Gunicorn Logs (journalctl) ===")
run(client, "journalctl -u codetowin-api --no-pager -n 80 --since '2 hours ago' 2>&1")

print("\n=== Nginx Error Log ===")
run(client, "tail -50 /var/log/nginx/error.log 2>/dev/null")

print("\n=== Gunicorn Error Log ===")
run(client, "tail -100 /var/log/codetowin-api-error.log 2>/dev/null || echo 'No error log file'")

print("\n=== Quick API test ===")
run(client, "curl -s -H 'Host: api.codetowin.pro' http://127.0.0.1:8015/api/hackathons -w ' HTTP:%{http_code}'")
run(client, "curl -s -o /dev/null -w 'HTTPS API status: %{http_code}' https://api.codetowin.pro/api/hackathons")

client.close()

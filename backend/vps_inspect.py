import paramiko
import time
import sys

HOST = "72.62.181.25"
USER = "root"
PASSWORD = "Asitech2026@"

def run(client, cmd, timeout=120):
    print(f"\n>>> {cmd[:80]}{'...' if len(cmd)>80 else ''}")
    stdin, stdout, stderr = client.exec_command(cmd, timeout=timeout, get_pty=True)
    out = stdout.read().decode('utf-8', errors='replace')
    err = stderr.read().decode('utf-8', errors='replace')
    exit_code = stdout.channel.recv_exit_status()
    if out.strip():
        print(out[-3000:])  # last 3000 chars
    if err.strip() and exit_code != 0:
        print(f"STDERR: {err[-500:]}")
    return exit_code, out

print("Connecting to VPS...")
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=15)
print("Connected!")

# 1. Inspect current state
run(client, "echo '=== OS ===' && cat /etc/os-release | head -3")
run(client, "echo '=== PORTS USED ===' && ss -tlnp")
run(client, "echo '=== NGINX SITES ===' && ls /etc/nginx/sites-enabled/ 2>/dev/null || echo 'no nginx'")
run(client, "echo '=== DISK ===' && df -h /")
run(client, "echo '=== PYTHON ===' && python3 --version 2>/dev/null && echo '=== NODE ===' && node --version 2>/dev/null || echo no_node")

print("\n\n=== INSPECTION DONE ===")
client.close()
print("Done. Check output above.")

import paramiko

host = "72.62.181.25"
user = "root"
password = "Asitech2026@"

try:
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(host, username=user, password=password, timeout=10)
    
    cmd = "grep 'OPTIONS /api/' /var/log/nginx/access.log | tail -n 20"
    
    stdin, stdout, stderr = ssh.exec_command(cmd)
    print("STDOUT OPTIONS:", stdout.read().decode('utf-8'))
    
    ssh.close()
except Exception as e:
    print(f"Error: {e}")

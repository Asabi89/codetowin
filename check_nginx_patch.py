import paramiko

host = "72.62.181.25"
user = "root"
password = "Asitech2026@"

try:
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(host, username=user, password=password, timeout=10)
    
    cmd = "grep 'PATCH /api/' /var/log/nginx/access.log | tail -n 20"
    
    stdin, stdout, stderr = ssh.exec_command(cmd)
    print("STDOUT PATCH:", stdout.read().decode('utf-8'))
    
    cmd2 = "grep 'POST /api/hackathons' /var/log/nginx/access.log | grep -v discussions | tail -n 10"
    stdin, stdout, stderr = ssh.exec_command(cmd2)
    print("STDOUT POST Hackathons:", stdout.read().decode('utf-8'))
    
    ssh.close()
except Exception as e:
    print(f"Error: {e}")

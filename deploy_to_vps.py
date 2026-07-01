import paramiko
import time
import sys

host = "72.62.181.25"
user = "root"
password = "Asitech2026@"

commands = [
    "cd /var/www/codetowin-api && git fetch origin && git checkout org && git pull origin org",
    "cd /var/www/codetowin-api/backend && source venv/bin/activate && pip install -r requirements.txt && python manage.py migrate --noinput && python manage.py collectstatic --noinput",
    "systemctl restart codetowin-api",
    "cd /var/www/codetowin-api/frontend/codetowin && npm install --silent && npm run build && mkdir -p /var/www/codetowin-front && cp -r dist/* /var/www/codetowin-front/ && chown -R www-data:www-data /var/www/codetowin-front/"
]

try:
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    print(f"Connecting to {host}...")
    ssh.connect(host, username=user, password=password, timeout=10)
    print("Connected successfully!")

    for cmd in commands:
        print(f"Running: {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd, get_pty=True)
        # Wait for the command to finish
        exit_status = stdout.channel.recv_exit_status()
        
        out = stdout.read().decode('utf-8')
        err = stderr.read().decode('utf-8')
        
        if out:
            print(out)
        if err:
            print(err, file=sys.stderr)
            
        if exit_status != 0:
            print(f"Command failed with exit status {exit_status}", file=sys.stderr)
            sys.exit(exit_status)

    print("Deployment completed successfully!")
except Exception as e:
    print(f"Error: {e}")
finally:
    ssh.close()

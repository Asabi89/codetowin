import paramiko
import os
import subprocess

# 1. Commit and push locally
print("Committing local changes...")
subprocess.run(["git", "add", "."], cwd=r"c:\Users\admin\Documents\project\HACKafri")
subprocess.run(["git", "commit", "-m", "Bug fixes"], cwd=r"c:\Users\admin\Documents\project\HACKafri")
subprocess.run(["git", "push"], cwd=r"c:\Users\admin\Documents\project\HACKafri")

# 2. SSH to VPS and pull
print("Connecting to VPS...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('72.62.181.25', username='root', password='Asitech2026@')

# Find the project directory
stdin, stdout, stderr = ssh.exec_command('find / -type d -name "HACKafri" 2>/dev/null | head -n 1')
project_dir = stdout.read().decode('utf-8').strip()
print(f"Project directory on VPS: {project_dir}")

if project_dir:
    # Pull changes and rebuild
    commands = f"""
    cd {project_dir}
    git stash
    git pull
    
    # Restart backend
    systemctl restart codetowin-api || true
    
    # Rebuild frontend if needed (assuming npm run build)
    cd frontend/codetowin
    npm run build
    """
    print(f"Executing commands on VPS...")
    stdin, stdout, stderr = ssh.exec_command(commands)
    
    # Print output line by line
    for line in stdout:
        print(line, end="")
    for line in stderr:
        print(line, end="")
        
    print("\nDone!")
else:
    print("Could not find HACKafri on VPS.")

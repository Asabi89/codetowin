import os
import glob

def replace_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace('HACKafri', 'CodeToWin')
    
    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('c:/Users/admin/Documents/project/HACKafri/backend'):
    if 'venv' in root or '__pycache__' in root:
        continue
    for file in files:
        if file.endswith('.py') or file.endswith('.html'):
            replace_in_file(os.path.join(root, file))

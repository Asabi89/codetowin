import os
import re

files = [
    "src/pages/Mentor/Dashboard.jsx",
    "src/pages/Mentor/Messages.jsx",
    "src/pages/Mentor/Notifications.jsx",
    "src/pages/Mentor/Submissions.jsx",
    "src/pages/Mentor/Teams.jsx",
    "src/pages/Mentor/Invitations.jsx",
    "src/pages/Mentor/HackathonSubmissions.jsx",
    "src/pages/Organizer/Messages.jsx",
    "src/pages/Organizer/Dashboard/index.jsx",
    "src/pages/Organizer/Hackathons/index.jsx",
    "src/pages/Organizer/Hackathons/Mentors.jsx",
    "src/pages/Organizer/Hackathons/Submissions.jsx",
    "src/pages/Participant/Messages.jsx"
]

def clean_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Determine relative path to src/services/normalizers.js
    depth = filepath.count('/') - 1
    rel_path = '../' * depth + 'services/normalizers'
    if depth == 1:
      rel_path = '../services/normalizers' # From src/pages/Mentor/
      
    # Identify what to import
    needed_imports = set()
    
    # We will remove the exact function blocks.
    # regex for extractArray
    if re.search(r'const extractArray = \(data.*?=> \{.*?return \[\];\n\};', content, re.DOTALL):
        needed_imports.add('extractArray')
        content = re.sub(r'const extractArray = \(data.*?=> \{.*?return \[\];\n\};\n*', '', content, flags=re.DOTALL)
        
    if re.search(r'const normalizeConversation = \(conversation\) => \(\{.*?\}\);', content, re.DOTALL):
        needed_imports.add('normalizeConversation')
        content = re.sub(r'const normalizeConversation = \(conversation\) => \(\{.*?\}\);\n*', '', content, flags=re.DOTALL)
        
    if re.search(r'const normalizeTeam = \(team\) => \(\{.*?\}\);', content, re.DOTALL):
        needed_imports.add('normalizeTeam')
        content = re.sub(r'const normalizeTeam = \(team\) => \(\{.*?\}\);\n*', '', content, flags=re.DOTALL)
        
    if re.search(r'const normalizeNotification = \(notification\) => \(\{.*?\}\);', content, re.DOTALL):
        needed_imports.add('normalizeNotification')
        content = re.sub(r'const normalizeNotification = \(notification\) => \(\{.*?\}\);\n*', '', content, flags=re.DOTALL)

    if re.search(r'const normalizeHackathon = \(hackathon\) => \(\{.*?\}\);', content, re.DOTALL):
        needed_imports.add('normalizeHackathon')
        content = re.sub(r'const normalizeHackathon = \(hackathon\) => \(\{.*?\}\);\n*', '', content, flags=re.DOTALL)
        
    if re.search(r'const normalizeHackathon = \(hackathon\) => \{.*?return \{.*?\};\n\};', content, re.DOTALL):
        needed_imports.add('normalizeHackathon')
        content = re.sub(r'const normalizeHackathon = \(hackathon\) => \{.*?return \{.*?\};\n\};\n*', '', content, flags=re.DOTALL)

    if re.search(r'const normalizeStatus = \(status = \'\'\) => \{.*?return status \|\| \'brouillon\';\n\};', content, re.DOTALL):
        needed_imports.add('normalizeStatus')
        content = re.sub(r'const normalizeStatus = \(status = \'\'\) => \{.*?return status \|\| \'brouillon\';\n\};\n*', '', content, flags=re.DOTALL)
        
    if re.search(r'const normalizeSubmission = \(submission\) => \{.*?return \{.*?\};\n\};', content, re.DOTALL):
        needed_imports.add('normalizeSubmission')
        content = re.sub(r'const normalizeSubmission = \(submission\) => \{.*?return \{.*?\};\n\};\n*', '', content, flags=re.DOTALL)

    if needed_imports:
        import_str = f"import {{ {', '.join(sorted(list(needed_imports)))} }} from '{rel_path}';\n"
        # Add import after the last import statement
        last_import_pos = content.rfind("import ")
        if last_import_pos != -1:
            end_of_last_import = content.find("\n", last_import_pos) + 1
            content = content[:end_of_last_import] + import_str + content[end_of_last_import:]
        else:
            content = import_str + content
            
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath} with {needed_imports}")

for f in files:
    clean_file(f)


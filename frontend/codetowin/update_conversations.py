import re

files = [
    ("src/pages/Mentor/Messages.jsx", "MENTOR_CHATS_MOCK", "MENTOR_TABS_MOCK", "mentor"),
    ("src/pages/Organizer/Messages.jsx", "ORGANIZER_CHATS_MOCK", "ORGANIZER_TABS_MOCK", "organizer"),
    ("src/pages/Participant/Messages.jsx", "PARTICIPANT_CHATS_MOCK", "PARTICIPANT_TABS_MOCK", "participant")
]

for filepath, mockchats, mocktabs, role in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Add import
    import_hook = f"import {{ useRoleConversations }} from '../../hooks/useRoleConversations';\n"
    last_import_pos = content.rfind("import ")
    end_of_last_import = content.find("\n", last_import_pos) + 1
    content = content[:end_of_last_import] + import_hook + content[end_of_last_import:]

    # Replace body
    body_regex = r"  const \[tabs, setTabs\] = useState\(\[\]\);\n  const \[chats, setChats\].*?  \}, \[\]\);\n"
    new_body = f"  const {{ tabs, chats, loading }} = useRoleConversations('{role}', {{ mockChats: {mockchats}, mockTabs: {mocktabs} }});\n"
    
    content = re.sub(body_regex, new_body, content, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filepath}")

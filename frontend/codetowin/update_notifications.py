import re

files = [
    ("src/pages/Mentor/Notifications.jsx", "MENTOR_NOTIFICATIONS_MOCK", "mentor"),
    ("src/pages/Organizer/Notifications.jsx", "ORGANIZER_NOTIFICATIONS_MOCK", "organizer")
]

for filepath, mockname, role in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Add import
    import_hook = f"import {{ useNotifications }} from '../../hooks/useNotifications';\n"
    last_import_pos = content.rfind("import ")
    end_of_last_import = content.find("\n", last_import_pos) + 1
    content = content[:end_of_last_import] + import_hook + content[end_of_last_import:]

    # Replace body
    body_regex = r"  const \[notifications, setNotifications\].*?setNotifications\(notifications\.map\(n => \(\{ \.\.\.n, unread: false \}\)\)\);\n    \}\n  \};\n"
    new_body = f"  const {{ notifications, unreadCount, markAllAsRead, loading }} = useNotifications('{role}', {mockname});\n"
    
    content = re.sub(body_regex, new_body, content, flags=re.DOTALL)
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filepath}")

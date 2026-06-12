import re

files = [
    "src/pages/Mentor/HackathonSubmissions.jsx",
    "src/pages/Mentor/Submissions.jsx"
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Add import
    import_hook = f"import {{ useExportCSV }} from '../../hooks/useExportCSV';\n"
    last_import_pos = content.rfind("import ")
    end_of_last_import = content.find("\n", last_import_pos) + 1
    content = content[:end_of_last_import] + import_hook + content[end_of_last_import:]

    # Replace body (delete exportCsv)
    body_regex = r"const exportCsv = \(rows, filename\) => \{.*?\n  \};\n\n"
    content = re.sub(body_regex, "", content, flags=re.DOTALL)
    
    # Replace in component
    comp_regex = r"export default function (.*?) \{.*?const \[loading, setLoading\] = useState\(true\);\n"
    
    match = re.search(comp_regex, content, flags=re.DOTALL)
    if match:
        old_part = match.group(0)
        new_part = old_part + "  const { exportCSV } = useExportCSV();\n"
        content = content.replace(old_part, new_part)
        
    # Replace exportCsv( with exportCSV(
    content = content.replace("exportCsv(", "exportCSV(")
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filepath}")

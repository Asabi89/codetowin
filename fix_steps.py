import re

with open('froentend/organisation/organisateur-create-hackathon.html', 'r') as f:
    create_html = f.read()

with open('froentend/organisation/organisateur-edit-hackathon.html', 'r') as f:
    edit_html = f.read()

# Extract steps 2 to 7
steps_match = re.search(r'(<!-- Step 2: Dates -->.*?<!-- Navigation Actions -->)', create_html, re.DOTALL)

if steps_match:
    steps_content = steps_match.group(1)
    # Remove the trailing navigation actions comment
    steps_content = steps_content.replace('<!-- Navigation Actions -->', '')
    
    # Insert before the Navigation Actions in edit_html
    edit_html = edit_html.replace('<!-- Navigation Actions -->', steps_content + '\n                  <!-- Navigation Actions -->')

    with open('froentend/organisation/organisateur-edit-hackathon.html', 'w') as f:
        f.write(edit_html)
        print("Successfully added steps 2 to 7.")
else:
    print("Could not find steps in create_html")

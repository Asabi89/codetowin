import re

with open('froentend/organisation/organisateur-create-hackathon.html', 'r') as f:
    create_html = f.read()

with open('froentend/organisation/organisateur-edit-hackathon.html', 'r') as f:
    edit_html = f.read()

# 1. Add .step-hidden style if missing
if '.step-hidden' not in edit_html:
    style_idx = edit_html.find('</style>')
    edit_html = edit_html[:style_idx] + '  .step-hidden {\n        display: none;\n      }\n    ' + edit_html[style_idx:]

# 2. Extract Sidebar Nav from create
nav_match = re.search(r'<aside class="py-6 lg:col-span-3 lg:py-0">.*?</aside>', create_html, re.DOTALL)
if nav_match:
    edit_html = re.sub(r'<aside class="py-6 lg:col-span-3 lg:py-0">.*?</aside>', nav_match.group(0), edit_html, flags=re.DOTALL)

# 3. Extract Steps 2-7 and Nav Actions from create
steps_match = re.search(r'(<!-- Step 2: Dates -->.*?<!-- Navigation Actions -->.*?</div>)', create_html, re.DOTALL)
if steps_match:
    # In edit_html, replace from after Step 1's closing div until the end of the form
    # We find where Step 1 ends. Step 1 ends at: </div>\n                  </div>\n                  <div class="bg-slate-50
    edit_html = re.sub(r'<!-- Step 2: Dates -->.*?</div>\s*</div>\s*</form>', '', edit_html, flags=re.DOTALL) # in case it existed
    edit_html = re.sub(r'(<!-- Step 1: Informations générales -->.*?</div>\s*</div>)\s*<div class="bg-slate-50 px-4 py-3 text-right sm:px-6 flex justify-between items-center">.*?</form>', r'\1\n\n                  ' + steps_match.group(1) + '\n                </form>', edit_html, flags=re.DOTALL)

# 4. Extract Javascript from create
script_match = re.search(r'(<!-- JavaScript logic for Wizard -->.*?</script>)', create_html, re.DOTALL)
if script_match:
    if '<!-- JavaScript logic for Wizard -->' not in edit_html:
        edit_html = edit_html.replace('</body>', '\n    ' + script_match.group(1) + '\n  </body>')

with open('froentend/organisation/organisateur-edit-hackathon.html', 'w') as f:
    f.write(edit_html)

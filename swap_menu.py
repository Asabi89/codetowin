import glob
import re

files = glob.glob('froentend/organisation/organisateur-*.html')

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the block containing both links in that order.
    # We look for <a href="organisateur-participants.html"...>...</a>
    # followed by <a href="organisateur-teams.html"...>...</a>
    
    pattern = r'(<a href="organisateur-participants\.html"[^>]*>\s*Participants\s*</a>)\s*(<a href="organisateur-teams\.html"[^>]*>\s*Équipes\s*</a>)'
    
    if re.search(pattern, content):
        new_content = re.sub(pattern, r'\2\n            \1', content)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Swapped in {filepath}")
    else:
        # Maybe it's already swapped?
        pattern2 = r'(<a href="organisateur-teams\.html"[^>]*>\s*Équipes\s*</a>)\s*(<a href="organisateur-participants\.html"[^>]*>\s*Participants\s*</a>)'
        if re.search(pattern2, content):
            print(f"Already swapped in {filepath}")
        else:
            print(f"Could not find the exact pattern in {filepath}")


import os
import django
import sys

# Setup Django environment
sys.path.append('c:\\Users\\admin\\Documents\\project\\CodeToWin\\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codetowin.settings')
django.setup()

from authentication.models import User
from hackathons.models import Hackathon
from mentor.models import MentorProfile

mentor_user = User.objects.get(email='olamp@gmail.com')
mentor = mentor_user.mentor_profile

hackathon = Hackathon.objects.get(title='Super HackAfri 2026')
hackathon.mentors.add(mentor)
hackathon.save()
print("Mentor added")

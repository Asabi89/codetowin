import os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "codetowin.settings")
django.setup()
from hackathons.models import TeamMember, HackathonRegistration
for m in TeamMember.objects.all():
    HackathonRegistration.objects.get_or_create(hackathon=m.team.hackathon, participant=m.participant, defaults={"status": "approved"})
print("Done fixing registrations!")

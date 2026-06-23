import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codetowin.settings')
django.setup()

from hackathons.serializers import HackathonSerializer

data = {
    "title": "Test Hackathon",
    "description": "A description",
    "format": "En ligne",
    "registration_mode": "open",
    "participant_limit": None,
    "min_team_size": 1,
    "max_team_size": 4,
    "registration_start": None,
    "registration_end": None,
    "start_date": "2026-06-21",
    "end_date": "2026-06-25",
    "overview": "Overview text",
    "resources": "Resources text",
    "rules": "Rules text",
    "faqs": [],
    "interest": "Data Science",
    "technologies": "Python",
    "status": "brouillon",
    "deadline": "2026-06-25"
}

serializer = HackathonSerializer(data=data)
if not serializer.is_valid():
    print("ERRORS:", serializer.errors)
else:
    print("VALID!")

import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codetowin.settings')
django.setup()

from hackathons.serializers import HackathonSerializer

data = {
    "title": "Test Hackathon",
    "description": "A description",
    "start_date": "2026-06-21",
    "end_date": "2026-06-25",
    "logo": None,
    "banner": None
}

serializer = HackathonSerializer(data=data)
if not serializer.is_valid():
    print("ERRORS:", serializer.errors)
else:
    print("VALID!")

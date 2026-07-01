import os
import django
import sys

# Setup Django environment
sys.path.append('c:\\Users\\admin\\Documents\\project\\CodeToWin\\backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codetowin.settings')
django.setup()

from authentication.models import User
from organizer.models import OrganizerProfile
from participant.models import ParticipantProfile
from mentor.models import MentorProfile
from hackathons.models import Hackathon
from datetime import timedelta
from django.utils import timezone

users_data = [
    {'email': 'idowua@gmail.com', 'role': 'participant', 'first_name': 'Idowu', 'last_name': 'A'},
    {'email': 'olamp@gmail.com', 'role': 'mentor', 'first_name': 'Ola', 'last_name': 'MP'},
    {'email': 'organiser@gmail.com', 'role': 'organizer', 'first_name': 'Org', 'last_name': 'Aniser'},
]

for ud in users_data:
    user, created = User.objects.get_or_create(email=ud['email'], defaults={
        'username': ud['email'].split('@')[0],
        'role': ud['role'],
        'first_name': ud['first_name'],
        'last_name': ud['last_name']
    })
    user.set_password('Alabimi89')
    user.save()

    if ud['role'] == 'participant':
        ParticipantProfile.objects.get_or_create(user=user)
    elif ud['role'] == 'mentor':
        MentorProfile.objects.get_or_create(user=user)
    elif ud['role'] == 'organizer':
        OrganizerProfile.objects.get_or_create(user=user, defaults={'organization_name': 'Org Hackathons'})

org_user = User.objects.get(email='organiser@gmail.com')
org_profile = org_user.organizer_profile

# Create a hackathon for the organizer
hackathon, created = Hackathon.objects.get_or_create(
    title='Super HackAfri 2026',
    defaults={
        'organizer': org_profile,
        'description': 'The biggest hackathon in Africa.',
        'status': 'publie',
        'type': 'En ligne',
        'registration_mode': 'open',
        'start_date': timezone.now(),
        'end_date': timezone.now() + timedelta(days=20),
        'deadline': timezone.now() + timedelta(days=30),
    }
)
if not created:
    hackathon.status = 'publie'
    hackathon.save()

print("Setup complete")

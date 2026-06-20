import os
import django
from datetime import date, timedelta
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codetowin.settings')
django.setup()

from authentication.models import User
from participant.models import ParticipantProfile
from organizer.models import OrganizerProfile
from mentor.models import MentorProfile
from hackathons.models import Hackathon, Team, TeamMember
from core_api.models import Conversation, Message

def run():
    print("Clearing old data...")
    User.objects.all().delete()
    
    print("Creating users...")
    org_user = User.objects.create_user(username='org', email='org@example.com', password='password123', role='ORGANIZER')
    org_profile = OrganizerProfile.objects.create(user=org_user, organization_name='TechHub Africa', website='https://techhub.sn')

    mentor_user = User.objects.create_user(username='mentor', email='mentor@example.com', password='password123', role='MENTOR')
    mentor_profile = MentorProfile.objects.create(user=mentor_user, expertise='Web Development', bio='Expert in React & Django')

    part_user = User.objects.create_user(username='part', email='part@example.com', password='password123', role='PARTICIPANT')
    part_profile = ParticipantProfile.objects.create(user=part_user, github_url='https://github.com/moussa', bio='Passionate developer')

    print("Creating hackathons...")
    hackathon = Hackathon.objects.create(
        organizer=org_profile,
        title='CodeToWin Africa AI Sprint',
        description='A hackathon for AI builders',
        start_date=date.today() + timedelta(days=5),
        end_date=date.today() + timedelta(days=10),
        status='publie',
        type='Hybride'
    )

    print("Creating team...")
    team = Team.objects.create(hackathon=hackathon, name='Team Baobab', leader=part_profile)
    TeamMember.objects.create(team=team, participant=part_profile, role='Fullstack')

    print("Creating conversations...")
    conv = Conversation.objects.create()
    conv.participants.add(part_user, mentor_user)
    
    msg = Message.objects.create(conversation=conv, sender=mentor_user, content="Hello! I will be your mentor for this hackathon.")

    print("Seeding Complete!")
    print("\nTest Credentials:")
    print("Organizer: org@example.com / password123")
    print("Mentor: mentor@example.com / password123")
    print("Participant: part@example.com / password123")
    
if __name__ == '__main__':
    run()

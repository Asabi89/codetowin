from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from hackathons.models import Hackathon
from organizer.models import OrganizerProfile
from authentication.models import User

class Command(BaseCommand):
    help = 'Seeds the database with a fully detailed normal hackathon'

    def handle(self, *args, **kwargs):
        # Ensure we have an organizer user
        user, created = User.objects.get_or_create(
            email='organizer_seed@example.com',
            defaults={
                'username': 'organizer_seed',
                'password': 'password123',
                'first_name': 'Seed',
                'last_name': 'Organizer',
                'role': 'ORGANIZER'
            }
        )
        if created:
            user.set_password('password123')
            user.save()

        organizer, _ = OrganizerProfile.objects.get_or_create(
            user=user,
            defaults={
                'organization_name': 'Seed Tech Inc.',
                'website': 'https://seedtech.example.com',
                'description': 'A company dedicated to organizing great hackathons.'
            }
        )

        # Create the hackathon
        start_date = timezone.now().date() + timedelta(days=10)
        end_date = timezone.now().date() + timedelta(days=13)

        hackathon, created = Hackathon.objects.get_or_create(
            title='Global AI Innovation Hackathon',
            defaults={
                'organizer': organizer,
                'description': '''Welcome to the Global AI Innovation Hackathon! 

This is a premier event for developers, designers, and AI enthusiasts from all around the world to come together and build innovative solutions using Artificial Intelligence. 

**What to expect:**
- 72 hours of intensive coding
- Expert mentorship from industry leaders
- Workshops on the latest AI frameworks (OpenAI, LangChain, TensorFlow)
- Networking opportunities with top tech companies

**Who can participate:**
Anyone with a passion for technology! Whether you are a student, a professional, or a hobbyist, you are welcome to join. You can participate solo or as a team of up to 4 members.

**Evaluation Criteria:**
- Innovation & Creativity (30%)
- Technical Complexity (30%)
- User Experience (20%)
- Business Potential (20%)
''',
                'start_date': start_date,
                'end_date': end_date,
                'deadline': str(start_date - timedelta(days=2)),
                'location': 'Dakar, Senegal',
                'type': Hackathon.Format.HYBRID,
                'interest': 'Artificial Intelligence, Machine Learning, Web3',
                'prize': '$10,000 + Tech Gadgets',
                'status': Hackathon.Status.PUBLISHED,
                'logo_text': 'AIHACK',
                'keywords': 'AI, Machine Learning, Innovation, Tech'
            }
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f'Successfully created hackathon "{hackathon.title}"'))
        else:
            self.stdout.write(self.style.WARNING(f'Hackathon "{hackathon.title}" already exists.'))

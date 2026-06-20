from django.db import models
from django.conf import settings
from organizer.models import OrganizerProfile
from participant.models import ParticipantProfile
from mentor.models import MentorProfile

class Hackathon(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'brouillon', 'Brouillon'
        PUBLISHED = 'publie', 'Publié'
        WAITING = 'attente', 'En attente'
        COMPLETED = 'termine', 'Terminé'

    class Format(models.TextChoices):
        ONLINE = 'En ligne', 'En ligne'
        IN_PERSON = 'Présentiel', 'Présentiel'
        HYBRID = 'Hybride', 'Hybride'

    organizer = models.ForeignKey(OrganizerProfile, on_delete=models.CASCADE, related_name='hackathons')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField()
    deadline = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=200, blank=True, null=True)
    type = models.CharField(max_length=50, choices=Format.choices, default=Format.ONLINE)
    interest = models.CharField(max_length=100, blank=True, null=True)
    prize = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=50, choices=Status.choices, default=Status.DRAFT)
    logo_text = models.CharField(max_length=10, blank=True, null=True)
    keywords = models.CharField(max_length=255, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Team(models.Model):
    hackathon = models.ForeignKey(Hackathon, on_delete=models.CASCADE, related_name='teams')
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    leader = models.ForeignKey(ParticipantProfile, on_delete=models.CASCADE, related_name='led_teams')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.hackathon.title})"

class TeamMember(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members')
    participant = models.ForeignKey(ParticipantProfile, on_delete=models.CASCADE, related_name='team_memberships')
    role = models.CharField(max_length=100, blank=True, null=True)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.participant.user.email} in {self.team.name}"

class Submission(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='submissions')
    title = models.CharField(max_length=255)
    description = models.TextField()
    github_url = models.URLField(blank=True, null=True)
    demo_url = models.URLField(blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Submission: {self.title} by {self.team.name}"

class HackathonMentor(models.Model):
    hackathon = models.ForeignKey(Hackathon, on_delete=models.CASCADE, related_name='mentors')
    mentor = models.ForeignKey(MentorProfile, on_delete=models.CASCADE, related_name='assigned_hackathons')
    assigned_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.mentor.user.email} -> {self.hackathon.title}"

class HackathonRegistration(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'En attente'
        APPROVED = 'approved', 'Approuvé'
        REJECTED = 'rejected', 'Rejeté'

    hackathon = models.ForeignKey(Hackathon, on_delete=models.CASCADE, related_name='registrations')
    participant = models.ForeignKey(ParticipantProfile, on_delete=models.CASCADE, related_name='hackathon_registrations')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    motivation = models.TextField(blank=True, null=True)
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.participant.user.email} -> {self.hackathon.title}"

class HackathonAnnouncement(models.Model):
    hackathon = models.ForeignKey(Hackathon, on_delete=models.CASCADE, related_name='announcements')
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"[{self.hackathon.title}] {self.title}"

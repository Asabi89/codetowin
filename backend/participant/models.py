from django.db import models
from django.conf import settings

class ParticipantProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='participant_profile')
    title = models.CharField(max_length=200, blank=True, null=True)
    about = models.TextField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    skills = models.CharField(max_length=255, blank=True, null=True, help_text="Comma separated list of skills")
    interests = models.CharField(max_length=255, blank=True, null=True, help_text="Comma separated list of interests")
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    website_url = models.URLField(blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    
    def __str__(self):
        return f"Participant Profile: {self.user.email}"

class Certificate(models.Model):
    participant = models.ForeignKey(ParticipantProfile, on_delete=models.CASCADE, related_name='certificates')
    title = models.CharField(max_length=200)
    issue_date = models.DateField()
    issuer = models.CharField(max_length=200)
    image_url = models.URLField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.title} for {self.participant.user.email}"

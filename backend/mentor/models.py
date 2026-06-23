from django.db import models
from django.conf import settings

class MentorProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='mentor_profile')
    expertise = models.CharField(max_length=255, blank=True, null=True, help_text="Comma separated list of areas of expertise")
    linkedin_url = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Mentor: {self.user.email}"

class MentorInvitation(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', 'En attente'
        ACCEPTED = 'accepted', 'Acceptée'
        DECLINED = 'declined', 'Refusée'

    hackathon = models.ForeignKey('hackathons.Hackathon', on_delete=models.CASCADE, related_name='mentor_invitations')
    mentor = models.ForeignKey(MentorProfile, on_delete=models.CASCADE, related_name='invitations')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('hackathon', 'mentor')

    def __str__(self):
        return f"Invitation for {self.mentor.user.email} to {self.hackathon.title}"

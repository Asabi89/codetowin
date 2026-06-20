from django.db import models
from django.conf import settings

class MentorProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='mentor_profile')
    expertise = models.CharField(max_length=255, blank=True, null=True, help_text="Comma separated list of areas of expertise")
    linkedin_url = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Mentor: {self.user.email}"

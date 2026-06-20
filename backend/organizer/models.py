from django.db import models
from django.conf import settings

class OrganizerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='organizer_profile')
    organization_name = models.CharField(max_length=200, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"Organizer: {self.organization_name or self.user.email}"

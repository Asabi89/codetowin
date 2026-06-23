from django.db import models
from django.conf import settings

class OrganizerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='organizer_profile')
    organization_name = models.CharField(max_length=200, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    linkedin = models.CharField(max_length=255, blank=True, null=True)
    twitter = models.CharField(max_length=255, blank=True, null=True)
    logo = models.ImageField(upload_to='organizer_logos/', blank=True, null=True)
    
    def __str__(self):
        return f"Organizer: {self.organization_name or self.user.email}"

class OrganizerTeamMember(models.Model):
    ROLE_CHOICES = (
        ('admin', 'Administrateur'),
        ('editor', 'Éditeur'),
        ('viewer', 'Évaluateur'),
    )
    STATUS_CHOICES = (
        ('active', 'Actif'),
        ('pending', 'Invitation en attente'),
    )
    organizer = models.ForeignKey(OrganizerProfile, on_delete=models.CASCADE, related_name='team_members')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    email = models.EmailField()
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='editor')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.email} - {self.role} ({self.organizer.organization_name})"

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    class Role(models.TextChoices):
        PARTICIPANT = 'PARTICIPANT', _('Participant')
        ORGANIZER = 'ORGANIZER', _('Organizer')
        MENTOR = 'MENTOR', _('Mentor')
        ADMIN = 'ADMIN', _('Admin')

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.PARTICIPANT,
    )
    
    must_change_password = models.BooleanField(default=False)

    # Email must be unique for authentication
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return f"{self.email} ({self.role})"

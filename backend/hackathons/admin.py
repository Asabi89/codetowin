from django.contrib import admin
from .models import Hackathon, Team, TeamMember, Submission, HackathonMentor

admin.site.register(Hackathon)
admin.site.register(Team)
admin.site.register(TeamMember)
admin.site.register(Submission)
admin.site.register(HackathonMentor)

from rest_framework import serializers
from .models import Hackathon, Team, TeamMember, Submission, HackathonMentor, HackathonRegistration, HackathonAnnouncement
from organizer.models import OrganizerProfile
from authentication.serializers import UserSerializer

class HackathonRegistrationSerializer(serializers.ModelSerializer):
    participant_name = serializers.CharField(source='participant.user.get_name', read_only=True)
    
    class Meta:
        model = HackathonRegistration
        fields = '__all__'
        read_only_fields = ('hackathon', 'participant', 'status', 'registered_at')

class HackathonAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = HackathonAnnouncement
        fields = '__all__'
        read_only_fields = ('hackathon', 'created_at')

class HackathonSerializer(serializers.ModelSerializer):
    organizer_name = serializers.CharField(source='organizer.organization_name', read_only=True)
    participants_count = serializers.SerializerMethodField()
    teams_count = serializers.SerializerMethodField()
    submissions_count = serializers.SerializerMethodField()

    class Meta:
        model = Hackathon
        fields = '__all__'
        read_only_fields = ('organizer', 'created_at', 'updated_at')

    def get_participants_count(self, obj):
        return TeamMember.objects.filter(team__hackathon=obj).count()

    def get_teams_count(self, obj):
        return obj.teams.count()

    def get_submissions_count(self, obj):
        return Submission.objects.filter(team__hackathon=obj).count()

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'
        read_only_fields = ('leader', 'created_at')

class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'
        read_only_fields = ('submitted_at',)

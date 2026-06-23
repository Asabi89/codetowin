from rest_framework import serializers
from .models import Hackathon, Team, TeamMember, Submission, HackathonMentor, HackathonRegistration, HackathonAnnouncement, HackathonDiscussion
from organizer.models import OrganizerProfile
from authentication.serializers import UserSerializer

class HackathonRegistrationSerializer(serializers.ModelSerializer):
    participant_name = serializers.CharField(source='participant.user.get_name', read_only=True)
    user_details = serializers.SerializerMethodField()
    
    class Meta:
        model = HackathonRegistration
        fields = '__all__'
        read_only_fields = ('hackathon', 'participant', 'status', 'registered_at')

    def get_user_details(self, obj):
        user = obj.participant.user
        return {
            'id': user.id,
            'name': user.get_full_name() or user.username,
            'email': user.email,
            'avatar': getattr(user, 'avatar_url', None) or f"https://ui-avatars.com/api/?name={user.get_full_name() or user.username}&background=random",
            'country': getattr(obj.participant, 'country', 'Sénégal')
        }

class HackathonAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = HackathonAnnouncement
        fields = '__all__'
        read_only_fields = ('hackathon', 'created_at')

import base64
import uuid
from django.core.files.base import ContentFile

class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.
    """
    def to_internal_value(self, data):
        if data == '':
            return None
        if isinstance(data, str) and data.startswith('data:image'):
            # format: data:image/jpeg;base64,894324823...
            format, imgstr = data.split(';base64,')
            ext = format.split('/')[-1]
            id = uuid.uuid4()
            data = ContentFile(base64.b64decode(imgstr), name=id.urn[9:] + '.' + ext)
        return super(Base64ImageField, self).to_internal_value(data)

class HackathonSerializer(serializers.ModelSerializer):
    organizer_name = serializers.CharField(source='organizer.organization_name', read_only=True)
    participants_count = serializers.SerializerMethodField()
    teams_count = serializers.SerializerMethodField()
    submissions_count = serializers.SerializerMethodField()
    
    logo = Base64ImageField(max_length=None, use_url=True, required=False, allow_null=True)
    banner = Base64ImageField(max_length=None, use_url=True, required=False, allow_null=True)

    class Meta:
        model = Hackathon
        fields = '__all__'
        read_only_fields = ('organizer', 'created_at', 'updated_at')

    def validate(self, data):
        # Validation des dates
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        if start_date and end_date and start_date > end_date:
            raise serializers.ValidationError({"end_date": "La date de fin doit être postérieure à la date de début."})

        registration_start = data.get('registration_start')
        registration_end = data.get('registration_end')
        if registration_start and registration_end and registration_start > registration_end:
            raise serializers.ValidationError({"registration_end": "La date de fin d'inscription doit être postérieure au début d'inscription."})
            
        if registration_end and start_date and registration_end > start_date:
            raise serializers.ValidationError({"registration_end": "La date de fin d'inscription ne peut pas dépasser la date de début du hackathon."})

        # Validation des équipes
        min_team_size = data.get('min_team_size', 1)
        max_team_size = data.get('max_team_size', 4)
        if min_team_size > max_team_size:
            raise serializers.ValidationError({"max_team_size": "La taille maximale de l'équipe doit être supérieure ou égale à la taille minimale."})
            
        return data

    def get_participants_count(self, obj):
        return TeamMember.objects.filter(team__hackathon=obj).count()

    def get_teams_count(self, obj):
        return obj.teams.count()

    def get_submissions_count(self, obj):
        return Submission.objects.filter(team__hackathon=obj).count()

class TeamSerializer(serializers.ModelSerializer):
    members_details = serializers.SerializerMethodField()
    mentor_details = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    submission_details = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = '__all__'
        read_only_fields = ('leader', 'created_at')

    def get_members_details(self, obj):
        # Leader is also a member
        members = [{
            'id': obj.leader.id,
            'name': obj.leader.user.get_full_name() or obj.leader.user.username,
            'email': obj.leader.user.email,
            'avatar': getattr(obj.leader.user, 'avatar_url', None) or f"https://ui-avatars.com/api/?name={obj.leader.user.get_full_name() or obj.leader.user.username}&background=random",
            'role': 'Leader'
        }]
        for tm in obj.members.all():
            members.append({
                'id': tm.participant.id,
                'name': tm.participant.user.get_full_name() or tm.participant.user.username,
                'email': tm.participant.user.email,
                'avatar': getattr(tm.participant.user, 'avatar_url', None) or f"https://ui-avatars.com/api/?name={tm.participant.user.get_full_name() or tm.participant.user.username}&background=random",
                'role': tm.role or 'Member'
            })
        return members

    def get_mentor_details(self, obj):
        if obj.mentor:
            user = obj.mentor.mentor.user
            return {
                'id': obj.mentor.id,
                'name': user.get_full_name() or user.username,
                'email': user.email,
                'avatar': getattr(user, 'avatar_url', None) or f"https://ui-avatars.com/api/?name={user.get_full_name() or user.username}&background=random"
            }
        return None

    def get_status(self, obj):
        # If there's a submission, use its status, else 'Pas de projet'
        submission = obj.submissions.first()
        if submission:
            return submission.status
        return 'Pas de projet'

    def get_submission_details(self, obj):
        submission = obj.submissions.first()
        if submission:
            return {
                'id': submission.id,
                'title': submission.title,
                'description': submission.description,
                'github_url': submission.github_url,
                'demo_url': submission.demo_url,
                'status': submission.status,
                'scores': submission.scores,
                'feedback': submission.feedback,
                'total_score': submission.total_score,
            }
        return None

class SubmissionSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)
    project_name = serializers.CharField(source='title', read_only=True)

    class Meta:
        model = Submission
        fields = '__all__'
        read_only_fields = ('submitted_at',)

class HackathonDiscussionSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.get_full_name', read_only=True)
    author_avatar = serializers.SerializerMethodField()

    class Meta:
        model = HackathonDiscussion
        fields = '__all__'
        read_only_fields = ('hackathon', 'author', 'created_at')

    def get_author_avatar(self, obj):
        name = obj.author.get_full_name() or obj.author.email
        return getattr(obj.author, 'avatar_url', None) or f"https://ui-avatars.com/api/?name={name}&background=random"

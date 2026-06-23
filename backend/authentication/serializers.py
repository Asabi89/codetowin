from rest_framework import serializers
from django.contrib.auth import get_user_model
from participant.models import ParticipantProfile
from organizer.models import OrganizerProfile
from mentor.models import MentorProfile

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    full_name_in = serializers.CharField(source='full_name', write_only=True, required=False, allow_blank=True)
    country = serializers.CharField(write_only=True, required=False, allow_blank=True)
    name = serializers.SerializerMethodField()
    full_name = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'full_name_in', 'country', 'first_name', 'last_name', 'name', 'full_name', 'role', 'password', 'avatar', 'display_name', 'must_change_password')
        extra_kwargs = {'password': {'write_only': True}}

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.email

    def get_full_name(self, obj):
        return self.get_name(obj)

    def get_avatar(self, obj):
        try:
            if obj.role == 'ORGANIZER' and hasattr(obj, 'organizer_profile') and obj.organizer_profile.logo:
                return obj.organizer_profile.logo.url
            if obj.role == 'PARTICIPANT' and hasattr(obj, 'participant_profile') and obj.participant_profile.avatar:
                return obj.participant_profile.avatar.url
            if obj.role == 'MENTOR' and hasattr(obj, 'mentor_profile') and obj.mentor_profile.avatar:
                return obj.mentor_profile.avatar.url
        except Exception:
            pass
        return None

    def get_display_name(self, obj):
        try:
            if obj.role == 'ORGANIZER' and hasattr(obj, 'organizer_profile') and obj.organizer_profile.organization_name:
                return obj.organizer_profile.organization_name
            if obj.role == 'PARTICIPANT' and hasattr(obj, 'participant_profile') and obj.participant_profile.bio:
                pass # can add logic if needed
        except Exception:
            pass
        return self.get_name(obj)

    def create(self, validated_data):
        full_name_in = validated_data.pop('full_name', '')
        country = validated_data.pop('country', '')
        
        # Split full_name into first and last
        name_parts = full_name_in.split(' ', 1)
        first_name = name_parts[0] if name_parts else ''
        last_name = name_parts[1] if len(name_parts) > 1 else ''

        role = validated_data.get('role', User.Role.PARTICIPANT)
        if isinstance(role, str):
            role = role.upper()

        user = User.objects.create_user(
            username=validated_data.get('username', validated_data['email']), # Use username if provided, else email
            email=validated_data['email'],
            first_name=first_name,
            last_name=last_name,
            role=role,
            password=validated_data['password']
        )
        
        # Create corresponding profile
        if user.role == User.Role.PARTICIPANT:
            ParticipantProfile.objects.create(user=user)
        elif user.role == User.Role.ORGANIZER:
            OrganizerProfile.objects.create(user=user)
        elif user.role == User.Role.MENTOR:
            MentorProfile.objects.create(user=user)
            
        return user

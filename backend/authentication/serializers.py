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

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'full_name_in', 'country', 'first_name', 'last_name', 'name', 'full_name', 'role', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip() or obj.email

    def get_full_name(self, obj):
        return self.get_name(obj)

    def create(self, validated_data):
        full_name_in = validated_data.pop('full_name', '')
        country = validated_data.pop('country', '')
        
        # Split full_name into first and last
        name_parts = full_name_in.split(' ', 1)
        first_name = name_parts[0] if name_parts else ''
        last_name = name_parts[1] if len(name_parts) > 1 else ''

        user = User.objects.create_user(
            username=validated_data.get('email'), # Use email as username if not provided
            email=validated_data['email'],
            first_name=first_name,
            last_name=last_name,
            role=validated_data.get('role', User.Role.PARTICIPANT),
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

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

    # Override role field to accept lowercase (DRF ChoiceField rejects lowercase before validate_role runs)
    role = serializers.CharField(required=False, default='PARTICIPANT')

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'full_name_in', 'country', 'first_name', 'last_name', 'name', 'full_name', 'role', 'password', 'avatar', 'display_name', 'must_change_password')
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': False},
        }

    def validate_role(self, value):
        """Accept role in any case: participant, PARTICIPANT, Participant"""
        if isinstance(value, str):
            upper = value.upper()
            valid = [r[0] for r in User.Role.choices]
            if upper not in valid:
                raise serializers.ValidationError(f'"{value}" is not a valid role. Choose from: {", ".join(valid)}')
            return upper
        return value

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
        validated_data['role'] = role

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

    def update(self, instance, validated_data):
        # Update user fields
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        # Extract profile fields from request
        request = self.context.get('request')
        if request and hasattr(request, 'data'):
            data = request.data
            if instance.role == 'PARTICIPANT' and hasattr(instance, 'participant_profile'):
                profile = instance.participant_profile
                profile.title = data.get('title', profile.title)
                profile.about = data.get('about', profile.about)
                profile.bio = data.get('bio', profile.bio)
                profile.skills = data.get('skills', profile.skills)
                profile.interests = data.get('interests', profile.interests)
                profile.city = data.get('city', profile.city)
                profile.country = data.get('country', profile.country)
                profile.github_url = data.get('github', profile.github_url)
                profile.linkedin_url = data.get('linkedin', profile.linkedin_url)
                profile.twitter_url = data.get('twitter', profile.twitter_url)
                profile.website_url = data.get('website', profile.website_url)
                # handle avatar if present
                if 'avatar' in request.FILES:
                    profile.avatar = request.FILES['avatar']
                elif 'avatar' in data and data['avatar'] and str(data['avatar']).startswith('data:image'):
                    # Custom base64 handling
                    import base64
                    from django.core.files.base import ContentFile
                    format, imgstr = data['avatar'].split(';base64,')
                    ext = format.split('/')[-1]
                    profile.avatar = ContentFile(base64.b64decode(imgstr), name=f'avatar_{instance.id}.{ext}')
                profile.save()
        
        return instance

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if instance.role == 'PARTICIPANT' and hasattr(instance, 'participant_profile'):
            profile = instance.participant_profile
            ret['title'] = profile.title
            ret['about'] = profile.about
            ret['bio'] = profile.bio
            ret['skills'] = profile.skills
            ret['interests'] = profile.interests
            ret['city'] = profile.city
            ret['country'] = profile.country
            ret['github'] = profile.github_url
            ret['linkedin'] = profile.linkedin_url
            ret['twitter'] = profile.twitter_url
            ret['website'] = profile.website_url
            ret['avatar'] = profile.avatar.url if profile.avatar else ret.get('avatar')
        return ret

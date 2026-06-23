from rest_framework import serializers
from .models import OrganizerProfile, OrganizerTeamMember
from hackathons.serializers import Base64ImageField

class OrganizerProfileSerializer(serializers.ModelSerializer):
    logo = Base64ImageField(max_length=None, use_url=True, required=False, allow_null=True)
    
    class Meta:
        model = OrganizerProfile
        fields = ['organization_name', 'website', 'description', 'linkedin', 'twitter', 'logo']

class OrganizerTeamMemberSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.get_name', read_only=True)
    avatar = serializers.CharField(source='user.avatar', read_only=True)

    class Meta:
        model = OrganizerTeamMember
        fields = '__all__'
        read_only_fields = ('organizer',)

from rest_framework import viewsets, permissions, serializers, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import MentorProfile, MentorInvitation
from authentication.serializers import UserSerializer
from hackathons.models import HackathonMentor, Team
from hackathons.serializers import TeamSerializer

class MentorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    name = serializers.CharField(source='user.get_full_name', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    class Meta:
        model = MentorProfile
        fields = '__all__'

class MentorInvitationSerializer(serializers.ModelSerializer):
    hackathon_id = serializers.IntegerField(source='hackathon.id', read_only=True)
    hackathon_title = serializers.CharField(source='hackathon.title', read_only=True)
    hackathon_type = serializers.CharField(source='hackathon.type', read_only=True)
    organizer_name = serializers.CharField(source='hackathon.organizer.user.get_full_name', read_only=True)
    
    class Meta:
        model = MentorInvitation
        fields = ['id', 'hackathon_id', 'hackathon_title', 'hackathon_type', 'organizer_name', 'status', 'created_at']

class MentorViewSet(viewsets.ModelViewSet):
    serializer_class = MentorProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = MentorProfile.objects.all()

    @action(detail=False, methods=['get', 'patch'])
    def me(self, request):
        mentor = request.user.mentor_profile
        if request.method == 'PATCH':
            serializer = self.get_serializer(mentor, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        return Response(self.get_serializer(mentor).data)

    @action(detail=False, methods=['get'], url_path='me/teams')
    def my_teams(self, request):
        mentor = request.user.mentor_profile
        # Find all teams assigned to this mentor via HackathonMentor
        teams = Team.objects.filter(mentor__mentor=mentor)
        return Response(TeamSerializer(teams, many=True).data)

class MentorInvitationViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        if not hasattr(request.user, 'mentor_profile'):
            return Response([])
        invitations = MentorInvitation.objects.filter(mentor=request.user.mentor_profile, status=MentorInvitation.Status.PENDING)
        return Response(MentorInvitationSerializer(invitations, many=True).data)

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        invitation = get_object_or_404(MentorInvitation, pk=pk, mentor=request.user.mentor_profile)
        invitation.status = MentorInvitation.Status.ACCEPTED
        invitation.save()
        
        # Create HackathonMentor link
        HackathonMentor.objects.get_or_create(
            hackathon=invitation.hackathon,
            mentor=invitation.mentor
        )
        return Response({'success': True, 'status': invitation.status})

    @action(detail=True, methods=['post'])
    def decline(self, request, pk=None):
        invitation = get_object_or_404(MentorInvitation, pk=pk, mentor=request.user.mentor_profile)
        invitation.status = MentorInvitation.Status.DECLINED
        invitation.save()
        return Response({'success': True, 'status': invitation.status})

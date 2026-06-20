from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Hackathon, Team, Submission, HackathonRegistration, HackathonAnnouncement
from .serializers import HackathonSerializer, TeamSerializer, SubmissionSerializer, HackathonRegistrationSerializer, HackathonAnnouncementSerializer

class IsOrganizerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role == 'ORGANIZER'

class HackathonViewSet(viewsets.ModelViewSet):
    queryset = Hackathon.objects.all()
    serializer_class = HackathonSerializer
    permission_classes = [IsOrganizerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user.organizer_profile)

    @action(detail=True, methods=['post'], permission_classes=[IsOrganizerOrReadOnly])
    def submit_for_approval(self, request, pk=None):
        hackathon = self.get_object()
        hackathon.status = Hackathon.Status.WAITING
        hackathon.save()
        return Response({'status': 'submitted for approval'})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def register(self, request, pk=None):
        hackathon = self.get_object()
        if request.user.role != 'PARTICIPANT':
            return Response({'error': 'Only participants can register'}, status=status.HTTP_403_FORBIDDEN)
        
        reg, created = HackathonRegistration.objects.get_or_create(
            hackathon=hackathon,
            participant=request.user.participant_profile,
            defaults={'motivation': request.data.get('motivation', '')}
        )
        return Response(HackathonRegistrationSerializer(reg).data)

    @action(detail=True, methods=['get'])
    def registrations(self, request, pk=None):
        hackathon = self.get_object()
        regs = hackathon.registrations.all()
        return Response(HackathonRegistrationSerializer(regs, many=True).data)

    @action(detail=True, methods=['get'])
    def announcements(self, request, pk=None):
        hackathon = self.get_object()
        announcements = hackathon.announcements.all()
        return Response(HackathonAnnouncementSerializer(announcements, many=True).data)

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = HackathonRegistration.objects.all()
    serializer_class = HackathonRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['patch'])
    def approve(self, request, pk=None):
        reg = self.get_object()
        reg.status = HackathonRegistration.Status.APPROVED
        reg.save()
        return Response({'status': 'approved'})

    @action(detail=True, methods=['patch'])
    def reject(self, request, pk=None):
        reg = self.get_object()
        reg.status = HackathonRegistration.Status.REJECTED
        reg.save()
        return Response({'status': 'rejected'})

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(leader=self.request.user.participant_profile)

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

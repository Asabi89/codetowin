from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MentorProfile
from authentication.serializers import UserSerializer
from rest_framework import serializers

class MentorProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = MentorProfile
        fields = '__all__'

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
        return Response([])

class MentorInvitationViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        return Response([])

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        return Response({'success': True})

    @action(detail=True, methods=['post'])
    def decline(self, request, pk=None):
        return Response({'success': True})

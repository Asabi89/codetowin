from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from authentication.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()

    @action(detail=False, methods=['get', 'patch'])
    def me(self, request):
        if request.method == 'PATCH':
            serializer = self.get_serializer(request.user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        return Response(self.get_serializer(request.user).data)

    @action(detail=False, methods=['post'], url_path='me/password')
    def update_password(self, request):
        return Response({'success': True})

    @action(detail=False, methods=['post'], url_path='me/2fa')
    def toggle_2fa(self, request):
        return Response({'success': True})

    @action(detail=False, methods=['get'], url_path='me/hackathons')
    def my_hackathons(self, request):
        return Response([])

    @action(detail=False, methods=['get'], url_path='me/projects')
    def my_projects(self, request):
        return Response([])

    @action(detail=False, methods=['get'], url_path='me/activity')
    def my_activity(self, request):
        return Response([])

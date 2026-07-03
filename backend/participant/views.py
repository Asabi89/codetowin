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
        from hackathons.models import HackathonRegistration, Team
        from django.db.models import Q
        user = request.user
        if not hasattr(user, 'participant_profile'):
            return Response([])
            
        regs = HackathonRegistration.objects.filter(participant=user.participant_profile).select_related('hackathon')
        hackathon_ids = set()
        data = []
        for r in regs:
            h = r.hackathon
            hackathon_ids.add(h.id)
            data.append({
                'id': h.id,
                'title': h.title,
                'description': h.description,
                'status': r.get_status_display() if r.status != 'approved' else h.get_status_display(),
                'date': h.start_date.strftime('%d %b %Y') if h.start_date else '',
                'location': h.location or 'En ligne',
                'image': request.build_absolute_uri(h.banner.url) if h.banner else None
            })
            
        teams = Team.objects.filter(
            Q(leader=user.participant_profile) | Q(members__participant=user.participant_profile)
        ).select_related('hackathon').distinct()
        
        for t in teams:
            h = t.hackathon
            if h.id not in hackathon_ids:
                hackathon_ids.add(h.id)
                data.append({
                    'id': h.id,
                    'title': h.title,
                    'description': h.description,
                    'status': h.get_status_display(),
                    'date': h.start_date.strftime('%d %b %Y') if h.start_date else '',
                    'location': h.location or 'En ligne',
                    'image': request.build_absolute_uri(h.banner.url) if h.banner else None
                })
                
        return Response(data)

    @action(detail=False, methods=['get'], url_path='me/projects')
    def my_projects(self, request):
        from hackathons.models import Team
        from django.db.models import Q
        user = request.user
        if not hasattr(user, 'participant_profile'):
            return Response([])
            
        teams = Team.objects.filter(
            Q(leader=user.participant_profile) | Q(members__participant=user.participant_profile)
        ).distinct().select_related('hackathon')
        
        data = []
        for t in teams:
            h = t.hackathon
            sub = t.submissions.first()
            data.append({
                'id': t.id,
                'title': sub.title if sub else t.name,
                'description': sub.description if sub else (t.description or 'Aucune description'),
                'status': sub.get_status_display() if sub else 'En cours',
                'hackathonName': h.title,
                'hackathonId': h.id,
                'likes': 0,
                'comments': 0,
                'tags': [],
                'image': None
            })
        return Response(data)

    @action(detail=False, methods=['get'], url_path='me/activity')
    def my_activity(self, request):
        return Response([])

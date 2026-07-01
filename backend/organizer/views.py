from rest_framework import generics, permissions
from .models import OrganizerProfile, OrganizerTeamMember
from .serializers import OrganizerProfileSerializer, OrganizerTeamMemberSerializer
from rest_framework.response import Response
from rest_framework import viewsets

class OrganizerProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrganizerProfileSerializer

    def get_object(self):
        # Return the organizer profile for the logged in user
        return self.request.user.organizer_profile

class OrganizerTeamMemberViewSet(viewsets.ModelViewSet):
    serializer_class = OrganizerTeamMemberSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if hasattr(self.request.user, 'organizer_profile'):
            return self.request.user.organizer_profile.team_members.all()
        return OrganizerTeamMember.objects.none()

    def perform_create(self, serializer):
        from django.contrib.auth import get_user_model
        from django.utils.crypto import get_random_string
        from core_api.models import Notification
        from django.core.mail import send_mail
        from django.template.loader import render_to_string
        from django.utils.html import strip_tags
        import os
        
        User = get_user_model()
        email = serializer.validated_data.get('email')
        user = User.objects.filter(email=email).first()
        status = 'active' if user else 'pending'
        
        temp_password = None
        if not user:
            import random
            import string
            temp_password = get_random_string(10)
            base_username = email.split('@')[0]
            username = base_username
            while User.objects.filter(username=username).exists():
                username = base_username + "".join(random.choices(string.ascii_lowercase + string.digits, k=4))
                
            user = User.objects.create_user(
                email=email,
                username=username,
                password=temp_password,
                role='ORGANIZER',
                must_change_password=True
            )
            from organizer.models import OrganizerProfile
            OrganizerProfile.objects.get_or_create(user=user)
            status = 'active'
            
        member = serializer.save(
            organizer=self.request.user.organizer_profile,
            user=user,
            status=status
        )
        
        org_name = self.request.user.organizer_profile.organization_name or self.request.user.email
        
        # Determine base url from env or default
        front_url = os.environ.get('FRONTEND_URL', 'http://localhost:5173')
        
        html_message = render_to_string('emails/email-invite-member.html', {
            'organizationName': org_name,
            'roleName': member.get_role_display(),
            'inviteUrl': f"{front_url}/login",
            'tempPassword': temp_password,
        })
        plain_message = strip_tags(html_message)
        send_mail(
            subject=f"Invitation à rejoindre l'équipe {org_name} sur CodeToWin",
            message=plain_message,
            from_email="CodeToWin <invite@codetowin.pro>",
            recipient_list=[email],
            html_message=html_message
        )
        
        if not temp_password:
            Notification.objects.create(
                user=user,
                title="Invitation à rejoindre une équipe",
                message=f"Vous avez été ajouté(e) à l'équipe d'organisation : {org_name} avec le rôle {member.get_role_display()}.",
            )

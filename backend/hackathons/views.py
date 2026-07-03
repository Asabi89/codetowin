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

    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        
        # 1. Organizer fetching their own hackathons
        if self.request.query_params.get('organizer') == 'me':
            if user.is_authenticated and hasattr(user, 'organizer_profile'):
                return queryset.filter(organizer=user.organizer_profile)
            return queryset.none()
            
        # 2. Public lists should only show PUBLISHED and COMPLETED
        if self.action == 'list':
            return queryset.filter(status__in=[Hackathon.Status.PUBLISHED, Hackathon.Status.COMPLETED])
            
        # 3. For retrieve/update, ensure non-organizers can't access DRAFT/WAITING
        from django.db.models import Q
        if user.is_authenticated and hasattr(user, 'organizer_profile'):
            return queryset.filter(
                Q(status__in=[Hackathon.Status.PUBLISHED, Hackathon.Status.COMPLETED]) | 
                Q(organizer=user.organizer_profile)
            )
        return queryset.filter(status__in=[Hackathon.Status.PUBLISHED, Hackathon.Status.COMPLETED])

    def perform_create(self, serializer):
        hackathon = serializer.save(organizer=self.request.user.organizer_profile)
        
        # Handle mentors
        mentors_data = self.request.data.get('mentors', [])
        if isinstance(mentors_data, list):
            from mentor.models import MentorProfile
            from .models import HackathonMentor
            for m_data in mentors_data:
                email = m_data.get('email')
                if email:
                    mentor = MentorProfile.objects.filter(user__email=email).first()
                    if mentor:
                        HackathonMentor.objects.get_or_create(hackathon=hackathon, mentor=mentor)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("HACKATHON CREATION ERRORS:", serializer.errors)
        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=['post'], permission_classes=[IsOrganizerOrReadOnly])
    def invite_mentor(self, request, pk=None):
        hackathon = self.get_object()
        mentor_email = request.data.get('email')
        if not mentor_email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        from mentor.models import MentorProfile, MentorInvitation
        mentor = MentorProfile.objects.filter(user__email=mentor_email).first()
        if not mentor:
            return Response({'error': 'Mentor not found with this email'}, status=status.HTTP_404_NOT_FOUND)
            
        invitation, created = MentorInvitation.objects.get_or_create(
            hackathon=hackathon,
            mentor=mentor,
            defaults={'status': MentorInvitation.Status.PENDING}
        )
        
        if created:
            try:
                from django.core.mail import send_mail
                from django.template.loader import render_to_string
                from django.utils.html import strip_tags
                import os
                
                front_url = os.environ.get('FRONTEND_URL', 'https://codetowin.pro')
                
                html_message = render_to_string('emails/email-mentor-invite.html', {
                    'mentorName': mentor.user.username,
                    'hackathonName': hackathon.title,
                    'organizerName': hackathon.organizer.user.username,
                    'dashboardUrl': f"{front_url}/mentor/invitations"
                })
                plain_message = strip_tags(html_message)
                send_mail(
                    subject=f"Invitation Mentor - {hackathon.title}",
                    message=plain_message,
                    from_email="CodeToWin <invite@codetowin.pro>",
                    recipient_list=[mentor.user.email],
                    html_message=html_message
                )
            except Exception as e:
                print(f"Error sending mentor invite email: {e}")
                
        return Response({'status': 'Invitation sent', 'id': invitation.id})

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
        
        # Validation: Participant Limit
        if hackathon.participant_limit is not None and hackathon.participant_limit > 0:
            current_count = HackathonRegistration.objects.filter(hackathon=hackathon).count()
            if current_count >= hackathon.participant_limit:
                return Response({'error': 'Désolé, ce hackathon a atteint sa limite de participants.'}, status=status.HTTP_400_BAD_REQUEST)
        
        initial_status = HackathonRegistration.Status.APPROVED if hackathon.registration_mode == 'open' else HackathonRegistration.Status.PENDING
        
        reg, created = HackathonRegistration.objects.get_or_create(
            hackathon=hackathon,
            participant=request.user.participant_profile,
            defaults={
                'motivation': request.data.get('motivation', ''),
                'status': initial_status
            }
        )
        return Response(HackathonRegistrationSerializer(reg).data)

    @action(detail=True, methods=['get'])
    def registrations(self, request, pk=None):
        hackathon = self.get_object()
        regs = hackathon.registrations.all()
        return Response(HackathonRegistrationSerializer(regs, many=True).data)

    @action(detail=True, methods=['get', 'post'])
    def announcements(self, request, pk=None):
        hackathon = self.get_object()
        if request.method == 'POST':
            if getattr(request.user, 'role', None) != 'ORGANIZER':
                return Response({'error': 'Only organizers can post announcements'}, status=status.HTTP_403_FORBIDDEN)
            serializer = HackathonAnnouncementSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(hackathon=hackathon)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        announcements = hackathon.announcements.all().order_by('-created_at')
        return Response(HackathonAnnouncementSerializer(announcements, many=True).data)

    @action(detail=True, methods=['get', 'post'], permission_classes=[permissions.IsAuthenticatedOrReadOnly])
    def discussions(self, request, pk=None):
        hackathon = self.get_object()
        if request.method == 'POST':
            from .serializers import HackathonDiscussionSerializer
            serializer = HackathonDiscussionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(hackathon=hackathon, author=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        discussions = hackathon.discussions.all().order_by('-created_at')
        from .serializers import HackathonDiscussionSerializer
        return Response(HackathonDiscussionSerializer(discussions, many=True).data)
    @action(detail=True, methods=['get', 'post'], permission_classes=[permissions.IsAuthenticatedOrReadOnly])
    def teams(self, request, pk=None):
        hackathon = self.get_object()
        from .serializers import TeamSerializer
        
        if request.method == 'POST':
            if not request.user.is_authenticated or not hasattr(request.user, 'participant_profile'):
                return Response({'error': 'Seuls les participants peuvent créer des équipes.'}, status=status.HTTP_403_FORBIDDEN)
                
            data = request.data.copy()
            data['hackathon'] = hackathon.id
            serializer = TeamSerializer(data=data)
            if serializer.is_valid():
                team = serializer.save(hackathon=hackathon, leader=request.user.participant_profile)
                from .models import TeamMember
                TeamMember.objects.get_or_create(
                    team=team,
                    participant=request.user.participant_profile,
                    defaults={'role': 'Leader'}
                )
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        teams = hackathon.teams.all()
        return Response(TeamSerializer(teams, many=True).data)

    @action(detail=True, methods=['get'])
    def submissions(self, request, pk=None):
        hackathon = self.get_object()
        # Get submissions for all teams in this hackathon
        submissions = Submission.objects.filter(team__hackathon=hackathon)
        from .serializers import SubmissionSerializer
        return Response(SubmissionSerializer(submissions, many=True).data)

    @action(detail=True, methods=['get'])
    def mentors(self, request, pk=None):
        hackathon = self.get_object()
        # HackathonMentor objects
        mentors = hackathon.mentors.all()
        # To avoid circular import or define a simple dict
        data = [{
            'id': hm.id,
            'mentor_id': hm.mentor.id,
            'name': hm.mentor.user.get_full_name() or hm.mentor.user.username,
            'email': hm.mentor.user.email,
            'expertise': hm.mentor.expertise,
            'assigned_at': hm.assigned_at
        } for hm in mentors]
        return Response(data)

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = HackathonRegistration.objects.all()
    serializer_class = HackathonRegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        registration = serializer.save()
        
        # Send hackathon joined email
        try:
            from django.core.mail import send_mail
            from django.template.loader import render_to_string
            from django.utils.html import strip_tags
            import os
            
            front_url = os.environ.get('FRONTEND_URL', 'https://codetowin.pro')
            participant = registration.participant
            hackathon = registration.hackathon
            
            html_message = render_to_string('emails/email-hackathon-joined.html', {
                'participantName': participant.user.username,
                'hackathonName': hackathon.title,
                'organizerName': hackathon.organizer.user.username,
                'hackathonUrl': f"{front_url}/participant/hackathons/{hackathon.slug}"
            })
            plain_message = strip_tags(html_message)
            
            send_mail(
                subject=f"Inscription confirmée : {hackathon.title}",
                message=plain_message,
                from_email=None,
                recipient_list=[participant.user.email],
                html_message=html_message
            )
        except Exception as e:
            print(f"Error sending hackathon join email: {e}")

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

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def join(self, request, pk=None):
        team = self.get_object()
        if request.user.role != 'PARTICIPANT':
            return Response({'error': 'Only participants can join a team'}, status=status.HTTP_403_FORBIDDEN)
        
        # Check team size
        hackathon = team.hackathon
        # members count + 1 (the leader is not in members, wait, we need to check if leader is counted in members)
        # Actually leader is just a FK, usually the leader might not be in TeamMember table unless explicitly added.
        # Let's count members. If leader is not in members, total size = members.count() + 1
        current_size = team.members.count() + 1
        if current_size >= hackathon.max_team_size:
            return Response({'error': f'Cette équipe a atteint sa taille maximale de {hackathon.max_team_size} membres.'}, status=status.HTTP_400_BAD_REQUEST)
        
        from .models import TeamMember
        member, created = TeamMember.objects.get_or_create(
            team=team,
            participant=request.user.participant_profile,
            defaults={'role': request.data.get('role', 'Member')}
        )
        return Response({'status': 'Joined team successfully'})

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated], url_path='join-by-token')
    def join_by_token(self, request):
        if request.user.role != 'PARTICIPANT':
            return Response({'error': 'Seuls les participants peuvent rejoindre une équipe'}, status=status.HTTP_403_FORBIDDEN)
        
        token = request.data.get('token')
        if not token:
            return Response({'error': 'Token manquant'}, status=status.HTTP_400_BAD_REQUEST)
            
        from .models import Team
        team = Team.objects.filter(invite_token=token).first()
        if not team:
            return Response({'error': 'Lien d\'invitation invalide'}, status=status.HTTP_404_NOT_FOUND)
            
        hackathon = team.hackathon
        current_size = team.members.count() + 1
        if current_size >= hackathon.max_team_size:
            return Response({'error': f'Cette équipe a atteint sa taille maximale de {hackathon.max_team_size} membres.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if getattr(team, 'leader_id', None) == request.user.participant_profile.id or team.members.filter(participant=request.user.participant_profile).exists():
            return Response({'status': 'Vous faites déjà partie de cette équipe !', 'team_id': team.id}, status=status.HTTP_200_OK)

        from .models import TeamMember
        member, created = TeamMember.objects.get_or_create(
            team=team,
            participant=request.user.participant_profile,
            defaults={'role': 'Member'}
        )
        return Response({'status': 'Vous avez rejoint l\'équipe avec succès !', 'team_id': team.id})

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def invite(self, request, pk=None):
        if str(pk) == 'team_1':
            return Response({'status': 'Mock invitation sent successfully'})
            
        team = self.get_object()
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        from authentication.models import User
        from participant.models import ParticipantProfile
        from .models import TeamMember
        from django.core.mail import send_mail
        from django.template.loader import render_to_string
        from django.utils.html import strip_tags
        import random
        import string
        
        user = User.objects.filter(email=email).first()
        temp_password = None
        
        if not user:
            # Generate generic password
            temp_password = "CodeToWin" + "".join(random.choices(string.digits, k=4)) + "!"
            user = User.objects.create_user(
                username=email,
                email=email,
                password=temp_password,
                role='PARTICIPANT'
            )
            # Ensure participant profile exists
            ParticipantProfile.objects.get_or_create(user=user)
        elif not hasattr(user, 'participant_profile'):
            ParticipantProfile.objects.get_or_create(user=user)
            
        # Add to team
        member, created = TeamMember.objects.get_or_create(
            team=team,
            participant=user.participant_profile,
            defaults={'role': 'Member'}
        )
        
        # Build dynamic invite URL
        origin = request.headers.get('Origin') or "https://codetowin.pro"
        invite_url = f"{origin}/invite/{team.invite_token}"

        # Send Email
        context = {
            'organizationName': team.hackathon.title,
            'roleName': "Membre de l'équipe " + team.name,
            'inviteUrl': invite_url,
            'tempPassword': temp_password
        }
        
        html_message = render_to_string('emails/email-invite-member.html', context)
        plain_message = strip_tags(html_message)
        
        try:
            send_mail(
                subject=f"Invitation à rejoindre l'équipe {team.name}",
                message=plain_message,
                from_email="CodeToWin <invite@codetowin.pro>",
                recipient_list=[email],
                html_message=html_message
            )
        except Exception as e:
            # Handle dev env where SMTP is not setup
            print(f"Failed to send email to {email}: {e}")
            
        return Response({
            'status': f'Invitation sent to {email} successfully', 
            'temp_password': temp_password
        })

    @action(detail=True, methods=['post'], permission_classes=[IsOrganizerOrReadOnly])
    def assign_mentor(self, request, pk=None):
        team = self.get_object()
        mentor_id = request.data.get('mentor_id')
        
        if not mentor_id:
            team.mentor = None
            team.save()
            return Response({'status': 'Mentor unassigned'})
            
        from .models import HackathonMentor
        try:
            mentor = HackathonMentor.objects.get(id=mentor_id, hackathon=team.hackathon)
            team.mentor = mentor
            team.save()
            return Response({'status': 'Mentor assigned successfully'})
        except HackathonMentor.DoesNotExist:
            return Response({'error': 'Mentor not found for this hackathon'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def feedback(self, request, pk=None):
        team = self.get_object()
        # Verify the user is the mentor of this team
        if not hasattr(request.user, 'mentor_profile') or (team.mentor and team.mentor.mentor != request.user.mentor_profile):
            return Response({'error': 'Vous n\'êtes pas le mentor de cette équipe'}, status=status.HTTP_403_FORBIDDEN)
            
        submission = team.submissions.first()
        if not submission:
            return Response({'error': 'Aucune soumission trouvée pour cette équipe'}, status=status.HTTP_404_NOT_FOUND)

        # Structure feedback data
        scores = {
            'innovation_score': request.data.get('problem_clarity_score', 0),
            'feasibility_score': request.data.get('tech_score', 0),
            'design_score': request.data.get('design_score', 0),
        }
        
        # Calculate total
        total = sum(float(v) for v in scores.values())
        
        submission.scores = scores
        submission.feedback = request.data.get('public_comment', '')
        # private_note can be saved somewhere else or added to the json if needed
        if request.data.get('private_note'):
            if not isinstance(submission.scores, dict):
                submission.scores = scores
            submission.scores['private_note'] = request.data.get('private_note')

        submission.total_score = total
        submission.status = 'Évalué'
        submission.save()
        
        return Response({'status': 'Feedback saved successfully'})

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Validate team size constraints before submission
        team = serializer.validated_data.get('team')
        if team:
            hackathon = team.hackathon
            total_members = team.members.count() + 1 # Include leader
            if total_members < hackathon.min_team_size:
                from rest_framework.exceptions import ValidationError
                raise ValidationError({'error': f'La taille minimale de l\'équipe pour soumettre est de {hackathon.min_team_size} personnes.'})
            if total_members > hackathon.max_team_size:
                from rest_framework.exceptions import ValidationError
                raise ValidationError({'error': f'La taille maximale de l\'équipe pour soumettre est de {hackathon.max_team_size} personnes.'})
                
        submission = serializer.save()
        self._send_submission_email(submission)

    def perform_update(self, serializer):
        old_status = self.get_object().status
        submission = serializer.save()
        if old_status != 'Soumis' and submission.status == 'Soumis':
            self._send_submission_email(submission)

    def _send_submission_email(self, submission):
        try:
            from django.core.mail import send_mail
            from django.template.loader import render_to_string
            from django.utils.html import strip_tags
            from django.utils import timezone
            import os
            
            front_url = os.environ.get('FRONTEND_URL', 'https://codetowin.pro')
            team = submission.team
            hackathon = team.hackathon
            
            # Send to team leader
            if hasattr(team, 'leader') and team.leader and hasattr(team.leader, 'user') and team.leader.user:
                recipient_email = team.leader.user.email
            else:
                print("Submission email failed: No valid team leader found.")
                return
                
            submitted_date = getattr(submission, 'submitted_at', None) or timezone.now()
            
            html_message = render_to_string('emails/email-project-submitted.html', {
                'teamName': team.name,
                'hackathonName': hackathon.title,
                'projectName': submission.title,
                'submissionDate': submitted_date.strftime("%d/%m/%Y"),
                'projectUrl': f"{front_url}/participant/hackathons/{hackathon.slug}?tab=my-project"
            })
            plain_message = strip_tags(html_message)
            
            send_mail(
                subject=f"Confirmation de soumission - {hackathon.title}",
                message=plain_message,
                from_email=None,
                recipient_list=[recipient_email],
                html_message=html_message
            )
        except Exception as e:
            import traceback
            traceback.print_exc()
            print(f"Error sending submission email: {e}")


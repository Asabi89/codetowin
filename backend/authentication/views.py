from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        otp_provided = request.data.get('otpCode')
        
        # Verify OTP if provided (to support frontend flows that send OTP)
        if otp_provided:
            from django.core.cache import cache
            cached_otp = cache.get(f"otp_{email}")
            if not cached_otp or str(cached_otp) != str(otp_provided):
                from rest_framework.response import Response
                return Response({"error": "Code de vérification invalide ou expiré."}, status=400)
            
            # OTP is valid, delete from cache to prevent reuse
            cache.delete(f"otp_{email}")
            
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        user = serializer.save()
        
        # Send welcome email
        try:
            from django.core.mail import send_mail
            from django.template.loader import render_to_string
            from django.utils.html import strip_tags
            import os
            
            front_url = os.environ.get('FRONTEND_URL', 'https://codetowin.pro')
            html_message = render_to_string('emails/email-welcome.html', {
                'name': user.username,
                'dashboardUrl': f"{front_url}/login"
            })
            plain_message = strip_tags(html_message)
            send_mail(
                subject="Bienvenue sur HACKafri 🚀",
                message=plain_message,
                from_email="HACKafri <contact@codetowin.pro>",
                recipient_list=[user.email],
                html_message=html_message
            )
        except Exception as e:
            print(f"Error sending welcome email to {user.email}: {e}")

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def change_password(request):
    user = request.user
    password = request.data.get('password')
    if not password:
        return Response({'error': 'Mot de passe requis.'}, status=400)
        
    user.set_password(password)
    user.must_change_password = False
    user.save()
    
    return Response({'status': 'Mot de passe mis à jour avec succès.'})

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def log_otp(request):
    # Now used to generate and actually send the OTP via email
    email = request.data.get('email')
    if not email:
        return Response({'error': 'Email is required'}, status=400)
        
    import random
    from django.core.cache import cache
    from django.core.mail import send_mail
    from django.template.loader import render_to_string
    from django.utils.html import strip_tags
    
    # Generate 6 digit OTP
    otp = str(random.randint(100000, 999999))
    
    # Store in cache for 15 minutes
    cache.set(f"otp_{email}", otp, timeout=900)
    
    # Send email
    try:
        html_message = render_to_string('emails/email-otp.html', {'otp': otp})
        plain_message = strip_tags(html_message)
        send_mail(
            subject="Code de vérification HACKafri",
            message=plain_message,
            from_email="HACKafri <otp@codetowin.pro>",
            recipient_list=[email],
            html_message=html_message
        )
    except Exception as e:
        print(f"Error sending OTP email: {e}")
        return Response({'error': 'Failed to send email'}, status=500)
        
    return Response({'status': 'ok'})

from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.exceptions import ValidationError

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def check_availability(request):
    email = request.data.get('email')
    username = request.data.get('username')
    errors = {}
    
    if email and User.objects.filter(email=email).exists():
        errors['email'] = 'Cet email est déjà utilisé.'
        
    if username:
        if User.objects.filter(username=username).exists():
            errors['username'] = 'Ce pseudo est déjà utilisé.'
        else:
            validator = UnicodeUsernameValidator()
            try:
                validator(username)
            except ValidationError:
                errors['username'] = 'Pseudo invalide. Utilisez uniquement des lettres, chiffres et @/./+/-/_'
        
    if errors:
        return Response({'errors': errors}, status=400)
        
    return Response({'status': 'available'})

import requests
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
import random
import string

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def google_login(request):
    token = request.data.get('token')
    role = request.data.get('role', 'PARTICIPANT').upper()
    
    if not token:
        return Response({'error': 'Token is required'}, status=400)
        
    try:
        # Verify the token
        client_id = getattr(settings, 'GOOGLE_CLIENT_ID', 'YOUR_GOOGLE_CLIENT_ID')
        # In a real setup, we pass the client_id to verify_oauth2_token.
        # If the user hasn't set it yet, we might want to bypass strict verification for testing if client_id is dummy,
        # but the google library will fail. So we just let it try and if it fails, it fails.
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), client_id)
        
        email = idinfo['email']
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')
        
        user, created = User.objects.get_or_create(email=email, defaults={
            'username': email,
            'first_name': first_name,
            'last_name': last_name,
            'role': role
        })
        
        if created:
            user.set_unusable_password()
            user.save()
            
            # Create corresponding profile
            if role == 'PARTICIPANT':
                from participant.models import ParticipantProfile
                ParticipantProfile.objects.get_or_create(user=user)
            elif role == 'ORGANIZER':
                from organizer.models import OrganizerProfile
                OrganizerProfile.objects.get_or_create(user=user)
            elif role == 'MENTOR':
                from mentor.models import MentorProfile
                MentorProfile.objects.get_or_create(user=user)
                
        tokens = get_tokens_for_user(user)
        return Response(tokens)
        
    except ValueError as e:
        return Response({'error': f'Invalid token: {str(e)}'}, status=400)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def github_login(request):
    code = request.data.get('code')
    role = request.data.get('role', 'PARTICIPANT').upper()
    
    if not code:
        return Response({'error': 'Code is required'}, status=400)
        
    client_id = getattr(settings, 'GITHUB_CLIENT_ID', 'YOUR_GITHUB_CLIENT_ID')
    client_secret = getattr(settings, 'GITHUB_CLIENT_SECRET', 'YOUR_GITHUB_CLIENT_SECRET')
    
    # Exchange code for token
    token_url = 'https://github.com/login/oauth/access_token'
    headers = {'Accept': 'application/json'}
    data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code
    }
    
    token_response = requests.post(token_url, headers=headers, data=data)
    token_json = token_response.json()
    
    access_token = token_json.get('access_token')
    if not access_token:
        return Response({'error': 'Failed to get access token from GitHub'}, status=400)
        
    # Get user info
    user_url = 'https://api.github.com/user'
    user_headers = {'Authorization': f'token {access_token}'}
    user_response = requests.get(user_url, headers=user_headers)
    user_data = user_response.json()
    
    # Get user email
    email_url = 'https://api.github.com/user/emails'
    email_response = requests.get(email_url, headers=user_headers)
    email_data = email_response.json()
    
    primary_email = next((email['email'] for email in email_data if email['primary']), None)
    
    if not primary_email:
        return Response({'error': 'GitHub email not found'}, status=400)
        
    username = user_data.get('login')
    name = user_data.get('name', '')
    first_name = name.split(' ')[0] if name else username
    last_name = ' '.join(name.split(' ')[1:]) if name else ''
    
    user, created = User.objects.get_or_create(email=primary_email, defaults={
        'username': username,
        'first_name': first_name,
        'last_name': last_name,
        'role': role
    })
    
    if created:
        user.set_unusable_password()
        user.save()
        
        # Create corresponding profile
        if role == 'PARTICIPANT':
            from participant.models import ParticipantProfile
            ParticipantProfile.objects.get_or_create(user=user)
        elif role == 'ORGANIZER':
            from organizer.models import OrganizerProfile
            OrganizerProfile.objects.get_or_create(user=user)
        elif role == 'MENTOR':
            from mentor.models import MentorProfile
            MentorProfile.objects.get_or_create(user=user)
            
    tokens = get_tokens_for_user(user)
    return Response(tokens)

from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import UserSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def log_otp(request):
    email = request.data.get('email', 'Unknown')
    otp = request.data.get('otp', 'Unknown')
    print(f"\n" + "="*50, flush=True)
    print(f"🔐 OTP CODE FOR {email}: {otp}", flush=True)
    print("="*50 + "\n", flush=True)
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

from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

User = get_user_model()

class EmailOrUsernameModelBackend(ModelBackend):
    """
    Custom authentication backend that allows users to log in
    using either their email address or their username (pseudo).
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        # DRF SimpleJWT passes the value in kwargs under the USERNAME_FIELD key ('email')
        # or as the 'username' parameter.
        login_identifier = username or kwargs.get(User.USERNAME_FIELD)
        
        if not login_identifier:
            return None
            
        try:
            # Look up user by email or username (case-insensitive)
            user = User.objects.get(
                Q(email__iexact=login_identifier) | Q(username__iexact=login_identifier)
            )
        except User.DoesNotExist:
            return None

        if user.check_password(password) and self.user_can_authenticate(user):
            return user
            
        return None

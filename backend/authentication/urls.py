from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from .views import RegisterView, ProfileView, log_otp, check_availability, change_password

urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('me', ProfileView.as_view(), name='profile'),
    path('log-otp', log_otp, name='log_otp'),
    path('check-availability', check_availability, name='check_availability'),
    path('change-password', change_password, name='change_password'),
]

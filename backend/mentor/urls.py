from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MentorViewSet, MentorInvitationViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'mentors', MentorViewSet, basename='mentor')
router.register(r'mentor-invitations', MentorInvitationViewSet, basename='mentor_invitation')

urlpatterns = [
    path('', include(router.urls)),
]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OrganizerProfileView, OrganizerTeamMemberViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'team-members', OrganizerTeamMemberViewSet, basename='team-member')

urlpatterns = [
    path('me', OrganizerProfileView.as_view(), name='organizer_profile'),
    path('', include(router.urls)),
]

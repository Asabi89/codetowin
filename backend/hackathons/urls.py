from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HackathonViewSet, TeamViewSet, SubmissionViewSet, RegistrationViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'hackathons', HackathonViewSet)
router.register(r'registrations', RegistrationViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'submissions', SubmissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NotificationViewSet, ConversationViewSet, MessageViewSet, CertificateViewSet

router = DefaultRouter(trailing_slash=False)
router.register(r'notifications', NotificationViewSet, basename='notification')
router.register(r'messages/conversations', ConversationViewSet, basename='conversation')
router.register(r'messages', MessageViewSet, basename='message')
router.register(r'certificates', CertificateViewSet, basename='certificate')

urlpatterns = [
    path('', include(router.urls)),
]

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Notification, Conversation, Message
from .serializers import NotificationSerializer, ConversationSerializer, MessageSerializer, CertificateSerializer
from participant.models import Certificate

class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.notifications.all()

    @action(detail=True, methods=['patch'])
    def read(self, request, pk=None):
        notif = self.get_object()
        notif.is_read = True
        notif.save()
        return Response({'success': True})

    @action(detail=False, methods=['patch'], url_path='read-all')
    def read_all(self, request):
        self.get_queryset().update(is_read=True)
        return Response({'success': True})

class ConversationViewSet(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.conversations.all()

    @action(detail=True, methods=['post'])
    def block(self, request, pk=None):
        return Response({'success': True})

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Message.objects.all()

    def perform_create(self, serializer):
        message = serializer.save(sender=self.request.user)
        
        # Send new message email to other participants in the conversation
        try:
            from django.core.mail import send_mail
            from django.template.loader import render_to_string
            from django.utils.html import strip_tags
            import os
            
            conversation = message.conversation
            front_url = os.environ.get('FRONTEND_URL', 'https://codetowin.pro')
            
            # Find recipients (everyone in conversation except sender)
            recipients = conversation.participants.exclude(id=self.request.user.id)
            
            # Get a short preview of the message
            preview = message.content[:50] + '...' if len(message.content) > 50 else message.content
            
            for recipient in recipients:
                html_message = render_to_string('emails/email-new-message.html', {
                    'recipientName': recipient.username,
                    'senderName': self.request.user.username,
                    'messagePreview': preview,
                    'messagesUrl': f"{front_url}/messages"
                })
                plain_message = strip_tags(html_message)
                
                send_mail(
                    subject=f"Nouveau message de {self.request.user.username}",
                    message=plain_message,
                    from_email=None,
                    recipient_list=[recipient.email],
                    html_message=html_message
                )
        except Exception as e:
            print(f"Error sending new message email: {e}")

    @action(detail=False, methods=['post'])
    def upload(self, request):
        return Response({'url': 'dummy_url'})

    @action(detail=True, methods=['post'])
    def report(self, request, pk=None):
        return Response({'success': True})

class CertificateViewSet(viewsets.ModelViewSet):
    serializer_class = CertificateSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Certificate.objects.all()

    @action(detail=False, methods=['get'])
    def me(self, request):
        if hasattr(request.user, 'participant_profile'):
            certs = request.user.participant_profile.certificates.all()
            return Response(self.get_serializer(certs, many=True).data)
        return Response([])

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        return Response({'success': True})

    @action(detail=True, methods=['post'], url_path='share/linkedin')
    def share_linkedin(self, request, pk=None):
        return Response({'success': True})

from rest_framework import serializers
from .models import Notification, Conversation, Message
from participant.models import Certificate
from authentication.serializers import UserSerializer

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.get_name', read_only=True)
    
    class Meta:
        model = Message
        fields = '__all__'
        read_only_fields = ('sender',)

class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Conversation
        fields = '__all__'

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'

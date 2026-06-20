import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Conversation, Message

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.conversation_id = self.scope['url_route']['kwargs']['conversation_id']
        self.room_group_name = f'chat_{self.conversation_id}'
        
        user = self.scope.get('user')
        if not user or user.is_anonymous:
            await self.close()
            return
            
        # Check if user is participant of the conversation
        is_participant = await self.is_user_in_conversation(user, self.conversation_id)
        if not is_participant:
            await self.close()
            return

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        content = text_data_json.get('content')
        user = self.scope['user']

        if not content:
            return

        # Save message to DB
        message = await self.save_message(user, self.conversation_id, content)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'id': message.id,
                'content': message.content,
                'sender_email': user.email,
                'sender_id': user.id,
                'created_at': message.created_at.isoformat()
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'id': event['id'],
            'content': event['content'],
            'sender_email': event['sender_email'],
            'sender_id': event['sender_id'],
            'created_at': event['created_at']
        }))

    @database_sync_to_async
    def is_user_in_conversation(self, user, conversation_id):
        try:
            conv = Conversation.objects.get(id=conversation_id)
            return conv.participants.filter(id=user.id).exists()
        except Conversation.DoesNotExist:
            return False

    @database_sync_to_async
    def save_message(self, user, conversation_id, content):
        conv = Conversation.objects.get(id=conversation_id)
        return Message.objects.create(conversation=conv, sender=user, content=content)

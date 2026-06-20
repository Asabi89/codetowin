import React from 'react';
import ChatLayout from '../../components/features/messaging/ChatLayout';
import { messagesApi } from '../../api/messages';
import { useRoleConversations } from '../../hooks/useRoleConversations';



export default function ParticipantMessages() {
  const { tabs, chats, loading } = useRoleConversations('participant');

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement de votre messagerie...</p>
        </div>
      </div>
    );
  }

  const handleSendMessage = async (conversationId, message) => {
    let fileMetadata = null;
    if (message.file && message.file.raw) {
      fileMetadata = await messagesApi.uploadFile(message.file.raw);
    }
    return messagesApi.sendMessage(conversationId, {
      content: message.text,
      reply_to: message.replyTo,
      file: fileMetadata
    });
  };

  return (
    <div className="dashboard-content" style={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <ChatLayout
        tabs={tabs}
        chats={chats}
        initialTab="equipes"
        initialChatId="baobab"
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

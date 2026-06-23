import React, { useEffect, useState } from 'react';
import ChatLayout from '../../components/features/messaging/ChatLayout';
import { messagesApi } from '../../api/messages';
import { extractArray, normalizeConversation } from '../../services/normalizers';
import { useRoleConversations } from '../../hooks/useRoleConversations';

export default function OrganizerMessages() {
  const [tabs, setTabs] = useState([]);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      try {
        setLoading(true);
        const data = await messagesApi.getConversations({ role: 'organizer' });
        const conversations = extractArray(data);
        setTabs(data.tabs || [
          { id: 'participants', label: 'Participants' },
          { id: 'mentors', label: 'Mentors' },
          { id: 'membres', label: 'Membres' }
        ]);
        setChats(conversations.map(normalizeConversation));
      } catch (err) {
        console.error("Erreur api", err);
        setTabs([]);
        setChats([]);
      } finally {
        setLoading(false);
      }
    };
    loadChats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement de vos messages...</p>
        </div>
      </div>
    );
  }

  return (
    <ChatLayout
      tabs={tabs}
      chats={chats}
      initialTab="participants"
      initialChatId="equipe_fintech"
      onSendMessage={(conversationId, message) => messagesApi.sendMessage(conversationId, { content: message.text, reply_to: message.replyTo })}
    />
  );
}

import React, { useEffect, useState } from 'react';
import ChatLayout from '../../components/features/messaging/ChatLayout';
import { messagesApi } from '../../api/messages';
import { ORGANIZER_TABS_MOCK, ORGANIZER_CHATS_MOCK } from '../../mockdata/organizer';
import { extractArray, normalizeConversation } from '../../services/normalizers';
import { useRoleConversations } from '../../hooks/useRoleConversations';

export default function OrganizerMessages() {
  const [tabs, setTabs] = useState(ORGANIZER_TABS_MOCK);
  const [chats, setChats] = useState(ORGANIZER_CHATS_MOCK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChats = async () => {
      try {
        setLoading(true);
        const data = await messagesApi.getConversations({ role: 'organizer' });
        const conversations = extractArray(data);
        if (conversations.length > 0) {
          setTabs(ORGANIZER_TABS_MOCK);
          setChats(conversations.map(normalizeConversation));
        } else {
          setTabs(ORGANIZER_TABS_MOCK);
          setChats(ORGANIZER_CHATS_MOCK);
        }
      } catch (err) {
        console.warn('Erreur lors du chargement des conversations organisateur depuis l\'API, utilisation du fallback.', err);
        setTabs(ORGANIZER_TABS_MOCK);
        setChats(ORGANIZER_CHATS_MOCK);
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

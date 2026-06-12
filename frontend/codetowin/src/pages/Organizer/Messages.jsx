import React, { useEffect, useState } from 'react';
import ChatLayout from '../../components/features/messaging/ChatLayout';
import { messagesApi } from '../../api/messages';
import { ORGANIZER_TABS_MOCK, ORGANIZER_CHATS_MOCK } from '../../mockdata/organizer';

const extractArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.conversations)) return data.conversations;
  return [];
};

const normalizeConversation = (conversation) => ({
  id: conversation.id || conversation._id,
  name: conversation.name || conversation.title || conversation.team?.name || 'Conversation',
  role: conversation.role || conversation.context || conversation.hackathon?.title || 'Conversation organisateur',
  category: conversation.category || (conversation.mentor ? 'mentors' : 'participants'),
  isGroup: conversation.isGroup ?? conversation.is_group ?? Boolean(conversation.team),
  avatar: conversation.avatar || conversation.name?.slice(0, 2).toUpperCase() || 'CT',
  avatarBgColor: conversation.avatarBgColor || 'bg-emerald-100',
  avatarTextColor: conversation.avatarTextColor || 'text-emerald-600',
  avatarBorderColor: conversation.avatarBorderColor || 'border-emerald-200',
  status: conversation.status || 'offline',
  unread: conversation.unread ?? conversation.unread_count ?? 0,
  lastTime: conversation.lastTime || conversation.last_message_at || '',
  lastMessage: conversation.lastMessage || conversation.last_message || '',
  messages: extractArray(conversation.messages).map((message) => ({
    id: message.id || message._id,
    sender: message.sender || (message.is_me ? 'me' : 'them'),
    senderName: message.senderName || message.sender_name || message.user?.name || 'Participant',
    text: message.text || message.content || '',
    time: message.time || message.created_at || '',
  })),
});

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

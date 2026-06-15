import React from 'react';
import ChatLayout from '../../components/features/messaging/ChatLayout';
import { messagesApi } from '../../api/messages';
import { useRoleConversations } from '../../hooks/useRoleConversations';

const PARTICIPANT_TABS_MOCK = [
  { id: 'equipes', label: 'Mon Équipe' },
  { id: 'organisation', label: 'Mentors & Organisateurs' },
];

const PARTICIPANT_CHATS_MOCK = [
  {
    id: 'baobab',
    name: 'Groupe : Team Baobab',
    headerName: 'Team Baobab',
    role: 'Mon Équipe • CodeToWin Africa AI Sprint',
    category: 'equipes',
    isGroup: true,
    avatar: 'TB',
    avatarBgColor: 'bg-emerald-100',
    avatarTextColor: 'text-emerald-600',
    avatarBorderColor: 'border-emerald-200',
    status: 'online',
    unread: 2,
    lastTime: '11:15',
    lastMessage: "Emmanuel : J'ai fini la mise en page des paramètres !",
    about: "Groupe d'équipe pour la collaboration et l'échange de ressources avec le mentor.",
    members: [
      { name: 'Aminata Diop', title: 'Chef de Projet', leader: true },
      { name: 'Fatou Ndao', title: 'Data Scientist' },
      { name: 'Emmanuel', title: 'Développeur Frontend' }
    ],
    messages: [
      { id: 1, sender: 'them', text: "Salut l'équipe ! Comment on s'organise pour la démo finale ?", time: 'Hier 15:00', senderName: 'Aminata Diop' },
      { id: 2, sender: 'them', text: "Je prépare les slides du pitch de mon côté, mais j'aurais besoin de la structure du modèle.", time: 'Hier 16:30', senderName: 'Fatou Ndao' },
      { id: 3, sender: 'me', text: "Je m'occupe de coder l'interface utilisateur. J'ai fini la mise en page des paramètres !", time: '11:15', senderName: 'Moi' },
    ],
  },
  {
    id: 'seydou',
    name: 'Seydou Kane (Mentor)',
    role: 'Mentor Assigné',
    category: 'organisation',
    avatar: 'https://ui-avatars.com/api/?name=Seydou+Kane&background=047857&color=fff',
    status: 'offline',
    unread: 0,
    lastTime: 'Hier',
    lastMessage: "Seydou : N'hésitez pas si vous bloquez sur l'intégration.",
    about: "Conversation privée pour le mentorat direct et le suivi individuel.",
    email: "seydou.kane@mentor.codetowin.com",
    region: "Sénégal",
    messages: [
      { id: 1, sender: 'them', text: "Bonjour Team Baobab ! J'ai regardé votre repo, la structure est très propre. N'hésitez pas si vous bloquez sur l'intégration.", time: 'Hier', senderName: 'Seydou Kane' },
    ],
  },
  {
    id: 'techhub',
    name: 'TechHub Sénégal',
    role: 'Organisateur',
    category: 'organisation',
    avatar: 'https://ui-avatars.com/api/?name=TechHub+Senegal&background=0f172a&color=fff',
    status: 'online',
    unread: 0,
    lastTime: 'Lun.',
    lastMessage: 'TechHub : Bonne chance à votre équipe pour le sprint !',
    about: "Contact direct avec l'équipe organisatrice.",
    email: "contact@techhub.sn",
    region: "Sénégal",
    messages: [
      { id: 1, sender: 'them', text: 'Bienvenue sur CodeToWin ! Bonne chance à votre équipe pour le sprint !', time: 'Lun.', senderName: 'TechHub Sénégal' },
    ],
  },
];

export default function ParticipantMessages() {
  const { tabs, chats, loading } = useRoleConversations('participant', { mockChats: PARTICIPANT_CHATS_MOCK, mockTabs: PARTICIPANT_TABS_MOCK });

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
    <div className="dashboard-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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

import React, { useState } from 'react';
import { Search, Info, MoreVertical, Send, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

const CHATS = {
  equipe_fintech: {
    id: 'equipe_fintech',
    name: "Groupe : FinTech Innovators",
    role: "Équipe • Hackathon Fintech",
    isGroup: true,
    avatar: "FI",
    avatarBg: "bg-emerald-100 text-emerald-600 border-emerald-200",
    category: 'participants',
    unread: 1,
    lastTime: '10:42',
    lastMessage: 'Moussa : Bonjour, nous sommes bloqués...',
    messages: [
      { sender: "them", text: "Bonjour l'équipe d'organisation !", time: "10:41", senderName: "Aisha Fall" },
      { sender: "them", text: "Notre équipe rencontre un problème avec l'API fournie pour le challenge paiement mobile. Elle renvoie une erreur 500 depuis ce matin. Pouvez-vous vérifier ?", time: "10:41", senderName: "Moussa Diop" },
      { sender: "me", text: "Bonjour l'équipe, je remonte ça à notre équipe technique tout de suite.", time: "10:43" },
      { sender: "them", text: "Super, merci beaucoup ! 🙏", time: "10:44", senderName: "Moussa Diop" }
    ]
  },
  moussa: {
    id: 'moussa',
    name: "Moussa Diop",
    role: "Participant • Équipe 'FinTech Innovators'",
    avatar: "https://ui-avatars.com/api/?name=Moussa+Diop&background=random",
    category: 'participants',
    unread: 1,
    lastTime: '10:42',
    lastMessage: 'Bonjour, nous sommes bloqués...',
    messages: [
      { sender: "them", text: "Bonjour l'équipe d'organisation !", time: "10:41" },
      { sender: "them", text: "Notre équipe rencontre un problème avec l'API fournie pour le challenge paiement mobile.", time: "10:41" },
      { sender: "me", text: "Bonjour Moussa, je remonte ça à l'équipe technique tout de suite.", time: "10:43" },
      { sender: "them", text: "Super, merci beaucoup ! 🙏", time: "10:44" }
    ]
  },
  aisha: {
    id: 'aisha',
    name: "Aisha Fall",
    role: "Participant • Solo",
    avatar: "https://ui-avatars.com/api/?name=Aisha+Fall&background=random",
    category: 'participants',
    unread: 0,
    lastTime: 'Hier',
    lastMessage: 'Merci beaucoup pour le retour !',
    messages: [
      { sender: "them", text: "Merci beaucoup pour le retour !", time: "Hier" }
    ]
  },
  ousmane: {
    id: 'ousmane',
    name: "Dr. Ousmane Ba",
    role: "Mentor • Expert IA",
    avatar: "https://ui-avatars.com/api/?name=Dr+Ousmane+Ba&background=random",
    category: 'mentors',
    unread: 1,
    lastTime: '09:15',
    lastMessage: 'Je suis dispo pour la team 3.',
    messages: [
      { sender: "them", text: "Je suis dispo pour la team 3.", time: "09:15" },
      { sender: "me", text: "Parfait, je leur dis de vous contacter.", time: "09:16" }
    ]
  },
  mod: {
    id: 'mod',
    name: "Modérateurs (Groupe)",
    role: "Équipe d'organisation",
    isGroup: true,
    avatar: "Mod",
    avatarBg: "bg-blue-100 text-blue-600",
    category: 'membres',
    unread: 0,
    lastTime: 'Lun',
    lastMessage: "Fatou: J'ai validé les 10 projets.",
    messages: [
      { sender: "them", text: "Fatou: J'ai validé les 10 projets.", time: "Lun" }
    ]
  }
};

export default function OrganizerMessages() {
  const [activeTab, setActiveTab] = useState('participants');
  const [activeChatId, setActiveChatId] = useState('equipe_fintech');
  const [newMessage, setNewMessage] = useState('');

  const filteredChats = Object.values(CHATS).filter(chat => chat.category === activeTab);
  const activeChat = CHATS[activeChatId];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // In a real app, this would append to the chat messages
    setNewMessage('');
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 px-4 sm:px-6 shrink-0">
        <h1 className="text-xl font-semibold text-slate-900">Messagerie</h1>
      </header>

      {/* Chat Interface Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Chat List */}
        <div className="w-full sm:w-1/3 md:w-80 border-r border-slate-200 flex flex-col bg-slate-50 flex-shrink-0">
          
          {/* Search & Tabs */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input type="text" className="block w-full rounded-md border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border shadow-sm" placeholder="Rechercher une conversation..." />
            </div>

            {/* Tabs */}
            <div className="mt-4 flex space-x-1 rounded-md bg-slate-100 p-1">
              <button 
                onClick={() => setActiveTab('participants')}
                className={`w-1/3 rounded py-1.5 text-xs font-medium ${activeTab === 'participants' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Participants
              </button>
              <button 
                onClick={() => setActiveTab('mentors')}
                className={`w-1/3 rounded py-1.5 text-xs font-medium ${activeTab === 'mentors' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Mentors
              </button>
              <button 
                onClick={() => setActiveTab('membres')}
                className={`w-1/3 rounded py-1.5 text-xs font-medium ${activeTab === 'membres' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Membres
              </button>
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredChats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChatId(chat.id)}
                className={`group flex items-center rounded-lg p-3 cursor-pointer ${activeChatId === chat.id ? 'bg-brand-50' : 'hover:bg-slate-100'}`}
              >
                <div className="relative">
                  {chat.isGroup ? (
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border ${chat.avatarBg}`}>
                      <span className="font-bold text-sm">{chat.avatar}</span>
                    </div>
                  ) : (
                    <img className="h-10 w-10 rounded-full object-cover" src={chat.avatar} alt="" />
                  )}
                  <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${activeChatId === chat.id || chat.unread > 0 ? 'bg-green-400' : 'bg-slate-300'}`}></span>
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900 truncate">{chat.name}</p>
                    <p className={`text-xs ${chat.unread > 0 ? 'text-brand-600 font-semibold' : 'text-slate-500'}`}>{chat.lastTime}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`truncate text-sm ${chat.unread > 0 ? 'font-medium text-slate-900' : 'text-slate-500'}`}>{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="inline-flex items-center justify-center rounded-full bg-brand-500 px-2 py-0.5 text-xs font-bold text-white ml-2">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredChats.length === 0 && (
              <div className="p-4 text-center text-sm text-slate-500">
                Aucune conversation trouvée.
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Active Chat */}
        {activeChat ? (
          <div className="hidden sm:flex flex-1 flex-col bg-slate-50">
            
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 shadow-sm bg-white z-10 shrink-0">
              <div className="flex items-center">
                {activeChat.isGroup ? (
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border ${activeChat.avatarBg}`}>
                    <span className="font-bold text-sm">{activeChat.avatar}</span>
                  </div>
                ) : (
                  <img className="h-10 w-10 rounded-full object-cover" src={activeChat.avatar} alt="" />
                )}
                <div className="ml-3">
                  <p className="text-sm font-bold text-slate-900">{activeChat.name}</p>
                  <p className="text-xs text-slate-500">{activeChat.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button title="Informations" className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                  <Info className="h-5 w-5" />
                </button>
                <button className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex justify-center">
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-500">Aujourd'hui</span>
              </div>

              <div className="space-y-4">
                {activeChat.messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                    {msg.senderName && msg.sender === 'them' && activeChat.isGroup && (
                      <span className="ml-2 mb-1 text-[11px] font-bold text-slate-500">{msg.senderName}</span>
                    )}
                    <div className={`relative max-w-md md:max-w-lg rounded-2xl px-4 py-2 shadow-sm ${msg.sender === 'me' ? 'bg-brand-600 text-white rounded-tr-sm' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm'}`}>
                      <p className="text-sm">{msg.text}</p>
                      <div className="mt-1 flex justify-end">
                        <span className={`text-[10px] ${msg.sender === 'me' ? 'text-brand-200' : 'text-slate-400'}`}>{msg.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input Area */}
            <div className="border-t border-slate-200 bg-white p-4 shrink-0">
              <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                <div className="flex-1">
                  <textarea 
                    rows="1" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="block w-full resize-none rounded-xl border-slate-300 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-3 px-4 border shadow-sm" 
                    placeholder="Écrivez votre message..."
                  />
                </div>
                <button type="submit" className="inline-flex items-center justify-center rounded-full bg-brand-600 p-3 text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition shadow-sm">
                  <Send className="h-5 w-5 ml-1" />
                </button>
              </form>
            </div>

          </div>
        ) : (
          <div className="hidden sm:flex flex-1 flex-col items-center justify-center bg-slate-50 text-slate-500">
            <p>Sélectionnez une conversation pour commencer</p>
          </div>
        )}
      </div>
    </div>
  );
}

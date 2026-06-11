import React, { useState, useEffect, useRef } from 'react';
import { Search, Info, MoreVertical, Send, X, CornerUpLeft } from 'lucide-react';

const CHATS = {
  equipe_fintech: {
    id: 'equipe_fintech',
    name: "Groupe : FinTech Innovators",
    role: "Équipe • Hackathon Fintech",
    isGroup: true,
    avatar: "FI",
    avatarBgColor: "bg-emerald-100",
    avatarTextColor: "text-emerald-600",
    avatarBorderColor: "border-emerald-200",
    status: 'online',
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
    status: 'online',
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
    status: 'offline',
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
    status: 'busy',
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
    avatarBgColor: "bg-blue-100",
    avatarTextColor: "text-blue-600",
    avatarBorderColor: "border-transparent",
    status: 'offline',
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
  const [replyTo, setReplyTo] = useState(null);
  
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, msgIndex: null, sender: null });
  const [showHeaderActions, setShowHeaderActions] = useState(false);
  const messagesEndRef = useRef(null);

  const filteredChats = Object.values(CHATS).filter(chat => chat.category === activeTab);
  const activeChat = CHATS[activeChatId];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChatId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Logic for sending message goes here. For now we just clear the input.
    setNewMessage('');
    setReplyTo(null);
    scrollToBottom();
  };

  const handleContextMenu = (e, msgIndex, sender) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    
    const spaceBelow = window.innerHeight - rect.bottom;
    const menuHeight = 250; 
    
    let topPosition;
    if (spaceBelow < menuHeight) {
       topPosition = rect.top - menuHeight;
    } else {
       topPosition = rect.bottom + 5;
    }

    let leftPosition = rect.right - 224;
    if (leftPosition < 10) leftPosition = 10;

    setContextMenu({ show: true, x: leftPosition, y: topPosition, msgIndex, sender });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, show: false });
  };

  // Close context menu on document click
  useEffect(() => {
    const handleClick = () => handleCloseContextMenu();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });

  const handleReplyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(contextMenu.msgIndex !== null) {
      const targetMsg = activeChat.messages[contextMenu.msgIndex];
      const isMe = targetMsg.sender === 'me';
      const senderName = isMe ? "Vous" : (targetMsg.senderName || activeChat.name);
      setReplyTo({
        sender: senderName,
        text: targetMsg.text,
        isMe
      });
    }
    handleCloseContextMenu();
    document.getElementById('chat-input')?.focus();
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 px-4 sm:px-6 shrink-0">
        <div className="flex items-center">
          <button className="text-slate-500 focus:outline-none sm:hidden mr-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-slate-900">Messagerie</h1>
        </div>
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
              <input 
                type="text" 
                className="block w-full rounded-md border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border shadow-sm" 
                placeholder="Rechercher une conversation..." 
              />
            </div>

            {/* Tabs */}
            <div className="mt-4 flex space-x-1 rounded-md bg-slate-100 p-1">
              <button 
                onClick={() => setActiveTab('participants')}
                className={`w-1/3 rounded py-1.5 text-xs font-medium ${activeTab === 'participants' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Participants
              </button>
              <button 
                onClick={() => setActiveTab('mentors')}
                className={`w-1/3 rounded py-1.5 text-xs font-medium ${activeTab === 'mentors' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Mentors
              </button>
              <button 
                onClick={() => setActiveTab('membres')}
                className={`w-1/3 rounded py-1.5 text-xs font-medium ${activeTab === 'membres' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                Membres
              </button>
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1" style={{ scrollbarWidth: 'thin' }}>
            {filteredChats.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChatId(chat.id)}
                className={`group flex items-center rounded-lg p-3 cursor-pointer ${activeChatId === chat.id ? 'bg-brand-50' : 'hover:bg-slate-100'}`}
              >
                <div className="relative">
                  {chat.isGroup ? (
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${chat.avatarBgColor} ${chat.avatarTextColor} border ${chat.avatarBorderColor || 'border-transparent'}`}>
                      <span className="font-bold text-sm">{chat.avatar}</span>
                    </div>
                  ) : (
                    <img className="h-10 w-10 rounded-full object-cover" src={chat.avatar} alt="" />
                  )}
                  {chat.status === 'online' && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
                  )}
                  {chat.status === 'busy' && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-slate-300 ring-2 ring-white"></span>
                  )}
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900 truncate">{chat.name}</p>
                    <p className={`text-xs ${chat.unread > 0 ? 'text-brand-600 font-semibold' : 'text-slate-500'}`}>{chat.lastTime}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`truncate text-sm ${chat.unread > 0 ? 'font-medium text-slate-900' : 'text-slate-500'}`}>{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="inline-flex items-center justify-center rounded-full bg-brand-500 px-2 py-0.5 text-xs font-bold text-white">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredChats.length === 0 && (
              <div className="p-4 text-center text-sm text-slate-500">
                Aucun contact trouvé.
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Active Chat */}
        {activeChat ? (
          <div className="hidden sm:flex flex-1 flex-col bg-white">
            
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 shadow-sm bg-white z-10 shrink-0">
              <div className="flex items-center">
                {activeChat.isGroup ? (
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${activeChat.avatarBgColor} ${activeChat.avatarTextColor} ${activeChat.avatarBorderColor || 'border-transparent'}`}>
                    <span className="text-xs font-bold">{activeChat.avatar}</span>
                  </div>
                ) : (
                  <img className="h-10 w-10 rounded-full object-cover" src={activeChat.avatar} alt="" />
                )}
                <div className="ml-3">
                  <p className="text-sm font-bold text-slate-900">{activeChat.name}</p>
                  <p className="text-xs text-slate-500">{activeChat.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 relative">
                <button title="Informations" className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none">
                  <Info className="h-5 w-5" />
                </button>
                <div className="relative">
                  <button onClick={() => setShowHeaderActions(!showHeaderActions)} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  {showHeaderActions && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <button className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                        <svg className="mr-3 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        Désactiver notifications
                      </button>
                      <button className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                        <svg className="mr-3 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Gérer les rôles
                      </button>
                      <div className="border-t border-slate-100 my-1"></div>
                      <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <svg className="mr-3 h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        Bloquer l'utilisateur
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50" style={{ scrollbarWidth: 'thin' }}>
              <div className="flex justify-center">
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-500">Aujourd'hui</span>
              </div>

              <div className="flex flex-col space-y-4">
                {activeChat.messages.map((msg, idx) => {
                  const isMe = msg.sender === 'me';
                  const isFirstInGroup = idx === 0 || activeChat.messages[idx - 1].sender !== msg.sender;
                  const radiusClass = isFirstInGroup ? (isMe ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm') : 'rounded-2xl';

                  return (
                    <div key={idx} className={`flex flex-col w-full ${isMe ? 'items-end space-y-1' : 'items-start space-y-1'}`}>
                      {/* Sender Name for Groups */}
                      {isFirstInGroup && msg.senderName && activeChat.isGroup && !isMe && (
                        <span className="ml-10 mb-0.5 text-[11px] font-bold text-slate-500">{msg.senderName}</span>
                      )}
                      
                      <div className={`flex items-end space-x-2 w-full group relative ${isMe ? 'justify-end' : 'justify-start'}`}>
                        {/* Avatar for Groups */}
                        {!isMe && activeChat.isGroup && (
                          isFirstInGroup ? (
                            <img className="h-8 w-8 rounded-full object-cover shrink-0" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(msg.senderName || activeChat.name)}&background=random`} alt="" />
                          ) : (
                            <div className="w-8 shrink-0"></div>
                          )
                        )}
                        
                        {/* Message Bubble */}
                        <div className={`relative flex flex-col ${radiusClass} px-3 py-2 shadow-sm text-left max-w-md md:max-w-lg ${isMe ? 'bg-brand-600 text-white' : 'bg-white text-slate-800 border border-slate-100'}`}>
                          
                          {/* Replied Message Area */}
                          {msg.replyTo && (
                            <div className={`mb-1.5 rounded px-2 py-1 border-l-[3px] ${isMe ? 'bg-black/10 border-emerald-400' : 'bg-slate-100 border-brand-500'}`}>
                              <p className={`text-xs font-bold ${isMe ? 'text-emerald-300' : 'text-brand-600'}`}>{msg.replyTo.sender}</p>
                              <p className={`text-xs truncate max-w-[200px] sm:max-w-xs ${isMe ? 'text-white/90' : 'text-slate-500'}`}>{msg.replyTo.text}</p>
                            </div>
                          )}

                          <div className="flex flex-wrap items-end justify-end gap-x-3">
                            <p className="text-sm flex-1 text-left">{msg.text}</p>
                            <span className={`text-[10px] shrink-0 mb-[-2px] flex items-center ${isMe ? 'text-brand-200' : 'text-slate-400'}`}>
                              {msg.time}
                              {isMe && (
                                <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                              )}
                            </span>
                          </div>

                          {/* Context Menu Button */}
                          <button 
                            onClick={(e) => handleContextMenu(e, idx, msg.sender)}
                            className={`absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded-full shadow-sm focus:outline-none focus:opacity-100 ${isMe ? 'bg-brand-700 text-brand-100 hover:text-white' : 'bg-white text-slate-400 hover:text-slate-600 border border-slate-100'}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Chat Input Area */}
            <div className="border-t border-slate-200 bg-white p-2 sm:p-4 shrink-0 flex flex-col relative z-20">
              {/* Reply Preview */}
              {replyTo && (
                <div className={`mb-2 rounded-lg p-2 border-l-4 relative flex items-center justify-between shadow-sm border border-slate-200 transition-all bg-slate-50/80 ${replyTo.isMe ? 'border-brand-500' : 'border-emerald-500'}`}>
                  <div className="flex flex-col flex-1 overflow-hidden pr-4">
                    <span className={`text-xs font-bold ${replyTo.isMe ? 'text-brand-600' : 'text-emerald-600'}`}>{replyTo.sender}</span>
                    <span className="text-sm text-slate-600 truncate mt-0.5">{replyTo.text}</span>
                  </div>
                  <button type="button" onClick={() => setReplyTo(null)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-200 focus:outline-none transition">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                <button type="button" className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-600 transition focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <div className="flex-1">
                  <textarea 
                    id="chat-input"
                    rows="1" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    className="block w-full resize-none rounded-xl border-slate-300 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-3 px-4 border shadow-sm max-h-32" 
                    placeholder="Écrivez votre message..."
                  ></textarea>
                </div>
                <button type="submit" disabled={!newMessage.trim()} className="inline-flex items-center justify-center rounded-full bg-brand-600 p-3 text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition shadow-sm disabled:opacity-50">
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>

          </div>
        ) : (
          <div className="hidden sm:flex flex-1 items-center justify-center bg-slate-50">
            <div className="text-center text-slate-500">
              <p>Sélectionnez une conversation pour commencer</p>
            </div>
          </div>
        )}
      </div>

      {/* Floating Message Context Menu */}
      {contextMenu.show && (
        <div 
          className="absolute z-[100] w-56 rounded-lg bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] ring-1 ring-slate-200 transition-opacity"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Reactions row */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 bg-slate-50/50 rounded-t-lg">
            {['👍', '❤️', '😂', '😮', '🙏'].map(emoji => (
              <button key={emoji} onClick={handleCloseContextMenu} className="hover:scale-125 transition-transform text-lg focus:outline-none">{emoji}</button>
            ))}
            <button onClick={handleCloseContextMenu} className="text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-200 focus:outline-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            </button>
          </div>
          <div className="py-1">
            <button onClick={handleReplyClick} className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none">
              <CornerUpLeft className="mr-3 h-4 w-4 text-slate-400" />
              Répondre
            </button>
            <div className="border-t border-slate-100 my-1"></div>
            {contextMenu.sender !== 'me' && (
              <button onClick={handleCloseContextMenu} className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none">
                <svg className="mr-3 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/></svg>
                Signaler
              </button>
            )}
            <button onClick={handleCloseContextMenu} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none">
              <svg className="mr-3 h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

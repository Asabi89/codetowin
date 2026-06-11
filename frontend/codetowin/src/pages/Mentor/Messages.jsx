import React, { useState } from 'react';
import { Search, Info, Send, ChevronLeft, MessageSquare } from 'lucide-react';
import '../../styles/messaging.css';

const chatData = {
  ecopay: {
    id: 'ecopay',
    name: "Groupe : EcoPay Solutions",
    role: "Participant • Fintech Builders Challenge",
    isGroup: true,
    avatar: "ES",
    avatarBgColor: "#D1FAE5",
    avatarTextColor: "#059669",
    avatarBorderColor: "#A7F3D0",
    category: 'equipes',
    unread: 1,
    lastTime: '10:42',
    lastMessage: 'Moussa : On est bloqués...',
    messages: [
      { id: 1, sender: "me", text: "Bonjour l'équipe ! Je suis Seydou, votre mentor pour ce hackathon. Comment avance le projet ?", time: "Hier 14:00" },
      { id: 2, sender: "them", text: "Bonjour Seydou ! L'idée est claire, mais notre développeur backend a une question sur la base de données.", time: "Hier 14:15", senderName: "Omar Fall" },
      { id: 3, sender: "them", text: "Moussa : On est bloqués sur l'API de paiement qui renvoie une erreur 500.", time: "10:42", senderName: "Moussa Diop" }
    ]
  },
  retailsync: {
    id: 'retailsync',
    name: "Paul (Privé)",
    role: "Participant • Fintech Builders Challenge",
    isGroup: false,
    avatar: "RS",
    avatarBgColor: "#DBEAFE",
    avatarTextColor: "#2563EB",
    avatarBorderColor: "#BFDBFE",
    category: 'equipes',
    unread: 0,
    lastTime: 'Hier',
    lastMessage: 'Paul : Merci pour le retour !',
    messages: [
      { id: 1, sender: "them", text: "Merci pour le retour sur notre pitch ! On va l'améliorer.", time: "Hier 16:30", senderName: "Paul" }
    ]
  },
  techhub: {
    id: 'techhub',
    name: "TechHub Sénégal",
    role: "Organisateur",
    isGroup: false,
    avatarImg: "https://ui-avatars.com/api/?name=TechHub+Senegal&background=047857&color=fff",
    category: 'organisation',
    unread: 0,
    lastTime: 'Lun.',
    lastMessage: 'Bienvenue dans l\'équipe !',
    messages: [
      { id: 1, sender: "them", text: "Bienvenue dans l'équipe des mentors ! N'hésitez pas si vous avez des questions.", time: "Lundi 09:00", senderName: "Orga" },
      { id: 2, sender: "me", text: "Merci ! J'ai bien reçu l'assignation de mes 2 équipes.", time: "Lundi 10:15" }
    ]
  }
};

export default function MentorMessages() {
  const [activeTab, setActiveTab] = useState('equipes');
  const [activeChatId, setActiveChatId] = useState('ecopay');
  const [messageInput, setMessageInput] = useState('');

  const filteredChats = Object.values(chatData).filter(chat => chat.category === activeTab);
  const activeChat = activeChatId ? chatData[activeChatId] : null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // Logic to send message would go here
      setMessageInput('');
    }
  };

  return (
    <div className="messaging-container">
      {/* Topbar */}
      <header className="notifications-header">
        <h1 className="topbar-title">Messagerie</h1>
      </header>

      {/* Chat Interface Layout */}
      <div className="messaging-layout">
        
        {/* Left Panel: Chat List */}
        <div className="messaging-sidebar" style={{ display: activeChatId ? 'none' : 'flex' }}>
          
          {/* Search & Tabs */}
          <div className="messaging-sidebar-header">
            <div className="search-input-wrap">
              <div className="search-icon-wrap">
                <Search className="search-icon" />
              </div>
              <input type="text" className="search-input" placeholder="Rechercher une conversation..." />
            </div>

            {/* Tabs */}
            <div className="messaging-tabs">
              <button 
                onClick={() => setActiveTab('equipes')}
                className={`messaging-tab ${activeTab === 'equipes' ? 'messaging-tab-active' : 'messaging-tab-inactive'}`}
              >
                Équipes
              </button>
              <button 
                onClick={() => setActiveTab('organisation')}
                className={`messaging-tab ${activeTab === 'organisation' ? 'messaging-tab-active' : 'messaging-tab-inactive'}`}
              >
                Organisateurs
              </button>
            </div>
          </div>

          {/* Contact List */}
          <div className="chat-list">
            {filteredChats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`chat-item ${activeChatId === chat.id ? 'chat-item-active' : 'chat-item-inactive'}`}
              >
                <div className="chat-avatar-wrap">
                  {chat.avatarImg ? (
                    <img className="chat-avatar-img" src={chat.avatarImg} alt="" />
                  ) : (
                    <div className="chat-avatar-text" style={{ backgroundColor: chat.avatarBgColor, color: chat.avatarTextColor, borderColor: chat.avatarBorderColor || 'transparent' }}>
                      <span>{chat.avatar}</span>
                    </div>
                  )}
                  <span className={`chat-status ${chat.unread > 0 ? 'unread' : ''} ${activeChatId === chat.id ? 'active' : ''}`}></span>
                </div>
                <div className="chat-info">
                  <div className="chat-name-row">
                    <p className="chat-name">{chat.name}</p>
                    <p className={`chat-time ${chat.unread > 0 ? 'unread' : ''}`}>{chat.lastTime}</p>
                  </div>
                  <div className="chat-msg-row">
                    <p className={`chat-msg ${chat.unread > 0 ? 'unread' : ''}`}>{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="chat-badge">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {filteredChats.length === 0 && (
              <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--slate-500)' }}>
                Aucune conversation trouvée.
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Chat Area */}
        <div className="chat-area" style={{ display: activeChatId ? 'flex' : 'none' }}>
          
          {!activeChatId ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', color: 'var(--slate-500)' }}>
              <div style={{ height: '6rem', width: '6rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <MessageSquare style={{ height: '3rem', width: '3rem', color: 'var(--slate-400)' }} />
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Vos Messages</h3>
              <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', maxWidth: '24rem', margin: 0 }}>Sélectionnez une équipe ou un organisateur dans la liste pour commencer à discuter.</p>
            </div>
          ) : (
            <>
              {/* Active Chat Header */}
              <div className="chat-header">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button 
                    className="icon-btn hover-text-slate-600"
                    style={{ marginRight: '0.75rem' }}
                    onClick={() => setActiveChatId(null)}
                  >
                    <ChevronLeft style={{ height: '1.5rem', width: '1.5rem' }} />
                  </button>
                  {activeChat.avatarImg ? (
                    <img className="chat-avatar-img" src={activeChat.avatarImg} alt="" />
                  ) : (
                    <div className="chat-avatar-text" style={{ backgroundColor: activeChat.avatarBgColor, color: activeChat.avatarTextColor, borderColor: activeChat.avatarBorderColor || 'transparent' }}>
                      <span>{activeChat.avatar}</span>
                    </div>
                  )}
                  <div style={{ marginLeft: '0.75rem' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--slate-900)', margin: 0 }}>{activeChat.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--brand-600)', fontWeight: 500, margin: 0 }}>{activeChat.role}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button className="icon-btn" title="Informations">
                    <Info style={{ height: '1.25rem', width: '1.25rem' }} />
                  </button>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="chat-messages">
                <div className="chat-date-separator">
                  <span className="chat-date-badge">Aujourd'hui</span>
                </div>
                
                {activeChat.messages.map((msg) => (
                  <div key={msg.id} className={`msg-wrapper ${msg.sender === 'me' ? 'me' : 'them'}`}>
                    {msg.senderName && msg.sender === 'them' && activeChat.isGroup && (
                      <span className="msg-sender-name">{msg.senderName}</span>
                    )}
                    <div className={`msg-bubble ${msg.sender === 'me' ? 'me' : 'them'}`}>
                      <p className="msg-text">{msg.text}</p>
                      <div className="msg-meta">
                        <span className={`msg-time ${msg.sender === 'me' ? 'me' : 'them'}`}>{msg.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Area */}
              <div className="chat-input-area">
                <form onSubmit={handleSendMessage} className="chat-form">
                  <div style={{ flex: 1 }}>
                    <textarea 
                      rows="1"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="chat-textarea" 
                      placeholder="Écrivez votre message..." 
                    />
                  </div>
                  <button type="submit" className="chat-send-btn">
                    <Send style={{ height: '1.25rem', width: '1.25rem' }} />
                  </button>
                </form>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

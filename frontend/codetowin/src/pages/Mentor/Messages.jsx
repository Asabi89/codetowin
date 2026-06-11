import React, { useState } from 'react';
import { Search, Info, Send, ChevronLeft } from 'lucide-react';

const chatData = {
  ecopay: {
    name: "Groupe : EcoPay Solutions",
    role: "Participant • Fintech Builders Challenge",
    isGroup: true,
    avatar: "https://ui-avatars.com/api/?name=EcoPay+Solutions&background=10b981&color=fff",
    messages: [
      { id: 1, sender: "me", text: "Bonjour l'équipe ! Je suis Seydou, votre mentor pour ce hackathon. Comment avance le projet ?", time: "Hier 14:00", senderName: "Moi" },
      { id: 2, sender: "them", text: "Bonjour Seydou ! L'idée est claire, mais notre développeur backend a une question sur la base de données.", time: "Hier 14:15", senderName: "Omar Fall" },
      { id: 3, sender: "them", text: "Moussa : On est bloqués sur l'API de paiement qui renvoie une erreur 500.", time: "10:42", senderName: "Moussa Diop" }
    ]
  },
  retailsync: {
    name: "Paul (Privé)",
    role: "Participant • Fintech Builders Challenge",
    avatar: "https://ui-avatars.com/api/?name=RetailSync&background=3b82f6&color=fff",
    messages: [
      { id: 1, sender: "them", text: "Merci pour le retour sur notre pitch ! On va l'améliorer.", time: "Hier 16:30", senderName: "Paul" }
    ]
  },
  techhub: {
    name: "TechHub Sénégal",
    role: "Organisateur",
    avatar: "https://ui-avatars.com/api/?name=TechHub+Senegal&background=047857&color=fff",
    messages: [
      { id: 1, sender: "them", text: "Bienvenue dans l'équipe des mentors ! N'hésitez pas si vous avez des questions.", time: "Lundi 09:00", senderName: "Orga" },
      { id: 2, sender: "me", text: "Merci ! J'ai bien reçu l'assignation de mes 2 équipes.", time: "Lundi 10:15", senderName: "Moi" }
    ]
  }
};

export default function MentorMessages() {
  const [activeTab, setActiveTab] = useState('equipes');
  const [activeChatId, setActiveChatId] = useState('ecopay');
  const [messageInput, setMessageInput] = useState('');

  const activeChat = activeChatId ? chatData[activeChatId] : null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      // Logic to send message would go here
      setMessageInput('');
    }
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 px-4 sm:px-6 shrink-0">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-slate-900">Messagerie</h1>
        </div>
      </header>

      {/* Chat Interface Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel: Chat List */}
        <div className={`w-full sm:w-1/3 md:w-80 border-r border-slate-200 flex flex-col bg-slate-50 flex-shrink-0 ${activeChatId ? 'hidden sm:flex' : 'flex'}`}>
          
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
                className={`w-1/2 rounded py-1.5 text-xs font-medium ${activeTab === 'equipes' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`} 
                onClick={() => setActiveTab('equipes')}
              >
                Équipes
              </button>
              <button 
                className={`w-1/2 rounded py-1.5 text-xs font-medium ${activeTab === 'organisation' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`} 
                onClick={() => setActiveTab('organisation')}
              >
                Organisateurs
              </button>
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            
            {activeTab === 'equipes' && (
              <>
                <div 
                  className={`group flex items-center rounded-lg p-3 cursor-pointer ${activeChatId === 'ecopay' ? 'bg-brand-50' : 'hover:bg-slate-100'}`} 
                  onClick={() => setActiveChatId('ecopay')}
                >
                  <div className="relative">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">
                      <span className="font-bold text-sm">ES</span>
                    </div>
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">Groupe : EcoPay</p>
                      <p className="text-xs text-brand-600 font-semibold">10:42</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm text-slate-500 font-medium text-slate-900">Moussa : On est bloqués...</p>
                      <span className="inline-flex items-center justify-center rounded-full bg-brand-500 px-2 py-0.5 text-xs font-bold text-white">1</span>
                    </div>
                  </div>
                </div>

                <div 
                  className={`group flex items-center rounded-lg p-3 cursor-pointer ${activeChatId === 'retailsync' ? 'bg-brand-50' : 'hover:bg-slate-100'}`} 
                  onClick={() => setActiveChatId('retailsync')}
                >
                  <div className="relative">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 border border-blue-200">
                      <span className="font-bold text-sm">RS</span>
                    </div>
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">Paul (Privé)</p>
                      <p className="text-xs text-slate-500">Hier</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm text-slate-500">Paul : Merci pour le retour !</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'organisation' && (
              <div 
                className={`group flex items-center rounded-lg p-3 cursor-pointer ${activeChatId === 'techhub' ? 'bg-brand-50' : 'hover:bg-slate-100'}`} 
                onClick={() => setActiveChatId('techhub')}
              >
                <div className="relative">
                  <img className="h-10 w-10 rounded-full object-cover" src="https://ui-avatars.com/api/?name=TechHub+Senegal&background=047857&color=fff" alt="" />
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">TechHub Sénégal</p>
                    <p className="text-xs text-slate-500">Lun.</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm text-slate-500">Bienvenue dans l'équipe !</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Chat Area */}
        <div className={`flex-col flex-1 bg-white relative ${activeChatId ? 'flex' : 'hidden sm:flex'}`}>
          
          {!activeChatId ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-slate-50 z-10">
              <div className="h-24 w-24 rounded-full bg-slate-200 flex items-center justify-center mb-4">
                <MessageSquare className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">Vos Messages</h3>
              <p className="mt-1 text-sm text-slate-500 max-w-sm">Sélectionnez une équipe ou un organisateur dans la liste pour commencer à discuter.</p>
            </div>
          ) : (
            <>
              {/* Active Chat Header */}
              <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 bg-white">
                <div className="flex items-center">
                  <button 
                    className="sm:hidden mr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                    onClick={() => setActiveChatId(null)}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <img className="h-10 w-10 rounded-full object-cover" src={activeChat.avatar} alt="" />
                  <div className="ml-3">
                    <p className="text-sm font-bold text-slate-900">{activeChat.name}</p>
                    <p className="text-xs text-brand-600 font-medium">{activeChat.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none">
                    <Info className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
                <div className="flex justify-center">
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-500">Aujourd'hui</span>
                </div>
                
                {activeChat.messages.map((msg, index) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'them' ? 'items-start' : 'items-end'}`}>
                    <div className={`relative max-w-md md:max-w-lg px-4 py-2 ${msg.sender === 'them' ? 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-2xl rounded-tl-sm' : 'bg-brand-600 text-white rounded-2xl rounded-tr-sm'}`}>
                      {msg.sender === 'them' && activeChat.isGroup && (
                        <span className="block text-[11px] font-bold text-brand-600 mb-1">{msg.senderName}</span>
                      )}
                      <p className="text-sm">{msg.text}</p>
                      <span className={`text-[10px] mt-1 block text-right ${msg.sender === 'them' ? 'text-slate-400' : 'text-brand-200'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Area */}
              <div className="border-t border-slate-200 bg-white p-2 sm:p-4 shrink-0 flex flex-col relative z-20">
                <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="block w-full rounded-xl border-slate-300 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-3 px-4 border shadow-sm" 
                      placeholder="Écrivez votre message..." 
                    />
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center rounded-full bg-brand-600 p-3 text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition shadow-sm">
                    <Send className="h-5 w-5" />
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

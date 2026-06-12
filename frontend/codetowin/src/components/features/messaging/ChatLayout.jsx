import React, { useEffect, useRef, useState } from 'react';
import { CornerUpLeft, Info, Search, Send, X, Bell, BellOff, Ban, Flag, Trash2, Plus } from 'lucide-react';
import ChatAvatar from './ChatAvatar';
import ChatStatus from './ChatStatus';
import ChatListItem from './ChatListItem';
import HeaderMenu from './HeaderMenu';
import MessageBubble from './MessageBubble';

export default function ChatLayout({
  tabs,
  chats,
  initialTab,
  initialChatId,
  headerMenuOptions = [],
  placeholder = 'Écrivez votre message...',
  onSendMessage,
}) {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.id);
  const [activeChatId, setActiveChatId] = useState(initialChatId || chats[0]?.id);
  const [chatMessages, setChatMessages] = useState(() => Object.fromEntries(chats.map((chat) => [chat.id, chat.messages || []])));
  const [newMessage, setNewMessage] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, msgIndex: null, sender: null });
  const [showHeaderActions, setShowHeaderActions] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);
  const [mutedChats, setMutedChats] = useState({});
  const [blockedChats, setBlockedChats] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.log(bytes) / Math.log(k);
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: formatFileSize(file.size),
        url: URL.createObjectURL(file),
        type: file.type,
      });
    }
  };

  const filteredChats = chats.filter((chat) => chat.category === activeTab);
  const activeChat = chats.find((chat) => chat.id === activeChatId) || filteredChats[0];
  const messages = activeChat ? chatMessages[activeChat.id] || [] : [];

  useEffect(() => {
    if (filteredChats.length > 0 && !filteredChats.some((chat) => chat.id === activeChatId)) {
      setActiveChatId(filteredChats[0].id);
    }
  }, [activeChatId, filteredChats]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChatId, messages.length]);

  useEffect(() => {
    const handleClick = () => setContextMenu((current) => ({ ...current, show: false }));
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!activeChat || (!newMessage.trim() && !selectedFile)) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const text = newMessage;
    const nextMessage = {
      id: Date.now(),
      sender: 'me',
      senderName: 'Moi',
      text,
      time,
      replyTo,
      file: selectedFile,
    };

    setChatMessages((current) => ({
      ...current,
      [activeChat.id]: [...(current[activeChat.id] || []), nextMessage],
    }));
    setNewMessage('');
    setReplyTo(null);
    setSelectedFile(null);

    if (onSendMessage) {
      try {
        await onSendMessage(activeChat.id, nextMessage);
      } catch (err) {
        console.warn("Erreur lors de l'envoi du message via l'API, conservation du message local.", err);
      }
    }
  };

  const handleContextMenu = (event, msgIndex, sender) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Find closest relative parent container
    const container = event.currentTarget.closest('.relative');
    const containerRect = container ? container.getBoundingClientRect() : { top: 0, left: 0 };
    
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeTop = rect.top - containerRect.top;
    const relativeLeft = rect.left - containerRect.left;
    const relativeBottom = rect.bottom - containerRect.top;
    const relativeRight = rect.right - containerRect.left;
    
    const top = window.innerHeight - rect.bottom < 250 ? relativeTop - 250 : relativeBottom + 5;
    const left = Math.max(relativeRight - 224, 10);
    
    setContextMenu({ show: true, x: left, y: top, msgIndex, sender });
  };

  const handleReplyClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const targetMessage = messages[contextMenu.msgIndex];
    if (targetMessage) {
      const isMe = targetMessage.sender === 'me';
      setReplyTo({
        sender: isMe ? 'Vous' : (targetMessage.senderName || activeChat.name),
        text: targetMessage.text,
        isMe,
      });
    }
    setContextMenu((current) => ({ ...current, show: false }));
    document.getElementById('chat-input')?.focus();
  };

  const handleDeleteMessage = (msgIndex) => {
    setChatMessages((current) => {
      const activeMsgs = current[activeChat.id] || [];
      const updatedMsgs = activeMsgs.filter((_, idx) => idx !== msgIndex);
      return {
        ...current,
        [activeChat.id]: updatedMsgs,
      };
    });
    setContextMenu((current) => ({ ...current, show: false }));
  };

  const handleReportMessage = () => {
    setContextMenu((current) => ({ ...current, show: false }));
    setModalConfig({
      type: 'success',
      title: 'Message signalé',
      body: 'Le message a été signalé aux administrateurs pour modération.',
      confirmLabel: 'Fermer',
      onConfirm: () => {},
    });
  };

  const isMuted = mutedChats[activeChat?.id] || false;
  const isBlocked = blockedChats[activeChat?.id] || false;

  const handleMuteClick = () => {
    setShowHeaderActions(false);
    setModalConfig({
      type: 'info',
      title: isMuted ? 'Activer les notifications' : 'Désactiver les notifications',
      body: isMuted
        ? "Vous recevrez à nouveau des alertes sonores et visuelles pour les nouveaux messages de cette conversation."
        : "Vous ne recevrez plus d'alertes pour les nouveaux messages de cette conversation.",
      confirmLabel: isMuted ? 'Activer' : 'Désactiver',
      onConfirm: () => {
        setMutedChats((prev) => ({ ...prev, [activeChat.id]: !isMuted }));
      },
    });
  };

  const handleBlockClick = () => {
    setShowHeaderActions(false);
    setModalConfig({
      type: 'danger',
      title: isBlocked ? `Débloquer la conversation` : `Bloquer la conversation`,
      body: isBlocked
        ? `Êtes-vous sûr de vouloir débloquer cette conversation ? Vous pourrez à nouveau envoyer et recevoir des messages.`
        : `Êtes-vous sûr de vouloir bloquer cette conversation ? Ses messages n'apparaîtront plus et vous ne pourrez plus la contacter.`,
      confirmLabel: isBlocked ? 'Débloquer' : 'Bloquer',
      onConfirm: () => {
        setBlockedChats((prev) => ({ ...prev, [activeChat.id]: !isBlocked }));
      },
    });
  };

  const defaultMenuOptions = [
    {
      label: isMuted ? 'Activer les notifications' : 'Désactiver les notifications',
      icon: isMuted ? <Bell className="h-4 w-4 text-slate-400" /> : <BellOff className="h-4 w-4 text-slate-400" />,
      onClick: handleMuteClick,
    },
    {
      label: isBlocked ? 'Débloquer la conversation' : 'Bloquer la conversation',
      icon: <Ban className="h-4 w-4 text-red-500" />,
      danger: true,
      onClick: handleBlockClick,
    },
  ];

  const menuOptions = headerMenuOptions && headerMenuOptions.length > 0 ? headerMenuOptions : defaultMenuOptions;

  return (
    <div className="flex flex-1 overflow-hidden h-full bg-white relative">
      <style>{`.chat-scroll::-webkit-scrollbar{width:6px}.chat-scroll::-webkit-scrollbar-track{background:transparent}.chat-scroll::-webkit-scrollbar-thumb{background-color:#cbd5e1;border-radius:10px}`}</style>

      <div className="w-full sm:w-1/3 md:w-80 border-r border-slate-200 flex flex-col bg-slate-50 flex-shrink-0">
        <div className="p-4 border-b border-slate-200 bg-white">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input type="text" className="block w-full rounded-md border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border shadow-sm" placeholder="Rechercher une conversation..." />
          </div>

          <div className="mt-4 flex space-x-1 rounded-md bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded py-1.5 text-xs font-medium ${tab.className || 'flex-1'} ${activeTab === tab.id ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto chat-scroll p-2 space-y-1">
          {filteredChats.map((chat) => (
            <ChatListItem key={chat.id} chat={chat} isActive={activeChat?.id === chat.id} onClick={() => setActiveChatId(chat.id)} />
          ))}
          {filteredChats.length === 0 && (
            <div className="p-4 text-center text-sm text-slate-500">Aucun contact trouvé.</div>
          )}
        </div>
      </div>

      {activeChat ? (
        <div className="hidden sm:flex flex-row flex-1 bg-white relative overflow-hidden">
          <div className="flex flex-col flex-1 bg-white relative overflow-hidden min-w-0">
            <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 bg-white">
              <div className="flex items-center">
                <ChatAvatar chat={activeChat} />
                <div className="ml-3">
                  <p className="text-sm font-bold text-slate-900">{activeChat.headerName || activeChat.name}</p>
                  <p className="text-xs text-brand-600 font-medium">{activeChat.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 relative">
                <button
                  type="button"
                  onClick={() => setShowInfoPanel((prev) => !prev)}
                  title="Informations"
                  className={`rounded-full p-2 focus:outline-none ${showInfoPanel ? 'bg-brand-50 text-brand-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                >
                  <Info className="h-5 w-5" />
                </button>
                <HeaderMenu options={menuOptions} open={showHeaderActions} onToggle={() => setShowHeaderActions((value) => !value)} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 chat-scroll bg-slate-50 flex flex-col">
              <div className="flex justify-center mb-4">
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-500">Aujourd'hui</span>
              </div>
              <div className="flex flex-col">
                {messages.map((message, index) => (
                  <MessageBubble
                    key={message.id || `${activeChat.id}-${index}`}
                    chat={activeChat}
                    message={message}
                    previousMessage={messages[index - 1]}
                    index={index}
                    onContextMenu={handleContextMenu}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-slate-200 bg-white p-2 sm:p-4 shrink-0 flex flex-col relative z-20">
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

              {selectedFile && (
                <div className="mb-2 rounded-lg p-2 border-l-4 relative flex items-center justify-between shadow-sm border border-slate-200 bg-slate-50/80 border-brand-500">
                  <div className="flex items-center min-w-0 pr-4">
                    <div className="p-1.5 rounded bg-brand-50 text-brand-600 mr-2.5 shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-800 block truncate">{selectedFile.name}</span>
                      <span className="text-[10px] text-slate-500 block">{selectedFile.size}</span>
                    </div>
                  </div>
                  <button type="button" onClick={() => setSelectedFile(null)} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-200 focus:outline-none transition">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                <button
                  type="button"
                  onClick={() => document.getElementById('chat-file-input')?.click()}
                  title="Ajouter une pièce jointe"
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-600 transition focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                </button>
                <input
                  type="file"
                  id="chat-file-input"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="flex-1">
                  <textarea
                    id="chat-input"
                    rows="1"
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        handleSendMessage(event);
                      }
                    }}
                    className="block w-full resize-none rounded-xl border-slate-300 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-3 px-4 border shadow-sm max-h-32"
                    placeholder={placeholder}
                  ></textarea>
                </div>
                <button type="submit" disabled={!newMessage.trim() && !selectedFile} className="inline-flex items-center justify-center rounded-full bg-brand-600 p-3 text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition shadow-sm disabled:opacity-50">
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          {showInfoPanel && (
            <div className="w-80 border-l border-slate-200 bg-white flex flex-col shrink-0 animate-slide-in">
              <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 bg-white">
                <h3 className="text-sm font-bold text-slate-900">Détails</h3>
                <button
                  type="button"
                  onClick={() => setShowInfoPanel(false)}
                  className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6 chat-scroll">
                <div className="flex flex-col items-center text-center space-y-3">
                  <ChatAvatar chat={activeChat} />
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{activeChat.headerName || activeChat.name}</h4>
                    <p className="text-xs text-brand-600 font-medium">{activeChat.role}</p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Statut</h5>
                  <div className="mt-2 flex items-center space-x-2 text-sm text-slate-600">
                    <span className={`h-2.5 w-2.5 rounded-full ${activeChat.status === 'online' ? 'bg-green-400' : 'bg-slate-300'}`}></span>
                    <span>{activeChat.status === 'online' ? 'En ligne' : 'Hors ligne'}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">À propos</h5>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {activeChat.isGroup
                      ? "Groupe d'équipe pour la collaboration et l'échange de ressources avec le mentor."
                      : "Conversation privée pour le mentorat direct et le suivi individuel."}
                  </p>
                </div>

                {activeChat.isGroup && (
                  <div className="border-t border-slate-200 pt-4">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Membres</h5>
                    <div className="mt-3 space-y-3">
                      {[
                        { name: 'Moussa Diop', title: 'Développeur Fullstack', leader: true },
                        { name: 'Aisha Fall', title: 'UX/UI Designer' },
                        { name: 'Kofi Mensah', title: 'Data Engineer' },
                        { name: 'Amadou Diallo', title: 'Développeur Mobile' }
                      ].map((m) => (
                        <div key={m.name} className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold border border-emerald-100">
                            {m.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                              {m.name} {m.leader && <span className="ml-1 text-[9px] bg-amber-100 text-amber-800 font-bold px-1 py-0.5 rounded">Lead</span>}
                            </p>
                            <p className="text-xs text-slate-500 truncate">{m.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!activeChat.isGroup && (
                  <div className="border-t border-slate-200 pt-4 space-y-3 text-sm">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Email</span>
                      <span className="text-slate-600 font-medium block mt-0.5 truncate">
                        {activeChat.id === 'techhub' ? 'contact@techhub.sn' : 'paul.diop@codetowin.com'}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Région</span>
                      <span className="text-slate-600 font-medium block mt-0.5">Afrique de l'Ouest</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="hidden sm:flex flex-1 items-center justify-center bg-slate-50">
          <div className="text-center text-slate-500">
            <p>Sélectionnez une conversation pour commencer</p>
          </div>
        </div>
      )}

      {contextMenu.show && (
        <div
          className="absolute z-[100] w-56 rounded-lg bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] ring-1 ring-slate-200 transition-opacity"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 bg-slate-50/50 rounded-t-lg">
            {['👍', '❤️', '😂', '😮', '🙏'].map((emoji) => (
              <button key={emoji} type="button" onClick={() => setContextMenu((current) => ({ ...current, show: false }))} className="hover:scale-125 transition-transform text-lg focus:outline-none">{emoji}</button>
            ))}
            <button
              type="button"
              onClick={() => setContextMenu((current) => ({ ...current, show: false }))}
              className="text-slate-400 hover:text-slate-600 rounded-full p-1 hover:bg-slate-200 focus:outline-none"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="py-1">
            <button type="button" onClick={handleReplyClick} className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none">
              <CornerUpLeft className="mr-3 h-4 w-4 text-slate-400" />
              Répondre
            </button>
            <div className="border-t border-slate-100 my-1"></div>
            {contextMenu.sender !== 'me' && (
              <button type="button" onClick={handleReportMessage} className="flex w-full items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none">
                <Flag className="mr-3 h-4 w-4 text-slate-400" />
                Signaler
              </button>
            )}
            <button type="button" onClick={() => handleDeleteMessage(contextMenu.msgIndex)} className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 focus:outline-none">
              <Trash2 className="mr-3 h-4 w-4 text-red-500" />
              Supprimer
            </button>
          </div>
        </div>
      )}

      {modalConfig && (
        <div className="absolute inset-0 z-[150] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">{modalConfig.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{modalConfig.body}</p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none"
                onClick={() => setModalConfig(null)}
              >
                Annuler
              </button>
              <button
                type="button"
                className={`rounded-md px-4 py-2 text-sm font-semibold text-white focus:outline-none ${modalConfig.type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-brand-600 hover:bg-brand-700'}`}
                onClick={() => {
                  modalConfig.onConfirm();
                  setModalConfig(null);
                }}
              >
                {modalConfig.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

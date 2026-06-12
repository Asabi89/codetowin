import React from 'react';
import ChatAvatar from './ChatAvatar';
import ChatStatus from './ChatStatus';

export default function ChatListItem({ chat, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center rounded-lg p-3 text-left ${isActive ? 'bg-brand-50' : 'hover:bg-slate-100'}`}
    >
      <div className="relative">
        <ChatAvatar chat={chat} />
        <ChatStatus status={chat.status} />
      </div>
      <div className="ml-3 flex-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-slate-900">{chat.name}</p>
          <p className={`shrink-0 text-xs ${chat.unread > 0 ? 'text-brand-600 font-semibold' : 'text-slate-500'}`}>{chat.lastTime}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className={`truncate text-sm ${chat.unread > 0 ? 'font-medium text-slate-900' : 'text-slate-500'}`}>{chat.lastMessage}</p>
          {chat.unread > 0 && (
            <span className="inline-flex items-center justify-center rounded-full bg-brand-500 px-2 py-0.5 text-xs font-bold text-white">
              {chat.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

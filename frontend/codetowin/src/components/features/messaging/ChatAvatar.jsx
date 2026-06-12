import React from 'react';

export default function ChatAvatar({ chat, size = 'h-10 w-10' }) {
  if (!chat) return null;

  if (chat.isGroup || !chat.avatar?.startsWith('http')) {
    return (
      <div className={`flex ${size} flex-shrink-0 items-center justify-center rounded-full ${chat.avatarBgColor || 'bg-brand-100'} ${chat.avatarTextColor || 'text-brand-700'} border ${chat.avatarBorderColor || 'border-transparent'}`}>
        <span className="font-bold text-sm">{chat.avatar || chat.initials}</span>
      </div>
    );
  }

  return <img className={`${size} rounded-full object-cover`} src={chat.avatar} alt="" />;
}

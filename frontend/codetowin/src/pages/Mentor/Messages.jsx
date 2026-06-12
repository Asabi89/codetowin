import React, { useState, useEffect } from 'react';
import ChatLayout from '../../components/features/messaging/ChatLayout';
import { messagesApi } from '../../api/messages';
import { MENTOR_TABS_MOCK, MENTOR_CHATS_MOCK } from '../../mockdata/mentor';
import { extractArray, normalizeConversation } from '../../services/normalizers';
import { useRoleConversations } from '../../hooks/useRoleConversations';

export default function MentorMessages() {
  const { tabs, chats, loading } = useRoleConversations('mentor', { mockChats: MENTOR_CHATS_MOCK, mockTabs: MENTOR_TABS_MOCK });

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement de votre messagerie...</p>
        </div>
      </div>
    );
  }

  return (
    <ChatLayout
      tabs={tabs}
      chats={chats}
      initialTab="equipes"
      initialChatId="ecopay"
      onSendMessage={(conversationId, message) => messagesApi.sendMessage(conversationId, { content: message.text, reply_to: message.replyTo })}
    />
  );
}


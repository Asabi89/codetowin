import { apiClient } from './client';

export const messagesApi = {
  getConversations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/messages/conversations${query ? `?${query}` : ''}`);
  },

  getMessages: (conversationId) => apiClient.get(`/messages/conversations/${conversationId}`),

  sendMessage: (conversationId, data) => apiClient.post(`/messages/conversations/${conversationId}`, data),
};

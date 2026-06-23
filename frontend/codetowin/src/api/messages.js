import { apiClient } from './client';

export const messagesApi = {
  getConversations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/messages/conversations${query ? `?${query}` : ''}`);
  },

  getMessages: (conversationId) => apiClient.get(`/messages/conversations/${conversationId}`),

  sendMessage: (conversationId, data) => apiClient.post(`/messages`, { ...data, conversation: conversationId }),

  /**
   * Uploads a file for a message attachment
   */
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return await apiClient.post('/messages/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },

  /**
   * Bloque ou débloque une conversation
   */
  blockConversation: async (conversationId, data) => {
    return await apiClient.post(`/messages/conversations/${conversationId}/block`, data);
  },

  /**
   * Signale un message spécifique pour modération
   */
  reportMessage: async (messageId, data) => {
    return await apiClient.post(`/messages/${messageId}/report`, data);
  },
};

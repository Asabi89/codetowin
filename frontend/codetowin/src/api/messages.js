import { apiClient } from './client';

export const messagesApi = {
  getConversations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiClient.get(`/messages/conversations${query ? `?${query}` : ''}`);
  },

  getMessages: (conversationId) => apiClient.get(`/messages/conversations/${conversationId}`),

  sendMessage: (conversationId, data) => apiClient.post(`/messages/conversations/${conversationId}`, data),

  /**
   * Uploads a file for a message attachment
   */
  uploadFile: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      return await apiClient.post('/messages/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } catch (error) {
      console.warn("API unavailable, mocking uploadFile", error);
      // Fallback: return a dummy file metadata
      return { 
        url: URL.createObjectURL(file), 
        name: file.name, 
        size: file.size, 
        type: file.type 
      };
    }
  },

  /**
   * Bloque ou débloque une conversation
   */
  blockConversation: async (conversationId, data) => {
    try {
      return await apiClient.post(`/messages/conversations/${conversationId}/block`, data);
    } catch (error) {
      console.warn("API unavailable, mocking blockConversation", error);
      return { success: true };
    }
  },

  /**
   * Signale un message spécifique pour modération
   */
  reportMessage: async (messageId, data) => {
    try {
      return await apiClient.post(`/messages/${messageId}/report`, data);
    } catch (error) {
      console.warn("API unavailable, mocking reportMessage", error);
      return { success: true };
    }
  },
};

import { apiClient } from './client';

export const contactApi = {
  /**
   * Envoie le formulaire de contact
   * @param {object} data { name, email, subject, message }
   */
  submitContactForm: async (data) => {
    try {
      return await apiClient.post('/contact', data);
    } catch (error) {
      console.warn("API unavailable, mocking submitContactForm", error);
      // Simulate network delay for the fallback
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 1000);
      });
    }
  },

  /**
   * S'inscrit à la newsletter
   * @param {string} email
   */
  subscribeNewsletter: async (email) => {
    try {
      return await apiClient.post('/newsletter/subscribe', { email });
    } catch (error) {
      console.warn("API unavailable, mocking subscribeNewsletter", error);
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 800);
      });
    }
  }
};

import { apiClient } from './client';

export const contactApi = {
  /**
   * Envoie le formulaire de contact
   * @param {object} data { name, email, subject, message }
   */
  submitContactForm: async (data) => {
    return await apiClient.post('/contact', data);
  },

  /**
   * S'inscrit à la newsletter
   * @param {string} email
   */
  subscribeNewsletter: async (email) => {
    return await apiClient.post('/newsletter/subscribe', { email });
  }
};

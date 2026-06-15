import { apiClient } from './client';
import { participantNotifications } from '../mockdata/participant';

export const notificationsApi = {
  /**
   * Récupère toutes les notifications de l'utilisateur connecté
   */
  getNotifications: async () => {
    try {
      return await apiClient.get('/notifications');
    } catch (error) {
      console.warn("API unavailable, returning mock notifications", error);
      return participantNotifications;
    }
  },

  /**
   * Marque une notification spécifique comme lue
   * @param {string|number} id
   */
  markAsRead: async (id) => {
    try {
      return await apiClient.patch(`/notifications/${id}/read`);
    } catch (error) {
      console.warn("API unavailable, mocking markAsRead", error);
      return { success: true };
    }
  },

  /**
   * Marque toutes les notifications de l'utilisateur comme lues
   */
  markAllAsRead: async () => {
    try {
      return await apiClient.patch('/notifications/read-all');
    } catch (error) {
      console.warn("API unavailable, mocking markAllAsRead", error);
      return { success: true };
    }
  },
};

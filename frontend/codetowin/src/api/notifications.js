import { apiClient } from './client';
export const notificationsApi = {
  /**
   * Récupère toutes les notifications de l'utilisateur connecté
   */
  getNotifications: async () => {
    return await apiClient.get('/notifications');
  },

  /**
   * Marque une notification spécifique comme lue
   * @param {string|number} id
   */
  markAsRead: async (id) => {
    return await apiClient.patch(`/notifications/${id}/read`);
  },

  /**
   * Marque toutes les notifications de l'utilisateur comme lues
   */
  markAllAsRead: async () => {
    return await apiClient.patch('/notifications/read-all');
  },
};

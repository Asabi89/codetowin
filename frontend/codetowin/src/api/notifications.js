import { apiClient } from './client';

export const notificationsApi = {
  /**
   * Récupère toutes les notifications de l'utilisateur connecté
   */
  getNotifications: () => apiClient.get('/notifications'),

  /**
   * Marque une notification spécifique comme lue
   * @param {string|number} id
   */
  markAsRead: (id) => apiClient.patch(`/notifications/${id}/read`),

  /**
   * Marque toutes les notifications de l'utilisateur comme lues
   */
  markAllAsRead: () => apiClient.patch('/notifications/read-all'),
};

import { useState, useEffect } from 'react';
import { notificationsApi } from '../api/notifications';
import { extractArray, normalizeNotification } from '../services/normalizers';

/**
 * Hook pour charger et gérer les notifications d'un rôle.
 * 
 * @param {string} role - Le rôle ('mentor', 'organizer', 'participant')
 * @param {Array} mockData - Les données de repli si l'API échoue
 * @returns {Object} { notifications, unreadCount, markAllAsRead, loading }
 */
export function useNotifications(role, mockData = []) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await notificationsApi.getNotifications(role);
        const apiNotifications = extractArray(data);
        if (apiNotifications.length > 0) {
          setNotifications(apiNotifications.map(normalizeNotification));
        } else {
          setNotifications(mockData);
        }
      } catch (err) {
        console.warn(`Erreur lors de la récupération des notifications (${role})`, err);
        setNotifications(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [role]); // eslint-disable-line react-hooks/exhaustive-deps

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead(role);
      setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    } catch (err) {
      console.warn("Erreur lors du marquage comme lu via l'API, simulation locale", err);
      setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    }
  };

  return { notifications, unreadCount, markAllAsRead, loading };
}

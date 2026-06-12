import React, { useState, useEffect } from 'react';
import NotificationCenter from '../../components/features/notifications/NotificationCenter';
import { notificationsApi } from '../../api/notifications';
import { MENTOR_NOTIFICATIONS_MOCK } from '../../mockdata/mentor';
import { extractArray, normalizeNotification } from '../../services/normalizers';
import { useNotifications } from '../../hooks/useNotifications';

export default function MentorNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await notificationsApi.getNotifications();
        const apiNotifications = extractArray(data);
        if (apiNotifications.length > 0) {
          setNotifications(apiNotifications.map(normalizeNotification));
        } else {
          setNotifications(MENTOR_NOTIFICATIONS_MOCK);
        }
      } catch (err) {
        console.warn('Erreur lors du chargement des notifications depuis l\'API, utilisation du fallback.', err);
        setNotifications(MENTOR_NOTIFICATIONS_MOCK);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification) => {
    if (!notification.unread) return;
    try {
      await notificationsApi.markAsRead(notification.id);
    } catch (err) {
      console.warn('Erreur lors du marquage de la notification comme lue via l\'API, simulation locale.', err);
    } finally {
      setNotifications(prev => prev.map(item => (
        item.id === notification.id ? { ...item, unread: false } : item
      )));
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement de vos notifications...</p>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <NotificationCenter
      title="Vos Notifications"
      description="Restez informé de l'activité de vos équipes et des organisateurs."
      filters={['Toutes les notifications', `Non lues (${unreadCount})`, 'Équipes', 'Hackathons']}
      notifications={notifications}
      onNotificationClick={handleNotificationClick}
    />
  );
}


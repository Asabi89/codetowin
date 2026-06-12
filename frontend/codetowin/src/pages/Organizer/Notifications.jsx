import React, { useEffect, useState } from 'react';
import NotificationCenter from '../../components/features/notifications/NotificationCenter';
import { ORGANIZER_NOTIFICATIONS_MOCK } from '../../mockdata/organizer';
import { notificationsApi } from '../../api/notifications';
import { useNotifications } from '../../hooks/useNotifications';

export default function OrganizerNotifications() {
  const [notifications, setNotifications] = useState(ORGANIZER_NOTIFICATIONS_MOCK);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationsApi.getNotifications();
        if (Array.isArray(data) && data.length > 0) {
          setNotifications(data.map(notification => ({
            ...notification,
            unread: notification.unread ?? !notification.read_at,
            time: notification.time || notification.created_at || '',
            iconBg: notification.iconBg || 'bg-slate-100',
          })));
        } else {
          setNotifications(ORGANIZER_NOTIFICATIONS_MOCK);
        }
      } catch (err) {
        console.warn("Erreur lors du chargement des notifications via l'API, utilisation du fallback mocké.", err);
        setNotifications(ORGANIZER_NOTIFICATIONS_MOCK);
      }
    };
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification) => {
    if (!notification.unread) return;
    try {
      await notificationsApi.markAsRead(notification.id);
    } catch (err) {
      console.warn("Erreur lors du marquage de la notification comme lue via l'API, simulation locale.", err);
    } finally {
      setNotifications(prev => prev.map(item => (
        item.id === notification.id ? { ...item, unread: false } : item
      )));
    }
  };

  return (
    <NotificationCenter
      title="Vos Notifications"
      description="Restez informé de l'activité sur vos hackathons."
      filters={['Toutes les notifications', 'Non lues (3)', 'Mentors', 'Participants']}
      notifications={notifications}
      onNotificationClick={handleNotificationClick}
    />
  );
}

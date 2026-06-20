import React, { useEffect, useState } from 'react';
import NotificationCenter from '../../components/features/notifications/NotificationCenter';
import { notificationsApi } from '../../api/notifications';
import { useNotifications } from '../../hooks/useNotifications';

export default function OrganizerNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationsApi.getNotifications();
        if (Array.isArray(data)) {
          setNotifications(data.map(notification => ({
            ...notification,
            unread: notification.unread ?? !notification.read_at,
            time: notification.time || notification.created_at || '',
            iconBg: notification.iconBg || 'bg-slate-100',
          })));
        } else {
          setNotifications([]);
        }
      } catch (err) {
        console.warn("Erreur lors du chargement des notifications via l'API", err);
        setNotifications([]);
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

import React, { useState, useEffect } from "react";
import { Bell, CheckCircle2 } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import PageHeader from "../../components/common/PageHeader";
import { useToast } from "../../context/ToastContext";
import { notificationsApi } from "../../api/notifications";

export default function ParticipantNotifications() {
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await notificationsApi.getNotifications();
        setNotifications(data || []);
      } catch (err) {
        showToast("Erreur lors du chargement des notifications", "error");
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, [showToast]);

  const handleMarkAllAsRead = async () => {
    try {
      await notificationsApi.markAllAsRead();
      setNotifications(notifications.map(n => ({ ...n, unread: false })));
      showToast("Toutes les notifications sont marquées comme lues.", "success");
    } catch (err) {
      showToast("Erreur lors de l'action", "error");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-content flex h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement de vos notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <PageHeader
        title="Notifications"
        description="Annonces, deadlines, feedbacks, invitations d’équipe et certificats."
        actions={
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            Tout marquer comme lu
          </Button>
        }
      />
      <Card className="mt-6">
        <div className="divide-y divide-slate-100">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                <div className={`mt-1 rounded-full p-2 ${notification.unread ? "bg-brand-50 text-brand-700" : "bg-slate-100 text-slate-500"}`}>
                  {notification.unread ? <Bell className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-semibold text-slate-900">{notification.title}</h2>
                    <span className="text-xs text-slate-500">{notification.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{notification.body}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate-500">
              Aucune notification pour le moment.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

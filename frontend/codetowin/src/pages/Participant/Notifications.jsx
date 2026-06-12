import React from "react";
import { Bell, CheckCircle2 } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import PageHeader from "../../components/common/PageHeader";
import { participantNotifications } from "../../mockdata/participant";
import { useToast } from "../../context/ToastContext";

export default function ParticipantNotifications() {
  const { showToast } = useToast();

  return (
    <div className="dashboard-content">
      <PageHeader
        title="Notifications"
        description="Annonces, deadlines, feedbacks, invitations d’équipe et certificats."
        actions={
          <Button variant="outline" onClick={() => showToast("Toutes les notifications sont marquées comme lues.", "success")}>
            Tout marquer comme lu
          </Button>
        }
      />
      <Card className="mt-6">
        <div className="divide-y divide-slate-100">
          {participantNotifications.map((notification) => (
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
          ))}
        </div>
      </Card>
    </div>
  );
}

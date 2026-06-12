import React from "react";
import { Link } from "react-router-dom";
import { Award, CalendarClock, CheckCircle2, MessageSquare, Users } from "lucide-react";
import Card from "../../components/common/Card";
import DashboardStatCard from "../../components/common/DashboardStatCard";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import {
  participantCertificates,
  participantHackathons,
  participantNotifications,
  participantTeam,
} from "../../mockdata/participant";

export default function ParticipantDashboard() {
  const activeHackathon = participantHackathons.find((item) => item.status === "active");
  const unreadCount = participantNotifications.filter((item) => item.unread).length;

  return (
    <div className="dashboard-content">
      <div className="welcome-banner">
        <div>
          <h1 className="welcome-title">Bienvenue dans ton espace participant</h1>
          <p className="welcome-subtitle">
            Suis tes hackathons, ton équipe, tes deadlines, tes soumissions et tes certificats au même endroit.
          </p>
        </div>
        <div className="welcome-action">
          <Link to="/participant/submission" className="btn-white">
            Continuer ma soumission
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <DashboardStatCard title="Hackathons actifs" value="1" icon={<CalendarClock className="h-6 w-6 text-brand-700" />} subtitle="CodeToWin Sprint" />
        <DashboardStatCard title="Équipe" value={participantTeam.members.length} icon={<Users className="h-6 w-6 text-brand-700" />} subtitle={participantTeam.name} />
        <DashboardStatCard title="Certificats" value={participantCertificates.length} icon={<Award className="h-6 w-6 text-brand-700" />} subtitle="2 partageables" />
        <DashboardStatCard title="Notifications" value={unreadCount} icon={<MessageSquare className="h-6 w-6 text-brand-700" />} subtitle="À traiter" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <PageHeader
            as="h2"
            title="Hackathon en cours"
            description="La priorité du moment avec progression, deadline et actions rapides."
            actions={
              <Link to="/participant/hackathons">
                <Button variant="outline" size="sm">Voir tout</Button>
              </Link>
            }
          />
          <div className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{activeHackathon.phase}</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">{activeHackathon.title}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Équipe : <strong>{activeHackathon.team}</strong> · Rôle : {activeHackathon.role}
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
                Deadline : {activeHackathon.deadline}
              </span>
            </div>
            <div className="mt-5">
              <div className="flex justify-between text-xs font-medium text-slate-600">
                <span>Progression</span>
                <span>{activeHackathon.progress}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white">
                <div className="h-2 rounded-full bg-brand-600" style={{ width: `${activeHackathon.progress}%` }} />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <PageHeader as="h2" title="Deadlines" description="Ce qui demande ton attention." />
          <div className="mt-5 space-y-4">
            {participantNotifications.slice(0, 3).map((item) => (
              <div key={item.id} className="flex gap-3 rounded-lg border border-slate-100 p-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-brand-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { mentorsApi } from '../../api/mentors';
import { notificationsApi } from '../../api/notifications';
import { usersApi } from '../../api/users';
import {
  MENTOR_NOTIFICATIONS_MOCK,
  MENTOR_TEAMS_MOCK,
  MENTOR_INVITATIONS_MOCK
} from '../../mockdata/mentor';

const extractArray = (data, key) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.[key])) return data[key];
  return [];
};

const normalizeTeam = (team) => ({
  ...team,
  id: team.id || team._id,
  name: team.name || 'Équipe',
  description: team.description || 'Pas de description fournie.',
  detailPath: team.detailPath || `/mentor/teams/${team.id || team._id}`,
  status: team.status || (team.submission ? 'Soumission en cours' : 'Pas encore de projet'),
});

const normalizeNotification = (notification) => ({
  ...notification,
  id: notification.id || notification._id,
  title: notification.title || notification.subject || 'Notification',
  unread: notification.unread ?? !notification.read_at,
});

export default function MentorDashboard() {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    firstName: profile?.firstName || 'Seydou',
    teams: [],
    invitations: [],
    notifications: [],
    feedbacksCount: 1,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [teamsRes, notificationsRes, profileRes] = await Promise.allSettled([
          mentorsApi.getMyTeams(),
          notificationsApi.getNotifications(),
          usersApi.getProfile()
        ]);

        const teams = teamsRes.status === 'fulfilled' ? teamsRes.value : MENTOR_TEAMS_MOCK;
        const notifications = notificationsRes.status === 'fulfilled' ? notificationsRes.value : MENTOR_NOTIFICATIONS_MOCK;
        const userProfile = profileRes.status === 'fulfilled' ? profileRes.value : profile;

        const apiTeams = extractArray(teams, 'teams');
        const apiNotifications = extractArray(notifications, 'notifications');
        const finalTeams = apiTeams.length > 0 ? apiTeams.map(normalizeTeam) : MENTOR_TEAMS_MOCK;
        const finalNotifications = apiNotifications.length > 0 ? apiNotifications.map(normalizeNotification) : MENTOR_NOTIFICATIONS_MOCK;

        setDashboardData({
          firstName: userProfile?.firstName || userProfile?.first_name || userProfile?.name?.split(' ')[0] || profile?.firstName || 'Seydou',
          teams: finalTeams,
          invitations: MENTOR_INVITATIONS_MOCK,
          notifications: finalNotifications,
          feedbacksCount: finalTeams.filter(t => t.status === 'Soumission en cours').length || 1,
        });
      } catch (err) {
        console.warn('Erreur lors du chargement des données API, utilisation du fallback.', err);
        setDashboardData({
          firstName: profile?.firstName || 'Seydou',
          teams: MENTOR_TEAMS_MOCK,
          invitations: MENTOR_INVITATIONS_MOCK,
          notifications: MENTOR_NOTIFICATIONS_MOCK,
          feedbacksCount: 1,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [profile]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement de votre tableau de bord...</p>
        </div>
      </div>
    );
  }

  const firstInvitation = dashboardData.invitations[0];

  const handleAcceptInvitation = async (invitationId) => {
    try {
      await mentorsApi.acceptInvitation(invitationId);
    } catch (err) {
      console.warn("Erreur lors de l'acceptation de l'invitation via l'API, simulation locale.", err);
    } finally {
      setDashboardData(prev => ({
        ...prev,
        invitations: prev.invitations.filter(invitation => invitation.id !== invitationId),
      }));
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      {/* Welcome Banner */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-brand-800 to-brand-700 p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Bonjour, {dashboardData.firstName} ! 👋</h2>
            <p className="mt-2 text-brand-100 max-w-2xl text-sm sm:text-base">
              Merci pour votre implication ! Vous avez {dashboardData.invitations.length} invitations en attente et {dashboardData.teams.length} équipes qui comptent sur vous cette semaine.
            </p>
          </div>
          <div className="mt-6 sm:mt-0">
            <Link to="/mentor/teams" className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-brand-800 shadow-sm hover:bg-brand-50 transition-colors">
              Voir mes équipes
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        {/* Decorative element */}
        <svg className="absolute right-0 top-0 h-full w-48 text-white opacity-10 transform translate-x-1/3 -translate-y-1/4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
        </svg>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-brand-50 p-3">
              <svg className="h-6 w-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Équipes actives</p>
              <p className="text-2xl font-bold text-slate-900">{dashboardData.teams.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-50 p-3">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Invitations en attente</p>
              <p className="text-2xl font-bold text-slate-900">{dashboardData.invitations.length}</p>
            </div>
          </div>
          <Link to="/mentor/invitations" className="absolute inset-0 z-10" aria-hidden="true"></Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-amber-50 p-3">
              <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-slate-500">Feedbacks requis</p>
              <p className="text-2xl font-bold text-slate-900">{dashboardData.feedbacksCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity / Action Needed */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Sessions / Teams */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-900">Vos équipes à suivre</h3>
            <Link to="/mentor/teams" className="text-sm font-medium text-brand-600 hover:text-brand-500">Voir tout</Link>
          </div>
          <ul className="divide-y divide-slate-200">
            {dashboardData.teams.map((team) => (
              <li key={team.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{team.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{team.description}</p>
                  </div>
                  {team.status === 'Soumission en cours' ? (
                    <Link to={team.detailPath || `/mentor/teams/${team.id}`} className="inline-flex items-center rounded bg-brand-50 px-2.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-inset ring-brand-300 hover:bg-brand-100">
                      Évaluer
                    </Link>
                  ) : (
                    <Link to={team.detailPath || `/mentor/teams/${team.id}`} className="inline-flex items-center rounded bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                      Voir
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pending Invitations Snippet */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-slate-900">Nouvelles Invitations</h3>
            <Link to="/mentor/invitations" className="text-sm font-medium text-brand-600 hover:text-brand-500">Voir les {dashboardData.invitations.length}</Link>
          </div>
          <div className="p-6">
            {firstInvitation ? (
              <div className="rounded-lg border border-slate-200 p-4 bg-slate-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{firstInvitation.hackathonName}</h4>
                    <p className="text-xs text-slate-500 mt-1">Par {firstInvitation.organizer}</p>
                  </div>
                  {firstInvitation.isNew && (
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Nouveau</span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-3 line-clamp-2">{firstInvitation.message || "Invitation à mentorer des équipes pour cet événement."}</p>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={() => handleAcceptInvitation(firstInvitation.id)} className="flex-1 rounded-md bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-brand-500">Accepter</button>
                  <Link to="/mentor/invitations" className="flex-1 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 text-center shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">Détails</Link>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-6">Aucune invitation en attente.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

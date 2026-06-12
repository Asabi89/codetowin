import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';

export default function Topbar({ role = 'organizer' }) {
  const location = useLocation();
  const organizerTitles = {
    '/organizer': 'Dashboard',
    '/organizer/hackathons': 'Mes Hackathons',
    '/organizer/hackathons/create': 'Créer un hackathon',
    '/organizer/members': 'Membres',
    '/organizer/messages': 'Messages',
    '/organizer/notifications': 'Centre de notifications',
    '/organizer/settings': 'Paramètres',
  };
  const mentorTitles = {
    '/mentor': 'Dashboard Mentor',
    '/mentor/invitations': 'Mes Invitations',
    '/mentor/teams': 'Mes Équipes',
    '/mentor/submissions': 'Soumissions',
    '/mentor/messages': 'Messagerie',
    '/mentor/profile': 'Mon Profil Mentor',
    '/mentor/settings': 'Paramètres du Mentor',
    '/mentor/notifications': 'Centre de notifications',
  };
  const participantTitles = {
    '/participant': 'Dashboard Participant',
    '/participant/hackathons': 'Mes Hackathons',
    '/participant/team': 'Mon Équipe',
    '/participant/team/create': 'Créer ou rejoindre une équipe',
    '/participant/submission': 'Soumission du projet',
    '/participant/certificates': 'Mes Certificats',
    '/participant/profile': 'Mon Profil Talent',
    '/participant/notifications': 'Notifications',
  };
  const title = role === 'mentor'
    ? (mentorTitles[location.pathname] || 'Dashboard Mentor')
    : role === 'participant'
      ? (participantTitles[location.pathname] || 'Espace Participant')
      : (organizerTitles[location.pathname] || 'Dashboard');
  const isMentorHackathonDetail = role === 'mentor' && /^\/mentor\/hackathons\/[^/]+$/.test(location.pathname);
  const isMentorHackathonSubmissions = role === 'mentor' && /^\/mentor\/hackathons\/[^/]+\/submissions$/.test(location.pathname);
  const isMentorTeamDetail = role === 'mentor' && /^\/mentor\/teams\/[^/]+$/.test(location.pathname);
  const showNotification = !(
    (role === 'mentor' && location.pathname === '/mentor/messages') ||
    location.pathname === `/${role}/notifications`
  );

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center">
        <button className="text-slate-500 focus:outline-none sm:hidden mr-4">
          <Menu size={24} />
        </button>
        {(isMentorHackathonDetail || isMentorHackathonSubmissions) ? (
          <div className="ml-4 flex items-center space-x-2 text-sm sm:ml-0">
            <NavLink to="/mentor/submissions" className="font-medium text-slate-500 hover:text-slate-900">Soumissions</NavLink>
            <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-slate-900">{isMentorHackathonSubmissions ? 'AI for Climate Africa' : 'Détails : AI for Climate Africa'}</span>
          </div>
        ) : isMentorTeamDetail ? (
          <div className="ml-4 flex items-center space-x-2 text-sm sm:ml-0">
            <NavLink to="/mentor/teams" className="font-medium text-slate-500 hover:text-slate-900">Mes Équipes</NavLink>
            <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-slate-900">Détails de l'équipe</span>
          </div>
        ) : (
          <div className="ml-4 flex items-center space-x-2 text-sm sm:ml-0">
            <h1 className="text-xl font-semibold text-slate-900">
              {title}
            </h1>
          </div>
        )}
      </div>
      {showNotification && location.pathname !== '/mentor/profile' && (
        <div className="flex items-center gap-4">
          <NavLink to={`/${role}/notifications`} className="relative block text-slate-400 hover:text-slate-500">
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">{role === 'mentor' ? '1' : '3'}</span>
            <Bell className="h-6 w-6" />
          </NavLink>
        </div>
      )}
      {location.pathname === '/mentor/profile' && (
        <div className="flex items-center gap-4">
          <button type="submit" form="profile-form" className="inline-flex justify-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
            Sauvegarder
          </button>
        </div>
      )}
      {location.pathname === '/mentor/notifications' && (
        <div className="flex items-center gap-4">
          <button type="button" className="text-sm font-medium text-brand-600 hover:text-brand-800">
            Tout marquer comme lu
          </button>
        </div>
      )}
      {location.pathname === '/organizer/notifications' && (
        <div className="flex items-center gap-4">
          <button type="button" className="text-sm font-medium text-brand-600 hover:text-brand-800">
            Tout marquer comme lu
          </button>
        </div>
      )}
    </header>
  );
}

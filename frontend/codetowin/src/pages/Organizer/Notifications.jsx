import React from 'react';
import { UserPlus, UserCheck, Users, FileText, Bell } from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'registration',
    title: 'Nouvelle inscription participant',
    time: 'Il y a 10 min',
    description: (
      <>
        <strong>Fatou Ndiaye</strong> vient de s'inscrire au hackathon <span className="font-medium">"Fintech Builders Challenge"</span>. Son profil est en attente de validation.
      </>
    ),
    icon: <UserPlus className="h-5 w-5 text-blue-600" />,
    iconBg: 'bg-blue-100',
    unread: true,
    actions: true,
  },
  {
    id: 2,
    type: 'mentor_accept',
    title: 'Invitation Mentor acceptée',
    time: 'Il y a 1 heure',
    description: (
      <>
        <strong>Dr. Ousmane Diop</strong> a accepté votre invitation pour être mentor sur le hackathon <span className="font-medium">"AI for Climate Africa"</span>.
      </>
    ),
    icon: <UserCheck className="h-5 w-5 text-green-600" />,
    iconBg: 'bg-green-100',
    unread: true,
  },
  {
    id: 3,
    type: 'team_created',
    title: 'Nouvelle équipe formée',
    time: 'Il y a 3 heures',
    description: (
      <>
        L'équipe <strong>"AgriTech Innovators"</strong> (4 membres) vient d'être créée pour le hackathon <span className="font-medium">"AI for Climate Africa"</span>.
      </>
    ),
    icon: <Users className="h-5 w-5 text-purple-600" />,
    iconBg: 'bg-purple-100',
    unread: true,
    viewTeam: true,
  },
  {
    id: 4,
    type: 'submission',
    title: 'Nouvelle soumission de projet',
    time: 'Hier',
    description: (
      <>
        L'équipe <strong>"CodeMakers"</strong> a soumis son projet <em>"EcoTrade App"</em>. Il est prêt à être évalué.
      </>
    ),
    icon: <FileText className="h-5 w-5 text-slate-500" />,
    iconBg: 'bg-slate-100',
    unread: false,
  },
  {
    id: 5,
    type: 'reminder',
    title: 'Rappel événementiel',
    time: 'Il y a 2 jours',
    description: (
      <>
        Le hackathon <strong>"AI for Climate Africa"</strong> se termine dans 48 heures. Pensez à envoyer une annonce de rappel aux participants.
      </>
    ),
    icon: <Bell className="h-5 w-5 text-slate-500" />,
    iconBg: 'bg-slate-100',
    unread: false,
  },
];

export default function OrganizerNotifications() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center">
          <button className="text-slate-500 focus:outline-none sm:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="ml-4 flex items-center space-x-2 text-sm sm:ml-0">
            <span className="font-medium text-slate-900">Centre de notifications</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="text-sm font-medium text-brand-600 hover:text-brand-800">
            Tout marquer comme lu
          </button>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
        
        <div className="mx-auto max-w-4xl">
          <div className="sm:flex sm:items-center sm:justify-between mb-6">
            <div className="sm:flex-auto">
              <h1 className="font-display text-2xl font-bold text-slate-900">Vos Notifications</h1>
              <p className="mt-2 text-sm text-slate-700">Restez informé de l'activité sur vos hackathons.</p>
            </div>
            
            {/* Filters */}
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <select className="block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border shadow-sm">
                <option>Toutes les notifications</option>
                <option>Non lues (3)</option>
                <option>Mentors</option>
                <option>Participants</option>
              </select>
            </div>
          </div>

          {/* Notification List */}
          <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-slate-200">
            <ul role="list" className="divide-y divide-slate-200">
              {NOTIFICATIONS.map((notif) => (
                <li key={notif.id} className={`transition cursor-pointer relative ${notif.unread ? 'bg-brand-50/50 hover:bg-brand-50/80' : 'hover:bg-slate-50'}`}>
                  {/* Unread dot */}
                  {notif.unread && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500"></div>
                  )}
                  
                  <div className="px-4 py-5 sm:px-6 flex items-start">
                    <div className="flex-shrink-0 pt-1">
                      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${notif.iconBg}`}>
                        {notif.icon}
                      </span>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${notif.unread ? 'text-slate-900' : 'text-slate-700'}`}>{notif.title}</p>
                        <p className={`text-sm ${notif.unread ? 'text-brand-600 font-semibold' : 'text-slate-500'}`}>{notif.time}</p>
                      </div>
                      <p className={`mt-1 text-sm ${notif.unread ? 'text-slate-600' : 'text-slate-500'}`}>
                        {notif.description}
                      </p>
                      
                      {notif.actions && (
                        <div className="mt-3 flex space-x-3">
                          <button type="button" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                            Voir le profil
                          </button>
                          <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-brand-600 px-3 py-1 text-xs font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                            Approuver
                          </button>
                        </div>
                      )}
                      
                      {notif.viewTeam && (
                        <div className="mt-3">
                          <button type="button" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                            Voir l'équipe
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-4 flex justify-center">
            <button type="button" className="text-sm font-medium text-brand-600 hover:text-brand-800 bg-white border border-slate-200 px-4 py-2 rounded-md shadow-sm">
              Charger plus de notifications
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}

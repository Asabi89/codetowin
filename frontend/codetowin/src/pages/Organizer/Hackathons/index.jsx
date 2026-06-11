import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trophy, FileText, Clock, CheckCircle } from 'lucide-react';

const HACKATHONS_DATA = [
  {
    id: 1,
    title: 'AI for Climate Africa',
    type: 'Hybride',
    location: 'Dakar',
    status: 'publie',
    participants: 89,
    teams: 14,
    submissions: '-',
    deadline: 'Dans 12 jours',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    iconColor: 'text-brand-700',
    iconBg: 'bg-brand-100',
  },
  {
    id: 2,
    title: 'Fintech Builders Challenge',
    type: 'En ligne',
    location: '',
    status: 'brouillon',
    participants: '-',
    teams: '-',
    submissions: '-',
    deadline: 'Pas de date',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconColor: 'text-slate-500',
    iconBg: 'bg-slate-100',
  },
  {
    id: 3,
    title: 'AgriTech Youth Hack',
    type: 'Hybride',
    location: 'Abidjan',
    status: 'attente',
    participants: 12,
    teams: 2,
    submissions: '-',
    deadline: 'Dans 3 jours',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconColor: 'text-amber-700',
    iconBg: 'bg-amber-100',
  },
  {
    id: 4,
    title: 'HealthTech Dakar 2025',
    type: 'Présentiel',
    location: 'Dakar',
    status: 'termine',
    participants: 146,
    teams: 22,
    submissions: 18,
    deadline: 'Passée',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    iconColor: 'text-blue-700',
    iconBg: 'bg-blue-100',
  },
];

const TABS = [
  { id: 'all', label: 'Tous', count: 4 },
  { id: 'publie', label: 'Publiés', count: 1 },
  { id: 'brouillon', label: 'Brouillons', count: 1 },
  { id: 'attente', label: 'En attente', count: 1 },
  { id: 'termine', label: 'Terminés', count: 1 },
];

const STATUS_BADGE_MAP = {
  publie: { label: 'Publié', classes: 'bg-green-100 text-green-800' },
  brouillon: { label: 'Brouillon', classes: 'bg-slate-100 text-slate-800' },
  attente: { label: 'En attente', classes: 'bg-amber-100 text-amber-800' },
  termine: { label: 'Terminé', classes: 'bg-blue-100 text-blue-800' },
};

const OrganizerHackathons = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHackathons = HACKATHONS_DATA.filter((hackathon) => {
    const matchesTab = activeTab === 'all' || hackathon.status === activeTab;
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="font-display text-2xl font-bold text-slate-900">Mes Hackathons</h1>
          <p className="mt-2 text-sm text-slate-700">Gérez vos événements, suivez les inscriptions et accédez aux soumissions des équipes.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 sm:flex sm:items-center sm:justify-between">
        <div className="hidden sm:block overflow-x-auto pb-2 sm:pb-0">
          <nav className="flex space-x-4" aria-label="Tabs">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-md px-3 py-2 text-sm font-medium ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {tab.label}
                  <span className={`ml-2 rounded-full py-0.5 px-2.5 text-xs font-medium ${isActive ? 'bg-slate-200 text-slate-900' : 'bg-slate-100 text-slate-900'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="mt-4 sm:mt-0 flex gap-2">
          <div className="relative rounded-md shadow-sm flex-1 sm:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border"
              placeholder="Rechercher..."
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden rounded-xl shadow ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-slate-300 bg-white">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">Hackathon</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Statut</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Participants</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Équipes</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Soumissions</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Deadline</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredHackathons.map((hackathon) => {
                    const statusConfig = STATUS_BADGE_MAP[hackathon.status];
                    return (
                      <tr key={hackathon.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className={`flex h-10 w-10 items-center justify-center rounded ${hackathon.iconBg} ${hackathon.iconColor}`}>
                                {hackathon.icon}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-slate-900">{hackathon.title}</div>
                              <div className="text-slate-500">
                                {hackathon.type} {hackathon.location ? `· ${hackathon.location}` : ''}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusConfig.classes}`}>
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{hackathon.participants}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{hackathon.teams}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{hackathon.submissions}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{hackathon.deadline}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {hackathon.status === 'brouillon' ? (
                            <Link to={`/organizer/hackathons/edit/${hackathon.id}`} className="text-brand-600 hover:text-brand-900">Éditer<span className="sr-only">, {hackathon.title}</span></Link>
                          ) : hackathon.status === 'termine' ? (
                            <Link to={`/organizer/hackathons/${hackathon.id}/results`} className="text-brand-600 hover:text-brand-900">Résultats<span className="sr-only">, {hackathon.title}</span></Link>
                          ) : (
                            <Link to={`/organizer/hackathons/${hackathon.id}/participants`} className="text-brand-600 hover:text-brand-900">Gérer<span className="sr-only">, {hackathon.title}</span></Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredHackathons.length === 0 && (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-sm text-slate-500">
                        Aucun hackathon ne correspond à votre recherche.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerHackathons;

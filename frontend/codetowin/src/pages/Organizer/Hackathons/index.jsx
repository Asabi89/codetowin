import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trophy, FileText, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '../../../components/common/Badge';

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
    icon: Trophy,
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
    icon: FileText,
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
    icon: Clock,
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
    icon: CheckCircle,
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
  publie: { label: 'Publié', variant: 'success' },
  brouillon: { label: 'Brouillon', variant: 'default' },
  attente: { label: 'En attente', variant: 'warning' },
  termine: { label: 'Terminé', variant: 'info' },
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
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="font-display text-2xl font-bold text-slate-900">Mes Hackathons</h1>
          <p className="mt-2 text-sm text-slate-700">
            Gérez vos événements, suivez les inscriptions et accédez aux soumissions des équipes.
          </p>
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
                  className={`rounded-md px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-2 rounded-full py-0.5 px-2.5 text-xs font-medium ${
                      isActive ? 'bg-slate-200 text-slate-900' : 'bg-slate-100 text-slate-900'
                    }`}
                  >
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
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border border-slate-300 pl-10 py-2 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 sm:text-sm"
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
                                <hackathon.icon className="h-6 w-6" />
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
                          <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{hackathon.participants}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{hackathon.teams}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{hackathon.submissions}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{hackathon.deadline}</td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {hackathon.status === 'brouillon' ? (
                            <Link to={`/organizer/hackathons/edit/${hackathon.id}`} className="text-brand-600 hover:text-brand-900">Éditer</Link>
                          ) : hackathon.status === 'termine' ? (
                            <Link to={`/organizer/hackathons/${hackathon.id}/results`} className="text-brand-600 hover:text-brand-900">Résultats</Link>
                          ) : (
                            <Link to={`/organizer/hackathons/${hackathon.id}/participants`} className="text-brand-600 hover:text-brand-900">Gérer</Link>
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trophy, FileText, Clock, CheckCircle } from 'lucide-react';
import { hackathonsApi } from '../../../api/hackathons';
import { HACKATHONS_DATA_MOCK } from '../../../mockdata/organizer';

const STATUS_BADGE_MAP = {
  publie: { label: 'Publié', classes: 'bg-green-100 text-green-800' },
  brouillon: { label: 'Brouillon', classes: 'bg-slate-100 text-slate-800' },
  attente: { label: 'En attente', classes: 'bg-amber-100 text-amber-800' },
  termine: { label: 'Terminé', classes: 'bg-blue-100 text-blue-800' },
};

const extractArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.hackathons)) return data.hackathons;
  return [];
};

const normalizeStatus = (status = '') => {
  const value = String(status).toLowerCase();
  if (['active', 'published', 'publié', 'publie'].includes(value)) return 'publie';
  if (['draft', 'brouillon'].includes(value)) return 'brouillon';
  if (['pending', 'attente', 'en attente', 'pending_review'].includes(value)) return 'attente';
  if (['completed', 'termine', 'terminé', 'finished'].includes(value)) return 'termine';
  return status || 'brouillon';
};

const normalizeHackathon = (hackathon) => ({
  ...hackathon,
  id: hackathon.id || hackathon._id || hackathon.slug,
  title: hackathon.title || hackathon.name || 'Hackathon sans titre',
  type: hackathon.type || hackathon.format || (hackathon.online ? 'En ligne' : 'Présentiel'),
  location: hackathon.location || hackathon.city || hackathon.country || '',
  status: normalizeStatus(hackathon.status),
  participants: hackathon.participants ?? hackathon.participants_count ?? hackathon.registrations_count ?? '-',
  teams: hackathon.teams ?? hackathon.teams_count ?? '-',
  submissions: hackathon.submissions ?? hackathon.submissions_count ?? '-',
  deadline: hackathon.deadline || hackathon.submission_deadline || 'Non planifié',
});

const OrganizerHackathons = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        setLoading(true);
        const data = await hackathonsApi.getHackathons();
        const apiHackathons = extractArray(data);
        if (apiHackathons.length > 0) {
          setHackathons(apiHackathons.map(normalizeHackathon));
        } else {
          setHackathons(HACKATHONS_DATA_MOCK);
        }
      } catch (err) {
        console.warn("Erreur lors du chargement des hackathons via l'API, utilisation du fallback mocké.", err);
        setHackathons(HACKATHONS_DATA_MOCK);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8 flex-1">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement de vos hackathons...</p>
        </div>
      </div>
    );
  }

  // Calcul dynamique des compteurs d'onglets
  const tabCounts = {
    all: hackathons.length,
    publie: hackathons.filter(h => h.status === 'publie').length,
    brouillon: hackathons.filter(h => h.status === 'brouillon').length,
    attente: hackathons.filter(h => h.status === 'attente').length,
    termine: hackathons.filter(h => h.status === 'termine').length,
  };

  const tabs = [
    { id: 'all', label: 'Tous', count: tabCounts.all },
    { id: 'publie', label: 'Publiés', count: tabCounts.publie },
    { id: 'brouillon', label: 'Brouillons', count: tabCounts.brouillon },
    { id: 'attente', label: 'En attente', count: tabCounts.attente },
    { id: 'termine', label: 'Terminés', count: tabCounts.termine },
  ];

  const filteredHackathons = hackathons.filter((hackathon) => {
    const matchesTab = activeTab === 'all' || hackathon.status === activeTab;
    const matchesSearch = hackathon.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getDefaultIcon = (status) => {
    switch (status) {
      case 'publie': return <Trophy className="h-6 w-6" />;
      case 'attente': return <Clock className="h-6 w-6" />;
      case 'termine': return <CheckCircle className="h-6 w-6" />;
      default: return <FileText className="h-6 w-6" />;
    }
  };

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
            {tabs.map((tab) => {
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
                    const statusConfig = STATUS_BADGE_MAP[hackathon.status] || { label: hackathon.status, classes: 'bg-slate-100 text-slate-800' };
                    return (
                      <tr key={hackathon.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className={`flex h-10 w-10 items-center justify-center rounded ${hackathon.iconBg || 'bg-brand-50'} ${hackathon.iconColor || 'text-brand-700'}`}>
                                {hackathon.icon || getDefaultIcon(hackathon.status)}
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
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{hackathon.participants || '-'}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{hackathon.teams || '-'}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{hackathon.submissions || '-'}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{hackathon.deadline || 'Non planifié'}</td>
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

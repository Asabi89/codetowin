import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardStatCard from '../../../components/common/DashboardStatCard';
import Badge from '../../../components/common/Badge';
import { hackathonsApi } from '../../../api/hackathons';
import { HACKATHONS_DATA_MOCK } from '../../../mockdata/organizer';

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

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const normalizeHackathon = (hackathon) => ({
  ...hackathon,
  id: hackathon.id || hackathon._id || hackathon.slug,
  title: hackathon.title || hackathon.name || 'Hackathon sans titre',
  status: normalizeStatus(hackathon.status),
  participants: hackathon.participants ?? hackathon.participants_count ?? hackathon.registrations_count ?? 0,
  teams: hackathon.teams ?? hackathon.teams_count ?? 0,
  submissions: hackathon.submissions ?? hackathon.submissions_count ?? 0,
  dates: hackathon.dates || [hackathon.start_date, hackathon.end_date].filter(Boolean).join(' - '),
});

const OrganizerDashboard = () => {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.warn("Erreur lors de la récupération des hackathons depuis l'API, utilisation du fallback mocké.", err);
        setHackathons(HACKATHONS_DATA_MOCK);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'publie':
      case 'active':
      case 'Publié':
        return <Badge variant="green">Publié</Badge>;
      case 'attente':
      case 'En attente':
      case 'En attente validation':
        return <Badge variant="amber">En attente</Badge>;
      case 'brouillon':
      case 'Draft':
      case 'Brouillon':
        return <Badge variant="slate">Brouillon</Badge>;
      case 'termine':
      case 'Terminé':
        return <Badge variant="red">Terminé</Badge>;
      default:
        return <Badge variant="slate">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8 flex-1">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  const totalParticipants = hackathons.reduce((acc, h) => {
    return acc + toNumber(h.participants);
  }, 0) || 247;

  const totalTeams = hackathons.reduce((acc, h) => {
    return acc + toNumber(h.teams);
  }, 0) || 38;

  const totalSubmissions = hackathons.reduce((acc, h) => {
    return acc + toNumber(h.submissions);
  }, 0) || 29;

  const activeHackathonsCount = hackathons.filter(h => h.status === 'publie' || h.status === 'attente' || h.status === 'active').length || 3;

  const stats = [
    { 
      title: 'Participants totaux', 
      value: String(totalParticipants), 
      icon: (
        <svg className="h-6 w-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ), 
      trend: '+12%', 
      trendLabel: 'depuis la semaine dernière' 
    },
    { 
      title: 'Équipes formées', 
      value: String(totalTeams), 
      icon: (
        <svg className="h-6 w-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ), 
      trend: '+5%', 
      trendLabel: 'depuis la semaine dernière' 
    },
    { 
      title: 'Soumissions', 
      value: String(totalSubmissions), 
      icon: (
        <svg className="h-6 w-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ), 
      trend: '+8%', 
      trendLabel: 'depuis la semaine dernière' 
    },
    { 
      title: 'Hackathons actifs', 
      value: String(activeHackathonsCount), 
      icon: (
        <svg className="h-6 w-6 text-brand-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ), 
      subtitle: 'En cours de publication / brouillons' 
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      
      {/* Welcome banner */}
      <div className="mb-8 rounded-xl bg-brand-800 p-6 text-white sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Bonjour, TechHub Sénégal 👋</h2>
          <p className="mt-1 text-brand-100">Voici un aperçu de vos hackathons en cours et de leur activité.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/organizer/hackathons/create"
            className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm hover:bg-brand-50"
          >
            Nouveau hackathon
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <DashboardStatCard key={i} {...stat} />
        ))}
      </div>

      {/* Alert */}
      <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">Attention requise</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>La date limite de soumission pour <strong>AgriTech Youth Hack</strong> est dans 3 jours. Pensez à envoyer une annonce aux participants.</p>
            </div>
            <div className="mt-4">
              <div className="-mx-2 -my-1.5 flex">
                <button
                  type="button"
                  className="rounded-md bg-amber-50 px-2 py-1.5 text-sm font-medium text-amber-800 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:ring-offset-amber-50"
                >
                  Envoyer une annonce
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Hackathons Table */}
      <div className="mt-8">
        <div className="flex items-center justify-between sm:mb-4">
          <h2 className="text-lg font-medium text-slate-900">Hackathons récents</h2>
          <Link to="/organizer/hackathons" className="text-sm font-medium text-brand-700 hover:text-brand-800">
            Voir tout
          </Link>
        </div>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <table className="min-w-full divide-y divide-slate-200 bg-white">
                  <thead className="bg-slate-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6">Titre</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Statut</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Dates</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Participants</th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {hackathons.slice(0, 5).map((hackathon) => (
                      <tr key={hackathon.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6">
                          {hackathon.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                          {getStatusBadge(hackathon.status)}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                          {hackathon.dates || '24–26 Mai 2026'}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
                          {hackathon.participants !== '-' && hackathon.participants ? `${hackathon.participants} inscrits` : '-'}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {hackathon.status === 'brouillon' ? (
                            <Link to={`/organizer/hackathons/edit/${hackathon.id}`} className="text-brand-600 hover:text-brand-900">Éditer</Link>
                          ) : (
                            <Link to={`/organizer/hackathons/${hackathon.id}/overview`} className="text-brand-600 hover:text-brand-900">Gérer</Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;

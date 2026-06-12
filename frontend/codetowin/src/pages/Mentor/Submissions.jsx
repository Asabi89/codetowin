import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import SearchFilterBar from '../../components/common/SearchFilterBar';
import { hackathonsApi } from '../../api/hackathons';
import { extractArray, normalizeHackathon } from '../../services/normalizers';
import { useExportCSV } from '../../hooks/useExportCSV';

const fallbackHackathons = [
  {
    id: 1,
    name: 'AI for Climate Africa',
    status: 'En cours',
    statusClass: 'bg-green-100 text-green-800 ring-green-600/20',
    location: 'Hybride · Dakar',
    teamsCount: 2,
    submissionsCount: 2,
    needsEvaluation: true,
    icon: (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
    )
  },
  {
    id: 2,
    name: 'HealthTech Dakar 2025',
    status: 'Terminé',
    statusClass: 'bg-slate-100 text-slate-800 ring-slate-500/10',
    location: 'Présentiel · Dakar',
    teamsCount: 1,
    submissionsCount: 1,
    needsEvaluation: false,
    icon: (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      </div>
    )
  }
];

const exportCsv = (rows, filename) => {
  const csvRows = [
    ['Hackathon', 'Statut', 'Équipes', 'Soumissions'],
    ...rows.map(row => [row.name, row.status, row.teamsCount, row.submissionsCount]),
  ];
  const csv = csvRows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export default function MentorSubmissions() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { exportCSV } = useExportCSV();

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        setLoading(true);
        const data = await hackathonsApi.getHackathons();
        const apiHackathons = extractArray(data);
        if (apiHackathons.length > 0) {
          setHackathons(apiHackathons.map(normalizeHackathon));
        } else {
          setHackathons(fallbackHackathons);
        }
      } catch (err) {
        console.warn('API error, using fallback hackathons', err);
        setHackathons(fallbackHackathons);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  const exportButton = (
    <button type="button" onClick={() => exportCSV(hackathons, 'mentor-hackathons-soumissions.csv')} className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
      <svg className="-ml-1 mr-2 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Exporter les notes
    </button>
  );

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement des hackathons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      <PageHeader title="Soumissions par Hackathon" description="Sélectionnez un hackathon pour évaluer les projets soumis par vos équipes." />

      <SearchFilterBar
        searchPlaceholder="Chercher un projet, une équipe..."
        filters={[{ label: 'Statut', options: ['Tous les statuts', 'Soumis', 'Évalué'] }]}
        actions={exportButton}
      />

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hackathons.map((h) => (
          <div key={h.id} className="col-span-1 flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between">
                {h.icon}
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ring-1 ring-inset ${h.statusClass}`}>{h.status}</span>
              </div>
              <Link to={`/mentor/hackathons/${h.id}`} className="group">
                <h3 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{h.name}</h3>
              </Link>
              <p className="mt-1 text-sm text-slate-500">{h.location}</p>
              
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Vos équipes</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{h.teamsCount}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Soumissions</p>
                  <p className="mt-1 text-lg font-semibold text-brand-600">
                    {h.submissionsCount} {h.needsEvaluation ? <span className="text-sm font-normal text-slate-500">à évaluer</span> : <span className="text-sm font-normal text-slate-500">évaluée</span>}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-b-xl border-t border-slate-200 flex gap-2">
              <Link to={`/mentor/hackathons/${h.id}`} className="flex flex-1 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                Détails
              </Link>
              <Link to={`/mentor/hackathons/${h.id}/submissions`} className="flex flex-1 items-center justify-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                {h.needsEvaluation ? 'Soumissions' : 'Consulter les notes'}
                {h.needsEvaluation && (
                  <svg className="ml-2 -mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

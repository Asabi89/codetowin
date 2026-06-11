import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ANNOUNCEMENTS_MOCK = [
  {
    id: 1,
    title: 'Rappel : Plus que 3 jours !',
    status: 'Envoyée',
    statusBg: 'bg-blue-100',
    statusText: 'text-blue-800',
    to: 'Toutes les équipes',
    date: 'Envoyé hier à 14h30 via Email et In-app',
    isDraft: false,
  },
  {
    id: 2,
    title: 'Cérémonie de clôture',
    status: 'Brouillon',
    statusBg: 'bg-slate-100',
    statusText: 'text-slate-800',
    to: 'Tous les participants',
    date: 'Modifié il y a 2 jours',
    isDraft: true,
  }
];

export default function OrganizerAnnouncements() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAnnouncements = ANNOUNCEMENTS_MOCK.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'sent' && !ann.isDraft) ||
                          (statusFilter === 'draft' && ann.isDraft);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      {/* Page Header mimicking the breadcrumb and top actions */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2 text-sm">
          <Link to={`/organizer/hackathons`} className="font-medium text-slate-500 hover:text-slate-900">AI for Climate Africa</Link>
          <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-slate-900">Annonces</span>
        </div>
      </div>

      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="sm:flex-auto">
          <h1 className="font-display text-2xl font-bold text-slate-900">Annonces</h1>
          <p className="mt-2 text-sm text-slate-700">Communiquez avec les participants, équipes et mentors de votre événement.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to={`/organizer/hackathons/${id}/announcements/new`} className="inline-flex items-center rounded-md border border-transparent bg-brand-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
            <svg className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nouvelle Annonce
          </Link>
        </div>
      </div>

      <div className="mt-8 max-w-4xl mx-auto">
        
        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative max-w-sm flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" 
              placeholder="Rechercher une annonce..." 
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-brand-600 sm:text-sm sm:leading-6"
            >
              <option value="all">Tous les statuts</option>
              <option value="sent">Envoyées</option>
              <option value="draft">Brouillons</option>
            </select>
          </div>
        </div>

        {/* History List */}
        <div>
          <h2 className="text-lg font-medium text-slate-900 mb-4">Historique</h2>
          <div className="flex flex-col gap-4">
            
            {filteredAnnouncements.length > 0 ? (
              filteredAnnouncements.map((ann) => (
                <Link 
                  key={ann.id}
                  to={ann.isDraft ? `/organizer/hackathons/${id}/announcements/new` : `/organizer/hackathons/${id}/announcements/${ann.id}`}
                  className={`block rounded-lg border bg-white p-4 shadow-sm relative overflow-hidden transition-all ${!ann.isDraft ? 'border-slate-200 ring-1 ring-brand-500 hover:shadow-md' : 'border-slate-200 hover:border-slate-300 cursor-pointer'}`}
                >
                  {!ann.isDraft && <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>}
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-slate-900">{ann.title}</h3>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${ann.isDraft ? 'bg-slate-100 text-slate-800' : 'bg-blue-100 text-blue-800'}`}>
                      {ann.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">À : {ann.to}</p>
                  <div className="mt-2 text-xs text-slate-400">{ann.date}</div>
                </Link>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-slate-200 border-dashed">
                <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">Aucune annonce trouvée</h3>
                <p className="mt-1 text-sm text-slate-500">Essayez de modifier vos filtres de recherche.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, ChevronRight } from 'lucide-react';

export default function MentorSubmissions() {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-semibold text-slate-900 text-xl">Soumissions</span>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900">Soumissions par Hackathon</h1>
            <p className="mt-2 text-sm text-slate-700">Sélectionnez un hackathon pour évaluer les projets soumis par vos équipes.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative rounded-md shadow-sm w-full sm:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input type="text" className="block w-full rounded-md border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border" placeholder="Chercher un projet, une équipe..." />
          </div>
          <select className="block w-full sm:w-auto rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border">
            <option>Tous les statuts</option>
            <option>Soumis</option>
            <option>Évalué</option>
          </select>
          <button type="button" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ml-auto">
            <Download className="-ml-1 mr-2 h-5 w-5 text-slate-400" />
            Exporter les notes
          </button>
        </div>

        {/* Grid of Hackathons */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Hackathon Card 1 */}
          <div className="col-span-1 flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <span className="font-bold text-lg">AI</span>
                </div>
                <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold leading-5 text-green-800 ring-1 ring-inset ring-green-600/20">En cours</span>
              </div>
              <Link to="/mentor/hackathons/1" className="group"><h3 className="mt-4 text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">AI for Climate Africa</h3></Link>
              <p className="mt-1 text-sm text-slate-500">Hybride · Dakar</p>
              
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Vos équipes</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">2</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Soumissions</p>
                  <p className="mt-1 text-lg font-semibold text-brand-600">2 <span className="text-sm font-normal text-slate-500">à évaluer</span></p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-b-xl border-t border-slate-200 flex gap-2">
              <Link to="/mentor/hackathons/1" className="flex flex-1 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                Détails
              </Link>
              <Link to="/mentor/hackathons/1/submissions" className="flex flex-1 items-center justify-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                Soumissions
                <ChevronRight className="ml-2 -mr-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Hackathon Card 2 */}
          <div className="col-span-1 flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <span className="font-bold text-lg">HT</span>
                </div>
                <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold leading-5 text-slate-800 ring-1 ring-inset ring-slate-500/10">Terminé</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">HealthTech Dakar 2025</h3>
              <p className="mt-1 text-sm text-slate-500">Présentiel · Dakar</p>
              
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Vos équipes</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">1</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Soumissions</p>
                  <p className="mt-1 text-lg font-semibold text-slate-500">1 <span className="text-sm font-normal text-slate-500">évaluée</span></p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-b-xl border-t border-slate-200 flex gap-2">
              <Link to="/mentor/hackathons/2" className="flex flex-1 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                Détails
              </Link>
              <Link to="/mentor/hackathons/2/submissions" className="flex flex-1 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                Consulter les notes
              </Link>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

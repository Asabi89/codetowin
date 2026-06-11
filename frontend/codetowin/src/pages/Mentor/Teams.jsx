import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Users, MessageSquare, AlertCircle } from 'lucide-react';

export default function MentorTeams() {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-semibold text-slate-900 text-xl">Mes Équipes</span>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900">Mes Équipes (2)</h1>
            <p className="mt-2 text-sm text-slate-700">Consultez vos équipes assignées.</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative rounded-md shadow-sm w-full sm:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input type="text" className="block w-full rounded-md border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 border" placeholder="Chercher une équipe..." />
          </div>
          <select className="block w-full sm:w-auto rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border">
            <option>Tous les mentors</option>
            <option>Sans mentor</option>
            <option>Vous</option>
            <option>Marie Koné</option>
          </select>
        </div>

        {/* Grid of Teams */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Team Card 1 */}
          <div className="col-span-1 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <Link to="/mentor/teams/1" className="hover:underline"><h3 className="truncate text-lg font-medium text-slate-900">AgriTech Innovators</h3></Link>
                  <span className="inline-block flex-shrink-0 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-800">4 membres</span>
                </div>
                <p className="mt-1 truncate text-sm text-slate-500">Solution IoT pour optimisation d'irrigation</p>
                <div className="mt-4">
                  {/* Members Avatars */}
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?u=a042581f4e29026704e" alt="" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?u=a042581f4e29026705e" alt="" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?u=a042581f4e29026706e" alt="" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?u=a042581f4e29026707e" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="h-6 w-6 rounded-full border border-slate-200" src="https://ui-avatars.com/api/?name=Seydou+Kane&background=047857&color=fff" alt="" />
                  <span className="ml-2 text-sm text-slate-600 font-medium">Vous</span>
                </div>
                <div>
                  <span className="inline-flex rounded-full bg-amber-100 px-2 text-xs font-semibold leading-5 text-amber-800">Soumission en cours</span>
                </div>
              </div>
            </div>
            <div className="-mt-px flex divide-x divide-slate-200">
              <div className="flex w-0 flex-1">
                <Link to="/mentor/messages" className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-xl border border-transparent py-3 text-sm font-medium text-slate-700 hover:text-slate-500">
                  <MessageSquare className="h-5 w-5 text-slate-400 mr-2" />
                  Contacter
                </Link>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link to="/mentor/teams/1" className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-xl border border-transparent py-3 text-sm font-medium text-slate-700 hover:text-slate-500">
                  <Users className="h-5 w-5 text-slate-400 mr-2" />
                  Détails
                </Link>
              </div>
            </div>
          </div>

          {/* Team Card 2 (No Mentor) */}
          <div className="col-span-1 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <Link to="/mentor/teams/2" className="hover:underline"><h3 className="truncate text-lg font-medium text-slate-900">Green Data Squad</h3></Link>
                  <span className="inline-block flex-shrink-0 rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-800">3 membres</span>
                </div>
                <p className="mt-1 truncate text-sm text-slate-500">Analyse de données climatiques API</p>
                <div className="mt-4">
                  {/* Members Avatars */}
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?u=a042581f4e29026708e" alt="" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?u=a042581f4e29026709e" alt="" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://i.pravatar.cc/150?u=a042581f4e29026710e" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-3">
              <div className="flex items-center justify-between">
                <div></div>
                <div>
                  <span className="inline-flex rounded-full bg-slate-100 px-2 text-xs font-semibold leading-5 text-slate-600">Pas encore de projet</span>
                </div>
              </div>
            </div>
            <div className="-mt-px flex divide-x divide-slate-200">
              <div className="flex w-0 flex-1">
                <Link to="/mentor/messages" className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-xl border border-transparent py-3 text-sm font-medium text-slate-700 hover:text-slate-500">
                  <MessageSquare className="h-5 w-5 text-slate-400 mr-2" />
                  Contacter
                </Link>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link to="/mentor/teams/2" className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-xl border border-transparent py-3 text-sm font-medium text-slate-700 hover:text-slate-500">
                  <Users className="h-5 w-5 text-slate-400 mr-2" />
                  Détails
                </Link>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

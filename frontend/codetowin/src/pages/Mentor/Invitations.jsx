import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';

export default function MentorInvitations() {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-slate-900">Mes Invitations</h1>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-semibold text-slate-900">Demandes de mentorat</h2>
            <p className="mt-2 text-sm text-slate-700">Ces organisateurs souhaitent que vous accompagniez des équipes lors de leurs hackathons.</p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          
          {/* Invitation Card 1 */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:flex sm:items-start gap-4">
                  <div className="h-14 w-14 flex-shrink-0 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=TechHub+Senegal&background=0F172A&color=fff" alt="Logo" className="h-full w-full object-cover" />
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-slate-900">AI for Climate Africa 2026</h3>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Nouveau</span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 mt-1">Organisé par <span className="text-slate-900">TechHub Sénégal</span></p>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-500">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                        12 - 14 Août 2026
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-slate-400" />
                        Suivi estimé : 3 équipes
                      </div>
                    </div>

                    <div className="mt-4 bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Message de l'organisateur</h4>
                      <p className="text-sm text-slate-600 italic">"Bonjour Seydou, vu votre expertise en Machine Learning, nous adorerions vous avoir parmi nos mentors pour orienter les équipes qui travaillent sur l'analyse de données satellites. Êtes-vous disponible ?"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-200">
              <button type="button" className="inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-100">
                Décliner
              </button>
              <button type="button" className="inline-flex justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500">
                Accepter l'invitation
              </button>
            </div>
          </div>

          {/* Invitation Card 2 */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:flex sm:items-start gap-4">
                  <div className="h-14 w-14 flex-shrink-0 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Finbank&background=0F172A&color=fff" alt="Logo" className="h-full w-full object-cover" />
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-slate-900">Fintech Builders Challenge</h3>
                    </div>
                    <p className="text-sm font-medium text-slate-600 mt-1">Organisé par <span className="text-slate-900">Banque Atlantique</span></p>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-500">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                        01 - 03 Septembre 2026
                      </div>
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-slate-400" />
                        Suivi estimé : 2 équipes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-slate-200">
              <button type="button" className="inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-100">
                Décliner
              </button>
              <button type="button" className="inline-flex justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500">
                Accepter l'invitation
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

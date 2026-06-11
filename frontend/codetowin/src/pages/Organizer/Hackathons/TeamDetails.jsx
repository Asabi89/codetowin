import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function OrganizerTeamDetails() {
  const { id, teamId } = useParams();

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
          
          <nav className="hidden sm:flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div className="flex">
                  <Link to={`/organizer/hackathons/${id}/teams`} className="text-sm font-medium text-slate-500 hover:text-slate-700">Équipes</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="h-5 w-5 flex-shrink-0 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-slate-900" aria-current="page">FinTech Innovators</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-100 text-2xl font-bold text-brand-700">
              FI
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-slate-900">FinTech Innovators</h1>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-600" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" /></svg>
                  Projet soumis
                </span>
                <span className="text-sm text-slate-500">• Hackathon "AI for Climate Africa"</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to={`/organizer/hackathons/${id}/evaluation`} className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
              <svg className="-ml-1 mr-2 h-5 w-5 text-brand-100" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Évaluer
            </Link>
            <Link to="/organizer/messages" className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
              <svg className="-ml-1 mr-2 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2c-5.523 0-10 4.029-10 9s4.477 9 10 9c1.558 0 3.033-.327 4.364-.906l3.328 1.11a1 1 0 001.264-1.265l-1.11-3.328C19.327 14.633 20 12.89 20 11c0-4.971-4.477-9-10-9zm0 5a1 1 0 000 2h.01a1 1 0 100-2H10zm-4 0a1 1 0 000 2h.01a1 1 0 100-2H6zm8 0a1 1 0 000 2h.01a1 1 0 100-2H14z" clipRule="evenodd" />
              </svg>
              Contacter l'équipe
            </Link>
            <button type="button" className="inline-flex items-center justify-center rounded-md bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-100">
              Disqualifier
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Project Card */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-lg font-medium text-slate-900">Le Projet</h2>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900">EcoPay : Plateforme de paiement mobile bas carbone</h3>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  EcoPay est une solution Fintech innovante visant à réduire l'empreinte carbone des transactions mobiles. En optimisant les appels API et en hébergeant les nœuds de validation sur des serveurs alimentés aux énergies renouvelables, l'équipe propose une architecture 3x plus efficiente que les standards actuels.
                </p>
                <div className="mt-6">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Technologies utilisées</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">React Native</span>
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Node.js</span>
                    <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">PostgreSQL</span>
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">AWS Green</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members Card */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-lg font-medium text-slate-900">Membres de l'équipe (3)</h2>
                <span className="text-sm text-slate-500">Chef d'équipe : Moussa Diop</span>
              </div>
              <ul role="list" className="divide-y divide-slate-200">
                <li className="flex items-center justify-between p-6">
                  <div className="flex items-center">
                    <img className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-500" src="https://ui-avatars.com/api/?name=Moussa+Diop&background=random" alt="" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-900">Moussa Diop <span className="ml-2 inline-flex items-center rounded-full bg-brand-100 px-2 py-0.5 text-xs font-medium text-brand-800">Leader</span></p>
                      <p className="text-sm text-slate-500">Développeur Fullstack • Sénégal</p>
                    </div>
                  </div>

                  <a href="#" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                    <svg className="-ml-1 mr-1.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Voir profil
                  </a>
                </li>
                <li className="flex items-center justify-between p-6">
                  <div className="flex items-center">
                    <img className="h-12 w-12 rounded-full object-cover" src="https://ui-avatars.com/api/?name=Aisha+Fall&background=random" alt="" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-900">Aisha Fall</p>
                      <p className="text-sm text-slate-500">UX/UI Designer • Côte d'Ivoire</p>
                    </div>
                  </div>

                  <a href="#" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                    <svg className="-ml-1 mr-1.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Voir profil
                  </a>
                </li>
                <li className="flex items-center justify-between p-6">
                  <div className="flex items-center">
                    <img className="h-12 w-12 rounded-full object-cover" src="https://ui-avatars.com/api/?name=Kofi+Mensah&background=random" alt="" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-900">Kofi Mensah</p>
                      <p className="text-sm text-slate-500">Data Engineer • Ghana</p>
                    </div>
                  </div>

                  <a href="#" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                    <svg className="-ml-1 mr-1.5 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Voir profil
                  </a>
                </li>
              </ul>
            </div>

            {/* Submitted Files Card */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-lg font-medium text-slate-900">Ressources & Livrables</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <a href="#" className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                      <svg className="h-6 w-6 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-900">Dépôt GitHub</p>
                      <p className="text-xs text-slate-500">github.com/fintech-innovators/ecopay</p>
                    </div>
                  </a>
                  
                  <a href="#" className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-900">Démo en ligne</p>
                      <p className="text-xs text-slate-500">app.ecopay-demo.com</p>
                    </div>
                  </a>

                  <a href="#" className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                      <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-900">Pitch Deck (PDF)</p>
                      <p className="text-xs text-slate-500">2.4 MB</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-900">Maquette (PNG)</p>
                      <p className="text-xs text-slate-500">1.2 MB</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            
            {/* Mentor Card */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-lg font-medium text-slate-900">Mentor Assigné</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center">
                  <img className="h-12 w-12 rounded-full object-cover" src="https://ui-avatars.com/api/?name=Dr+Ousmane+Ba&background=random" alt="" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-slate-900">Dr. Ousmane Ba</p>
                    <p className="text-xs text-slate-500">Expert en Intelligence Artificielle</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link to="/organizer/messages" className="flex flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                    Message
                  </Link>
                  <button type="button" className="flex flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                    Changer
                  </button>
                </div>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                <h2 className="text-lg font-medium text-slate-900">Activité de l'équipe</h2>
              </div>
              <div className="p-6">
                <div className="flow-root">
                  <ul role="list" className="-mb-8">
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></span>
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm text-slate-500">Projet soumis pour évaluation</p>
                            </div>
                            <div className="whitespace-nowrap text-right text-xs text-slate-500">
                              <time dateTime="2026-06-05">Hier</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></span>
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm text-slate-500">Mentor Dr. Ousmane assigné</p>
                            </div>
                            <div className="whitespace-nowrap text-right text-xs text-slate-500">
                              <time dateTime="2026-06-02">2 Juin</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="relative pb-8">
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-slate-400 flex items-center justify-center ring-8 ring-white">
                              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm text-slate-500">Création de l'équipe</p>
                            </div>
                            <div className="whitespace-nowrap text-right text-xs text-slate-500">
                              <time dateTime="2026-05-28">28 Mai</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

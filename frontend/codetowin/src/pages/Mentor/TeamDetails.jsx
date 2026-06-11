import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, MessageSquare, Star, FileCode, Github, ExternalLink, FileText, CheckCircle } from 'lucide-react';

export default function MentorTeamDetails() {
  const { id } = useParams();

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/mentor/teams" className="font-medium text-slate-500 hover:text-slate-900">Mes Équipes</Link>
          <span className="text-slate-400">/</span>
          <span className="font-medium text-slate-900">Détails de l'équipe</span>
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
                  <span className="mr-1.5 h-2 w-2 rounded-full bg-green-600"></span>
                  Projet soumis
                </span>
                <span className="text-sm text-slate-500">• Hackathon "AI for Climate Africa"</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to={`/mentor/teams/${id}/feedback`} className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
              <Star className="-ml-1 mr-2 h-5 w-5 text-brand-100" />
              Évaluer
            </Link>
            <Link to="/mentor/messages" className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
              <MessageSquare className="-ml-1 mr-2 h-5 w-5 text-slate-400" />
              Contacter l'équipe
            </Link>
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
                      <Github className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-900">Dépôt GitHub</p>
                      <p className="text-xs text-slate-500">github.com/fintech-innovators...</p>
                    </div>
                  </a>
                  
                  <a href="#" className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <ExternalLink className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-900">Démo en ligne</p>
                      <p className="text-xs text-slate-500">app.ecopay-demo.com</p>
                    </div>
                  </a>

                  <a href="#" className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                      <FileText className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-slate-900">Pitch Deck (PDF)</p>
                      <p className="text-xs text-slate-500">2.4 MB</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            
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
                              <CheckCircle className="h-4 w-4 text-white" />
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
                              <span className="h-2 w-2 rounded-full bg-white"></span>
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
                              <span className="h-2 w-2 rounded-full bg-white"></span>
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

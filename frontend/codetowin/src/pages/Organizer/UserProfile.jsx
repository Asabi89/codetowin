import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Mail, MapPin, Star, UserPlus, Link as LinkIcon, Briefcase, ChevronRight } from 'lucide-react';

export default function OrganizerUserProfile() {
  const { id } = useParams(); // Could be mentor ID
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="flex-1 overflow-y-auto">
        
        {/* Profile Header Card */}
        <div className="bg-white shadow-sm border-b border-slate-200">
          <div className="h-32 sm:h-48 w-full">
            <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2070" alt="Banner" />
          </div>
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="relative inline-block">
                <img className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-white object-cover bg-white shadow-sm" src="https://ui-avatars.com/api/?name=Dr+Ousmane+Diop&background=random" alt="" />
                <span className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 block h-4 w-4 rounded-full bg-green-500 ring-2 ring-white" title="En ligne"></span>
              </div>
              <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                  <h1 className="truncate text-2xl font-bold text-slate-900">Dr. Ousmane Diop</h1>
                  <p className="mt-1 text-sm text-slate-500">Expert Data Science & AI • Mentor depuis 2024</p>
                </div>
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center text-sm font-medium text-slate-600">
                    <MapPin className="mr-1.5 h-4 w-4 text-slate-400" aria-hidden="true" />
                    Dakar, Sénégal
                  </div>
                  <div className="flex items-center text-sm font-medium text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full ring-1 ring-inset ring-amber-600/20">
                    <Star className="mr-1 h-4 w-4 text-amber-500 fill-amber-500" aria-hidden="true" />
                    Note globale : 4.9/5
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
              <h1 className="truncate text-2xl font-bold text-slate-900">Dr. Ousmane Diop</h1>
              <p className="mt-1 text-sm text-slate-500">Expert Data Science & AI • Mentor depuis 2024</p>
            </div>

            {/* Tabs Navigation */}
            <div className="mt-6 sm:mt-8">
              <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button 
                    onClick={() => setActiveTab('info')}
                    className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'info' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
                  >
                    Informations
                  </button>
                  <button 
                    onClick={() => setActiveTab('activity')}
                    className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'activity' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
                  >
                    Activité & Historique
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Body */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              
              {/* Left Column: Bio & Skills (2/3) */}
              <div className="space-y-6 lg:col-span-2">
                
                {/* About Card */}
                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                    <h2 className="text-lg font-medium text-slate-900">À propos</h2>
                  </div>
                  <div className="p-6 text-sm text-slate-600 leading-relaxed space-y-4">
                    <p>Passionné par l'Intelligence Artificielle et son application concrète pour le développement en Afrique. J'accompagne depuis 5 ans des startups et des développeurs dans la création de solutions basées sur le Machine Learning.</p>
                    <p>Mon objectif lors des hackathons est d'aider les équipes à structurer leur architecture technique et à pitcher efficacement l'impact de leur modèle.</p>
                  </div>
                </section>

                {/* Expertise Card */}
                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                    <h2 className="text-lg font-medium text-slate-900">Domaines d'expertise</h2>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Data Science</span>
                      <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">Machine Learning</span>
                      <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">Python</span>
                      <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">Architecture Cloud</span>
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">Pitching</span>
                    </div>
                  </div>
                </section>
                
              </div>

              {/* Right Column: Stats & Teams (1/3) */}
              <div className="space-y-6">
                
                {/* Quick Stats */}
                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="p-6">
                    <h3 className="text-sm font-medium text-slate-500">Statistiques Mentor</h3>
                    <dl className="mt-4 grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-slate-50 px-4 py-3 border border-slate-100 text-center">
                        <dt className="text-sm font-medium text-slate-500 truncate">Hackathons</dt>
                        <dd className="mt-1 text-2xl font-semibold tracking-tight text-brand-600">3</dd>
                      </div>
                      <div className="rounded-lg bg-slate-50 px-4 py-3 border border-slate-100 text-center">
                        <dt className="text-sm font-medium text-slate-500 truncate">Équipes</dt>
                        <dd className="mt-1 text-2xl font-semibold tracking-tight text-brand-600">8</dd>
                      </div>
                    </dl>
                  </div>
                </section>

                {/* Current Teams */}
                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                    <h2 className="text-lg font-medium text-slate-900">Équipes actuelles</h2>
                  </div>
                  <div className="p-6">
                    <ul role="list" className="space-y-4">
                      <li className="flex items-center justify-between gap-x-4 py-2">
                        <div className="flex items-center gap-x-4">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-100 text-sm font-bold text-brand-700">
                            AT
                          </div>
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-medium text-slate-900">AgriTech Innovators</p>
                            <p className="truncate text-xs text-slate-500">AI for Climate Africa</p>
                          </div>
                        </div>
                        <Link to="/organizer/hackathons/1/teams/1" className="hidden sm:block text-sm font-medium text-brand-600 hover:text-brand-500">Voir</Link>
                      </li>
                      <li className="flex items-center justify-between gap-x-4 py-2">
                        <div className="flex items-center gap-x-4">
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-700">
                            GD
                          </div>
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-medium text-slate-900">Green Data Squad</p>
                            <p className="truncate text-xs text-slate-500">AI for Climate Africa</p>
                          </div>
                        </div>
                        <Link to="/organizer/hackathons/1/teams/2" className="hidden sm:block text-sm font-medium text-brand-600 hover:text-brand-500">Voir</Link>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <button className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                        Voir toutes les équipes
                      </button>
                    </div>
                  </div>
                </section>

                {/* Links */}
                <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="p-6">
                    <h3 className="text-sm font-medium text-slate-500">Liens & Réseaux</h3>
                    <ul role="list" className="mt-4 space-y-3">
                      <li className="flex items-center gap-x-3">
                        <LinkIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                        <a href="https://ousmanediop.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-brand-600 hover:text-brand-500">ousmanediop.com</a>
                      </li>
                      <li className="flex items-center gap-x-3">
                        <Briefcase className="h-5 w-5 text-slate-400" aria-hidden="true" />
                        <a href="https://linkedin.com/in/ousmanediop" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-900 hover:text-slate-600">linkedin.com/in/ousmanediop</a>
                      </li>
                    </ul>
                  </div>
                </section>

              </div>
            </div>
          )}
          
          {activeTab === 'activity' && (
            <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
              <span className="block text-sm font-medium text-slate-500">Historique d'activité (En cours de développement)</span>
            </div>
          )}

        </div>
    </div>
  );
}

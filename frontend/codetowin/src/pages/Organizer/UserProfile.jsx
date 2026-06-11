import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Mail, MapPin, Star, UserPlus, Users, Link as LinkIcon, Linkedin } from 'lucide-react';

export default function OrganizerUserProfile() {
  const { id } = useParams(); // Could be mentor ID
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center space-x-2 text-sm">
          <Link to={`/organizer/members`} className="font-medium text-slate-500 hover:text-slate-900">Mentors</Link>
          <span className="text-slate-400">/</span>
          <span className="font-medium text-slate-900">Profil de Dr. Ousmane Diop</span>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
            <Mail className="-ml-1 mr-2 h-4 w-4 text-slate-400" />
            Contacter
          </button>
          <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-brand-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
            <UserPlus className="-ml-1 mr-2 h-4 w-4" />
            Assigner à une équipe
          </button>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto bg-slate-50">
        
        {/* Profile Banner & Header */}
        <div className="bg-white shadow">
          <div>
            <img className="h-32 w-full object-cover lg:h-48" src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2070" alt="Banner" />
          </div>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex relative">
                <img className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 object-cover" src="https://i.pravatar.cc/150?u=mentor1" alt="" />
                <span className="absolute bottom-2 right-2 block h-4 w-4 rounded-full bg-green-400 ring-2 ring-white" title="En ligne"></span>
              </div>
              <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                  <h1 className="truncate text-2xl font-bold text-slate-900">Dr. Ousmane Diop</h1>
                  <p className="text-sm font-medium text-slate-500">Expert Data Science & AI • Mentor depuis 2024</p>
                </div>
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="flex items-center text-sm text-slate-500">
                    <MapPin className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400" />
                    Dakar, Sénégal
                  </div>
                  <div className="flex items-center text-sm font-medium text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full">
                    <Star className="mr-1.5 h-4 w-4 text-brand-500 fill-brand-500" />
                    Note globale : 4.9/5
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs Navigation */}
            <div className="mt-6 sm:mt-2 2xl:mt-5">
              <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button 
                    onClick={() => setActiveTab('info')}
                    className={`${activeTab === 'info' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'} whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                  >
                    Informations
                  </button>
                  <button 
                    onClick={() => setActiveTab('activity')}
                    className={`${activeTab === 'activity' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'} whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                  >
                    Activité & Historique
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Body */}
        {activeTab === 'info' && (
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              
              {/* Left Column: Bio & Skills */}
              <div className="space-y-6 sm:col-span-2">
                
                {/* About Card */}
                <section className="bg-white shadow sm:rounded-lg border border-slate-200">
                  <div className="px-4 py-5 sm:px-6 border-b border-slate-200">
                    <h2 className="text-lg font-medium leading-6 text-slate-900">À propos</h2>
                  </div>
                  <div className="px-4 py-5 sm:p-6 text-sm text-slate-600 space-y-4">
                    <p>Passionné par l'Intelligence Artificielle et son application concrète pour le développement en Afrique. J'accompagne depuis 5 ans des startups et des développeurs dans la création de solutions basées sur le Machine Learning.</p>
                    <p>Mon objectif lors des hackathons est d'aider les équipes à structurer leur architecture technique et à pitcher efficacement l'impact de leur modèle.</p>
                  </div>
                </section>

                {/* Expertise Card */}
                <section className="bg-white shadow sm:rounded-lg border border-slate-200">
                  <div className="px-4 py-5 sm:px-6 border-b border-slate-200">
                    <h2 className="text-lg font-medium leading-6 text-slate-900">Domaines d'expertise</h2>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">Data Science</span>
                      <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">Machine Learning</span>
                      <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">Python</span>
                      <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-700/10">Architecture Cloud</span>
                      <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">Pitching</span>
                    </div>
                  </div>
                </section>
                
              </div>

              {/* Right Column: Stats & Teams */}
              <div className="space-y-6 sm:col-span-1">
                
                {/* Quick Stats */}
                <section className="bg-white shadow sm:rounded-lg border border-slate-200 p-6">
                  <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Statistiques Mentor</h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-slate-500">Hackathons</dt>
                      <dd className="mt-1 text-2xl font-semibold text-brand-600">3</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-slate-500">Équipes</dt>
                      <dd className="mt-1 text-2xl font-semibold text-brand-600">8</dd>
                    </div>
                  </dl>
                </section>

                {/* Current Teams */}
                <section className="bg-white shadow sm:rounded-lg border border-slate-200">
                  <div className="px-4 py-5 sm:px-6 border-b border-slate-200">
                    <h2 className="text-lg font-medium leading-6 text-slate-900">Équipes actuelles</h2>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <ul role="list" className="divide-y divide-slate-200">
                      <li className="flex py-4 items-center">
                        <div className="flex-shrink-0">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                            <span className="text-sm font-medium leading-none text-slate-600">AT</span>
                          </span>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-slate-900">AgriTech Innovators</p>
                          <p className="text-xs text-slate-500">AI for Climate Africa</p>
                        </div>
                        <a href="#" className="text-brand-600 hover:text-brand-900 text-sm font-medium">Voir</a>
                      </li>
                      <li className="flex py-4 items-center">
                        <div className="flex-shrink-0">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                            <span className="text-sm font-medium leading-none text-slate-600">GD</span>
                          </span>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-slate-900">Green Data Squad</p>
                          <p className="text-xs text-slate-500">AI for Climate Africa</p>
                        </div>
                        <a href="#" className="text-brand-600 hover:text-brand-900 text-sm font-medium">Voir</a>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <button className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                        Voir toutes les équipes
                      </button>
                    </div>
                  </div>
                </section>

                {/* Links */}
                <section className="bg-white shadow sm:rounded-lg border border-slate-200 p-6">
                  <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">Liens & Réseaux</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center text-sm">
                      <LinkIcon className="h-5 w-5 text-slate-400 mr-3" />
                      <a href="#" className="text-brand-600 hover:underline">ousmanediop.com</a>
                    </li>
                    <li className="flex items-center text-sm">
                      <Linkedin className="h-5 w-5 text-slate-400 mr-3" />
                      <a href="#" className="text-slate-700 hover:underline">linkedin.com/in/ousmanediop</a>
                    </li>
                  </ul>
                </section>

              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'activity' && (
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 text-center text-slate-500">
            Historique d'activité (En cours de développement)
          </div>
        )}

      </main>
    </div>
  );
}

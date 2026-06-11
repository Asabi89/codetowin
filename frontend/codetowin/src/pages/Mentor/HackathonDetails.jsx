import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function MentorHackathonDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('tab-overview');

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/mentor/submissions" className="font-medium text-slate-500 hover:text-slate-900">Soumissions</Link>
          <span className="text-slate-400">/</span>
          <span className="font-medium text-slate-900">Détails : AI for Climate Africa</span>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto bg-slate-50">
        
        {/* Back button & Actions */}
        <div className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/mentor/submissions" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Retour aux hackathons
          </Link>
          <Link to={`/mentor/hackathons/${id}/submissions`} className="inline-flex items-center justify-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
            Voir les soumissions
          </Link>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          
          {/* Banner & Header */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="relative h-48 w-full sm:h-64">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80" alt="Banner" className="h-full w-full object-cover" />
              <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur-sm shadow">
                Hybride · Dakar
              </div>
              <img src="https://ui-avatars.com/api/?name=AI&background=047857&color=fff&size=128&rounded=true" alt="Logo" className="absolute -bottom-8 left-6 h-20 w-20 rounded-full border-4 border-white shadow-md" />
            </div>
            
            <div className="p-6 pt-12 sm:px-8">
              <div className="sm:flex sm:items-start sm:justify-between">
                <div>
                  <h1 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">AI for Climate Africa</h1>
                  <p className="mt-2 text-sm text-slate-600">Rejoignez-nous pour créer des solutions d'Intelligence Artificielle au service du climat en Afrique. Participez à ce hackathon de 48h pour construire des outils d'agriculture de précision et de gestion de l'eau.</p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
                    <span className="mr-1.5 h-2 w-2 rounded-full bg-green-600"></span>
                    En cours
                  </span>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-600/20">Data Science</span>
                <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-600/20">GreenTech</span>
                <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-600/20">IoT</span>
              </div>
            </div>
            
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50 sm:grid-cols-4">
              <div className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Dates</p>
                <p className="mt-1 font-semibold text-slate-900 text-sm">12 - 14 Août 2026</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Participants</p>
                <p className="mt-1 font-semibold text-slate-900 text-sm">89 / 150</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Équipes</p>
                <p className="mt-1 font-semibold text-slate-900 text-sm">14 (2 à vos soins)</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Premier Prix</p>
                <p className="mt-1 font-semibold text-brand-600 text-sm">2 000 000 FCFA</p>
              </div>
            </div>
          </div>

          {/* Organizer Section */}
          <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center">
              <img src="https://ui-avatars.com/api/?name=TechHub+Senegal&background=047857&color=fff" alt="" className="h-10 w-10 rounded-full ring-2 ring-white" />
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-900">Organisé par <span className="font-bold">TechHub Sénégal</span></p>
                <p className="text-xs text-slate-500">Incubateur d'innovations numériques</p>
              </div>
            </div>
            <button className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
              Voir le profil
            </button>
          </div>

          {/* Content Tabs */}
          <div className="mt-8">
            <div className="sm:hidden">
              <label htmlFor="tabs-select" className="sr-only">Sélectionner un onglet</label>
              <select 
                id="tabs-select" 
                name="tabs" 
                className="block w-full rounded-md border-slate-300 focus:border-brand-500 focus:ring-brand-500"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="tab-overview">Vue d'ensemble</option>
                <option value="tab-rules">Règles</option>
                <option value="tab-resources">Ressources</option>
                <option value="tab-prizes">Prix & Récompenses</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <nav className="flex space-x-4 border-b border-slate-200" aria-label="Tabs">
                <button onClick={() => setActiveTab('tab-overview')} className={`px-3 py-2 font-medium text-sm border-b-2 ${activeTab === 'tab-overview' ? 'bg-brand-50 text-brand-700 border-brand-500 rounded-t-md' : 'text-slate-500 hover:text-slate-700 border-transparent'}`}>Vue d'ensemble</button>
                <button onClick={() => setActiveTab('tab-rules')} className={`px-3 py-2 font-medium text-sm border-b-2 ${activeTab === 'tab-rules' ? 'bg-brand-50 text-brand-700 border-brand-500 rounded-t-md' : 'text-slate-500 hover:text-slate-700 border-transparent'}`}>Règles</button>
                <button onClick={() => setActiveTab('tab-resources')} className={`px-3 py-2 font-medium text-sm border-b-2 ${activeTab === 'tab-resources' ? 'bg-brand-50 text-brand-700 border-brand-500 rounded-t-md' : 'text-slate-500 hover:text-slate-700 border-transparent'}`}>Ressources</button>
                <button onClick={() => setActiveTab('tab-prizes')} className={`px-3 py-2 font-medium text-sm border-b-2 ${activeTab === 'tab-prizes' ? 'bg-brand-50 text-brand-700 border-brand-500 rounded-t-md' : 'text-slate-500 hover:text-slate-700 border-transparent'}`}>Prix & Récompenses</button>
              </nav>
            </div>
          </div>

          {/* Tab Content (Vue d'ensemble) */}
          {activeTab === 'tab-overview' && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="prose prose-slate max-w-none prose-a:text-brand-600 hover:prose-a:text-brand-500">
                <h3>À propos du Hackathon</h3>
                <p>L'Afrique fait face à des défis climatiques sans précédent. Ce hackathon vise à rassembler les esprits les plus brillants pour développer des solutions tangibles basées sur l'Intelligence Artificielle et l'Internet des Objets (IoT).</p>
                
                <h4>Objectifs Principaux :</h4>
                <ul>
                  <li><strong>Agriculture de précision :</strong> Modèles de prédiction pour optimiser l'utilisation de l'eau et des engrais.</li>
                  <li><strong>Prévention des catastrophes :</strong> Systèmes d'alerte précoce pour les inondations et les sécheresses.</li>
                  <li><strong>Gestion énergétique :</strong> Algorithmes d'optimisation pour les micro-réseaux solaires.</li>
                </ul>

                <h4>Calendrier de l'événement</h4>
                <div className="not-prose my-6">
                  <div className="flow-root">
                    <ul role="list" className="-mb-8">
                      <li>
                        <div className="relative pb-8">
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-brand-200" aria-hidden="true"></span>
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center ring-8 ring-white">
                                <span className="h-2 w-2 rounded-full bg-brand-600"></span>
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div><p className="text-sm text-slate-500">Début du Hackathon (Cérémonie d'ouverture)</p></div>
                              <div className="whitespace-nowrap text-right text-sm font-medium text-slate-900">12 Août, 09:00</div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="relative pb-8">
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-brand-200" aria-hidden="true"></span>
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center ring-8 ring-white">
                                <span className="h-2 w-2 rounded-full bg-brand-600"></span>
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div><p className="text-sm text-slate-500">Session de Mentorat 1</p></div>
                              <div className="whitespace-nowrap text-right text-sm font-medium text-slate-900">12 Août, 15:00</div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="relative pb-8">
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center ring-8 ring-white">
                                <span className="h-2 w-2 rounded-full bg-white"></span>
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div><p className="text-sm font-medium text-slate-900">Limite des soumissions</p></div>
                              <div className="whitespace-nowrap text-right text-sm font-medium text-brand-600">14 Août, 12:00</div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tab Content (Règles) */}
          {activeTab === 'tab-rules' && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="prose prose-slate max-w-none">
                <h3>Règlement du Hackathon</h3>
                <ul>
                  <li><strong>Équipes :</strong> De 2 à 5 membres maximum.</li>
                  <li><strong>Code original :</strong> Tout le code doit être écrit pendant l'événement. Vous pouvez utiliser des librairies open-source publiques, mais aucune partie de l'application principale ne doit être pré-codée.</li>
                  <li><strong>Propriété intellectuelle :</strong> Vous conservez la propriété de tout ce que vous créez pendant le hackathon.</li>
                  <li><strong>Soumission :</strong> Une vidéo de démonstration de 3 minutes maximum est obligatoire, accompagnée d'un dépôt GitHub public.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab Content (Ressources) */}
          {activeTab === 'tab-resources' && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="prose prose-slate max-w-none">
                <h3>Ressources et APIs</h3>
                <p>Voici les ressources mises à votre disposition par nos partenaires :</p>
                <ul>
                  <li><a href="#" className="text-brand-600 hover:underline">API Météo de précision (AccuWeather)</a> - Clés d'API fournies le jour J.</li>
                  <li><a href="#" className="text-brand-600 hover:underline">Dataset Agriculture (Sénégal 2020-2025)</a> - Données sur les rendements agricoles.</li>
                  <li><a href="#" className="text-brand-600 hover:underline">Cloud Computing AWS</a> - $100 de crédits pour chaque équipe inscrite.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab Content (Prix) */}
          {activeTab === 'tab-prizes' && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-xl font-bold mb-4">1</div>
                  <h4 className="text-lg font-bold text-slate-900">Grand Prix</h4>
                  <p className="mt-2 text-2xl font-black text-brand-600">2 000 000 FCFA</p>
                  <p className="mt-2 text-sm text-slate-600">Incubation de 6 mois et accès direct au programme Seed de TechHub.</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-600 text-xl font-bold mb-4">2</div>
                  <h4 className="text-lg font-bold text-slate-900">Deuxième Prix</h4>
                  <p className="mt-2 text-xl font-black text-slate-700">1 000 000 FCFA</p>
                  <p className="mt-2 text-sm text-slate-600">Ordinateurs portables pour l'équipe + 3 mois d'incubation.</p>
                </div>
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-xl font-bold mb-4">3</div>
                  <h4 className="text-lg font-bold text-slate-900">Prix Coup de Cœur</h4>
                  <p className="mt-2 text-xl font-black text-slate-700">500 000 FCFA</p>
                  <p className="mt-2 text-sm text-slate-600">Offert par notre partenaire sponsor pour la solution la plus innovante.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

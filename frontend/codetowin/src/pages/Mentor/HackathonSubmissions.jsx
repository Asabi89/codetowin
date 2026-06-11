import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Download, ChevronLeft, ExternalLink, Github } from 'lucide-react';

export default function MentorHackathonSubmissions() {
  const { id } = useParams();

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/mentor/submissions" className="font-medium text-slate-500 hover:text-slate-900">Soumissions</Link>
          <span className="text-slate-400">/</span>
          <span className="font-medium text-slate-900">AI for Climate Africa</span>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        <div className="mb-4">
          <Link to="/mentor/submissions" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Retour aux hackathons
          </Link>
        </div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900">Soumissions (12)</h1>
            <p className="mt-2 text-sm text-slate-700">Évaluez les projets soumis par les équipes.</p>
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

        {/* Grid of Submissions */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Submission Card 1 */}
          <div className="col-span-1 flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-slate-800">Équipe : AgriTech Innovators</span>
                <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">Soumis</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">AgriSense</h3>
              <p className="mt-2 text-sm text-slate-500 line-clamp-3">
                AgriSense est une plateforme IoT complète permettant aux petits agriculteurs de surveiller l'humidité du sol et de prédire les besoins en eau grâce à des modèles de machine learning locaux, réduisant la consommation d'eau de 30%.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">Python</span>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">React</span>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">IoT</span>
              </div>
              
              <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">GitHub:</span>
                  <a href="#" className="font-medium text-brand-600 hover:text-brand-800 flex items-center">
                    Voir le repo
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Démo:</span>
                  <a href="#" className="font-medium text-brand-600 hover:text-brand-800 flex items-center">
                    Voir la vidéo
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 px-6 py-4 rounded-b-xl border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Score Actuel</span>
                  <div className="mt-1 text-2xl font-bold text-slate-900">-- <span className="text-sm font-medium text-slate-500">/ 40</span></div>
                </div>
                <Link to="/mentor/submissions/1" className="inline-flex items-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                  Détails
                </Link>
              </div>
            </div>
          </div>

          {/* Submission Card 2 */}
          <div className="col-span-1 flex flex-col rounded-xl border border-brand-200 bg-white shadow-sm transition hover:shadow-md ring-1 ring-brand-500">
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-slate-800">Équipe : CodeMakers</span>
                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Évalué</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-900">EcoTrade App</h3>
              <p className="mt-2 text-sm text-slate-500 line-clamp-3">
                Une place de marché mobile permettant d'échanger des crédits carbone générés par des initiatives de reboisement locales. Application construite en React Native avec backend Node.js.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">React Native</span>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">Node.js</span>
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">MongoDB</span>
              </div>
              
              <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">GitHub:</span>
                  <a href="#" className="font-medium text-brand-600 hover:text-brand-800 flex items-center">
                    Voir le repo
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Démo:</span>
                  <a href="#" className="font-medium text-brand-600 hover:text-brand-800 flex items-center">
                    Lien direct
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-brand-50 px-6 py-4 rounded-b-xl border-t border-brand-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-brand-700 uppercase tracking-wider font-semibold">Score Actuel</span>
                  <div className="mt-1 text-2xl font-bold text-brand-900">34 <span className="text-sm font-medium text-brand-700">/ 40</span></div>
                </div>
                <Link to="/mentor/submissions/2" className="inline-flex items-center rounded-md border border-brand-300 bg-white px-4 py-2 text-sm font-medium text-brand-700 shadow-sm hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
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

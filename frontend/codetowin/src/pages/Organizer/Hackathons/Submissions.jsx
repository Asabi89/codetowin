import React, { useState } from 'react';
import { Search, Download, ExternalLink, PlayCircle } from 'lucide-react';
import { Badge } from '../../../components/common/Badge';
import { Link } from 'react-router-dom';

const SUBMISSIONS_MOCK = [
  {
    id: 1,
    teamName: 'AgriTech Innovators',
    status: 'Soumis',
    projectName: 'AgriSense',
    description: "AgriSense est une plateforme IoT complète permettant aux petits agriculteurs de surveiller l'humidité du sol et de prédire les besoins en eau grâce à des modèles de machine learning locaux, réduisant la consommation d'eau de 30%.",
    tags: ['Python', 'React', 'IoT'],
    repoLink: '#',
    demoLink: '#',
    score: null,
  },
  {
    id: 2,
    teamName: 'CodeMakers',
    status: 'Évalué',
    projectName: 'EcoTrade App',
    description: "Une place de marché mobile permettant d'échanger des crédits carbone générés par des initiatives de reboisement locales. Application construite en React Native avec backend Node.js.",
    tags: ['React Native', 'Node.js', 'MongoDB'],
    repoLink: '#',
    demoLink: '#',
    score: 34,
  },
];

export default function OrganizerSubmissions() {
  const [submissions, setSubmissions] = useState(SUBMISSIONS_MOCK);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/organizer/hackathons" className="font-medium text-slate-500 hover:text-slate-900">AI for Climate Africa</Link>
          <span className="text-slate-400">/</span>
          <span className="font-medium text-slate-900">Soumissions</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900">Soumissions ({submissions.length})</h1>
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
          <button type="button" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 sm:ml-auto">
            <Download className="-ml-1 mr-2 h-4 w-4 text-slate-400" />
            Exporter les notes
          </button>
        </div>

        {/* Grid of Submissions */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {submissions.map((sub) => (
            <div key={sub.id} className={`col-span-1 flex flex-col rounded-xl border bg-white shadow-sm transition hover:shadow-md ${sub.status === 'Évalué' ? 'border-brand-200 ring-1 ring-brand-500' : 'border-slate-200'}`}>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-slate-800">Équipe : {sub.teamName}</span>
                  {sub.status === 'Évalué' ? (
                    <Badge variant="success">Évalué</Badge>
                  ) : (
                    <Badge variant="primary">Soumis</Badge>
                  )}
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{sub.projectName}</h3>
                <p className="mt-2 text-sm text-slate-500 line-clamp-3">
                  {sub.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {sub.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{tag}</span>
                  ))}
                </div>
                
                <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">GitHub:</span>
                    <a href={sub.repoLink} className="font-medium text-brand-600 hover:text-brand-800 flex items-center">
                      Voir le repo
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Démo:</span>
                    <a href={sub.demoLink} className="font-medium text-brand-600 hover:text-brand-800 flex items-center">
                      Voir la vidéo
                      <PlayCircle className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className={`px-6 py-4 rounded-b-xl border-t ${sub.status === 'Évalué' ? 'bg-brand-50 border-brand-200' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-xs uppercase tracking-wider font-semibold ${sub.status === 'Évalué' ? 'text-brand-700' : 'text-slate-500'}`}>Score Actuel</span>
                    <div className={`mt-1 text-2xl font-bold ${sub.status === 'Évalué' ? 'text-brand-900' : 'text-slate-900'}`}>
                      {sub.score ? sub.score : '--'} <span className={`text-sm font-medium ${sub.status === 'Évalué' ? 'text-brand-700' : 'text-slate-500'}`}>/ 40</span>
                    </div>
                  </div>
                  <Link to="#" className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none ${sub.status === 'Évalué' ? 'border border-brand-300 bg-white text-brand-700 hover:bg-brand-50' : 'border border-transparent bg-brand-600 text-white hover:bg-brand-700'}`}>
                    {sub.status === 'Évalué' ? 'Modifier note' : 'Évaluer'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

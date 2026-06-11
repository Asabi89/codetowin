import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Info } from 'lucide-react';

export default function MentorTeamFeedback() {
  const { id } = useParams();
  const [problemScore, setProblemScore] = useState(5);
  const [techScore, setTechScore] = useState(5);
  const [designScore, setDesignScore] = useState(5);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Topbar */}
      <header className="flex h-16 items-center border-b border-slate-200 bg-white px-4 sm:px-6">
        <Link to={`/mentor/teams/${id}`} className="mr-4 text-slate-400 hover:text-slate-500">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-semibold text-slate-900">Évaluation : EcoPay Solutions</h1>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        <div className="mx-auto max-w-3xl">
          {/* Team Header */}
          <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 mb-6">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">EcoPay Solutions</h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">Projet pour le Fintech Builders Challenge</p>
                </div>
                <div className="flex -space-x-2">
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://ui-avatars.com/api/?name=Omar+Fall&background=0284c7&color=fff" alt="" />
                  <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://ui-avatars.com/api/?name=Awa+Diop&background=c026d3&color=fff" alt="" />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-500 ring-2 ring-white">+2</div>
                </div>
              </div>
            </div>
          </div>

          <form action="#" method="POST" className="space-y-8">
            {/* Grading Sliders */}
            <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-6">
              <h3 className="text-lg font-medium text-slate-900 border-b border-slate-200 pb-4 mb-6">Critères d'évaluation</h3>
              
              <div className="space-y-8">
                {/* Problem Clarity Score */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="problem-score" className="block text-sm font-medium text-slate-900">Clarté du problème & Pertinence</label>
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 font-bold">{problemScore} / 10</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">L'équipe a-t-elle bien identifié un vrai problème et sa solution est-elle pertinente ?</p>
                  <input 
                    type="range" 
                    id="problem-score" 
                    name="problem-score" 
                    min="0" 
                    max="10" 
                    value={problemScore}
                    onChange={(e) => setProblemScore(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600" 
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Médiocre (0)</span>
                    <span>Excellent (10)</span>
                  </div>
                </div>

                {/* Technical Execution Score */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="tech-score" className="block text-sm font-medium text-slate-900">Exécution technique</label>
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 font-bold">{techScore} / 10</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">La qualité du code, l'architecture, et le fonctionnement réel du prototype.</p>
                  <input 
                    type="range" 
                    id="tech-score" 
                    name="tech-score" 
                    min="0" 
                    max="10" 
                    value={techScore}
                    onChange={(e) => setTechScore(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600" 
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Médiocre (0)</span>
                    <span>Excellent (10)</span>
                  </div>
                </div>

                {/* Design Score */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="design-score" className="block text-sm font-medium text-slate-900">Design et Expérience Utilisateur (UX/UI)</label>
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 font-bold">{designScore} / 10</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-3">Est-ce que l'interface est intuitive et agréable à utiliser ?</p>
                  <input 
                    type="range" 
                    id="design-score" 
                    name="design-score" 
                    min="0" 
                    max="10" 
                    value={designScore}
                    onChange={(e) => setDesignScore(e.target.value)}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600" 
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>Médiocre (0)</span>
                    <span>Excellent (10)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes and Comments */}
            <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 p-6 space-y-6">
              
              <div>
                <label htmlFor="public-comment" className="block text-sm font-medium text-slate-900 mb-1">Commentaires (Public)</label>
                <p className="text-xs text-slate-500 mb-2">Ces commentaires seront visibles par l'équipe pour les aider à s'améliorer.</p>
                <textarea id="public-comment" name="public-comment" rows="4" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" placeholder="Quels sont les points forts du projet ? Que pourraient-ils améliorer ?"></textarea>
              </div>

              <div>
                <label htmlFor="private-note" className="block text-sm font-medium text-slate-900 mb-1">Notes privées (Jury & Organisateurs)</label>
                <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                  <Info className="h-4 w-4 text-slate-400" />
                  Uniquement visibles par le comité d'organisation.
                </p>
                <textarea id="private-note" name="private-note" rows="3" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 bg-slate-50 border" placeholder="Informations confidentielles, doutes sur la faisabilité, ou raisons justifiant votre notation globale..."></textarea>
              </div>

            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                Enregistrer le brouillon
              </button>
              <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                Soumettre l'évaluation
              </button>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
}

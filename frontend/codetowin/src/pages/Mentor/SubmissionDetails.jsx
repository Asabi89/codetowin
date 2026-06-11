import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Github, FileText } from 'lucide-react';

export default function MentorSubmissionDetails() {
  const { id } = useParams();

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Topbar */}
      <header className="flex h-16 items-center border-b border-slate-200 bg-white px-4 sm:px-6">
        <Link to="/mentor/hackathons/1/submissions" className="mr-4 text-slate-400 hover:text-slate-500">
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-semibold text-slate-900">Projet : EcoPay Solutions</h1>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        <div className="mx-auto max-w-4xl">
          
          <div className="bg-white shadow-sm ring-1 ring-slate-200 rounded-xl overflow-hidden mb-8">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 border-b border-slate-100 pb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Application EcoTrade App</h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">Soumis par <span className="text-brand-600 font-semibold">EcoPay Solutions</span> • Fintech Builders Challenge</p>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">React Native</span>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Node.js</span>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">PostgreSQL</span>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-8">
                
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Description du projet</h3>
                  <div className="prose prose-sm max-w-none text-slate-600">
                    <p>
                      EcoTrade App est une plateforme mobile de transfert d'argent et de micro-prêts dédiée aux petits commerçants du secteur informel. 
                      Notre solution permet de tracer les transactions et de bâtir un profil de solvabilité pour des personnes non bancarisées.
                    </p>
                    <p>
                      La particularité de notre approche réside dans l'utilisation d'USSD pour les zones sans internet et d'une application mobile moderne pour les zones urbaines.
                    </p>
                  </div>
                </div>

                {/* Links and Resources */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Liens et Ressources</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                      <Github className="h-8 w-8 text-slate-700" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-900">Dépôt GitHub</p>
                        <p className="text-xs text-brand-600 mt-0.5">github.com/ecopay/app-v1</p>
                      </div>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                      <ExternalLink className="h-8 w-8 text-blue-600" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-900">Vidéo de démo</p>
                        <p className="text-xs text-brand-600 mt-0.5">youtu.be/dQw4w9WgXcQ</p>
                      </div>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                      <FileText className="h-8 w-8 text-amber-500" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-slate-900">Lien du prototype</p>
                        <p className="text-xs text-brand-600 mt-0.5">figma.com/file/.../ecotrade</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Screenshots / Documents */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Captures d'écran</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <img src="https://placehold.co/400x300/e2e8f0/64748b?text=App+Login" alt="Capture d'écran 1" className="rounded-lg border border-slate-200 object-cover w-full h-32 hover:opacity-90 cursor-pointer" />
                    <img src="https://placehold.co/400x300/e2e8f0/64748b?text=Dashboard" alt="Capture d'écran 2" className="rounded-lg border border-slate-200 object-cover w-full h-32 hover:opacity-90 cursor-pointer" />
                    <img src="https://placehold.co/400x300/e2e8f0/64748b?text=Transfert" alt="Capture d'écran 3" className="rounded-lg border border-slate-200 object-cover w-full h-32 hover:opacity-90 cursor-pointer" />
                  </div>
                </div>

              </div>

            </div>
            
            {/* Bottom Action Bar */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Soumis le 15 Juin 2026 à 23:45
              </span>
              <div className="flex gap-3">
                <Link to="/mentor/teams/1/feedback" className="inline-flex justify-center rounded-md border border-transparent bg-brand-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                  Passer à l'évaluation
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

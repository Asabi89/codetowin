import React, { useState } from 'react';

export default function OrganizerSettings() {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Topbar equivalent */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900">Paramètres de l'Organisation</h1>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mt-6 border-b border-slate-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button 
              onClick={() => setActiveTab('info')}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'info' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              Informations Organisateur
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'security' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              Sécurité
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'notifications' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              Notifications
            </button>
          </nav>
        </div>

        {/* Tab Content: Informations */}
        {activeTab === 'info' && (
          <div className="mt-8 space-y-6">
            <div className="bg-white shadow sm:rounded-xl px-4 py-6 sm:p-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-slate-900">Profil de l'Organisation</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Ces informations seront affichées publiquement sur vos pages de hackathons.</p>
              </div>

              <form className="mt-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="org-name" className="block text-sm font-medium leading-6 text-slate-900">Nom de l'organisation</label>
                    <div className="mt-2">
                      <input type="text" name="org-name" id="org-name" defaultValue="TechHub Sénégal" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium leading-6 text-slate-900">Description</label>
                    <div className="mt-2">
                      <textarea id="about" name="about" rows="3" defaultValue="Centre d'innovation et incubateur basé à Dakar, dédié à l'accompagnement des startups technologiques en Afrique de l'Ouest." className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">Écrivez quelques phrases pour décrire votre mission.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium leading-6 text-slate-900">Photo de profil / Logo</label>
                    <div className="mt-2 flex items-center gap-4">
                      <img src="https://ui-avatars.com/api/?name=TechHub+Senegal&background=047857&color=fff" alt="" className="h-16 w-16 rounded-full" />
                      <button type="button" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">Changer</button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium leading-6 text-slate-900">Site Web</label>
                    <div className="mt-2">
                      <input type="url" name="website" id="website" defaultValue="https://techhub-senegal.com" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900">Adresse Email de contact</label>
                    <div className="mt-2">
                      <input type="email" name="email" id="email" defaultValue="contact@techhub-senegal.com" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  {/* Réseaux Sociaux */}
                  <div className="pt-6 border-t border-slate-200">
                    <h3 className="text-sm font-medium leading-6 text-slate-900 mb-4">Réseaux Sociaux</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium leading-6 text-slate-900">LinkedIn</label>
                        <div className="mt-2">
                          <input type="text" name="linkedin" id="linkedin" defaultValue="techhub-senegal" placeholder="linkedin.com/company/techhub-senegal" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="twitter" className="block text-sm font-medium leading-6 text-slate-900">Twitter / X</label>
                        <div className="mt-2">
                          <input type="text" name="twitter" id="twitter" defaultValue="techhub_sn" placeholder="twitter.com/techhub_sn" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <button type="button" className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">Enregistrer les modifications</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab Content: Sécurité */}
        {activeTab === 'security' && (
          <div className="mt-8 space-y-6">
            <div className="bg-white shadow sm:rounded-xl px-4 py-6 sm:p-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-slate-900">Changer le mot de passe</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Assurez-vous de choisir un mot de passe robuste.</p>
              </div>

              <form className="mt-6 space-y-6">
                <div className="space-y-6">
                  <div className="max-w-md">
                    <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-slate-900">Mot de passe actuel</label>
                    <div className="mt-2">
                      <input type="password" id="current-password" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                  <div className="max-w-md">
                    <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-slate-900">Nouveau mot de passe</label>
                    <div className="mt-2">
                      <input type="password" id="new-password" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                  <div className="max-w-md">
                    <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-slate-900">Confirmer le nouveau mot de passe</label>
                    <div className="mt-2">
                      <input type="password" id="confirm-password" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <button type="button" className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">Mettre à jour le mot de passe</button>
                </div>
              </form>
            </div>

            {/* Double Authentification */}
            <div className="bg-white shadow sm:rounded-xl px-4 py-6 sm:p-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-slate-900">Authentification à deux facteurs (A2F)</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-6">
                <div>
                  <h3 className="text-sm font-medium leading-6 text-slate-900">Status A2F</h3>
                  <p className="mt-1 text-sm text-slate-500">L'authentification à deux facteurs est actuellement <span className="font-semibold text-slate-900">désactivée</span>.</p>
                </div>
                <button type="button" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">Activer l'A2F</button>
              </div>
            </div>

            {/* Zone de Danger */}
            <div className="bg-red-50 shadow sm:rounded-xl px-4 py-6 sm:p-8 ring-1 ring-inset ring-red-200">
              <div>
                <h2 className="text-base font-semibold leading-7 text-red-600">Zone de Danger</h2>
                <p className="mt-1 text-sm leading-6 text-red-500">Actions irréversibles concernant votre compte et votre organisation.</p>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row sm:items-start sm:justify-between border-t border-red-200 pt-6 gap-4">
                <div>
                  <h3 className="text-sm font-medium leading-6 text-slate-900">Supprimer l'organisation</h3>
                  <p className="mt-1 text-sm text-slate-500 max-w-2xl">La suppression de l'organisation entraînera la perte de toutes les données liées, y compris les hackathons, les membres et les soumissions. Cette action est <span className="font-bold text-slate-700">définitive et irréversible</span>.</p>
                </div>
                <button type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 shrink-0">Supprimer l'organisation</button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Notifications */}
        {activeTab === 'notifications' && (
          <div className="mt-8 space-y-6">
            <div className="bg-white shadow sm:rounded-xl px-4 py-6 sm:p-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-slate-900">Préférences de notifications</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Choisissez les événements pour lesquels vous souhaitez être alerté par e-mail.</p>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <div className="relative flex items-start mb-4">
                  <div className="flex h-6 items-center">
                    <input id="notif-submissions" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="notif-submissions" className="font-medium text-slate-900">Nouvelles soumissions</label>
                    <p className="text-slate-500">Recevoir un e-mail à chaque fois qu'une équipe soumet un projet final.</p>
                  </div>
                </div>

                <div className="relative flex items-start mb-4">
                  <div className="flex h-6 items-center">
                    <input id="notif-mentors" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="notif-mentors" className="font-medium text-slate-900">Réponses des mentors</label>
                    <p className="text-slate-500">Être alerté lorsqu'un mentor accepte ou refuse votre invitation.</p>
                  </div>
                </div>

                <div className="relative flex items-start mb-4">
                  <div className="flex h-6 items-center">
                    <input id="notif-weekly" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="notif-weekly" className="font-medium text-slate-900">Rapport hebdomadaire</label>
                    <p className="text-slate-500">Recevoir un résumé des inscriptions et de l'activité chaque lundi.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end border-t border-slate-200 pt-6">
                <button type="button" className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">Enregistrer les préférences</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

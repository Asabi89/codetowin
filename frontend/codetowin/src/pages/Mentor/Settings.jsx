import React, { useState } from 'react';

export default function MentorSettings() {
  const [activeTab, setActiveTab] = useState('security');

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-slate-900">Paramètres du Mentor</h1>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto bg-slate-50">
        
        <div className="mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
          
          {/* Tabs Navigation */}
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
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

          {/* Tab Content: Sécurité */}
          {activeTab === 'security' && (
            <div className="mt-8 space-y-6">
              <div className="bg-white shadow sm:rounded-xl">
                <div className="px-4 py-6 sm:p-8">
                  <div>
                    <h2 className="text-base font-semibold leading-7 text-slate-900">Changer le mot de passe</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Assurez-vous de choisir un mot de passe robuste.</p>
                  </div>

                  <form className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                      <div className="col-span-full">
                        <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-slate-900">Mot de passe actuel</label>
                        <div className="mt-2">
                          <input type="password" id="current-password" className="block w-full max-w-md rounded-md border-slate-300 py-1.5 text-slate-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm sm:leading-6 px-3 border" />
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-slate-900">Nouveau mot de passe</label>
                        <div className="mt-2">
                          <input type="password" id="new-password" className="block w-full max-w-md rounded-md border-slate-300 py-1.5 text-slate-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm sm:leading-6 px-3 border" />
                        </div>
                      </div>
                      <div className="col-span-full">
                        <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-slate-900">Confirmer le nouveau mot de passe</label>
                        <div className="mt-2">
                          <input type="password" id="confirm-password" className="block w-full max-w-md rounded-md border-slate-300 py-1.5 text-slate-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm sm:leading-6 px-3 border" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <button type="button" className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500">Mettre à jour le mot de passe</button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Double Authentification */}
              <div className="bg-white shadow sm:rounded-xl">
                <div className="px-4 py-6 sm:p-8">
                  <div>
                    <h2 className="text-base font-semibold leading-7 text-slate-900">Authentification à deux facteurs (A2F)</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">Status A2F</h3>
                      <p className="text-sm text-slate-500">L'authentification à deux facteurs est actuellement <span className="font-semibold text-slate-900">désactivée</span>.</p>
                    </div>
                    <button type="button" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">Activer l'A2F</button>
                  </div>
                </div>
              </div>

              {/* Zone de Danger */}
              <div className="bg-white shadow sm:rounded-xl border border-red-100">
                <div className="px-4 py-6 sm:p-8">
                  <div>
                    <h2 className="text-base font-semibold leading-7 text-red-600">Zone de Danger</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Actions irréversibles concernant votre compte et votre organisation.</p>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-100 pt-6 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-900">Supprimer mon compte</h3>
                      <p className="mt-1 text-sm text-slate-500 max-w-2xl">La suppression de votre compte effacera de façon permanente votre profil et votre participation à toutes les équipes de mentorat. Cette action est <span className="font-bold text-slate-700">définitive et irréversible</span>.</p>
                    </div>
                    <button type="button" className="flex-shrink-0 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Supprimer mon compte</button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab Content: Notifications */}
          {activeTab === 'notifications' && (
            <div className="mt-8 space-y-6">
              <div className="bg-white shadow sm:rounded-xl">
                <div className="px-4 py-6 sm:p-8">
                  <div>
                    <h2 className="text-base font-semibold leading-7 text-slate-900">Préférences de notifications</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-500">Choisissez les événements pour lesquels vous souhaitez être alerté par e-mail.</p>
                  </div>

                  <div className="mt-6 border-t border-slate-100 pt-6 space-y-4">
                    <div className="flex items-start">
                      <div className="flex h-6 items-center">
                        <input id="notif-invitations" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor="notif-invitations" className="font-medium text-slate-900">Nouvelles invitations</label>
                        <p className="text-slate-500">Recevoir un e-mail à chaque fois qu'un organisateur vous invite en tant que mentor.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex h-6 items-center">
                        <input id="notif-messages" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor="notif-messages" className="font-medium text-slate-900">Messages des équipes</label>
                        <p className="text-slate-500">Être alerté lorsqu'un participant de vos équipes assignées vous envoie un message.</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex h-6 items-center">
                        <input id="notif-weekly" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor="notif-weekly" className="font-medium text-slate-900">Récapitulatif hebdomadaire</label>
                        <p className="text-slate-500">Recevoir un résumé des événements clés sur vos hackathons chaque lundi.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 mt-6 border-t border-slate-100">
                    <button type="button" className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500">Enregistrer les préférences</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

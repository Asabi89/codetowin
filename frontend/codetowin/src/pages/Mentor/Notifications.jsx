import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MessageSquare, Users } from 'lucide-react';

export default function MentorNotifications() {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-slate-900">Centre de notifications</h1>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="text-sm font-medium text-brand-600 hover:text-brand-800">
            Tout marquer comme lu
          </button>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        <div className="mx-auto max-w-4xl">
          <div className="sm:flex sm:items-center sm:justify-between mb-6">
            <div className="sm:flex-auto">
              <h1 className="font-display text-2xl font-bold text-slate-900">Vos Notifications</h1>
              <p className="mt-2 text-sm text-slate-700">Restez informé de l'activité de vos équipes et des organisateurs.</p>
            </div>
            
            {/* Filters */}
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <select className="block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border shadow-sm">
                <option>Toutes les notifications</option>
                <option>Non lues (2)</option>
                <option>Équipes</option>
                <option>Hackathons</option>
              </select>
            </div>
          </div>

          {/* Notification List */}
          <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-slate-200">
            <ul className="divide-y divide-slate-200">
              
              {/* Unread Notification 1 */}
              <li className="bg-brand-50/50 hover:bg-brand-50/80 transition cursor-pointer relative">
                {/* Unread dot */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500"></div>
                
                <div className="px-4 py-5 sm:px-6 flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                      <Users className="h-5 w-5 text-blue-600" />
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">Nouvelle équipe assignée</p>
                      <p className="text-sm text-brand-600 font-semibold">Il y a 10 min</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      L'organisateur vient de vous assigner l'équipe <strong>"EcoPay Solutions"</strong> pour le hackathon <span className="font-medium">"Fintech Builders Challenge"</span>.
                    </p>
                    <div className="mt-3 flex space-x-3">
                      <button type="button" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                        Contacter l'équipe
                      </button>
                    </div>
                  </div>
                </div>
              </li>

              {/* Unread Notification 2 */}
              <li className="bg-brand-50/50 hover:bg-brand-50/80 transition cursor-pointer relative">
                {/* Unread dot */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-500"></div>

                <div className="px-4 py-5 sm:px-6 flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-900">Nouveau message</p>
                      <p className="text-sm text-brand-600 font-semibold">Il y a 1 heure</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      Vous avez reçu un nouveau message de <strong>Moussa Diop</strong> dans le groupe <span className="font-medium">"EcoPay Solutions"</span>.
                    </p>
                  </div>
                </div>
              </li>

              {/* Read Notification 1 */}
              <li className="hover:bg-slate-50 transition cursor-pointer">
                <div className="px-4 py-5 sm:px-6 flex items-start">
                  <div className="flex-shrink-0 pt-1">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                      <CheckCircle className="h-5 w-5 text-slate-500" />
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-700">Soumission de projet requise</p>
                      <p className="text-sm text-slate-500">Hier</p>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      L'équipe <strong>"CryptoFarm"</strong> a soumis son projet final. Vous pouvez maintenant consulter les détails et procéder à l'évaluation.
                    </p>
                    <div className="mt-3">
                      <Link to="/mentor/submissions/1" className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none">
                        Voir la soumission
                      </Link>
                    </div>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          
          <div className="mt-4 flex justify-center">
            <button type="button" className="text-sm font-medium text-brand-600 hover:text-brand-800 bg-white border border-slate-200 px-4 py-2 rounded-md shadow-sm">
              Charger plus de notifications
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}

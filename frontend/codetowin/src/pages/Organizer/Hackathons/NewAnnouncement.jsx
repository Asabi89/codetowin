import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, Info } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export default function OrganizerNewAnnouncement() {
  const { id } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Annonce envoyée avec succès !", "success");
    navigate(`/organizer/hackathons/${id}/announcements`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
        
        <div className="mx-auto max-w-3xl">
          {/* Navigation retour */}
          <div className="mb-6">
            <Link to={`/organizer/hackathons/${id}/announcements`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700">
              <ChevronLeft className="mr-1 h-5 w-5" />
              Retour aux annonces
            </Link>
          </div>

          <div className="sm:flex sm:items-center sm:justify-between mb-8">
            <div className="sm:flex-auto">
              <h1 className="font-display text-3xl font-bold text-slate-900">Nouvelle Annonce</h1>
              <p className="mt-2 text-sm text-slate-700">Rédigez un message à diffuser aux participants de l'événement.</p>
            </div>
          </div>

          {/* Compose Area */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div className="sm:col-span-2">
                    <label htmlFor="audience" className="block text-sm font-semibold text-slate-900">Audience cible</label>
                    <p className="text-xs text-slate-500 mb-2">Qui doit recevoir ce message ?</p>
                    <select id="audience" name="audience" className="mt-1 block w-full rounded-md border-slate-300 py-2.5 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border ring-1 ring-inset ring-slate-300">
                      <option>Tous les participants</option>
                      <option>Équipes formées uniquement</option>
                      <option>Mentors uniquement</option>
                      <option>Participants sans équipe</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-900 mb-3">Canaux de diffusion</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Channel In-App */}
                      <div className="relative flex items-start rounded-lg border border-slate-200 p-4 shadow-sm">
                        <div className="flex h-5 items-center">
                          <input id="channel-inapp" name="channels" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="channel-inapp" className="font-medium text-slate-900 cursor-pointer">Notification plateforme</label>
                          <p className="text-slate-500 mt-1">Apparaît dans le centre de notifications.</p>
                        </div>
                      </div>
                      {/* Channel Email */}
                      <div className="relative flex items-start rounded-lg border border-slate-200 p-4 shadow-sm">
                        <div className="flex h-5 items-center">
                          <input id="channel-email" name="channels" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="channel-email" className="font-medium text-slate-900 cursor-pointer">Email direct</label>
                          <p className="text-slate-500 mt-1">Envoi dans la boîte mail des utilisateurs.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-900">Sujet de l'annonce</label>
                    <div className="mt-2">
                      <input type="text" name="subject" id="subject" className="block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="ex: Cérémonie de remise des prix" required />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-900">Contenu du message</label>
                    <div className="mt-2">
                      <textarea id="message" name="message" rows="10" className="block w-full rounded-md border-0 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="Bonjour à tous,..." required></textarea>
                    </div>
                    <p className="mt-2 text-sm text-slate-500 flex items-center">
                      <Info className="mr-1.5 h-4 w-4 text-slate-400" />
                      Formatage Markdown supporté pour mettre en gras (**texte**), créer des listes (- item), etc.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="schedule" className="block text-sm font-semibold text-slate-900">Planification de l'envoi (optionnel)</label>
                    <p className="text-xs text-slate-500 mb-2">Laissez vide pour envoyer immédiatement.</p>
                    <div className="mt-1 max-w-sm">
                      <input type="datetime-local" name="schedule" id="schedule" className="block w-full rounded-md border-0 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                  <button type="button" className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                    Sauvegarder en brouillon
                  </button>
                  <button type="submit" className="inline-flex justify-center rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
                    <Send className="-ml-1 mr-2 h-5 w-5" />
                    Envoyer l'annonce
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
    </div>
  );
}

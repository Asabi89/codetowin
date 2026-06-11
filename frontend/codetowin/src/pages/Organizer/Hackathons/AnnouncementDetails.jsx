import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function OrganizerAnnouncementDetails() {
  const { id, announcementId } = useParams();

  // In a real app, you would fetch announcement details based on ID.
  // Using static data matching the template for now.
  const announcement = {
    title: 'Rappel : Plus que 3 jours !',
    sentDate: '15 Juin 2026 à 14h30',
    status: 'Envoyée',
    audience: 'Toutes les équipes formées',
    channels: 'Notification plateforme, Email',
    engagement: { rate: '68%', details: "d'ouverture (42/62)" },
    content: `
      <p>Bonjour à toutes les équipes,</p>
      <p>Il ne vous reste plus que <strong>3 jours</strong> avant la clôture des soumissions pour le hackathon <em>AI for Climate Africa</em>.</p>
      <p>N'oubliez pas que votre soumission doit impérativement inclure :</p>
      <ul>
        <li>Un lien vers votre repository GitHub (public).</li>
        <li>Une vidéo de démonstration de 3 minutes maximum.</li>
        <li>Une brève description de l'architecture technique.</li>
      </ul>
      <p>Si vous avez des questions de dernière minute, n'hésitez pas à solliciter les mentors sur la plateforme.</p>
      <p>Bon courage pour le sprint final ! 🚀</p>
      <p><em>L'équipe d'organisation</em></p>
    `
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
      
      {/* Page Header mimicking the breadcrumb and top actions */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2 text-sm">
          <Link to={`/organizer/hackathons`} className="font-medium text-slate-500 hover:text-slate-900">AI for Climate Africa</Link>
          <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <Link to={`/organizer/hackathons/${id}/announcements`} className="font-medium text-slate-500 hover:text-slate-900">Annonces</Link>
          <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-slate-900">Détails de l'annonce</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Navigation retour */}
        <div className="mb-6">
          <Link to={`/organizer/hackathons/${id}/announcements`} className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700">
            <svg className="mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux annonces
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Header de l'annonce */}
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-display text-2xl font-bold text-slate-900">{announcement.title}</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Envoyé le {announcement.sentDate}
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                  <svg className="-ml-1 mr-1.5 h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  {announcement.status}
                </span>
              </div>
            </div>
          </div>

          {/* Métadonnées (Audience, Canaux, Stats) */}
          <div className="border-b border-slate-200 px-6 py-4 bg-white grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Audience cible</dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">{announcement.audience}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Canaux</dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">{announcement.channels}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">Engagement (Emails)</dt>
              <dd className="mt-1 flex items-baseline">
                <span className="text-lg font-bold text-brand-600">{announcement.engagement.rate}</span>
                <span className="ml-2 text-sm text-slate-500">{announcement.engagement.details}</span>
              </dd>
            </div>
          </div>

          {/* Contenu de l'annonce */}
          <div className="px-6 py-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Contenu du message</h2>
            <div 
              className="prose prose-slate max-w-none text-slate-700"
              dangerouslySetInnerHTML={{ __html: announcement.content }}
            />
          </div>
          
          {/* Actions */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
            <button type="button" className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
              <svg className="-ml-1 mr-2 h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
              </svg>
              Dupliquer l'annonce
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

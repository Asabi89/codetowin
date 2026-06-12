import React from 'react';
import { Link } from 'react-router-dom';

const statusStyles = {
  submitted: 'bg-blue-100 text-blue-800',
  evaluated: 'bg-green-100 text-green-800',
  'Soumis': 'bg-blue-100 text-blue-800',
  'Évalué': 'bg-green-100 text-green-800',
};

function ExternalLinkIcon() {
  return (
    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export default function SubmissionCard({ submission }) {
  const evaluated = submission.status === 'evaluated' || submission.status === 'Évalué';
  const statusLabel = submission.statusLabel || (evaluated ? 'Évalué' : 'Soumis');
  
  const githubUrl = submission.githubUrl || submission.repoLink || '#';
  const demoUrl = submission.demoUrl || submission.demoLink || '#';
  const demoLabel = submission.demoLabel || (evaluated ? 'Lien direct' : 'Voir la vidéo');
  
  const feedbackPath = submission.feedbackPath || submission.actionLink || '#';
  const actionLabel = submission.actionLabel || (evaluated ? 'Modifier note' : 'Évaluer');

  const statusClass = statusStyles[submission.status] || statusStyles.submitted;

  return (
    <div className={`col-span-1 flex flex-col rounded-xl bg-white shadow-sm transition hover:shadow-md ${evaluated ? 'border border-brand-200 ring-1 ring-brand-500' : 'border border-slate-200'}`}>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-sm font-medium text-slate-800">Équipe : {submission.teamName}</span>
          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusClass}`}>{statusLabel}</span>
        </div>
        <h3 className="mt-4 text-xl font-bold text-slate-900">{submission.projectName}</h3>
        <p className="mt-2 text-sm text-slate-500 line-clamp-3">{submission.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {submission.tags && submission.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{tag}</span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">GitHub:</span>
            <a href={githubUrl} className="font-medium text-brand-600 hover:text-brand-800 flex items-center">
              Voir le repo
              <ExternalLinkIcon />
            </a>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Démo:</span>
            <a href={demoUrl} className="font-medium text-brand-600 hover:text-brand-800 flex items-center">
              {demoLabel}
              {evaluated ? (
                <ExternalLinkIcon />
              ) : (
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </a>
          </div>
        </div>
      </div>

      <div className={`${evaluated ? 'bg-brand-50 border-brand-200' : 'bg-slate-50 border-slate-200'} px-6 py-4 rounded-b-xl border-t`}>
        <div className="flex items-center justify-between">
          <div>
            <span className={`text-xs uppercase tracking-wider font-semibold ${evaluated ? 'text-brand-700' : 'text-slate-500'}`}>Score Actuel</span>
            <div className={`mt-1 text-2xl font-bold ${evaluated ? 'text-brand-900' : 'text-slate-900'}`}>
              {submission.score ?? '--'} <span className={`text-sm font-medium ${evaluated ? 'text-brand-700' : 'text-slate-500'}`}>/ 40</span>
            </div>
          </div>
          <Link to={feedbackPath} className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${evaluated ? 'border border-brand-300 bg-white text-brand-700 hover:bg-brand-50' : 'border border-transparent bg-brand-600 text-white hover:bg-brand-700'}`}>
            {actionLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

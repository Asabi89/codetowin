import React from 'react';
import { SpinnerIcon } from './LoadingSpinner';

const defaultSteps = [
  { label: 'Préparation', status: 'done' },
  { label: 'Traitement en cours', status: 'loading' },
  { label: 'Finalisation', status: 'pending' },
];

function StepIcon({ status }) {
  if (status === 'done') {
    return (
      <svg className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    );
  }

  if (status === 'loading') {
    return (
      <div role="status" aria-label="Étape en cours" className="shrink-0">
        <SpinnerIcon size="sm" />
        <span className="sr-only">Étape en cours</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <svg className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    );
  }

  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white">
      <span className="h-2 w-2 rounded-full bg-slate-300" />
    </span>
  );
}

function getStepTextClass(status) {
  if (status === 'done') return 'text-slate-700';
  if (status === 'loading') return 'font-semibold text-slate-900';
  if (status === 'error') return 'font-semibold text-red-700';
  return 'text-slate-400';
}

export default function LoadingSteps({
  title = 'Traitement en cours',
  steps = defaultSteps,
  description,
  className = '',
}) {
  return (
    <section className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`} aria-live="polite">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      )}

      <ul className="mt-5 max-w-md space-y-3">
        {steps.map((step, index) => {
          const status = step.status || 'pending';

          return (
            <li key={`${step.label}-${index}`} className={`flex items-center gap-2 text-sm ${getStepTextClass(status)}`}>
              <StepIcon status={status} />
              <span>{step.label}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

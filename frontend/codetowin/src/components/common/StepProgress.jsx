import React from 'react';

const defaultSteps = [
  { label: 'Informations', description: 'Détails de base', status: 'done' },
  { label: 'Configuration', description: 'Paramètres principaux', status: 'current' },
  { label: 'Vérification', description: 'Relire avant validation', status: 'pending' },
];

function CheckIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
    </svg>
  );
}

function ArrowIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 16 4-4-4-4m6 8 4-4-4-4" />
    </svg>
  );
}

function ErrorIcon({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 9-6 6m0-6 6 6" />
    </svg>
  );
}

function getStatusLabel(status) {
  if (status === 'done') return 'Terminé';
  if (status === 'current') return 'Étape en cours';
  if (status === 'error') return 'Erreur';
  return 'À venir';
}

function getCardClasses(status) {
  if (status === 'done') return 'border-emerald-200 bg-emerald-50 text-emerald-800';
  if (status === 'current') return 'border-brand-200 bg-brand-50 text-brand-800 ring-1 ring-brand-500/20';
  if (status === 'error') return 'border-red-200 bg-red-50 text-red-800';
  return 'border-slate-200 bg-slate-50 text-slate-500';
}

function StepStatusIcon({ status, index }) {
  if (status === 'done') return <CheckIcon />;
  if (status === 'error') return <ErrorIcon />;
  if (status === 'current') return <ArrowIcon />;

  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs font-semibold">
      {index + 1}
    </span>
  );
}

function CardsStepProgress({ steps, onStepClick }) {
  return (
    <ol className="w-full max-w-sm space-y-4">
      {steps.map((step, index) => {
        const status = step.status || 'pending';
        const content = (
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="sr-only">{getStatusLabel(status)}</span>
              <h3 className="font-medium">{index + 1}. {step.label}</h3>
              {step.description && (
                <p className="mt-1 text-xs opacity-80">{step.description}</p>
              )}
            </div>
            <StepStatusIcon status={status} index={index} />
          </div>
        );

        return (
          <li key={`${step.label}-${index}`}>
            {onStepClick ? (
              <button
                type="button"
                onClick={() => onStepClick(step, index)}
                className={`w-full rounded-xl border p-4 text-left transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${getCardClasses(status)}`}
                aria-current={status === 'current' ? 'step' : undefined}
              >
                {content}
              </button>
            ) : (
              <div className={`w-full rounded-xl border p-4 ${getCardClasses(status)}`} role="listitem" aria-current={status === 'current' ? 'step' : undefined}>
                {content}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function TimelineStepProgress({ steps, onStepClick }) {
  return (
    <ol className="relative border-s border-slate-200 text-slate-600">
      {steps.map((step, index) => {
        const status = step.status || 'pending';
        const isLast = index === steps.length - 1;
        const iconClasses = status === 'done'
          ? 'bg-emerald-50 text-emerald-700'
          : status === 'current'
          ? 'bg-brand-50 text-brand-700'
          : status === 'error'
          ? 'bg-red-50 text-red-700'
          : 'bg-slate-100 text-slate-500';

        const content = (
          <>
            <span className={`absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white ${iconClasses}`}>
              <StepStatusIcon status={status} index={index} />
            </span>
            <h3 className={`font-medium leading-tight ${status === 'current' ? 'text-slate-900' : ''}`}>
              {step.label}
            </h3>
            {step.description && (
              <p className="mt-1 text-sm text-slate-500">{step.description}</p>
            )}
          </>
        );

        return (
          <li key={`${step.label}-${index}`} className={`${isLast ? '' : 'mb-10'} ms-7`} aria-current={status === 'current' ? 'step' : undefined}>
            {onStepClick ? (
              <button type="button" onClick={() => onStepClick(step, index)} className="block text-left focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                {content}
              </button>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ol>
  );
}

function HorizontalStepProgress({ steps, onStepClick }) {
  return (
    <ol className="flex w-full flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-center text-sm font-medium text-slate-500 shadow-sm sm:gap-4 sm:p-4">
      {steps.map((step, index) => {
        const status = step.status || 'pending';
        const isLast = index === steps.length - 1;
        const activeClass = status === 'done' || status === 'current' ? 'text-brand-700' : 'text-slate-500';
        const circleClass = status === 'done'
          ? 'border-brand-600 bg-brand-600 text-white'
          : status === 'current'
          ? 'border-brand-600 text-brand-700'
          : status === 'error'
          ? 'border-red-600 text-red-700'
          : 'border-slate-300 text-slate-500';

        const content = (
          <>
            <span className={`me-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${circleClass}`}>
              {status === 'done' ? <CheckIcon className="h-3.5 w-3.5" /> : index + 1}
            </span>
            <span>{step.shortLabel || step.label}</span>
          </>
        );

        return (
          <li key={`${step.label}-${index}`} className={`flex items-center ${activeClass}`} aria-current={status === 'current' ? 'step' : undefined}>
            {onStepClick ? (
              <button type="button" onClick={() => onStepClick(step, index)} className="inline-flex items-center rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
                {content}
              </button>
            ) : (
              <span className="inline-flex items-center">{content}</span>
            )}
            {!isLast && <ArrowIcon className="ms-2 h-5 w-5 text-slate-400" />}
          </li>
        );
      })}
    </ol>
  );
}

export default function StepProgress({
  steps = defaultSteps,
  variant = 'horizontal',
  title,
  description,
  className = '',
  onStepClick,
}) {
  const variants = {
    cards: <CardsStepProgress steps={steps} onStepClick={onStepClick} />,
    timeline: <TimelineStepProgress steps={steps} onStepClick={onStepClick} />,
    horizontal: <HorizontalStepProgress steps={steps} onStepClick={onStepClick} />,
  };

  return (
    <section className={className}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className="text-lg font-semibold text-slate-900">{title}</h2>}
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
      )}
      {variants[variant] || variants.horizontal}
    </section>
  );
}

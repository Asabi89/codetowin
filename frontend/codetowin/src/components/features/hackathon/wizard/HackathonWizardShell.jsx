import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StepProgress from '../../../common/StepProgress';
import WizardStep1General from './WizardStep1General';
import WizardStep2Content from './WizardStep2Content';
import WizardStep3Dates from './WizardStep3Dates';
import WizardStep4Format from './WizardStep4Format';
import WizardStep5Mentors from './WizardStep5Mentors';
import WizardStep6Branding from './WizardStep6Branding';
import WizardStep7Preview from './WizardStep7Preview';

const STEPS = [
  { id: 1, title: 'Informations générales' },
  { id: 2, title: 'Contenu détaillé' },
  { id: 3, title: 'Dates et calendrier' },
  { id: 4, title: 'Thèmes & Format' },
  { id: 5, title: 'Mentors' },
  { id: 6, title: 'Branding' },
  { id: 7, title: 'Preview & Soumission' },
];

const getStepStatus = (stepId, currentStep) => {
  if (stepId < currentStep) return 'done';
  if (stepId === currentStep) return 'current';
  return 'pending';
};

export default function HackathonWizardShell({
  mode = 'create',
  pageTitle = 'Créer un hackathon',
  initialData,
  isSubmitting,
  onSubmit,
  onSaveDraft,
  onDelete, // Seulement pour l'édition
  logoProps,
  bannerProps
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = STEPS.length;
  
  // L'état complet du formulaire
  const [formData, setFormData] = useState(initialData);

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => currentStep < totalSteps && setCurrentStep(prev => prev + 1);
  const handlePrev = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/organizer" className="font-medium text-slate-500 hover:text-slate-900">Accueil</Link>
          <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-slate-900">{pageTitle}</span>
        </div>
        <div className="flex space-x-3">
          {mode === 'edit' && onDelete && (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onDelete}
              className="inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Supprimer
            </button>
          )}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onSaveDraft(formData, logoProps.url, bannerProps.url)}
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Enregistrement...' : 'Sauvegarder en brouillon'}
          </button>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        
        {/* Sidebar */}
        <aside className="py-6 lg:col-span-3 lg:py-0">
          <StepProgress
            variant="cards"
            title={mode === 'create' ? "Étapes de création" : "Étapes d'édition"}
            description={mode === 'create' ? "Naviguez librement entre les sections." : "Mettez à jour chaque section."}
            steps={STEPS.map((step) => ({
              label: step.title,
              status: getStepStatus(step.id, currentStep),
            }))}
            onStepClick={(_, index) => setCurrentStep(index + 1)}
          />
        </aside>

        {/* Form Content */}
        <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
          <div className="shadow sm:overflow-hidden sm:rounded-xl bg-white">
            
            <div className={currentStep === 1 ? 'block' : 'hidden'}>
              <WizardStep1General formData={formData} updateForm={updateForm} />
            </div>
            <div className={currentStep === 2 ? 'block' : 'hidden'}>
              <WizardStep2Content formData={formData} updateForm={updateForm} />
            </div>
            <div className={currentStep === 3 ? 'block' : 'hidden'}>
              <WizardStep3Dates formData={formData} updateForm={updateForm} />
            </div>
            <div className={currentStep === 4 ? 'block' : 'hidden'}>
              <WizardStep4Format formData={formData} updateForm={updateForm} />
            </div>
            <div className={currentStep === 5 ? 'block' : 'hidden'}>
              <WizardStep5Mentors formData={formData} updateForm={updateForm} />
            </div>
            <div className={currentStep === 6 ? 'block' : 'hidden'}>
              <WizardStep6Branding logoProps={logoProps} bannerProps={bannerProps} />
            </div>
            <div className={currentStep === 7 ? 'block' : 'hidden'}>
              <WizardStep7Preview formData={formData} logoUrl={logoProps.url} bannerUrl={bannerProps.url} mode={mode} />
            </div>

            {/* Navigation Actions */}
            <div className="bg-slate-50 px-4 py-3 sm:px-6 border-t border-slate-200">
              <div className="flex justify-between items-center w-full">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={isSubmitting || currentStep === 1}
                  className={`inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${currentStep === 1 ? 'invisible' : ''}`}
                >
                  Précédent
                </button>
                <div className="flex-1"></div>
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md border border-transparent bg-brand-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                  >
                    Étape suivante
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSubmit(formData, logoProps.url, bannerProps.url)}
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-md border border-transparent bg-brand-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting 
                      ? (mode === 'create' ? 'Publication...' : 'Enregistrement...') 
                      : (mode === 'create' ? 'Publier le Hackathon' : 'Enregistrer les modifications')}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

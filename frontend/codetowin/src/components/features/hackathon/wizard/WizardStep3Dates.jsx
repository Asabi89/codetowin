import React from 'react';

export default function WizardStep3Dates({ formData, updateForm }) {
  return (
    <div className="space-y-6 py-6 px-4 sm:p-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-slate-900">Dates et calendrier</h3>
        <p className="mt-1 text-sm text-slate-500">Définissez la timeline de votre événement.</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-slate-700">Ouverture des inscriptions</label>
          <div className="mt-1">
            <input type="datetime-local" value={formData.registrationStart} onChange={(e) => updateForm('registrationStart', e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-slate-700">Clôture des inscriptions</label>
          <div className="mt-1">
            <input type="datetime-local" value={formData.registrationEnd} onChange={(e) => updateForm('registrationEnd', e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-slate-700">Début du Hackathon</label>
          <div className="mt-1">
            <input type="datetime-local" value={formData.hackathonStart} onChange={(e) => updateForm('hackathonStart', e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-slate-700">Date limite des soumissions</label>
          <div className="mt-1">
            <input type="datetime-local" value={formData.submissionDeadline} onChange={(e) => updateForm('submissionDeadline', e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
          </div>
        </div>
      </div>
    </div>
  );
}

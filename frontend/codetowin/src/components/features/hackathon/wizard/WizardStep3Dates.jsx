import React from 'react';

export default function WizardStep3Dates({ formData, updateForm, errors = {} }) {
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
            <input type="datetime-local" value={formData.registrationStart} onChange={(e) => updateForm('registrationStart', e.target.value)} className={`block w-full rounded-md shadow-sm sm:text-sm py-2 px-3 border ${errors.registration_start ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500'}`} />
            {errors.registration_start && <p className="mt-2 text-sm text-red-600">{errors.registration_start}</p>}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-slate-700">Clôture des inscriptions</label>
          <div className="mt-1">
            <input type="datetime-local" value={formData.registrationEnd} onChange={(e) => updateForm('registrationEnd', e.target.value)} className={`block w-full rounded-md shadow-sm sm:text-sm py-2 px-3 border ${errors.registration_end ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500'}`} />
            {errors.registration_end && <p className="mt-2 text-sm text-red-600">{errors.registration_end}</p>}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-slate-700">Début du Hackathon</label>
          <div className="mt-1">
            <input type="datetime-local" value={formData.hackathonStart} onChange={(e) => updateForm('hackathonStart', e.target.value)} className={`block w-full rounded-md shadow-sm sm:text-sm py-2 px-3 border ${errors.start_date ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500'}`} />
            {errors.start_date && <p className="mt-2 text-sm text-red-600">{errors.start_date}</p>}
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label className="block text-sm font-medium text-slate-700">Date limite des soumissions</label>
          <div className="mt-1">
            <input type="datetime-local" value={formData.submissionDeadline} onChange={(e) => updateForm('submissionDeadline', e.target.value)} className={`block w-full rounded-md shadow-sm sm:text-sm py-2 px-3 border ${errors.end_date ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-brand-500 focus:ring-brand-500'}`} />
            {errors.end_date && <p className="mt-2 text-sm text-red-600">{errors.end_date}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

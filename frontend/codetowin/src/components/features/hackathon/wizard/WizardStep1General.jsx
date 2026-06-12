import React from 'react';

export default function WizardStep1General({ formData, updateForm }) {
  return (
    <div className="space-y-6 py-6 px-4 sm:p-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-slate-900">Informations générales</h3>
        <p className="mt-1 text-sm text-slate-500">Commencez par les détails basiques de votre hackathon.</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3">
          <label className="block text-sm font-medium text-slate-700">Titre du hackathon <span className="text-red-500">*</span></label>
          <div className="mt-1">
            <input type="text" value={formData.title} onChange={(e) => updateForm('title', e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" placeholder="ex: AI for Climate Africa 2026" />
          </div>
        </div>
        <div className="col-span-3">
          <label className="block text-sm font-medium text-slate-700">Description courte <span className="text-red-500">*</span></label>
          <div className="mt-1">
            <textarea rows="2" value={formData.description} onChange={(e) => updateForm('description', e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border"></textarea>
          </div>
        </div>
        <div className="col-span-3">
          <label className="block text-sm font-medium text-slate-700 mb-2">Validation des inscriptions <span className="text-red-500">*</span></label>
          <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            <div className="flex items-center">
              <input id="mode-public" name="registration_mode" type="radio" checked={formData.registrationMode === 'open'} onChange={() => updateForm('registrationMode', 'open')} className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-600" />
              <label htmlFor="mode-public" className="ml-3 block text-sm font-medium leading-6 text-slate-900">Ouvert à tous <span className="font-normal text-slate-500">- Inscription automatique</span></label>
            </div>
            <div className="flex items-center">
              <input id="mode-approval" name="registration_mode" type="radio" checked={formData.registrationMode === 'approval'} onChange={() => updateForm('registrationMode', 'approval')} className="h-4 w-4 border-slate-300 text-brand-600 focus:ring-brand-600" />
              <label htmlFor="mode-approval" className="ml-3 block text-sm font-medium leading-6 text-slate-900">Sur approbation <span className="font-normal text-slate-500">- Validation manuelle requise</span></label>
            </div>
          </div>
        </div>
        <div className="col-span-3 sm:col-span-1">
          <label className="block text-sm font-medium text-slate-700">Limite de participants</label>
          <div className="mt-1">
            <input type="number" value={formData.participantLimit} onChange={(e) => updateForm('participantLimit', e.target.value)} className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" placeholder="ex: 200" />
          </div>
        </div>
        <div className="col-span-3 sm:col-span-1">
          <label className="block text-sm font-medium text-slate-700">Taille min équipe</label>
          <div className="mt-1">
            <input type="number" value={formData.minTeamSize} onChange={(e) => updateForm('minTeamSize', e.target.value)} min="1" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
          </div>
        </div>
        <div className="col-span-3 sm:col-span-1">
          <label className="block text-sm font-medium text-slate-700">Taille max équipe</label>
          <div className="mt-1">
            <input type="number" value={formData.maxTeamSize} onChange={(e) => updateForm('maxTeamSize', e.target.value)} min="1" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
          </div>
        </div>
      </div>
    </div>
  );
}

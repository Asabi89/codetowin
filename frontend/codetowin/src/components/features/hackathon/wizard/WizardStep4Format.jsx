import React from 'react';

export default function WizardStep4Format({ formData, updateForm }) {
  return (
    <div className="space-y-6 py-6 px-4 sm:p-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-slate-900">Thèmes & Format</h3>
        <p className="mt-1 text-sm text-slate-500">Sur quoi les participants vont-ils travailler ?</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Format de l'événement</label>
          <select value={formData.format} onChange={(e) => updateForm('format', e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-brand-500 focus:outline-none focus:ring-brand-500 sm:text-sm border">
            <option>100% en ligne</option>
            <option>Hybride (En ligne + Présentiel)</option>
            <option>Présentiel uniquement</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Thèmes principaux (tags)</label>
          <div className="mt-1">
            <input type="text" value={formData.themes} onChange={(e) => updateForm('themes', e.target.value)} placeholder="IA, FinTech, GreenTech (séparés par des virgules)" className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Technologies imposées ou recommandées</label>
          <div className="mt-1">
            <input type="text" value={formData.technologies} onChange={(e) => updateForm('technologies', e.target.value)} placeholder="React, Python, AWS..." className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border" />
          </div>
        </div>
      </div>
    </div>
  );
}

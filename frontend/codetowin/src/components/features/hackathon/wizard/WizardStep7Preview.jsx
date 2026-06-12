import React from 'react';

export default function WizardStep7Preview({ formData, logoUrl, bannerUrl, mode }) {
  return (
    <div className="space-y-6 py-6 px-4 sm:p-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-slate-900">Preview & Soumission</h3>
        <p className="mt-1 text-sm text-slate-500">Vérifiez les informations avant de {mode === 'create' ? 'publier' : 'sauvegarder'}.</p>
      </div>
      {/* Preview Card */}
      <div className="mb-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="relative h-48 w-full bg-slate-100 flex items-center justify-center">
          {bannerUrl ? (
            <img src={bannerUrl} alt="Banner" className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm text-slate-400">Aucune bannière de couverture</span>
          )}
          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 shadow backdrop-blur-sm">
            {formData.format}
          </div>
          <img src={logoUrl || 'https://ui-avatars.com/api/?name=Event+Logo&background=047857&color=fff&size=128&rounded=true'} alt="Logo" className="absolute -bottom-6 left-6 h-16 w-16 rounded-full border-4 border-white shadow-md object-cover bg-white" />
        </div>
        <div className="p-6 pt-10">
          <h4 className="text-xl font-bold text-slate-900">{formData.title || 'Titre du hackathon'}</h4>
          <p className="mt-2 text-slate-600">{formData.description || 'Description du hackathon...'}</p>
        </div>
      </div>
      <div className="bg-brand-50 border border-brand-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-brand-800">Prêt à être {mode === 'create' ? 'publié' : 'sauvegardé'}</h3>
            <div className="mt-2 text-sm text-brand-700">
              <p>Votre hackathon passera de brouillon à public. Les participants pourront commencer à s'inscrire si la date d'ouverture est atteinte.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

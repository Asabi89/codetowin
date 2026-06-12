import React from 'react';

export default function WizardStep6Branding({ 
  logoProps: { url: logo, inputRef: logoInputRef, handleChange: handleLogoChange },
  bannerProps: { url: banner, inputRef: bannerInputRef, handleChange: handleBannerChange }
}) {
  return (
    <div className="space-y-6 py-6 px-4 sm:p-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-slate-900">Branding</h3>
        <p className="mt-1 text-sm text-slate-500">Personnalisez l'apparence visuelle de la page du hackathon.</p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">Logo de l'événement</label>
          <div className="mt-2 flex items-center gap-6 rounded-md border border-slate-200 p-4">
            <img src={logo || 'https://ui-avatars.com/api/?name=Event+Logo&background=047857&color=fff&size=128&rounded=true'} alt="Logo de l'événement" className="h-20 w-20 rounded-full border border-slate-200 object-cover shadow-sm bg-white" />
            <div>
              <input type="file" ref={logoInputRef} onChange={handleLogoChange} accept="image/*" className="sr-only" />
              <button type="button" onClick={() => logoInputRef.current.click()} className="relative cursor-pointer rounded-md bg-white font-medium text-brand-600 focus-within:outline-none hover:text-brand-500">
                <span>Télécharger un fichier</span>
              </button>
              <p className="mt-1 text-xs text-slate-500">PNG, JPG jusqu'à 2MB</p>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Image de couverture (Bannière)</label>
          <div className="mt-2">
            <div className="group relative h-48 w-full overflow-hidden rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center">
              {banner ? (
                <img src={banner} alt="Bannière de l'événement" className="h-full w-full object-cover" />
              ) : (
                <span className="text-slate-400 text-sm">Aucune image de couverture sélectionnée (ratio 16:9 recommandé)</span>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 transition-opacity group-hover:opacity-100">
                <input type="file" ref={bannerInputRef} onChange={handleBannerChange} accept="image/*" className="sr-only" />
                <button type="button" onClick={() => bannerInputRef.current.click()} className="relative cursor-pointer rounded-md bg-white px-4 py-2 font-medium text-slate-900 shadow-sm hover:bg-slate-50">
                  <span>Télécharger la bannière</span>
                </button>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500">Ratio 16:9 recommandé</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useToast } from '../../../context/ToastContext';

export default function SecuritySettings({ isOrganization = false, onDeleteAccount }) {
  const { showToast } = useToast();

  const handleDelete = (e) => {
    e.preventDefault();
    if (onDeleteAccount) {
      onDeleteAccount();
    } else {
      showToast(isOrganization ? "Suppression de l'organisation demandée." : "Suppression du compte demandée.", "warning");
    }
  };

  return (
    <div className="space-y-6">
      {/* Changer le mot de passe */}
      <div className="bg-white shadow sm:rounded-xl">
        <div className="px-4 py-6 sm:p-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">Changer le mot de passe</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">Assurez-vous de choisir un mot de passe robuste.</p>
          </div>

          <form className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-slate-900">Mot de passe actuel</label>
                <div className="mt-2">
                  <input type="password" name="current-password" id="current-password" className="block w-full max-w-md rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6 px-3" />
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-slate-900">Nouveau mot de passe</label>
                <div className="mt-2">
                  <input type="password" name="new-password" id="new-password" className="block w-full max-w-md rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6 px-3" />
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-slate-900">Confirmer le nouveau mot de passe</label>
                <div className="mt-2">
                  <input type="password" name="confirm-password" id="confirm-password" className="block w-full max-w-md rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6 px-3" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-start">
              <button type="button" className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500">Mettre à jour le mot de passe</button>
            </div>
          </form>
        </div>
      </div>

      {/* Double Authentification */}
      <div className="bg-white shadow sm:rounded-xl">
        <div className="px-4 py-6 sm:p-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">Authentification à deux facteurs (A2F)</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
            <div>
              <h3 className="text-sm font-medium text-slate-900">Status A2F</h3>
              <p className="text-sm text-slate-500">L'authentification à deux facteurs est actuellement <span className="font-semibold text-slate-900">désactivée</span>.</p>
            </div>
            <button type="button" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">Activer l'A2F</button>
          </div>
        </div>
      </div>

      {/* Zone de Danger */}
      <div className={`bg-white shadow sm:rounded-xl border ${isOrganization ? 'bg-red-50 border-red-200' : 'border-red-100'}`}>
        <div className="px-4 py-6 sm:p-8">
          <div>
            <h2 className={`text-base font-semibold leading-7 ${isOrganization ? 'text-red-600' : 'text-red-600'}`}>Zone de Danger</h2>
            <p className={`mt-1 text-sm leading-6 ${isOrganization ? 'text-red-500' : 'text-slate-500'}`}>Actions irréversibles concernant votre compte et votre organisation.</p>
          </div>
          <div className={`mt-6 flex flex-col sm:flex-row sm:items-center justify-between border-t ${isOrganization ? 'border-red-200' : 'border-slate-100'} pt-6 gap-4`}>
            <div>
              <h3 className="text-sm font-medium text-slate-900">{isOrganization ? "Supprimer l'organisation" : "Supprimer mon compte"}</h3>
              <p className="mt-1 text-sm text-slate-500 max-w-2xl">
                {isOrganization 
                  ? "La suppression de l'organisation entraînera la perte de toutes les données liées, y compris les hackathons, les membres et les soumissions. Cette action est définitive et irréversible."
                  : "La suppression de votre compte effacera de façon permanente votre profil et votre participation à toutes les équipes de mentorat. Cette action est définitive et irréversible."}
              </p>
            </div>
            <button 
              type="button" 
              onClick={handleDelete}
              className="flex-shrink-0 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              {isOrganization ? "Supprimer l'organisation" : "Supprimer mon compte"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

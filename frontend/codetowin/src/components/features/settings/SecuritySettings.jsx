import React, { useContext, useState } from 'react';
import { useToast } from '../../../context/ToastContext';
import { AuthContext } from '../../../context/AuthContext';
import { usersApi } from '../../../api/users';

export default function SecuritySettings({ isOrganization = false, onDeleteAccount }) {
  const { showToast } = useToast();
  const auth = useContext(AuthContext);
  const userRole = auth?.role || (isOrganization ? 'organizer' : 'mentor');

  // Form states for password
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // State for 2FA
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [isToggling2FA, setIsToggling2FA] = useState(false);

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // Handle password submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Validations
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      showToast("Veuillez remplir tous les champs.", "error");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast("Les nouveaux mots de passe ne correspondent pas.", "error");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      showToast("Le nouveau mot de passe doit contenir au moins 8 caractères.", "error");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await usersApi.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      showToast("Mot de passe mis à jour avec succès !", "success");
      // Reset form
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showToast("Erreur lors de la mise à jour du mot de passe.", "error");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Handle 2FA Toggle
  const handleToggle2FA = async () => {
    setIsToggling2FA(true);
    try {
      const newStatus = !is2FAEnabled;
      await usersApi.toggle2FA(newStatus);
      setIs2FAEnabled(newStatus);
      showToast(newStatus ? "Authentification à deux facteurs activée." : "Authentification à deux facteurs désactivée.", "success");
    } catch (error) {
      showToast("Erreur lors du changement de l'A2F.", "error");
    } finally {
      setIsToggling2FA(false);
    }
  };

  // Handle Account Deletion
  const handleDelete = (e) => {
    e.preventDefault();
    if (onDeleteAccount) {
      onDeleteAccount();
    } else {
      showToast(userRole === 'organizer' ? "Suppression de l'organisation demandée." : "Suppression du compte demandée.", "warning");
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

          <form className="mt-6 space-y-6" onSubmit={handlePasswordSubmit}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="currentPassword" className="block text-sm font-medium leading-6 text-slate-900">Mot de passe actuel</label>
                <div className="mt-2">
                  <input 
                    type="password" 
                    name="currentPassword" 
                    id="currentPassword" 
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="block w-full max-w-md rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6 px-3" 
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-slate-900">Nouveau mot de passe</label>
                <div className="mt-2">
                  <input 
                    type="password" 
                    name="newPassword" 
                    id="newPassword" 
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="block w-full max-w-md rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6 px-3" 
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-slate-900">Confirmer le nouveau mot de passe</label>
                <div className="mt-2">
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="block w-full max-w-md rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6 px-3" 
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-start">
              <button 
                type="submit" 
                disabled={isUpdatingPassword}
                className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isUpdatingPassword ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                    Mise à jour...
                  </>
                ) : "Mettre à jour le mot de passe"}
              </button>
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
              <p className="text-sm text-slate-500">
                L'authentification à deux facteurs est actuellement <span className="font-semibold text-slate-900">{is2FAEnabled ? 'activée' : 'désactivée'}</span>.
              </p>
            </div>
            <button 
              type="button" 
              onClick={handleToggle2FA}
              disabled={isToggling2FA}
              className={`rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2
                ${is2FAEnabled 
                  ? 'bg-red-50 text-red-700 ring-red-200 hover:bg-red-100' 
                  : 'bg-white text-slate-900 ring-slate-300 hover:bg-slate-50'}`}
            >
              {isToggling2FA && <div className={`w-4 h-4 rounded-full border-2 border-t-transparent animate-spin ${is2FAEnabled ? 'border-red-700' : 'border-slate-900'}`}></div>}
              {is2FAEnabled ? "Désactiver l'A2F" : "Activer l'A2F"}
            </button>
          </div>
        </div>
      </div>

      {/* Zone de Danger */}
      <div className={`bg-white shadow sm:rounded-xl border ${userRole === 'organizer' ? 'bg-red-50 border-red-200' : 'border-red-100'}`}>
        <div className="px-4 py-6 sm:p-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-red-600">Zone de Danger</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {userRole === 'organizer' 
                ? "Actions irréversibles concernant l'organisation."
                : "Actions irréversibles concernant votre compte utilisateur."}
            </p>
          </div>
          <div className={`mt-6 flex flex-col sm:flex-row sm:items-center justify-between border-t ${userRole === 'organizer' ? 'border-red-200' : 'border-slate-100'} pt-6 gap-4`}>
            <div>
              <h3 className="text-sm font-medium text-slate-900">
                {userRole === 'organizer' ? "Supprimer l'organisation" : "Supprimer mon compte"}
              </h3>
              <p className="mt-1 text-sm text-slate-500 max-w-2xl">
                {userRole === 'organizer' && "La suppression de l'organisation entraînera la perte de toutes les données liées, y compris les hackathons, les membres et les soumissions. Cette action est définitive et irréversible."}
                {userRole === 'mentor' && "La suppression de votre compte effacera de façon permanente votre profil et votre participation à toutes les équipes de mentorat. Cette action est définitive et irréversible."}
                {userRole === 'participant' && "La suppression de votre compte effacera de façon permanente votre profil, votre équipe et votre participation aux hackathons. Cette action est définitive et irréversible."}
              </p>
            </div>
            <button 
              type="button" 
              onClick={handleDelete}
              className="flex-shrink-0 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              {userRole === 'organizer' ? "Supprimer l'organisation" : "Supprimer mon compte"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import SecuritySettings from '../../components/features/settings/SecuritySettings';
import useAuth from '../../hooks/useAuth';
import { usersApi } from '../../api/users';

export default function MentorSettings() {
  const { profile, registerUser } = useAuth();
  
  const [activeTab, setActiveTab] = useState('security');
  
  // Notifications State
  const [notifInvitations, setNotifInvitations] = useState(true);
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(true);
  
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Pre-fill from context
  useEffect(() => {
    if (profile && profile.notificationPrefs) {
      setNotifInvitations(profile.notificationPrefs.invitations !== false);
      setNotifMessages(profile.notificationPrefs.messages !== false);
      setNotifWeekly(profile.notificationPrefs.weekly !== false);
    }
  }, [profile]);

  const handleSaveNotifications = async () => {
    setSaving(true);
    setSuccess(false);
    setErrorMsg('');

    try {
      const notifData = {
        notificationPrefs: {
          ...profile?.notificationPrefs,
          invitations: notifInvitations,
          messages: notifMessages,
          weekly: notifWeekly,
        }
      };

      await usersApi.updateProfile(notifData);
      
      if (profile) {
        registerUser({
          ...profile,
          ...notifData
        });
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.warn("Erreur lors de la sauvegarde des notifications", err);
      setErrorMsg("Une erreur est survenue lors de l'enregistrement de vos préférences.");
      setTimeout(() => setErrorMsg(''), 4000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      <div className="mx-auto max-w-5xl">
        
        {/* Tabs Navigation */}
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button 
              onClick={() => setActiveTab('security')}
              className={`tab-btn whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'security' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              Sécurité
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`tab-btn whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'notifications' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              Notifications
            </button>
          </nav>
        </div>

        {/* Tab Content: Sécurité */}
        {activeTab === 'security' && (
          <div id="security" className="mt-8">
            <SecuritySettings />
          </div>
        )}

        {/* Tab Content: Notifications */}
        {activeTab === 'notifications' && (
          <div id="notifications" className="mt-8 space-y-6">
            {success && (
              <div className="rounded-md bg-emerald-50 p-4 border border-emerald-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-emerald-800">Préférences de notifications enregistrées avec succès !</p>
                  </div>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="rounded-md bg-red-50 p-4 border border-red-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{errorMsg}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white shadow sm:rounded-xl">
              <div className="px-4 py-6 sm:p-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-slate-900">Préférences de notifications</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-500">Choisissez les événements pour lesquels vous souhaitez être alerté par e-mail.</p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-6 space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-6 items-center">
                      <input 
                        id="notif-invitations" 
                        name="notif-invitations" 
                        type="checkbox" 
                        checked={notifInvitations} 
                        onChange={(e) => setNotifInvitations(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" 
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="notif-invitations" className="font-medium text-slate-900">Nouvelles invitations</label>
                      <p className="text-slate-500">Recevoir un e-mail à chaque fois qu'un organisateur vous invite en tant que mentor.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex h-6 items-center">
                      <input 
                        id="notif-messages" 
                        name="notif-messages" 
                        type="checkbox" 
                        checked={notifMessages} 
                        onChange={(e) => setNotifMessages(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" 
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="notif-messages" className="font-medium text-slate-900">Messages des équipes</label>
                      <p className="text-slate-500">Être alerté lorsqu'un participant de vos équipes assignées vous envoie un message.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex h-6 items-center">
                      <input 
                        id="notif-weekly" 
                        name="notif-weekly" 
                        type="checkbox" 
                        checked={notifWeekly} 
                        onChange={(e) => setNotifWeekly(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" 
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="notif-weekly" className="font-medium text-slate-900">Récapitulatif hebdomadaire</label>
                      <p className="text-slate-500">Recevoir un résumé des événements clés sur vos hackathons chaque lundi.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 mt-6 border-t border-slate-100">
                  <button 
                    type="button" 
                    disabled={saving}
                    onClick={handleSaveNotifications}
                    className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 disabled:opacity-50"
                  >
                    {saving ? 'Enregistrement...' : 'Enregistrer les préférences'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}


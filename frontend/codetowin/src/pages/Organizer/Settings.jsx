import React, { useState, useRef, useEffect } from 'react';
import SecuritySettings from '../../components/features/settings/SecuritySettings';
import { organizerApi } from '../../api/organizer';
import useAuth from '../../hooks/useAuth';

import { useNavigate } from 'react-router-dom';

export default function OrganizerSettings() {
  const navigate = useNavigate();
  const { updateProfileContext } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [profile, setProfile] = useState({
    organization_name: '',
    description: '',
    website: '',
    linkedin: '',
    twitter: '',
  });
  const [logo, setLogo] = useState('https://ui-avatars.com/api/?name=Organizer&background=047857&color=fff');
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoInputRef = useRef(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await organizerApi.getMe();
        const data = res.data || res;
        if (data) {
          setProfile({
            organization_name: data.organization_name || '',
            description: data.description || '',
            website: data.website || '',
            linkedin: data.linkedin || '',
            twitter: data.twitter || '',
          });
          if (data.logo) {
            setLogo(data.logo);
          } else if (data.organization_name) {
            setLogo(`https://ui-avatars.com/api/?name=${encodeURIComponent(data.organization_name)}&background=047857&color=fff`);
          }
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, val]) => {
        formData.append(key, val);
      });
      if (logoFile) {
        formData.append('logo', logoFile);
      }
      await organizerApi.updateMe(formData);
      // Update global context so sidebar and header update immediately
      updateProfileContext({ 
        firstName: profile.organization_name,
        avatar: logo 
      });
      navigate('/organizer');
    } catch (err) {
      console.error("Failed to save profile:", err);
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Topbar equivalent */}
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="font-display text-2xl font-bold text-slate-900">Paramètres de l'Organisation</h1>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mt-6 border-b border-slate-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button 
              onClick={() => setActiveTab('info')}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'info' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              Informations Organisateur
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'security' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              Sécurité
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${activeTab === 'notifications' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}
            >
              Notifications
            </button>
          </nav>
        </div>

        {/* Tab Content: Informations */}
        {activeTab === 'info' && (
          <div className="mt-8 space-y-6">
            <div className="bg-white shadow sm:rounded-xl px-4 py-6 sm:p-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-slate-900">Profil de l'Organisation</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Ces informations seront affichées publiquement sur vos pages de hackathons.</p>
              </div>

              {loading ? (
                <div className="py-12 text-center text-slate-500">Chargement...</div>
              ) : (
              <form className="mt-6 space-y-6" onSubmit={handleSaveInfo}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="organization_name" className="block text-sm font-medium leading-6 text-slate-900">Nom de l'organisation</label>
                    <div className="mt-2">
                      <input type="text" name="organization_name" id="organization_name" value={profile.organization_name} onChange={handleInputChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-slate-900">Description</label>
                    <div className="mt-2">
                      <textarea id="description" name="description" rows="3" value={profile.description} onChange={handleInputChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                    <p className="mt-2 text-sm text-slate-500">Écrivez quelques phrases pour décrire votre mission.</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium leading-6 text-slate-900">Photo de profil / Logo</label>
                    <div className="mt-2 flex items-center gap-4">
                      <img src={logo} alt="" className="h-16 w-16 rounded-full object-cover" />
                      <input
                        type="file"
                        ref={logoInputRef}
                        onChange={handleLogoChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                      <button
                        type="button"
                        onClick={() => logoInputRef.current.click()}
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                      >
                        Changer
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium leading-6 text-slate-900">Site Web</label>
                    <div className="mt-2">
                      <input type="url" name="website" id="website" value={profile.website} onChange={handleInputChange} className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>

                  {/* Réseaux Sociaux */}
                  <div className="pt-6 border-t border-slate-200">
                    <h3 className="text-sm font-medium leading-6 text-slate-900 mb-4">Réseaux Sociaux</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="linkedin" className="block text-sm font-medium leading-6 text-slate-900">LinkedIn</label>
                        <div className="mt-2">
                          <input type="text" name="linkedin" id="linkedin" value={profile.linkedin} onChange={handleInputChange} placeholder="URL linkedin" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="twitter" className="block text-sm font-medium leading-6 text-slate-900">Twitter / X</label>
                        <div className="mt-2">
                          <input type="text" name="twitter" id="twitter" value={profile.twitter} onChange={handleInputChange} placeholder="URL twitter" className="block w-full rounded-md border-0 py-1.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <button type="submit" className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">Enregistrer les modifications</button>
                </div>
              </form>
              )}
            </div>
          </div>
        )}

        {/* Tab Content: Sécurité */}
        {activeTab === 'security' && (
          <div className="mt-8">
            <SecuritySettings isOrganization />
          </div>
        )}

        {/* Tab Content: Notifications */}
        {activeTab === 'notifications' && (
          <div className="mt-8 space-y-6">
            <div className="bg-white shadow sm:rounded-xl px-4 py-6 sm:p-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-slate-900">Préférences de notifications</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">Choisissez les événements pour lesquels vous souhaitez être alerté par e-mail.</p>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <div className="relative flex items-start mb-4">
                  <div className="flex h-6 items-center">
                    <input id="notif-submissions" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="notif-submissions" className="font-medium text-slate-900">Nouvelles soumissions</label>
                    <p className="text-slate-500">Recevoir un e-mail à chaque fois qu'une équipe soumet un projet final.</p>
                  </div>
                </div>

                <div className="relative flex items-start mb-4">
                  <div className="flex h-6 items-center">
                    <input id="notif-mentors" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="notif-mentors" className="font-medium text-slate-900">Réponses des mentors</label>
                    <p className="text-slate-500">Être alerté lorsqu'un mentor accepte ou refuse votre invitation.</p>
                  </div>
                </div>

                <div className="relative flex items-start mb-4">
                  <div className="flex h-6 items-center">
                    <input id="notif-weekly" type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-600" />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="notif-weekly" className="font-medium text-slate-900">Rapport hebdomadaire</label>
                    <p className="text-slate-500">Recevoir un résumé des inscriptions et de l'activité chaque lundi.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end border-t border-slate-200 pt-6">
                <button type="button" className="rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">Enregistrer les préférences</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import { usersApi } from '../../api/users';
import { mentorsApi } from '../../api/mentors';

export default function MentorProfile() {
  const { profile, registerUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('https://ui-avatars.com/api/?name=Seydou+Kane&background=047857&color=fff&size=128');
  
  const [expertises, setExpertises] = useState(["Intelligence Artificielle", "Data Science", "Product Management"]);
  const [skills, setSkills] = useState(["Python", "TensorFlow"]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await usersApi.getProfile();
        if (data) {
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
          setTitle(data.title || '');
          setBio(data.bio || '');
          if (data.avatar) setAvatar(data.avatar);
          if (data.skills) setSkills(data.skills.split(', ').filter(Boolean));
        } else if (profile) {
          setFirstName(profile.firstName || '');
          setLastName(profile.lastName || '');
          setTitle(profile.title || '');
          setBio(profile.bio || '');
          if (profile.avatar) setAvatar(profile.avatar);
        }
      } catch (err) {
        console.warn('API error, using context profile data', err);
        if (profile) {
          setFirstName(profile.firstName || '');
          setLastName(profile.lastName || '');
          setTitle(profile.title || '');
          setBio(profile.bio || '');
          if (profile.avatar) setAvatar(profile.avatar);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [profile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    const updatedProfile = {
      ...profile,
      firstName,
      lastName,
      title,
      bio,
      avatar,
      skills: skills.join(', '),
    };

    try {
      // Try to update on the backend
      await Promise.all([
        usersApi.updateProfile({ firstName, lastName, avatar }),
        mentorsApi.updateMentorProfile({ title, bio })
      ]);
      
      // Update locally in auth context
      registerUser(updatedProfile);
      setSuccessMessage('Profil mis à jour avec succès !');
    } catch (err) {
      console.warn('Erreur API lors de la mise à jour du profil, mise à jour locale uniquement.', err);
      registerUser(updatedProfile);
      setSuccessMessage('Profil mis à jour localement (hors ligne).');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600"></div>
          <p className="text-sm font-medium text-slate-500">Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 h-full">
      <form onSubmit={handleSave} className="space-y-8 max-w-4xl mx-auto pb-12">
        {successMessage && (
          <div className="rounded-md bg-emerald-50 p-4 border border-emerald-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-emerald-800">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="rounded-md bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Informations personnelles */}
        <div className="bg-white shadow-sm ring-1 ring-slate-200 sm:rounded-xl">
          <div className="px-4 py-6 sm:p-8">
            <h2 className="text-base font-semibold leading-7 text-slate-900">Informations personnelles</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">Ces informations seront visibles par les organisateurs de hackathon lorsqu'ils chercheront un mentor.</p>
 
            <div className="mt-6 flex flex-col sm:flex-row gap-8">
              {/* Photo de profil */}
              <div className="flex flex-col items-center">
                <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-slate-200">
                  <img src={avatar} alt="Photo de profil" className="h-full w-full object-cover" />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="mt-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
                >
                  Changer
                </button>
              </div>

              {/* Champs texte */}
              <div className="flex-1 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-slate-900">Prénom</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-slate-900">Nom</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="job-title" className="block text-sm font-medium leading-6 text-slate-900">Titre professionnel</label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="job-title"
                      id="job-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="bio" className="block text-sm font-medium leading-6 text-slate-900">Biographie</label>
                  <div className="mt-2">
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6 px-3"
                    />
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Écrivez quelques phrases vous concernant.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise et Compétences */}
        <div className="bg-white shadow-sm ring-1 ring-slate-200 sm:rounded-xl">
          <div className="px-4 py-6 sm:p-8">
            <h2 className="text-base font-semibold leading-7 text-slate-900">Expertise & Compétences</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">Ajoutez les domaines dans lesquels vous pouvez apporter le plus de valeur aux équipes.</p>

            <div className="mt-6 space-y-8">
              {/* Domaine d'expertise */}
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">Domaines d'expertise principaux</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {expertises.map((exp, index) => (
                    <span key={index} className="inline-flex items-center gap-x-1 rounded-md bg-brand-50 px-2.5 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-inset ring-brand-700/10">
                      {exp}
                      <button
                        type="button"
                        onClick={() => setExpertises(expertises.filter((_, i) => i !== index))}
                        className="group relative -mr-1 h-4 w-4 rounded-sm hover:bg-brand-600/20"
                      >
                        <span className="sr-only">Supprimer</span>
                        <svg viewBox="0 0 14 14" className="h-4 w-4 stroke-brand-700/50 group-hover:stroke-brand-700/75">
                          <path d="M4 4l6 6m0-6l-6 6" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newExp = prompt("Entrez un domaine d'expertise :");
                      if (newExp) setExpertises([...expertises, newExp]);
                    }}
                    className="inline-flex items-center rounded-md border border-dashed border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-500 hover:border-brand-500 hover:text-brand-500"
                  >
                    + Ajouter un domaine
                  </button>
                </div>
              </div>

              {/* Compétences Techniques */}
              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">Outils et Technologies (Compétences)</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center gap-x-1 rounded-md bg-slate-100 px-2.5 py-1.5 text-sm font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10">
                      {skill}
                      <button
                        type="button"
                        onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                        className="group relative -mr-1 h-4 w-4 rounded-sm hover:bg-slate-500/20"
                      >
                        <span className="sr-only">Supprimer</span>
                        <svg viewBox="0 0 14 14" className="h-4 w-4 stroke-slate-500/50 group-hover:stroke-slate-500/75">
                          <path d="M4 4l6 6m0-6l-6 6" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newSkill = prompt("Entrez une compétence/technologie :");
                      if (newSkill) setSkills([...skills, newSkill]);
                    }}
                    className="inline-flex items-center rounded-md border border-dashed border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-500 hover:border-brand-500 hover:text-brand-500"
                  >
                    + Ajouter une compétence
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-x-6">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-50"
          >
            {saving ? 'Enregistrement...' : 'Sauvegarder'}
          </button>
        </div>
      </form>
    </div>
  );
}


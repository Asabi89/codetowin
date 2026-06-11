import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function MentorProfile() {
  const [firstName, setFirstName] = useState('Seydou');
  const [lastName, setLastName] = useState('Kane');
  const [jobTitle, setJobTitle] = useState('Senior Machine Learning Engineer @ TechHub');
  const [bio, setBio] = useState("Passionné par l'Intelligence Artificielle et son impact sur le développement en Afrique. J'ai accompagné plus de 15 startups dans leur stratégie Data & IA au cours des 5 dernières années.");
  const [domains, setDomains] = useState(['Intelligence Artificielle', 'Data Science', 'Product Management']);
  const [skills, setSkills] = useState(['Python', 'TensorFlow']);

  const handleRemoveDomain = (index) => {
    setDomains(domains.filter((_, i) => i !== index));
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Topbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-slate-900">Mon Profil Mentor</h1>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" className="inline-flex justify-center rounded-md border border-transparent bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">
            Sauvegarder
          </button>
        </div>
      </header>

      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        
        <div className="space-y-8 max-w-4xl mx-auto pb-12">
          
          {/* Informations personnelles */}
          <div className="bg-white shadow-sm ring-1 ring-slate-200 sm:rounded-xl">
            <div className="px-4 py-6 sm:p-8">
              <h2 className="text-base font-semibold leading-7 text-slate-900">Informations personnelles</h2>
              <p className="mt-1 text-sm leading-6 text-slate-500">Ces informations seront visibles par les organisateurs de hackathon lorsqu'ils chercheront un mentor.</p>

              <div className="mt-6 flex flex-col sm:flex-row gap-8">
                {/* Photo de profil */}
                <div className="flex flex-col items-center">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-slate-200">
                    <img src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=047857&color=fff&size=128`} alt="Photo de profil" className="h-full w-full object-cover" />
                  </div>
                  <button type="button" className="mt-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
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
                        id="first-name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full rounded-md border-slate-300 py-1.5 text-slate-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm sm:leading-6 border px-3" 
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-slate-900">Nom</label>
                    <div className="mt-2">
                      <input 
                        type="text" 
                        id="last-name" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full rounded-md border-slate-300 py-1.5 text-slate-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm sm:leading-6 border px-3" 
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="job-title" className="block text-sm font-medium leading-6 text-slate-900">Titre professionnel</label>
                    <div className="mt-2">
                      <input 
                        type="text" 
                        id="job-title" 
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="block w-full rounded-md border-slate-300 py-1.5 text-slate-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm sm:leading-6 border px-3" 
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="bio" className="block text-sm font-medium leading-6 text-slate-900">Biographie</label>
                    <div className="mt-2">
                      <textarea 
                        id="bio" 
                        rows={4} 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="block w-full rounded-md border-slate-300 py-1.5 text-slate-900 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm sm:leading-6 border px-3"
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
                    {domains.map((domain, index) => (
                      <span key={index} className="inline-flex items-center gap-x-1 rounded-md bg-brand-50 px-2.5 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-inset ring-brand-700/10">
                        {domain}
                        <button type="button" onClick={() => handleRemoveDomain(index)} className="group relative -mr-1 h-4 w-4 rounded-sm hover:bg-brand-600/20">
                          <span className="sr-only">Supprimer</span>
                          <X className="h-4 w-4 stroke-brand-700/50 group-hover:stroke-brand-700/75" />
                        </button>
                      </span>
                    ))}
                    <button type="button" className="inline-flex items-center rounded-md border border-dashed border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-500 hover:border-brand-500 hover:text-brand-500">
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
                        <button type="button" onClick={() => handleRemoveSkill(index)} className="group relative -mr-1 h-4 w-4 rounded-sm hover:bg-slate-500/20">
                          <span className="sr-only">Supprimer</span>
                          <X className="h-4 w-4 stroke-slate-500/50 group-hover:stroke-slate-500/75" />
                        </button>
                      </span>
                    ))}
                    <button type="button" className="inline-flex items-center rounded-md border border-dashed border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-500 hover:border-brand-500 hover:text-brand-500">
                      + Ajouter une compétence
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

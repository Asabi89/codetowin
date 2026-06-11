import React, { useState } from 'react';
import { X } from 'lucide-react';
import '../../styles/dashboard.css';

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
    <div className="dashboard-content">
      {/* Topbar */}
      <header className="page-header-row">
        <div>
          <h1 className="page-header-title">Mon Profil Mentor</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="button" className="btn btn-primary">
            Sauvegarder
          </button>
        </div>
      </header>

      {/* Main scrollable area */}
      <div className="page-container-narrow">
        {/* Informations personnelles */}
        <div className="card">
          <h2 className="card-title">Informations personnelles</h2>
          <p className="card-subtitle">Ces informations seront visibles par les organisateurs de hackathon lorsqu'ils chercheront un mentor.</p>

          <div className="form-layout-row">
            {/* Photo de profil */}
            <div className="avatar-lg-wrapper">
              <div className="avatar-lg">
                <img src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=047857&color=fff&size=128`} alt="Photo de profil" />
              </div>
              <button type="button" className="btn btn-secondary" style={{ marginTop: '1rem', padding: '0.375rem 0.625rem', fontSize: '0.875rem' }}>
                Changer
              </button>
            </div>

            {/* Champs texte */}
            <div className="form-grid">
              <div>
                <label htmlFor="first-name" className="form-label">Prénom</label>
                <input 
                  type="text" 
                  id="first-name" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label htmlFor="last-name" className="form-label">Nom</label>
                <input 
                  type="text" 
                  id="last-name" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-col-span-2">
                <label htmlFor="job-title" className="form-label">Titre professionnel</label>
                <input 
                  type="text" 
                  id="job-title" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-col-span-2">
                <label htmlFor="bio" className="form-label">Biographie</label>
                <textarea 
                  id="bio" 
                  rows={4} 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="form-input"
                />
                <p className="form-hint">Écrivez quelques phrases vous concernant.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise et Compétences */}
        <div className="card">
          <h2 className="card-title">Expertise & Compétences</h2>
          <p className="card-subtitle">Ajoutez les domaines dans lesquels vous pouvez apporter le plus de valeur aux équipes.</p>

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Domaine d'expertise */}
            <div>
              <label className="form-label">Domaines d'expertise principaux</label>
              <div className="badge-group">
                {domains.map((domain, index) => (
                  <span key={index} className="badge-tag-brand">
                    {domain}
                    <button type="button" onClick={() => handleRemoveDomain(index)} className="btn-remove-tag btn-remove-tag-brand">
                      <span className="sr-only">Supprimer</span>
                      <X style={{ height: '1rem', width: '1rem' }} />
                    </button>
                  </span>
                ))}
                <button type="button" className="btn-add-tag">
                  + Ajouter un domaine
                </button>
              </div>
            </div>

            {/* Compétences Techniques */}
            <div>
              <label className="form-label">Outils et Technologies (Compétences)</label>
              <div className="badge-group">
                {skills.map((skill, index) => (
                  <span key={index} className="badge-tag-slate">
                    {skill}
                    <button type="button" onClick={() => handleRemoveSkill(index)} className="btn-remove-tag btn-remove-tag-slate">
                      <span className="sr-only">Supprimer</span>
                      <X style={{ height: '1rem', width: '1rem' }} />
                    </button>
                  </span>
                ))}
                <button type="button" className="btn-add-tag">
                  + Ajouter une compétence
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

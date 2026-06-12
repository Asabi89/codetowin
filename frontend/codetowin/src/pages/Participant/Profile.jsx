import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useImagePreview } from '../../hooks/useImagePreview';
import '../../styles/pages/participant/profile.css';

export default function Profile() {
  const { profile, registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ── Form state ──────────────────────────────────────────────
  const [firstName, setFirstName]       = useState('');
  const [lastName,  setLastName]        = useState('');
  const [title,     setTitle]           = useState('');
  const [about,     setAbout]           = useState('');
  const [bio,       setBio]             = useState('');
  const [skills,    setSkills]          = useState([]);
  const [skillInput,setSkillInput]      = useState('');
  const [interests, setInterests]       = useState([]);
  const [interestInput,setInterestInput]= useState('');
  const [city,      setCity]            = useState('');
  const [country,   setCountry]         = useState('');
  const [github,    setGithub]          = useState('');
  const [linkedin,  setLinkedin]        = useState('');
  const [website,   setWebsite]         = useState('');

  const { url: avatar, setUrl: setAvatar, inputRef: photoInputRef, handleChange: handlePhotoChange } = useImagePreview(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
  );

  // Pre-fill from context if editing existing profile
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName   || '');
      setTitle(profile.title         || '');
      setAbout(profile.about         || '');
      setBio(profile.bio             || '');
      setSkills(
        typeof profile.skills === 'string'
          ? profile.skills.split(',').map(s => s.trim()).filter(Boolean)
          : (profile.skills || [])
      );
      setInterests(
        typeof profile.interests === 'string'
          ? profile.interests.split(',').map(i => i.trim()).filter(Boolean)
          : (profile.interests || [])
      );
      setCity(profile.city       || '');
      setCountry(profile.country || '');
      setGithub(profile.github   || '');
      setLinkedin(profile.linkedin || '');
      setWebsite(profile.website   || '');

      if (profile.avatar) setAvatar(profile.avatar);
    }
  }, [profile]);

  // ── Tag helpers ──────────────────────────────────────────────
  const addTag = (val, list, setList) => {
    const clean = val.trim().replace(/,/g, '');
    if (clean && !list.includes(clean)) setList([...list, clean]);
  };

  const handleSkillKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(skillInput, skills, setSkills);
      setSkillInput('');
    }
  };

  const handleInterestKey = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(interestInput, interests, setInterests);
      setInterestInput('');
    }
  };

  // ── Photo upload ─────────────────────────────────────────────
  // handlePhotoChange is managed by useImagePreview

  // ── Submit ───────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({
      firstName, lastName, title, about, bio,
      skills: skills.join(', '),
      interests: interests.join(', '),
      city, country, github, linkedin, website, avatar,
      visibility: profile?.visibility || 'public',
      isPublic: profile?.isPublic !== undefined ? profile.isPublic : true,
    });
    navigate('/participant');
  };

  return (
    <main className="main-content">
      <div className="profile-card">

        {/* ── Header ── */}
        <div className="profile-header">
          <h1>{profile && profile.about ? "Modifier mes infos" : "Complète ton profil !"}</h1>
          <p>
            {profile && profile.about
              ? "Mets à jour ton identité de builder pour l'espace de rendu et ton équipe."
              : "Crée ton identité de builder pour accéder à l'espace de rendu et monter ton équipe de choc."}
          </p>
        </div>

        <form id="profile-setup-form" onSubmit={handleSubmit}>
          <div className="form-grid">

            {/* ── Photo upload ── */}
            <div className="form-group">
              <label className="form-label">Photo de profil</label>
              <div className="upload-trigger-box" onClick={() => photoInputRef.current.click()}>
                <img
                  src={avatar}
                  alt="Aperçu avatar"
                  className="upload-preview"
                />
                <div className="upload-info">
                  <span>Ajouter une photo</span>
                  <p>Un beau carré en PNG ou JPG, c'est parfait !</p>
                </div>
                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handlePhotoChange}
                />
              </div>
            </div>

            {/* ── Name ── */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="profile-first-name" className="form-label">
                  Prénom<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text" id="profile-first-name" className="form-input"
                  required placeholder="ex: Sarah"
                  value={firstName} onChange={e => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profile-last-name" className="form-label">
                  Nom<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text" id="profile-last-name" className="form-input"
                  required placeholder="ex: Dupont"
                  value={lastName} onChange={e => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* ── Title ── */}
            <div className="form-group">
              <label htmlFor="profile-title" className="form-label">
                Titre<span className="required-asterisk">*</span>
              </label>
              <input
                type="text" id="profile-title" className="form-input"
                required placeholder="ex: Développeur Full-stack, Data Scientist"
                value={title} onChange={e => setTitle(e.target.value)}
              />
            </div>

            {/* ── About ── */}
            <div className="form-group">
              <label htmlFor="profile-about" className="form-label">
                À propos de toi<span className="required-asterisk">*</span>
              </label>
              <textarea
                id="profile-about" className="form-textarea" required
                placeholder="Raconte un peu ton parcours, ce qui te passionne, ce que tu cherches..."
                value={about} onChange={e => setAbout(e.target.value)}
              />
            </div>

            {/* ── Bio express ── */}
            <div className="form-group">
              <label htmlFor="profile-bio" className="form-label">Bio express</label>
              <textarea
                id="profile-bio" className="form-textarea"
                placeholder="Ton pitch en une phrase..."
                value={bio} onChange={e => setBio(e.target.value)}
              />
            </div>

            {/* ── Skills tag input ── */}
            <div className="form-group">
              <label className="form-label">
                Compétences &amp; Tech<span className="required-asterisk">*</span>
              </label>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Tape ta tech et appuie sur Entrée ou virgule.
              </p>
              <div className="tags-input-wrap">
                {skills.map((s, i) => (
                  <span key={i} className="tag-pill">
                    {s}
                    <button
                      type="button"
                      className="tag-remove-btn"
                      onClick={() => setSkills(skills.filter((_, idx) => idx !== i))}
                      aria-label={`Supprimer ${s}`}
                    >×</button>
                  </span>
                ))}
                <input
                  type="text" className="tags-input-text"
                  placeholder={skills.length === 0 ? 'Ajouter un truc cool...' : ''}
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKey}
                />
              </div>
            </div>

            {/* ── Interests tag input ── */}
            <div className="form-group">
              <label className="form-label">Intérêts</label>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Qu'est-ce qui t'anime ? Appuie sur Entrée pour valider.
              </p>
              <div className="tags-input-wrap">
                {interests.map((t, i) => (
                  <span key={i} className="tag-pill">
                    {t}
                    <button
                      type="button"
                      className="tag-remove-btn"
                      onClick={() => setInterests(interests.filter((_, idx) => idx !== i))}
                      aria-label={`Supprimer ${t}`}
                    >×</button>
                  </span>
                ))}
                <input
                  type="text" className="tags-input-text"
                  placeholder={interests.length === 0 ? 'Ajouter un intérêt...' : ''}
                  value={interestInput}
                  onChange={e => setInterestInput(e.target.value)}
                  onKeyDown={handleInterestKey}
                />
              </div>
            </div>

            {/* ── Location ── */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="profile-city" className="form-label">
                  Ville<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text" id="profile-city" className="form-input"
                  required placeholder="ex: Paris, Dakar, Montréal..."
                  value={city} onChange={e => setCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profile-country" className="form-label">
                  Pays<span className="required-asterisk">*</span>
                </label>
                <select
                  id="profile-country" className="form-select" required
                  value={country} onChange={e => setCountry(e.target.value)}
                >
                  <option value="" disabled>Choisis ton pays</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Nigeria</option>
                  <option>Kenya</option>
                  <option>South Africa</option>
                  <option>Senegal</option>
                  <option>Ghana</option>
                  <option>Côte d'Ivoire</option>
                  <option>Egypt</option>
                  <option>Morocco</option>
                  <option>Ethiopia</option>
                  <option>India</option>
                  <option>China</option>
                  <option>Japan</option>
                  <option>Australia</option>
                  <option>Brazil</option>
                  <option>Mexico</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* ── Social links ── */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="profile-github" className="form-label">Lien GitHub</label>
                <input
                  type="url" id="profile-github" className="form-input"
                  placeholder="https://github.com/pseudo"
                  value={github} onChange={e => setGithub(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profile-linkedin" className="form-label">Lien LinkedIn</label>
                <input
                  type="url" id="profile-linkedin" className="form-input"
                  placeholder="https://linkedin.com/in/pseudo"
                  value={linkedin} onChange={e => setLinkedin(e.target.value)}
                />
              </div>
            </div>

            {/* ── Portfolio / Website ── */}
            <div className="form-group">
              <label htmlFor="profile-website" className="form-label">Ton site web / Portfolio</label>
              <input
                type="url" id="profile-website" className="form-input"
                placeholder="https://monsite.dev"
                value={website} onChange={e => setWebsite(e.target.value)}
              />
            </div>



          </div>{/* /form-grid */}

          {/* ── Action buttons ── */}
          <div className="form-actions">
            <button type="button" className="btn-action-secondary" onClick={() => navigate(-1)}>
              Annuler
            </button>
            <button type="submit" className="btn-action-primary">
              {profile && profile.about ? "Enregistrer les modifications" : "Enregistrer et s'inscrire"}
            </button>
          </div>
        </form>
      </div>{/* /profile-card */}
    </main>
  );
}

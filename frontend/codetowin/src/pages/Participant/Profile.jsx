import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useImagePreview } from '../../hooks/useImagePreview';
import { usersApi } from '../../api/users';
import { countriesApi } from '../../api/countries';
import { useToast } from '../../context/ToastContext';
import '../../styles/pages/participant/profile.css';

export default function Profile() {
  const { profile, role, updateProfileContext } = useContext(AuthContext);
  const isOrganizer = role === 'organizer';
  const navigate = useNavigate();
  const { showToast } = useToast();

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
  const [twitter,   setTwitter]         = useState('');
  const [website,   setWebsite]         = useState('');
  const [saving,    setSaving]          = useState(false);
  const [countriesList, setCountriesList] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = React.useRef(null);

  const { url: avatar, setUrl: setAvatar, inputRef: photoInputRef, handleChange: handlePhotoChange } = useImagePreview(
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
  );

  // Fetch countries
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await countriesApi.getCountries();
        setCountriesList(data);
      } catch (error) {
        console.error("Failed to load countries:", error);
      } finally {
        setLoadingCountries(false);
      }
    };
    loadCountries();
  }, []);

  // Pre-fill from context if editing existing profile
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName   || '');
      setTitle(profile.title         || '');
      setAbout(profile.about         || '');
      setBio(profile.bio             || '');
      setSkills(profile.skills ? profile.skills.split(',').map(s => s.trim()) : []);
      setInterests(profile.interests ? profile.interests.split(',').map(i => i.trim()) : []);
      setCity(profile.city           || '');
      setCountry(profile.country     || '');
      setGithub(profile.github       || '');
      setLinkedin(profile.linkedin   || '');
      setTwitter(profile.twitter     || '');
      setWebsite(profile.website     || '');
      if (profile.avatar) setAvatar(profile.avatar);
    }
  }, [profile]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ── Tag helpers ──────────────────────────────────────────────
  const addTag = (val, list, setList) => {
    const clean = val.trim().replace(/,/g, '');
    if (clean && !list.includes(clean)) setList([...list, clean]);
  };

  const handleSkillKey = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13 || e.key === ',') {
      e.preventDefault();
      addTag(skillInput, skills, setSkills);
      setSkillInput('');
    }
  };

  const handleInterestKey = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13 || e.key === ',') {
      e.preventDefault();
      addTag(interestInput, interests, setInterests);
      setInterestInput('');
    }
  };

  const handleSkillChange = (e) => {
    const val = e.target.value;
    if (val.endsWith(',')) {
      addTag(val.slice(0, -1), skills, setSkills);
      setSkillInput('');
    } else {
      setSkillInput(val);
    }
  };

  const handleInterestChange = (e) => {
    const val = e.target.value;
    if (val.endsWith(',')) {
      addTag(val.slice(0, -1), interests, setInterests);
      setInterestInput('');
    } else {
      setInterestInput(val);
    }
  };

  // ── Photo upload ─────────────────────────────────────────────
  // handlePhotoChange is managed by useImagePreview

  // ── Submit ───────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Fix for mobile keyboards where 'Enter' submits the form instead of adding a tag
    if (skillInput.trim()) {
      addTag(skillInput, skills, setSkills);
      setSkillInput('');
      return;
    }
    if (interestInput.trim()) {
      addTag(interestInput, interests, setInterests);
      setInterestInput('');
      return;
    }

    setSaving(true);
    const profileData = {
      firstName, lastName, title, about, bio,
      skills: skills.join(', '),
      interests: interests.join(', '),
      city, country, github, linkedin, twitter, website, avatar,
      visibility: profile?.visibility || 'public',
      isPublic: profile?.isPublic !== undefined ? profile.isPublic : true,
    };

    try {
      await usersApi.updateProfile(profileData);
      updateProfileContext(profileData);
      showToast("Profil enregistré avec succès !", "success");
      
      const pendingHackathon = localStorage.getItem('pendingHackathonJoin');
      if (pendingHackathon) {
        localStorage.removeItem('pendingHackathonJoin');
        navigate(`/hackathons/${pendingHackathon}`);
      } else {
        navigate('/participant');
      }
    } catch (error) {
      console.error(error);
      showToast("Erreur lors de l'enregistrement du profil.", "error");
    } finally {
      setSaving(false);
    }
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

            {/* ── Name / Organization ── */}
            {isOrganizer ? (
              <div className="form-group">
                <label htmlFor="profile-first-name" className="form-label">
                  Nom de l'organisation<span className="required-asterisk">*</span>
                </label>
                <input
                  type="text" id="profile-first-name" className="form-input"
                  required placeholder="ex: Google Cloud, Tech Hub..."
                  value={firstName} onChange={e => setFirstName(e.target.value)}
                />
              </div>
            ) : (
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
            )}

            {/* ── Title ── */}
            {!isOrganizer && (
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
            )}

            {/* ── About ── */}
            <div className="form-group">
              <label htmlFor="profile-about" className="form-label">
                {isOrganizer ? "Description de l'organisation" : "À propos de toi"}<span className="required-asterisk">*</span>
              </label>
              <textarea
                id="profile-about" className="form-textarea" required
                placeholder={isOrganizer ? "Que fait votre organisation..." : "Raconte un peu ton parcours, ce qui te passionne, ce que tu cherches..."}
                value={about} onChange={e => setAbout(e.target.value)}
              />
            </div>

            {!isOrganizer && (
              <>
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
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: '150px' }}>
                      <input
                        type="text" className="tags-input-text" style={{ flex: 1 }}
                        placeholder={skills.length === 0 ? 'Ajouter un truc cool...' : ''}
                        value={skillInput}
                        onChange={handleSkillChange}
                        onKeyDown={handleSkillKey}
                      />
                      {skillInput.trim() && (
                        <button 
                          type="button" 
                          onClick={() => { addTag(skillInput, skills, setSkills); setSkillInput(''); }}
                          style={{ background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '0.8rem', cursor: 'pointer', marginLeft: '4px' }}
                        >
                          Ajouter
                        </button>
                      )}
                    </div>
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
                    <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: '150px' }}>
                      <input
                        type="text" className="tags-input-text" style={{ flex: 1 }}
                        placeholder={interests.length === 0 ? 'Ajouter un intérêt...' : ''}
                        value={interestInput}
                        onChange={handleInterestChange}
                        onKeyDown={handleInterestKey}
                      />
                      {interestInput.trim() && (
                        <button 
                          type="button" 
                          onClick={() => { addTag(interestInput, interests, setInterests); setInterestInput(''); }}
                          style={{ background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '0.8rem', cursor: 'pointer', marginLeft: '4px' }}
                        >
                          Ajouter
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

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
                <div className="custom-select-wrapper" ref={countryDropdownRef}>
                  <div
                    className={`form-input custom-select-trigger ${!country ? 'placeholder' : ''} ${isCountryDropdownOpen ? 'open' : ''} ${loadingCountries ? 'disabled' : ''}`}
                    onClick={() => !loadingCountries && setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  >
                    <span>{country || (loadingCountries ? 'Chargement des pays...' : 'Choisis ton pays')}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="select-chevron">
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                  {isCountryDropdownOpen && (
                    <div className="custom-select-menu">
                      <div className="custom-select-search-wrap">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                          type="text"
                          className="custom-select-search"
                          placeholder="Rechercher un pays..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          autoFocus
                        />
                      </div>
                      <div className="custom-select-options">
                        {countriesList
                          .filter(c => c.toLowerCase().includes(countrySearch.toLowerCase()))
                          .map(c => (
                            <div
                              key={c}
                              className={`custom-select-option ${c === country ? 'selected' : ''}`}
                              onClick={() => {
                                setCountry(c);
                                setIsCountryDropdownOpen(false);
                                setCountrySearch('');
                              }}
                            >
                              {c}
                              {c === country && (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="check-icon">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              )}
                            </div>
                          ))}
                        {countriesList.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase())).length === 0 && (
                          <div className="custom-select-empty">Aucun pays trouvé</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Social links ── */}
            {isOrganizer ? (
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="profile-linkedin" className="form-label">Lien LinkedIn</label>
                  <input
                    type="url" id="profile-linkedin" className="form-input"
                    placeholder="https://linkedin.com/company/pseudo"
                    value={linkedin} onChange={e => setLinkedin(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="profile-twitter" className="form-label">Twitter / X</label>
                  <input
                    type="text" id="profile-twitter" className="form-input"
                    placeholder="twitter.com/pseudo"
                    value={twitter} onChange={e => setTwitter(e.target.value)}
                  />
                </div>
              </div>
            ) : (
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
            )}

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
            <button type="button" className="btn-action-secondary" onClick={() => navigate(-1)} disabled={saving}>
              Annuler
            </button>
            <button type="submit" className="btn-action-primary" disabled={saving}>
              {saving ? "Enregistrement..." : (profile && profile.about ? "Enregistrer les modifications" : "Enregistrer et s'inscrire")}
            </button>
          </div>
        </form>
      </div>{/* /profile-card */}
    </main>
  );
}

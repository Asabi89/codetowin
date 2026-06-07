import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/profile.css';

export default function Profile() {
  const { profile, registerUser, registered } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80');

  // Load profile details if they exist in Context (meaning they are already registered/logged in)
  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setLastName(profile.lastName || '');
      setTitle(profile.title || '');
      setAbout(profile.about || '');
      setBio(profile.bio || '');
      
      // Skills
      if (profile.skills) {
        setSkills(
          typeof profile.skills === 'string'
            ? profile.skills.split(',').map(s => s.trim()).filter(Boolean)
            : profile.skills
        );
      }
      
      // Interests
      if (profile.interests) {
        setInterests(
          typeof profile.interests === 'string'
            ? profile.interests.split(',').map(i => i.trim()).filter(Boolean)
            : profile.interests
        );
      }

      setCity(profile.city || '');
      setCountry(profile.country || '');
      setGithub(profile.github || '');
      setLinkedin(profile.linkedin || '');
      setWebsite(profile.website || '');
      setAvatar(profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80');
    }
  }, [profile]);

  // Skill Tags handlers
  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = skillInput.trim().replace(/,/g, '');
      if (val && !skills.includes(val)) {
        setSkills([...skills, val]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (indexToRemove) => {
    setSkills(skills.filter((_, idx) => idx !== indexToRemove));
  };

  // Interest Tags handlers
  const handleInterestKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = interestInput.trim().replace(/,/g, '');
      if (val && !interests.includes(val)) {
        setInterests([...interests, val]);
      }
      setInterestInput('');
    }
  };

  const removeInterest = (indexToRemove) => {
    setInterests(interests.filter((_, idx) => idx !== indexToRemove));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setAvatar(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerPhotoInput = () => {
    document.getElementById('profile-photo-input').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      firstName,
      lastName,
      title,
      about,
      bio,
      skills: skills.join(', '),
      interests: interests.join(', '),
      city,
      country,
      github,
      linkedin,
      website,
      avatar
    };

    registerUser(profileData);
    
    // Redirect to participant profile view
    navigate('/participant');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="profile-page-wrapper">
      <main className="main-content">
        <div className="profile-card">
        <div className="profile-header">
          <h1>Complète ton profil !</h1>
          <p>Crée ton identité de builder pour accéder à l'espace de rendu et monter ton équipe de choc.</p>
        </div>

        <form id="profile-setup-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            
            {/* Photo Upload Box */}
            <div className="form-group">
              <label className="form-label">Photo de profil</label>
              <div className="upload-trigger-box" onClick={triggerPhotoInput}>
                <img id="profile-avatar-preview" src={avatar} alt="Avatar Preview" className="upload-preview" />
                <div className="upload-info">
                  <span>Ajouter une photo</span>
                  <p>Un beau carré en PNG ou JPG, c'est parfait !</p>
                </div>
                <input
                  type="file"
                  id="profile-photo-input"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </div>
            </div>

            {/* Name Fields */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="profile-first-name" className="form-label">Prénom<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  id="profile-first-name"
                  className="form-input"
                  required
                  placeholder="ex: Sarah"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profile-last-name" className="form-label">Nom<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  id="profile-last-name"
                  className="form-input"
                  required
                  placeholder="ex: Dupont"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Title */}
            <div className="form-group">
              <label htmlFor="profile-title" className="form-label">Titre<span className="required-asterisk">*</span></label>
              <input
                type="text"
                id="profile-title"
                className="form-input"
                required
                placeholder="ex: Développeur Full-stack, Data Scientist"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* About */}
            <div className="form-group">
              <label htmlFor="profile-about" className="form-label">À propos de toi<span className="required-asterisk">*</span></label>
              <textarea
                id="profile-about"
                className="form-textarea"
                required
                placeholder="Raconte un peu ton parcours, ce qui te passionne, ce que tu cherches..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>

            {/* Short Bio */}
            <div className="form-group">
              <label htmlFor="profile-bio" className="form-label">Bio express</label>
              <textarea
                id="profile-bio"
                className="form-textarea"
                placeholder="Ton pitch en une phrase..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>

            {/* Skills */}
            <div className="form-group">
              <label className="form-label">Compétences &amp; Tech<span className="required-asterisk">*</span></label>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Tape ta tech et appuie sur Entrée ou virgule.
              </p>
              <div className="tags-input-wrap" id="tags-input-wrap">
                {skills.map((skill, idx) => (
                  <span key={idx} className="tag-pill">
                    {skill}
                    <button type="button" onClick={() => removeSkill(idx)} className="tag-pill-remove">&times;</button>
                  </span>
                ))}
                <input
                  type="text"
                  id="profile-skills-input"
                  className="tags-input-text"
                  placeholder={skills.length === 0 ? "Ajouter un truc cool..." : ""}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                />
              </div>
            </div>

            {/* Interests */}
            <div className="form-group">
              <label className="form-label">Intérêts</label>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                Qu'est-ce qui t'anime ? Appuie sur Entrée pour valider.
              </p>
              <div className="tags-input-wrap" id="interests-input-wrap">
                {interests.map((interest, idx) => (
                  <span key={idx} className="tag-pill">
                    {interest}
                    <button type="button" onClick={() => removeInterest(idx)} className="tag-pill-remove">&times;</button>
                  </span>
                ))}
                <input
                  type="text"
                  id="profile-interests-input"
                  className="tags-input-text"
                  placeholder={interests.length === 0 ? "Ajouter un intérêt..." : ""}
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  onKeyDown={handleInterestKeyDown}
                />
              </div>
            </div>

            {/* Location */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="profile-city" className="form-label">Ville<span className="required-asterisk">*</span></label>
                <input
                  type="text"
                  id="profile-city"
                  className="form-input"
                  required
                  placeholder="ex: Paris, Dakar, Montréal..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profile-country" className="form-label">Pays<span className="required-asterisk">*</span></label>
                <select
                  id="profile-country"
                  className="form-select"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="" disabled>Choisis ton pays</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Egypt">Egypt</option>
                  <option value="India">India</option>
                  <option value="China">China</option>
                  <option value="Japan">Japan</option>
                  <option value="Australia">Australia</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Social Links */}
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="profile-github" className="form-label">Lien GitHub</label>
                <input
                  type="url"
                  id="profile-github"
                  className="form-input"
                  placeholder="https://github.com/pseudo"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="profile-linkedin" className="form-label">Lien LinkedIn</label>
                <input
                  type="url"
                  id="profile-linkedin"
                  className="form-input"
                  placeholder="https://linkedin.com/in/pseudo"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
            </div>

            {/* Portfolio Link */}
            <div className="form-group">
              <label htmlFor="profile-website" className="form-label">Ton site web / Portfolio</label>
              <input
                type="url"
                id="profile-website"
                className="form-input"
                placeholder="https://monsite.dev"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

          </div>

          {/* Form Action CTA Buttons */}
          <div className="form-actions">
            <button type="button" className="btn-action-secondary" onClick={handleCancel}>Annuler</button>
            <button type="submit" className="btn-action-primary">Enregistrer et s'inscrire</button>
          </div>
        </form>
      </div>
    </main>
    </div>
  );
}

import React, { useContext, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/pages/participant/participant.css';
import { Download, ExternalLink } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";
import { certificatesApi } from "../../api/certificates";
import { usersApi } from "../../api/users";

export default function Participant() {
  const { workspaceState, profile, registered, registerUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('portfolio');
  const [myHackathons, setMyHackathons] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [myActivity, setMyActivity] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loadingCerts, setLoadingCerts] = useState(false);
  const [loadingHackathons, setLoadingHackathons] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [loadingActivity, setLoadingActivity] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  React.useEffect(() => {
    if (registered && profile) {
      const fetchData = async () => {
        try {
          if (certificates.length === 0) {
            setLoadingCerts(true);
            const certData = await certificatesApi.getMyCertificates();
            setCertificates(certData || []);
            setLoadingCerts(false);
          }
        } catch (err) {
          console.error(err);
          setLoadingCerts(false);
        }

        try {
          setLoadingHackathons(true);
          const hackData = await usersApi.getMyHackathons();
          setMyHackathons(hackData || []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingHackathons(false);
        }

        try {
          setLoadingProjects(true);
          const projData = await usersApi.getMyProjects();
          setMyProjects(projData || []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingProjects(false);
        }

        try {
          setLoadingActivity(true);
          const actData = await usersApi.getMyActivity();
          setMyActivity(actData || []);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingActivity(false);
        }
      };
      fetchData();
    }
  }, [registered, profile]);

  if (!registered || !profile) {
    // If not registered/logged in, redirect to login
    return (
      <div className="profile-main flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-xl font-bold mb-4">Veuillez vous connecter pour voir votre profil</h3>
        <Link to="/login" className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800">
          Connexion
        </Link>
      </div>
    );
  }

  const p = profile;
  const fullName = `${p.firstName || ''} ${p.lastName || ''}`.trim() || 'User';
  const username = `@${(p.firstName || 'user').toLowerCase()}${(p.lastName || '').toLowerCase()}`;
  const avatar = p.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80';
  
  const locationText = [p.city, p.country].filter(Boolean).join(', ') || 'City, Country';
  const skillsList = p.skills ? p.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  const interestsList = p.interests ? p.interests.split(',').map(i => i.trim()).filter(Boolean) : ['AI', 'Fintech', 'Education', 'Mobile', 'Web'];

  const projectName = workspaceState.projectName || 'Untitled Project';
  const isSubmitted = workspaceState.submitted;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      registerUser({
        ...profile,
        avatar: ev.target.result
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="participant-page-wrapper">
      <div className="profile-container">
        {/* ===== PROFILE IDENTITY ===== */}
        <div className="profile-identity-wrap">
          <div className="profile-avatar-block">
          <div className="profile-avatar-frame">
            <img src={avatar} alt="Profile photo" className="profile-avatar-img" />
            <button
              type="button"
              className="profile-avatar-edit-btn owner-only"
              aria-label="Modifier la photo"
              onClick={() => fileInputRef.current.click()}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="profile-identity-info">
            <h1 className="profile-fullname">{fullName}</h1>
            <div className="profile-username">{username}</div>
            <span className="profile-role-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 6-5 6 5 6"></path>
                <path d="m15 6 5 6-5 6"></path>
              </svg>
              {p.title || 'Builder'}
            </span>
          </div>
        </div>

        <div className="profile-owner-actions owner-only">
          <Link to="/profile" className="btn-profile-action btn-profile-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            Modifier le profil
          </Link>
        </div>
      </div>

      {/* ===== MAIN PROFILE CONTENT ===== */}
      <main className="profile-main">

        {/* Location & Social Links */}
        <div className="profile-meta-row">
          <span className="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{locationText}</span>
          </span>
          {p.github && (
            <>
              <span className="meta-separator"></span>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="meta-link">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </>
          )}
          {p.linkedin && (
            <>
              <span className="meta-separator"></span>
              <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="meta-link">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-1">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </>
          )}
          {p.website && (
            <>
              <span className="meta-separator"></span>
              <a href={p.website} target="_blank" rel="noopener noreferrer" className="meta-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                Website
              </a>
            </>
          )}
        </div>

        {/* Bio */}
        <div className="profile-bio-section">
          <div className="section-label">À propos</div>
          <p className="profile-bio-text">
            {p.about || p.bio || <span className="bio-placeholder owner-only" onClick={() => navigate('/profile')}>Ajoute ta bio ici.</span>}
          </p>
        </div>

        {/* Skills & Interests */}
        <div className="profile-tags-section">
          <div className="tag-group">
            <div className="section-label">Compétences</div>
            <div className="tags-list">
              {skillsList.length > 0 ? (
                skillsList.map((skill, idx) => <span key={idx} className="skill-pill">{skill}</span>)
              ) : (
                <span className="text-slate-400 text-xs italic">Aucune compétence renseignée</span>
              )}
            </div>
          </div>
          <div className="tag-group">
            <div className="section-label">Intérêts</div>
            <div className="tags-list">
              {interestsList.map((interest, idx) => (
                <span key={idx} className="interest-pill">{interest}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="profile-stats-bar">
          <div className="stat-block">
            <div className="stat-number">{myProjects.length}</div>
            <div className="stat-label">Projets</div>
          </div>
          <div className="stat-block">
            <div className="stat-number">{myHackathons.length}</div>
            <div className="stat-label">Hackathons</div>
          </div>
          <div className="stat-block">
            <div className="stat-number">{profile?.badges?.length || 1}</div>
            <div className="stat-label">Badges</div>
          </div>
          <div className="stat-block">
            <div className="stat-number">{certificates.length}</div>
            <div className="stat-label">Certificats</div>
          </div>
          <div className="stat-block">
            <div className="stat-number">
              {myProjects.reduce((acc, p) => acc + (p.likes || 0), 0)}
            </div>
            <div className="stat-label">Likes</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="profile-tabs-nav" role="tablist">
          <button type="button" className={`profile-tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`} role="tab" onClick={() => setActiveTab('portfolio')}>Portfolio</button>
          <button type="button" className={`profile-tab-btn ${activeTab === 'hackathons' ? 'active' : ''}`} role="tab" onClick={() => setActiveTab('hackathons')}>Hackathons</button>
          <button type="button" className={`profile-tab-btn ${activeTab === 'badges' ? 'active' : ''}`} role="tab" onClick={() => setActiveTab('badges')}>Badges</button>
          <button type="button" className={`profile-tab-btn ${activeTab === 'certificates' ? 'active' : ''}`} role="tab" onClick={() => setActiveTab('certificates')}>Certificats</button>
          <button type="button" className={`profile-tab-btn ${activeTab === 'activity' ? 'active' : ''}`} role="tab" onClick={() => setActiveTab('activity')}>Activité</button>
        </div>

        {/* TAB CONTENT: Portfolio */}
        {activeTab === 'portfolio' && (
          <div className="profile-tab-panel active">
            {loadingProjects ? (
              <div className="py-12 text-center text-slate-500 flex flex-col items-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600 mb-4"></div>
                Chargement de vos projets...
              </div>
            ) : myProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myProjects.map((project) => (
                  <div key={project.id} className="flex flex-col border border-slate-200 rounded-xl overflow-hidden bg-transparent shadow-sm">
                    {project.image ? (
                      <div className="h-40 w-full overflow-hidden">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="h-40 w-full bg-slate-100 flex items-center justify-center text-3xl font-bold text-slate-300">
                        {project.title ? project.title.charAt(0).toUpperCase() : 'P'}
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-brand-700 uppercase tracking-wider">
                          {project.hackathonName}
                        </span>
                        {project.status && (
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${project.status === 'Draft' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {project.status}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-extrabold text-slate-900 mb-2">{project.title}</h4>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags && project.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-slate-50 text-slate-500 text-xs font-semibold rounded-md border border-slate-100">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
                          <span className="flex items-center gap-1">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                            </svg>
                            {project.likes || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            {project.comments || 0}
                          </span>
                        </div>
                        <Link to={`/hackathons/${project.hackathonId || 1}?tab=projects`} className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                          Détails <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state w-full py-10">
                <div className="empty-state-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                <h3>No Public Projects Yet</h3>
                <p>Submit your first hackathon project to build your portfolio.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: Hackathons */}
        {activeTab === 'hackathons' && (
          <div className="profile-tab-panel active">
            {loadingHackathons ? (
              <div className="py-12 text-center text-slate-500 flex flex-col items-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600 mb-4"></div>
                Chargement de vos hackathons...
              </div>
            ) : myHackathons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myHackathons.map((hackathon) => (
                  <div key={hackathon.id} className="flex flex-col border border-slate-200 rounded-xl overflow-hidden bg-transparent shadow-sm">
                    {hackathon.image && (
                      <div className="h-32 w-full overflow-hidden">
                        <img src={hackathon.image} alt={hackathon.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${hackathon.status.includes('Terminé') ? 'bg-slate-100 text-slate-600' : 'bg-brand-100 text-brand-700'}`}>
                          {hackathon.status}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {hackathon.date}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{hackathon.title}</h4>
                      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{hackathon.description}</p>
                      
                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-sm text-slate-600 flex items-center gap-1">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-400">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                          {hackathon.location}
                        </span>
                        <Link to={`/hackathons/${hackathon.id}`} className="text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                          Accéder <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state text-center py-10">
                <div className="empty-state-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto animate-pulse">
                    <path d="m9 6-5 6 5 6"></path>
                    <path d="m15 6 5 6-5 6"></path>
                  </svg>
                </div>
                <h3>Aucun hackathon</h3>
                <p>Tu n'es inscrit à aucun hackathon pour le moment.</p>
              </div>
            )}
          </div>
        )}


        {/* TAB CONTENT: Badges */}
        {activeTab === 'badges' && (
          <div className="profile-tab-panel active">
            <div className="badges-grid">
              <div className="badge-card">
                <div className="badge-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                </div>
                <div className="badge-title">Welcome to CodeToWin</div>
                <div className="badge-desc">Completed profile setup</div>
                <div className="badge-earned-date">🏆 Obtenu</div>
              </div>
              <div className={`badge-card ${isSubmitted ? '' : 'locked'}`}>
                <div className="badge-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    <line x1="3" y1="9" x2="21" y2="9"></line>
                    <line x1="9" y1="21" x2="9" y2="9"></line>
                  </svg>
                </div>
                <div className="badge-title">First Project Submitted</div>
                <div className="badge-desc">Submit your first hackathon project</div>
                <div className="badge-progress-bar">
                  <div className="badge-progress-fill" style={{ width: isSubmitted ? '100%' : '0%' }}></div>
                </div>
              </div>
              <div className="badge-card locked">
                <div className="badge-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"></circle>
                    <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"></path>
                  </svg>
                </div>
                <div className="badge-title">Team Player</div>
                <div className="badge-desc">Complete a project with a team of 3+</div>
                <div className="badge-progress-bar"><div className="badge-progress-fill" style={{ width: '0%' }}></div></div>
              </div>
              <div className="badge-card locked">
                <div className="badge-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <div className="badge-title">Hackathon Winner</div>
                <div className="badge-desc">Win a prize in any hackathon</div>
                <div className="badge-progress-bar"><div className="badge-progress-fill" style={{ width: '0%' }}></div></div>
              </div>
              <div className="badge-card locked">
                <div className="badge-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="badge-title">5 Hackathons</div>
                <div className="badge-desc">Join 5 hackathons on CodeToWin</div>
                <div className="badge-progress-bar"><div className="badge-progress-fill" style={{ width: '20%' }}></div></div>
              </div>
              <div className="badge-card locked">
                <div className="badge-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="11" height="16" rx="2"></rect>
                    <path d="M7 8h5M7 11h5M7 14h4"></path>
                    <circle cx="17.2" cy="15.2" r="2.3"></circle>
                    <path d="m16.3 17.1-1 2.9 1.8-1 1.8 1-1-2.9"></path>
                  </svg>
                </div>
                <div className="badge-title">Certified Builder</div>
                <div className="badge-desc">Earn your first certificate</div>
                <div className="badge-progress-bar"><div className="badge-progress-fill" style={{ width: '0%' }}></div></div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: Certificates */}
        {activeTab === 'certificates' && (
          <div className="profile-tab-panel active">
            {loadingCerts ? (
              <div className="py-12 text-center text-slate-500 flex flex-col items-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600 mb-4"></div>
                Chargement des certificats...
              </div>
            ) : certificates && certificates.length > 0 ? (
              <div className="mt-2 grid gap-5 lg:grid-cols-2">
                {certificates.map((certificate) => (
                  <Card key={certificate.id}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">{certificate.type}</p>
                    <h2 className="mt-1 text-lg font-bold text-slate-900">{certificate.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{certificate.hackathon}</p>
                    <p className="mt-1 text-sm text-slate-500">Émis le {certificate.issuedAt}</p>
                    <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 font-mono text-xs text-slate-600">{certificate.id}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Button size="sm" icon={Download} onClick={async () => {
                        await certificatesApi.downloadCertificateAsPdf(certificate.id);
                        showToast("Téléchargement PDF en cours.", "success");
                      }}>
                        Télécharger
                      </Button>
                      <Button size="sm" variant="outline" icon={ExternalLink} onClick={async () => {
                        await certificatesApi.shareToLinkedIn(certificate.id);
                        showToast("Lien LinkedIn préparé.", "success");
                      }}>
                        Partager
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="empty-state text-center py-10">
                <div className="empty-state-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto animate-pulse">
                    <rect x="4" y="4" width="11" height="16" rx="2"></rect>
                    <path d="M7 8h5M7 11h5M7 14h4"></path>
                    <circle cx="17.2" cy="15.2" r="2.3"></circle>
                    <path d="m16.3 17.1-1 2.9 1.8-1 1.8 1-1-2.9"></path>
                  </svg>
                </div>
                <h3>Pas encore de certificats</h3>
                <p>Tes certifs de hackathons terminés s'afficheront ici.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: Activity */}
        {activeTab === 'activity' && (
          <div className="profile-tab-panel active">
            {loadingActivity ? (
              <div className="py-12 text-center text-slate-500 flex flex-col items-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600 mb-4"></div>
                Chargement de votre activité...
              </div>
            ) : myActivity.length > 0 ? (
              <div className="activity-timeline">
                {myActivity.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-dot"></div>
                    <div className="activity-text" dangerouslySetInnerHTML={{ __html: activity.text }}></div>
                    <div className="activity-time">
                      {new Date(activity.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state text-center py-10">
                <div className="empty-state-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto animate-pulse">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                  </svg>
                </div>
                <h3>Aucune activité</h3>
                <p>Ton historique s'affichera ici.</p>
              </div>
            )}
          </div>
        )}

      </main>
      </div>
    </div>
  );
}

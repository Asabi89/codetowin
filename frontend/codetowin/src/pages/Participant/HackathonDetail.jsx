import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import StepProgress from '../../components/common/StepProgress';
import { marked } from 'marked';
import '../../styles/pages/participant/hackaton-detail.css';

export default function HackathonDetail() {
  const { workspaceState, registered, profile, updateWorkspaceState, resetWorkspace } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Tab state
  const [activeTab, setActiveTab] = useState('overview');

  // Local title edit states
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  // Interactive technologies inputs
  const [techInput, setTechInput] = useState('');
  const [techList, setTechList] = useState([]);

  // Teammate email invite state
  const [inviteEmail, setInviteEmail] = useState('');

  // Step 5 checkboxes
  const [agreeGuidelines, setAgreeGuidelines] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // FAQ accordion open index
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Sync tab from URL if present (?tab=my-project)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location]);

  // Load tech list when workspace state is loaded
  useEffect(() => {
    if (workspaceState.detailsBuiltWith) {
      setTechList(
        workspaceState.detailsBuiltWith
          .split(',')
          .map(t => t.trim())
          .filter(Boolean)
      );
    } else {
      setTechList([]);
    }
  }, [workspaceState.detailsBuiltWith]);

  // Handle step pane navigation
  const handleJumpToStep = (step) => {
    updateWorkspaceState({ currentStep: step });
  };

  // State field updates
  const handleUpdateField = (key, val) => {
    updateWorkspaceState({ [key]: val });
  };

  // Edit title functions
  const handleStartTitleEdit = () => {
    setEditedTitle(workspaceState.projectName || 'Untitled Project');
    setIsEditingTitle(true);
  };

  const handleSaveTitleEdit = () => {
    updateWorkspaceState({ projectName: editedTitle });
    setIsEditingTitle(false);
  };

  const handleCancelTitleEdit = () => {
    setIsEditingTitle(false);
  };

  // Tech tags actions
  const handleTechKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = techInput.trim().replace(/,/g, '');
      if (val && !techList.includes(val)) {
        const updated = [...techList, val];
        setTechList(updated);
        updateWorkspaceState({ detailsBuiltWith: updated.join(', ') });
      }
      setTechInput('');
    }
  };

  const removeTech = (indexToRemove) => {
    const updated = techList.filter((_, idx) => idx !== indexToRemove);
    setTechList(updated);
    updateWorkspaceState({ detailsBuiltWith: updated.join(', ') });
  };

  // Teammates action
  const handleSendInvite = () => {
    if (inviteEmail && inviteEmail.includes('@')) {
      const mockName = inviteEmail.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = mockName.charAt(0).toUpperCase() + mockName.slice(1);

      const updatedTeammates = [
        ...(workspaceState.teammates || []),
        {
          name: formattedName,
          avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80&q=80`,
          role: 'Developer',
          status: 'pending'
        }
      ];

      updateWorkspaceState({ teammates: updatedTeammates });
      setInviteEmail('');
      showToast(`Invitation email successfully sent to ${inviteEmail}!`, 'success');
    } else {
      showToast('Veuillez entrer une adresse email valide.', 'warning');
    }
  };

  // Copy secret invite link
  const handleCopyInviteLink = (e) => {
    const linkText = 'https://codetowin.org/hackathon/google-cloud-rapid-agent/invite/a29df83c';
    navigator.clipboard.writeText(linkText)
      .then(() => {
        const orig = e.target.innerText;
        e.target.innerText = 'Copié !';
        setTimeout(() => { e.target.innerText = orig; }, 2000);
      })
      .catch(() => {
        showToast('Lien d\'invitation: ' + linkText, 'warning');
      });
  };

  // Onboarding action
  const handleOnboardingJoin = () => {
    navigate('/profile');
  };

  // Reset workspace
  const handleResetWorkspace = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser votre projet ? Toutes vos données de brouillon seront effacées.')) {
      resetWorkspace();
      setTechList([]);
      setAgreeGuidelines(false);
      setAgreeTerms(false);
    }
  };

  // Project submission
  const handleSubmitProject = () => {
    if (!agreeGuidelines || !agreeTerms) {
      showToast('Veuillez accepter les directives et conditions de service avant de soumettre.', 'warning');
      return;
    }
    updateWorkspaceState({ submitted: true, previewActive: true });
    showToast('Félicitations ! Votre projet a été soumis avec succès au Google Cloud Rapid Agent Hackathon.', 'success');
  };

  // Thumbnail photo upload preview helper
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        updateWorkspaceState({ thumbnailUrl: uploadEvent.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Sync state for preview toggling
  const handleTogglePreview = () => {
    updateWorkspaceState({ previewActive: !workspaceState.previewActive });
  };

  // UI state variables
  const step = workspaceState.currentStep || 1;
  const isSubmitted = workspaceState.submitted;
  const previewActive = workspaceState.previewActive;
  const progressPercent = (step - 1) * 20;
  const progressText = isSubmitted ? 'Soumis - 100% complété' : `Étape ${step}/5 - ${progressPercent}% complété`;
  const projectSteps = [
    { label: "L'idée", shortLabel: 'Idée', status: step > 1 || isSubmitted ? 'done' : 'current' },
    { label: "L'équipe", shortLabel: 'Équipe', status: step > 2 || isSubmitted ? 'done' : step === 2 ? 'current' : 'pending' },
    { label: 'Détails', shortLabel: 'Détails', status: step > 3 || isSubmitted ? 'done' : step === 3 ? 'current' : 'pending' },
    { label: 'Questions', shortLabel: 'Questions', status: step > 4 || isSubmitted ? 'done' : step === 4 ? 'current' : 'pending' },
    { label: 'Envoi', shortLabel: 'Envoi', status: isSubmitted ? 'done' : step === 5 ? 'current' : 'pending' },
  ];

  return (
    <div>
      {/* Hero Section Banner */}
      <section className="hero" id="hero" aria-label="Challenge Identity Banner">
        <h1>Google Cloud Rapid Agent Hackathon</h1>
      </section>

      {/* Detail Header */}
      <header className="detail-header" aria-label="Hackathon Overview Identity">
        <h2 className="detail-subtitle">Créez des Agents pour des Défis Réels !</h2>
        <p className="detail-description-text">
          C'est l'heure de bricoler des outils qui planifient, agissent et résolvent de vrais problèmes. Soumets ton projet, bosse en équipe et amuse-toi !
        </p>
      </header>

      {/* Quick Information Panel */}
      <section className="quick-info-panel-container" aria-label="Hackathon Quick Info Panel Section">
        <div className="quick-info-panel">
          <div className="info-item">
            <span className="info-label">Statut</span>
            <span className="info-value"><span className="status-highlight">Ouvert</span></span>
          </div>
          <div className="info-item">
            <span className="info-label">Format</span>
            <span className="info-value">En ligne</span>
          </div>
          <div className="info-item">
            <span className="info-label">Fin</span>
            <span className="info-value">11 Juin 2026</span>
          </div>
          <div className="info-item">
            <span className="info-label">Prix</span>
            <span className="info-value">60 000 $</span>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-start' }}>
          {registered ? (
            <button type="button" className="btn-primary" onClick={() => setActiveTab('my-project')}>
              Entrer dans l'espace projet
            </button>
          ) : (
            <button type="button" className="btn-primary" onClick={handleOnboardingJoin}>
              Rejoindre l'aventure !
            </button>
          )}
        </div>
      </section>

      {/* Main Content Area */}
      <div className="layout-wrapper">
        <main className="content-pane">
          {/* Tabs Navigation */}
          <nav className="tab-nav" id="tab-nav" aria-label="Screen Tabs Navigation">
            <button type="button" className={`tab-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Aperçu</button>
            <button type="button" className={`tab-link ${activeTab === 'my-project' ? 'active' : ''}`} onClick={() => setActiveTab('my-project')}>Mon projet</button>
            <button type="button" className={`tab-link ${activeTab === 'participants' ? 'active' : ''}`} onClick={() => setActiveTab('participants')}>Participants</button>
            <button type="button" className={`tab-link ${activeTab === 'resources' ? 'active' : ''}`} onClick={() => setActiveTab('resources')}>Ressources</button>
            <button type="button" className={`tab-link ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>Règles</button>
            <button type="button" className={`tab-link ${activeTab === 'updates' ? 'active' : ''}`} onClick={() => setActiveTab('updates')}>Actus</button>
            <button type="button" className={`tab-link ${activeTab === 'discussions' ? 'active' : ''}`} onClick={() => setActiveTab('discussions')}>Bla-bla</button>
            <button type="button" className={`tab-link ${activeTab === 'faq' ? 'active' : ''}`} onClick={() => setActiveTab('faq')}>FAQ</button>
          </nav>

          <div className="screens-container">
            
            {/* OVERVIEW SCREEN */}
            {activeTab === 'overview' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <div className="textarea-render-body">
                    <h2>C'est quoi ce défi ?</h2>
                    <p>Bienvenue au Google Cloud Rapid Agent Hackathon ! Fini les vieux chatbots ennuyeux, on passe aux vrais Agents IA : des trucs intelligents qui réfléchissent, planifient et utilisent des API pour de vrai.</p>
                    <p>Avec Gemini et les outils MCP, ton but est de créer un agent (presque) autonome qui fait le boulot à la place des humains dans l'une des catégories ci-dessous.</p>
                    <p>Que tu sois un pro du code, un as du design ou juste un débutant curieux, on a tout ce qu'il faut pour t'aider. Viens t'amuser avec nous !</p>
                    
                    <h2>Les Pistes (et les Prix !)</h2>
                    <p>Choisis ton camp et essaie de gagner le gros lot :</p>
                    <ul>
                      <li><strong>Piste Arize (10 000 $ en jeu)</strong> : Fais des agents qui surveillent les erreurs et tracent tout. (1er: 5 000 $ | 2e: 3 000 $ | 3e: 2 000 $)</li>
                      <li><strong>Piste Elastic (10 000 $ en jeu)</strong> : Utilise la recherche vectorielle pour rendre ton agent super malin. (1er: 5 000 $ | 2e: 3 000 $ | 3e: 2 000 $)</li>
                      <li><strong>Piste Fivetran (10 000 $ en jeu)</strong> : Construis des pipelines de données et automatise tout le bazar. (1er: 5 000 $ | 2e: 3 000 $ | 3e: 2 000 $)</li>
                      <li><strong>Piste MongoDB (10 000 $ en jeu)</strong> : Stocke et recherche des trucs avec MongoDB Atlas. (1er: 5 000 $ | 2e: 3 000 $ | 3e: 2 000 $)</li>
                    </ul>

                    <h2>Quelques idées pour t'inspirer 💡</h2>
                    <p>T'as pas d'idée ? Pas de panique, voici de quoi te lancer :</p>
                    <ul>
                      <li><strong>Le Planificateur de la Coupe du Monde 2026</strong> : Aide les fans à trouver des hôtels, des billets et à s'organiser sans stress.</li>
                      <li><strong>Le Chasseur de Fraudes</strong> : Un agent qui fouille dans les transactions pour attraper les méchants.</li>
                      <li><strong>Le Superviseur de Magasin</strong> : Gère les stocks, les livraisons et crie au secours (poliment) quand il manque des trucs.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* MY PROJECT SCREEN */}
            {activeTab === 'my-project' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  {!registered ? (
                    /* UNREGISTERED ONBOARDING STATE */
                    <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--bg-subtle)', borderRadius: '1.5rem' }}>
                      <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: 'var(--green-light)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text)' }}>Allez, rejoins la fête !</h2>
                      <p style={{ color: 'var(--text-muted)', maxWidth: '50ch', margin: '0.5rem auto 1.75rem', fontSize: '0.98rem', lineHeight: 1.5 }}>
                        Remplis ton profil et inscris-toi pour lancer ton projet et trouver tes coéquipiers géniaux.
                      </p>
                      <button type="button" className="btn-primary" onClick={handleOnboardingJoin}>
                        Compléter mon profil &amp; Rejoindre
                      </button>
                    </div>
                  ) : (
                    /* REGISTERED STATE */
                    <div className="workspace-wrapper">
                      {/* Workspace Header */}
                      <div className="workspace-header">
                        <div className="workspace-title-section">
                          <div className="workspace-title-row" style={{ alignItems: 'center', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {!isEditingTitle ? (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <h2 className="workspace-title">{workspaceState.projectName || 'Untitled Project'}</h2>
                                <button
                                  type="button"
                                  style={{ background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'inline-flex', padding: '0.25rem' }}
                                  onClick={handleStartTitleEdit}
                                  aria-label="Edit project title"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 20h9"></path>
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                  </svg>
                                </button>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <input
                                  type="text"
                                  style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)', borderBottom: '2px solid var(--green)', background: 'transparent', padding: '0 0.25rem', width: 'min(250px, 60vw)' }}
                                  value={editedTitle}
                                  onChange={(e) => setEditedTitle(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveTitleEdit();
                                    if (e.key === 'Escape') handleCancelTitleEdit();
                                  }}
                                  autoFocus
                                />
                                <button type="button" className="btn-action-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', borderRadius: '0.5rem' }} onClick={handleSaveTitleEdit}>Save</button>
                                <button type="button" className="btn-action-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', borderRadius: '0.5rem' }} onClick={handleCancelTitleEdit}>Cancel</button>
                              </div>
                            )}
                            <span className={isSubmitted ? 'badge-submitted' : 'badge-draft'}>
                              {isSubmitted ? 'Submitted' : 'Draft'}
                            </span>
                          </div>
                          <span className="workspace-progress-text">{progressText}</span>
                        </div>
                        <div className="workspace-actions">
                          <button type="button" className="btn-action-secondary" onClick={handleTogglePreview}>
                            {previewActive ? 'Edit Project' : 'Preview Project'}
                          </button>
                          <button type="button" className="btn-action-secondary" style={{ borderColor: '#fca5a5', color: '#dc2626' }} onClick={handleResetWorkspace}>
                            Reset Workspace
                          </button>
                        </div>
                      </div>

                      {/* WORKSPACE PREVIEW MODE */}
                      {previewActive ? (
                        <div className="preview-container" style={{ display: 'flex' }}>
                          <div
                            className="preview-cover"
                            style={
                              workspaceState.thumbnailUrl
                                ? { background: `url(${workspaceState.thumbnailUrl}) center/cover no-repeat`, color: 'transparent' }
                                : { background: 'linear-gradient(135deg, var(--green-light) 0%, #d1fae5 100%)', color: 'var(--green-dark)' }
                            }
                          >
                            {!workspaceState.thumbnailUrl && (workspaceState.projectName || 'Project Draft')}
                          </div>

                          <div className="preview-details-header">
                            <div className="preview-title-block">
                              <h1>{workspaceState.projectName || 'Untitled Project'}</h1>
                              <p className="preview-pitch">{workspaceState.projectPitch || 'Short elevator pitch will render here.'}</p>
                            </div>
                            <div className="preview-actions-block">
                              <button type="button" className="btn-action-secondary" style={{ borderRadius: '9999px', gap: '0.5rem', display: 'inline-flex', alignItems: 'center' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
                                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                                </svg>
                                <span>Like</span>
                              </button>
                              <button type="button" className="btn-action-secondary" style={{ borderRadius: '9999px' }}>Comment</button>
                            </div>
                          </div>

                          <div className="preview-main-body">
                            <div className="preview-story-pane">
                              <div className="textarea-render-body">
                                <h2>About the Project</h2>
                                <div
                                  className="markdown-preview-body"
                                  style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.6', marginTop: '0.5rem' }}
                                  dangerouslySetInnerHTML={{
                                    __html: workspaceState.detailsAbout
                                      ? marked.parse(workspaceState.detailsAbout)
                                      : 'No details provided yet.'
                                  }}
                                />
                              </div>
                            </div>
                            
                            <div className="preview-sidebar-pane">
                              {/* Technologies */}
                              <div className="preview-sidebar-widget">
                                <span className="preview-widget-title">Fait avec ❤️ et :</span>
                                <div className="preview-tech-list">
                                  {techList.length > 0 ? (
                                    techList.map((t, idx) => (
                                      <span key={idx} className="preview-tech-tag">{t}</span>
                                    ))
                                  ) : (
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No tech stack specified.</span>
                                  )}
                                </div>
                              </div>

                              {/* Links */}
                              <div className="preview-sidebar-widget">
                                <span className="preview-widget-title">Testez-le !</span>
                                <div className="preview-links-widget">
                                  {workspaceState.detailsRepo && (
                                    <a href={workspaceState.detailsRepo} className="preview-link-item" target="_blank" rel="noopener noreferrer">
                                      Le code source
                                    </a>
                                  )}
                                  {workspaceState.detailsDemo && (
                                    <a href={workspaceState.detailsDemo} className="preview-link-item" target="_blank" rel="noopener noreferrer">
                                      La démo qui déchire
                                    </a>
                                  )}
                                  {workspaceState.detailsVideo && (
                                    <a href={workspaceState.detailsVideo} className="preview-link-item" target="_blank" rel="noopener noreferrer">
                                      La vidéo cool
                                    </a>
                                  )}
                                  {!workspaceState.detailsRepo && !workspaceState.detailsDemo && !workspaceState.detailsVideo && (
                                    <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>Pas de liens pour le moment.</span>
                                  )}
                                </div>
                              </div>

                              {/* Teammates */}
                              <div className="preview-sidebar-widget">
                                <span className="preview-widget-title">La Dream Team</span>
                                <div className="preview-teammates">
                                  {workspaceState.teammates && workspaceState.teammates.map((m, idx) => (
                                    <div key={idx} className="preview-teammate-card">
                                      <img src={m.avatar} className="preview-teammate-avatar" alt={m.name} />
                                      <div className="preview-teammate-info">
                                        <span className="preview-teammate-name">{m.name}</span>
                                        <span className="preview-teammate-role">{m.role}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* WORKSPACE EDITOR FLOW */
                        <div id="workspace-editor-flow" style={{ display: 'block' }}>
                          {/* Steps Track */}
                          <StepProgress
                            variant="horizontal"
                            steps={projectSteps}
                            className="mb-5"
                            onStepClick={(_, index) => handleJumpToStep(index + 1)}
                          />

                          {/* Wizard Panel */}
                          <div className="wizard-card">
                            <form onSubmit={(e) => e.preventDefault()}>
                              
                              {/* STEP 1: IDEA */}
                              {step === 1 && (
                                <div className="wizard-step-panel is-active">
                                  <div className="step-pane-header">
                                    <h3 className="step-pane-title">Aperçu du projet</h3>
                                    <p className="step-pane-desc">Donne un titre cool à ton bébé.</p>
                                  </div>
                                  <div className="form-grid">
                                    <div className="form-group">
                                      <label htmlFor="project-name-input" className="form-label">Nom du projet<span className="required-asterisk">*</span></label>
                                      <input
                                        type="text"
                                        id="project-name-input"
                                        className="form-input"
                                        required
                                        placeholder="ex: Le Super Agent Magique"
                                        value={workspaceState.projectName || ''}
                                        onChange={(e) => handleUpdateField('projectName', e.target.value)}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="project-pitch-input" className="form-label">Le pitch !<span className="required-asterisk">*</span> (Moins de 150 caractères)</label>
                                      <textarea
                                        id="project-pitch-input"
                                        className="form-textarea"
                                        required
                                        placeholder="Un truc accrocheur qui donne envie..."
                                        maxLength="150"
                                        value={workspaceState.projectPitch || ''}
                                        onChange={(e) => handleUpdateField('projectPitch', e.target.value)}
                                      ></textarea>
                                    </div>
                                    <div className="form-group">
                                      <label className="form-label">Image sympa (Thumbnail)</label>
                                      <div className="upload-trigger-box" onClick={() => document.getElementById('project-thumbnail-input').click()}>
                                        <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '0.5rem', background: 'var(--green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                            <polyline points="21 15 16 10 5 21"></polyline>
                                          </svg>
                                        </div>
                                        <div className="upload-info">
                                          <span>Ajouter une image</span>
                                          <p>C'est plus joli !</p>
                                        </div>
                                        <input
                                          type="file"
                                          id="project-thumbnail-input"
                                          style={{ display: 'none' }}
                                          accept="image/*"
                                          onChange={handleThumbnailChange}
                                        />
                                      </div>
                                      {workspaceState.thumbnailUrl && (
                                        <img
                                          src={workspaceState.thumbnailUrl}
                                          alt="Preview"
                                          id="project-thumbnail-preview-img"
                                          style={{ display: 'block', maxHeight: '10rem', borderRadius: '0.75rem', objectFit: 'cover', marginTop: '0.75rem' }}
                                        />
                                      )}
                                    </div>
                                  </div>
                                  <div className="step-actions-footer">
                                    <div></div>
                                    <button type="button" className="btn-action-primary" onClick={() => handleJumpToStep(2)}>Suivant !</button>
                                  </div>
                                </div>
                              )}

                              {/* STEP 2: TEAM */}
                              {step === 2 && (
                                <div className="wizard-step-panel is-active">
                                  <div className="step-pane-header">
                                    <h3 className="step-pane-title">Gérer l'équipe</h3>
                                    <p className="step-pane-desc">Ajoute tes potes par email ou via un lien secret magique.</p>
                                  </div>
                                  <div className="form-grid">
                                    <div className="form-group">
                                      <label className="form-label">Inviter par email</label>
                                      <div className="invite-input-row">
                                        <input
                                          type="email"
                                          id="invite-email-input"
                                          className="form-input"
                                          placeholder="pote@superdev.com"
                                          value={inviteEmail}
                                          onChange={(e) => setInviteEmail(e.target.value)}
                                        />
                                        <button type="button" className="btn-action-primary invite-btn" onClick={handleSendInvite}>Inviter</button>
                                      </div>
                                    </div>

                                    <div className="form-group">
                                      <label className="form-label">Le lien secret</label>
                                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                                        Envoie ce lien à tes amis pour qu'ils rejoignent l'équipe.
                                      </p>
                                      <div className="invite-link-box">
                                        <span className="invite-link-text" id="workspace-invite-url">
                                          https://codetowin.org/hackathon/google-cloud-rapid-agent/invite/a29df83c
                                        </span>
                                        <button type="button" className="btn-action-secondary" style={{ borderRadius: '9999px', padding: '0.35rem 1rem', fontSize: '0.8rem' }} onClick={handleCopyInviteLink}>
                                          Copier le lien
                                        </button>
                                      </div>
                                    </div>

                                    <div className="form-group" style={{ marginTop: '1rem' }}>
                                      <label className="form-label">Membres de l'équipe</label>
                                      <div className="teammates-list">
                                        {workspaceState.teammates && workspaceState.teammates.map((m, idx) => (
                                          <div key={idx} className="teammate-row">
                                            <div className="teammate-info">
                                              <img src={m.avatar} className="teammate-avatar" alt={m.name} />
                                              <div className="teammate-identity">
                                                <span className="teammate-name">{m.name}</span>
                                                <span className="teammate-role-badge">{m.role}</span>
                                              </div>
                                            </div>
                                            <span className={`teammate-status-badge ${m.status === 'joined' ? 'status-joined' : 'status-pending'}`}>
                                              {m.status === 'joined' ? 'Joined' : 'Pending'}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="step-actions-footer">
                                    <button type="button" className="btn-action-secondary" onClick={() => handleJumpToStep(1)}>Retour</button>
                                    <button type="button" className="btn-action-primary" onClick={() => handleJumpToStep(3)}>Suivant !</button>
                                  </div>
                                </div>
                              )}

                              {/* STEP 3: DETAILS */}
                              {step === 3 && (
                                <div className="wizard-step-panel is-active">
                                  <div className="step-pane-header">
                                    <h3 className="step-pane-title">Les trucs techniques</h3>
                                    <p className="step-pane-desc">Dis-nous comment t'as fait ton chef-d'œuvre ! (Markdown supporté)</p>
                                  </div>
                                  <div className="form-grid">
                                    <div className="form-group">
                                      <label htmlFor="project-about-input" className="form-label">Raconte-nous tout<span className="required-asterisk">*</span></label>
                                      <textarea
                                        id="project-about-input"
                                        className="form-textarea h-40"
                                        placeholder="Raconte-nous tout ce que tu as fait, comment ça marche..."
                                        value={workspaceState.detailsAbout || ''}
                                        onChange={(e) => handleUpdateField('detailsAbout', e.target.value)}
                                      ></textarea>
                                    </div>

                                    {/* Technologies Built With */}
                                    <div className="form-group">
                                      <label className="form-label">Technologies utilisées<span className="required-asterisk">*</span></label>
                                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Tape et fais Entrée !</p>
                                      <div className="tags-input-wrap" onClick={() => document.getElementById('project-built-with-input').focus()}>
                                        {techList.map((tech, idx) => (
                                          <div key={idx} className="tag-pill">
                                            <span>{tech}</span>
                                            <button type="button" className="tag-remove-btn" onClick={() => removeTech(idx)}>&times;</button>
                                          </div>
                                        ))}
                                        <input
                                          type="text"
                                          id="project-built-with-input"
                                          className="tags-input-text"
                                          placeholder={techList.length === 0 ? "Ajouter une techno..." : ""}
                                          value={techInput}
                                          onChange={(e) => setTechInput(e.target.value)}
                                          onKeyDown={handleTechKeyDown}
                                        />
                                      </div>
                                    </div>

                                    <div className="form-row-2">
                                      <div className="form-group">
                                        <label htmlFor="project-repo-link" className="form-label">Lien GitHub (ton code)</label>
                                        <input
                                          type="url"
                                          id="project-repo-link"
                                          className="form-input"
                                          placeholder="https://github.com/myteam/agent-project"
                                          value={workspaceState.detailsRepo || ''}
                                          onChange={(e) => handleUpdateField('detailsRepo', e.target.value)}
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label htmlFor="project-demo-link" className="form-label">Lien vers la démo en direct !</label>
                                        <input
                                          type="url"
                                          id="project-demo-link"
                                          className="form-input"
                                          placeholder="https://agent-demo.vercel.app"
                                          value={workspaceState.detailsDemo || ''}
                                          onChange={(e) => handleUpdateField('detailsDemo', e.target.value)}
                                        />
                                      </div>
                                    </div>

                                    <div className="form-group">
                                      <label htmlFor="project-video-link" className="form-label">Lien YouTube/Vimeo de ta vidéo</label>
                                      <input
                                        type="url"
                                        id="project-video-link"
                                        className="form-input"
                                        placeholder="https://youtube.com/watch?v=demo"
                                        value={workspaceState.detailsVideo || ''}
                                        onChange={(e) => handleUpdateField('detailsVideo', e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="step-actions-footer">
                                    <button type="button" className="btn-action-secondary" onClick={() => handleJumpToStep(2)}>Retour</button>
                                    <button type="button" className="btn-action-primary" onClick={() => handleJumpToStep(4)}>Suivant !</button>
                                  </div>
                                </div>
                              )}

                              {/* STEP 4: QUESTIONS */}
                              {step === 4 && (
                                <div className="wizard-step-panel is-active">
                                  <div className="step-pane-header">
                                    <h3 className="step-pane-title">Questions du jury</h3>
                                    <p className="step-pane-desc">Réponds à ces quelques questions posées par les gentils organisateurs.</p>
                                  </div>
                                  <div className="form-grid">
                                    <div className="form-group">
                                      <label htmlFor="question-mcp-input" className="form-label">1. Décris les serveurs MCP de ton agent. Ils font quoi de beau ?<span className="required-asterisk">*</span></label>
                                      <textarea
                                        id="question-mcp-input"
                                        className="form-textarea"
                                        required
                                        placeholder="Je me suis connecté à..."
                                        value={workspaceState.questionMcp || ''}
                                        onChange={(e) => handleUpdateField('questionMcp', e.target.value)}
                                      ></textarea>
                                    </div>
                                    
                                    <div className="form-group">
                                      <label htmlFor="question-security-input" className="form-label">2. As-tu sécurisé ton agent contre les méchants qui voudraient le hacker ?<span className="required-asterisk">*</span></label>
                                      <textarea
                                        id="question-security-input"
                                        className="form-textarea"
                                        required
                                        placeholder="Oui j'ai fait..."
                                        value={workspaceState.questionSecurity || ''}
                                        onChange={(e) => handleUpdateField('questionSecurity', e.target.value)}
                                      ></textarea>
                                    </div>
                                  </div>
                                  <div className="step-actions-footer">
                                    <button type="button" className="btn-action-secondary" onClick={() => handleJumpToStep(3)}>Retour</button>
                                    <button type="button" className="btn-action-primary" onClick={() => handleJumpToStep(5)}>Suivant !</button>
                                  </div>
                                </div>
                              )}

                              {/* STEP 5: SUBMIT */}
                              {step === 5 && (
                                <div className="wizard-step-panel is-active">
                                  <div className="step-pane-header">
                                    <h3 className="step-pane-title">Le Grand Saut !</h3>
                                    <p className="step-pane-desc">Vérifie bien tout avant d'envoyer.</p>
                                  </div>
                                  
                                  <div style={{ background: 'var(--bg-subtle)', padding: '1.5rem', borderRadius: '1rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)' }}>Résumé</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', fontSize: '0.9rem' }}>
                                      <div>
                                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>Nom</span>
                                        <strong style={{ color: 'var(--text)' }}>{workspaceState.projectName || 'Sans titre'}</strong>
                                      </div>
                                      <div>
                                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>Équipe</span>
                                        <strong style={{ color: 'var(--text)' }}>{(workspaceState.teammates || []).length} Builders</strong>
                                      </div>
                                      <div>
                                        <span style={{ color: 'var(--text-muted)', display: 'block' }}>Statut</span>
                                        <strong style={{ color: workspaceState.detailsAbout ? 'var(--green)' : '#dc2626' }}>
                                          {workspaceState.detailsAbout ? 'Prêt !' : 'Détails incomplets'}
                                        </strong>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="form-grid">
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                      <input
                                        type="checkbox"
                                        id="agree-guidelines"
                                        style={{ marginTop: '0.25rem', cursor: 'pointer' }}
                                        checked={agreeGuidelines}
                                        onChange={(e) => setAgreeGuidelines(e.target.checked)}
                                        required
                                      />
                                      <label htmlFor="agree-guidelines" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.4, cursor: 'pointer' }}>
                                        Je promets que tout mon code a été fait pendant le concours (1-11 Juin) et que je respecte toutes les règles. Juré craché !
                                      </label>
                                    </div>
                                    
                                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                      <input
                                        type="checkbox"
                                        id="agree-terms"
                                        style={{ marginTop: '0.25rem', cursor: 'pointer' }}
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        required
                                      />
                                      <label htmlFor="agree-terms" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.4, cursor: 'pointer' }}>
                                        J'accepte que les juges regardent mon super code et mes fichiers.
                                      </label>
                                    </div>
                                  </div>

                                  <div className="step-actions-footer">
                                    <button type="button" className="btn-action-secondary" onClick={() => handleJumpToStep(4)}>Retour</button>
                                    <div className="step-actions-right">
                                      <span style={{ alignSelf: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginRight: '0.5rem' }}>Tu pourras encore modifier avant la fin du chrono.</span>
                                      <button type="button" className="btn-action-primary" style={{ padding: '0.75rem 2rem' }} onClick={handleSubmitProject}>Soumettre !</button>
                                    </div>
                                  </div>
                                </div>
                              )}

                            </form>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PARTICIPANTS SCREEN */}
            {activeTab === 'participants' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <h2 className="slice-title">Les Génies Inscrits</h2>
                  
                  <div className="search-filter-row">
                    <div className="search-box-wrap">
                      <input type="text" placeholder="Cherche des potes, des skills..." />
                    </div>
                    <div className="filter-chips-list">
                      <span className="filter-chip-item active">Tous</span>
                      <span className="filter-chip-item">Bricoleurs</span>
                      <span className="filter-chip-item">Artistes</span>
                      <span className="filter-chip-item">Chefs d'orchestre</span>
                    </div>
                  </div>

                  <div className="users-grid">
                    <div className="user-profile-card">
                      <div className="user-avatar-wrap">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="Sarah Chen" className="profile-avatar" />
                        <span className="user-status-dot"></span>
                      </div>
                      <div className="user-profile-details">
                        <span className="profile-name">Sarah Chen</span>
                        <span className="profile-role">AI Developer • Montreal</span>
                        <div className="profile-skills-tags">
                          <span className="skill-tag">Python</span>
                          <span className="skill-tag">Gemini API</span>
                          <span className="skill-tag">LangChain</span>
                        </div>
                      </div>
                    </div>

                    <div className="user-profile-card">
                      <div className="user-avatar-wrap">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="Marcus Vance" className="profile-avatar" />
                        <span className="user-status-dot"></span>
                      </div>
                      <div className="user-profile-details">
                        <span className="profile-name">Marcus Vance</span>
                        <span className="profile-role">Product Designer • SF</span>
                        <div className="profile-skills-tags">
                          <span className="skill-tag">Figma</span>
                          <span className="skill-tag">UX Research</span>
                          <span className="skill-tag">HTML/CSS</span>
                        </div>
                      </div>
                    </div>

                    <div className="user-profile-card">
                      <div className="user-avatar-wrap">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80" alt="Elena Rostova" className="profile-avatar" />
                        <span className="user-status-dot"></span>
                      </div>
                      <div className="user-profile-details">
                        <span className="profile-name">Elena Rostova</span>
                        <span className="profile-role">Data Scientist • Berlin</span>
                        <div className="profile-skills-tags">
                          <span className="skill-tag">PyTorch</span>
                          <span className="skill-tag">MongoDB</span>
                          <span className="skill-tag">Vector Search</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RESOURCES SCREEN */}
            {activeTab === 'resources' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <div className="textarea-render-body">
                    <h2>La boîte à outils ! 🛠️</h2>
                    <p>Voici tous les trucs cool pour t'aider à construire ton projet :</p>

                    <h3>Les papiers officiels</h3>
                    <ul>
                      <li><a href="#mcp-doc" onClick={(e) => e.preventDefault()}>La doc MCP</a> - Pour comprendre comment faire des outils magiques.</li>
                      <li><a href="#gcloud-models" onClick={(e) => e.preventDefault()}>Les modèles Google Cloud</a> - Des petits bouts de code pour te lancer plus vite.</li>
                    </ul>

                    <h3>Les guides de nos amis</h3>
                    <ul>
                      <li><a href="#mongo-guide" onClick={(e) => e.preventDefault()}>Le guide MongoDB</a> - Pour apprendre à stocker plein de trucs super facilement.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* RULES SCREEN */}
            {activeTab === 'rules' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <div className="textarea-render-body">
                    <h2>Les Règles du Jeu 📜</h2>
                    
                    <h3>1. Qui peut jouer ?</h3>
                    <p>Tout le monde peut participer au Google Cloud Rapid Agent Hackathon ! Faut juste avoir 18 ans, parce qu'on fait les choses bien.</p>
                    <p>Par contre, si tu bosses chez Google ou nos partenaires, tu pourras pas gagner les prix (faut laisser la chance aux autres !).</p>

                    <h3>2. Comment ça marche ?</h3>
                    <p>Ton projet doit être tout frais, codé pendant le hackathon. Pas de recyclage d'anciens trucs ! Mais tu peux utiliser des librairies gratuites, évidemment.</p>
                    <p>Et devine quoi ? Vous pouvez être jusqu'à 4 dans l'équipe. Mélangez les talents, c'est encore plus rigolo !</p>
                  </div>
                </div>
              </div>
            )}

            {/* UPDATES SCREEN */}
            {activeTab === 'updates' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <h2 className="slice-title">Les actus croustillantes 📰</h2>
                  <div className="updates-timeline">
                    <div className="update-item">
                      <span className="update-node"></span>
                      <div className="update-date">5 Juin 2026</div>
                      <h3 className="update-title">Cadeaux Google Cloud distribués !</h3>
                      <span className="update-author">par Sarah Chen • Organisatrice</span>
                      <p className="update-body-text">Regarde tes emails ! On t'a envoyé un super code promo pour tester Vertex. Profites-en bien avant le 11 juin !</p>
                    </div>

                    <div className="update-item">
                      <span className="update-node"></span>
                      <div className="update-date">1 Juin 2026</div>
                      <h3 className="update-title">Petits webinaires sympas</h3>
                      <span className="update-author">par l'Équipe</span>
                      <p className="update-body-text">On lance des vidéos en direct demain. Les pros de MongoDB, Arize et GitLab vont t'expliquer des trucs cools sur les serveurs MCP.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DISCUSSIONS SCREEN */}
            {activeTab === 'discussions' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <h2 className="slice-title">Le coin Bla-bla 🗣️</h2>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div className="search-box-wrap" style={{ flex: 1, marginRight: '1rem' }}>
                      <input type="text" placeholder="Cherche de quoi papoter..." />
                    </div>
                    <a href="#new-post" onClick={(e) => { e.preventDefault(); showToast("Bla-bla bientôt disponible !", 'warning'); }} className="btn-action-primary">Nouveau truc à dire</a>
                  </div>

                  <div className="discussions-pane">
                    <div className="discussion-item-card">
                      <div className="discussion-info">
                        <a href="#topic1" onClick={(e) => e.preventDefault()} className="discussion-topic">Au secours avec les erreurs Fivetran !</a>
                        <div className="discussion-meta">
                          <span>Lancé par Tariq Johnson • il y a 2 heures</span>
                          <span>dans Aide Technique</span>
                        </div>
                      </div>
                      <span className="discussion-replies">4 réponses</span>
                    </div>

                    <div className="discussion-item-card">
                      <div className="discussion-info">
                        <a href="#topic2" onClick={(e) => e.preventDefault()} className="discussion-topic">On cherche un artiste UX pour notre équipe !</a>
                        <div className="discussion-meta">
                          <span>Lancé par Sarah Chen • il y a 1 jour</span>
                          <span>dans Recherche d'équipe</span>
                        </div>
                      </div>
                      <span className="discussion-replies">8 réponses</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ SCREEN */}
            {activeTab === 'faq' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <h2 className="slice-title">Questions Fréquentes (FAQ)</h2>
                  <div className="faq-accordion-group">
                    
                    <div className={`faq-collapsible ${openFaqIndex === 0 ? 'is-open' : ''}`}>
                      <button className="faq-trigger" type="button" onClick={() => setOpenFaqIndex(prev => prev === 0 ? null : 0)}>
                        Les débutants peuvent-ils jouer ?
                      </button>
                      <div className="faq-details" style={{ maxHeight: openFaqIndex === 0 ? '300px' : '0px', transition: 'max-height 0.2s ease-out', overflow: 'hidden' }}>
                        <div className="faq-details-inner">
                          Carrément ! On adore les petits nouveaux. Google Cloud vous donne plein d'exemples et d'environnements bac à sable pour vous lancer facilement.
                        </div>
                      </div>
                    </div>

                    <div className={`faq-collapsible ${openFaqIndex === 1 ? 'is-open' : ''}`}>
                      <button className="faq-trigger" type="button" onClick={() => setOpenFaqIndex(prev => prev === 1 ? null : 1)}>
                        Je peux ramener mes potes ?
                      </button>
                      <div className="faq-details" style={{ maxHeight: openFaqIndex === 1 ? '300px' : '0px', transition: 'max-height 0.2s ease-out', overflow: 'hidden' }}>
                        <div className="faq-details-inner">
                          Oui, vous pouvez être jusqu'à 4 dans une équipe. Mais tu peux aussi jouer les loups solitaires si tu préfères !
                        </div>
                      </div>
                    </div>

                    <div className={`faq-collapsible ${openFaqIndex === 2 ? 'is-open' : ''}`}>
                      <button className="faq-trigger" type="button" onClick={() => setOpenFaqIndex(prev => prev === 2 ? null : 2)}>
                        Je peux utiliser un vieux projet ?
                      </button>
                      <div className="faq-details" style={{ maxHeight: openFaqIndex === 2 ? '300px' : '0px', transition: 'max-height 0.2s ease-out', overflow: 'hidden' }}>
                        <div className="faq-details-inner">
                          Non, tout le code de ton agent doit être produit pendant les dates officielles du hackathon. C'est plus juste pour tout le monde !
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}

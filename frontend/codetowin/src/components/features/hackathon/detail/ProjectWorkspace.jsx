import React, { useState } from 'react';
import StepProgress from '../../../common/StepProgress';
import ProjectPreview from './ProjectPreview';
import TeamInvitePanel from './TeamInvitePanel';

export default function ProjectWorkspace({
  workspaceState,
  updateWorkspaceState,
  resetWorkspace,
  registered,
  handleOnboardingJoin,
  isSubmitted,
  setIsSubmitted
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [previewActive, setPreviewActive] = useState(false);
  const [step, setStep] = useState(1);
  const [techInput, setTechInput] = useState('');
  const [techList, setTechList] = useState([]);
  
  const [agreeGuidelines, setAgreeGuidelines] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleUpdateField = (field, value) => {
    updateWorkspaceState({ [field]: value });
  };

  const handleStartTitleEdit = () => {
    setEditedTitle(workspaceState.projectName || '');
    setIsEditingTitle(true);
  };

  const handleSaveTitleEdit = () => {
    if (editedTitle.trim()) {
      handleUpdateField('projectName', editedTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleCancelTitleEdit = () => {
    setIsEditingTitle(false);
  };

  const handleTogglePreview = () => setPreviewActive(!previewActive);

  const handleJumpToStep = (targetStep) => setStep(targetStep);

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleUpdateField('thumbnailUrl', event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleTechKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = techInput.trim();
      if (val && !techList.includes(val)) {
        setTechList([...techList, val]);
        setTechInput('');
      }
    }
  };

  const removeTech = (indexToRemove) => {
    setTechList(techList.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmitProject = () => {
    if (!agreeGuidelines || !agreeTerms) {
      alert("Veuillez accepter les conditions avant de soumettre.");
      return;
    }
    setIsSubmitted(true);
    setPreviewActive(true);
  };

  const projectSteps = [
    { label: 'Idée', shortLabel: 'Idée', status: step > 1 || isSubmitted ? 'done' : step === 1 ? 'current' : 'pending' },
    { label: 'Équipe', shortLabel: 'Équipe', status: step > 2 || isSubmitted ? 'done' : step === 2 ? 'current' : 'pending' },
    { label: 'Détails', shortLabel: 'Détails', status: step > 3 || isSubmitted ? 'done' : step === 3 ? 'current' : 'pending' },
    { label: 'Questions', shortLabel: 'Questions', status: step > 4 || isSubmitted ? 'done' : step === 4 ? 'current' : 'pending' },
    { label: 'Envoi', shortLabel: 'Envoi', status: isSubmitted ? 'done' : step === 5 ? 'current' : 'pending' },
  ];

  const progressText = isSubmitted ? "100% completed" : "Step " + step + " of 5";

  if (!registered) {
    return (
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
    );
  }

  return (
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
          <button type="button" className="btn-action-secondary" style={{ borderColor: '#fca5a5', color: '#dc2626' }} onClick={resetWorkspace}>
            Reset Workspace
          </button>
        </div>
      </div>

      {previewActive ? (
        <ProjectPreview workspaceState={workspaceState} techList={techList} />
      ) : (
        <div id="workspace-editor-flow" style={{ display: 'block' }}>
          <StepProgress
            variant="horizontal"
            steps={projectSteps}
            className="mb-5"
            onStepClick={(_, index) => handleJumpToStep(index + 1)}
          />

          <div className="wizard-card">
            <form onSubmit={(e) => e.preventDefault()}>
              
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

              {step === 2 && (
                <TeamInvitePanel workspaceState={workspaceState} updateWorkspaceState={updateWorkspaceState} handleJumpToStep={handleJumpToStep} />
              )}

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
  );
}

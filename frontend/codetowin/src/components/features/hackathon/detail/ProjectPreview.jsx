import React, { useState } from 'react';
import { marked } from 'marked';
import { FileText, Play, Code, ShieldCheck, Cpu } from 'lucide-react';
import { submissionsApi } from '../../../../api/submissions';
import { useToast } from '../../../../context/ToastContext';

export default function ProjectPreview({ workspaceState, techList }) {
  const [voting, setVoting] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const { showToast } = useToast();

  const handleVote = async () => {
    setVoting(true);
    try {
      await submissionsApi.voteSubmission(workspaceState.id || 'draft_1');
      showToast("Votre vote a été enregistré !", "success");
    } catch (error) {
      showToast("Erreur lors de l'enregistrement du vote.", "error");
    } finally {
      setVoting(false);
    }
  };

  const handleComment = async () => {
    setCommenting(true);
    try {
      await submissionsApi.addComment(workspaceState.id || 'draft_1', "Super projet !");
      showToast("Votre commentaire a été publié (simulation).", "success");
    } catch (error) {
      showToast("Erreur lors de la publication du commentaire.", "error");
    } finally {
      setCommenting(false);
    }
  };

  return (
    <div className="preview-container">
      {/* Banner / Cover */}
      <div
        className="preview-cover-modern"
        style={
          workspaceState.thumbnailUrl
            ? { background: `url(${workspaceState.thumbnailUrl}) center/cover no-repeat` }
            : { background: 'linear-gradient(135deg, var(--green-light) 0%, #d1fae5 100%)' }
        }
      >
        {!workspaceState.thumbnailUrl && (
          <div className="preview-cover-placeholder">
            <h1>{workspaceState.projectName || 'Project Draft'}</h1>
          </div>
        )}
      </div>

      {/* Main Header */}
      <div className="preview-header-modern">
        <div className="preview-header-content">
          <div className="preview-title-group">
            <h1 className="preview-title-main">{workspaceState.projectName || 'Untitled Project'}</h1>
            <p className="preview-pitch-main">{workspaceState.projectPitch || 'Short elevator pitch will render here.'}</p>
          </div>
          <div className="preview-actions-modern" style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn-action-secondary" style={{ borderRadius: '9999px', display: 'flex', gap: '0.5rem', alignItems: 'center' }} onClick={handleVote} disabled={voting}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span>{voting ? 'Vote...' : 'Voter pour ce projet'}</span>
            </button>
            <button type="button" className="btn-action-secondary" style={{ borderRadius: '9999px', display: 'flex', gap: '0.5rem', alignItems: 'center' }} onClick={handleComment} disabled={commenting}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span>{commenting ? 'Envoi...' : 'Commenter'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="preview-grid-modern">
        {/* Left Column (Main Content) */}
        <div className="preview-main-col">
          {/* About Section */}
          <div className="preview-card-modern">
            <div className="preview-card-header">
              <FileText size={20} className="preview-icon" />
              <h2>À propos du projet</h2>
            </div>
            <div
              className="markdown-preview-body preview-card-content"
              dangerouslySetInnerHTML={{
                __html: workspaceState.detailsAbout
                  ? marked.parse(workspaceState.detailsAbout)
                  : '<p class="empty-text">Aucun détail fourni pour le moment.</p>'
              }}
            />
          </div>

          {/* Q&A Section */}
          <div className="preview-card-modern">
            <div className="preview-card-header">
              <Cpu size={20} className="preview-icon" />
              <h2>Questions du Jury</h2>
            </div>
            <div className="preview-qna-list">
              <div className="preview-qna-item">
                <h3 className="qna-question">1. Décris les serveurs MCP de ton agent. Ils font quoi de beau ?</h3>
                <div className="qna-answer">
                  {workspaceState.questionMcp ? (
                    <p>{workspaceState.questionMcp}</p>
                  ) : (
                    <p className="empty-text">Non répondu.</p>
                  )}
                </div>
              </div>
              <div className="preview-qna-item">
                <h3 className="qna-question">2. As-tu sécurisé ton agent contre les méchants qui voudraient le hacker ?</h3>
                <div className="qna-answer">
                  {workspaceState.questionSecurity ? (
                    <p>{workspaceState.questionSecurity}</p>
                  ) : (
                    <p className="empty-text">Non répondu.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column (Sidebar) */}
        <div className="preview-sidebar-col">
          
          {/* Team Widget */}
          <div className="preview-widget-modern">
            <h3>{workspaceState.teamName ? `Équipe : ${workspaceState.teamName}` : 'La Dream Team'}</h3>
            <div className="preview-teammates-modern">
              {workspaceState.teammates && workspaceState.teammates.length > 0 ? (
                workspaceState.teammates.map((m, idx) => (
                  <div key={idx} className="preview-teammate-row">
                    <img src={m.avatar} className="preview-teammate-avatar-sm" alt={m.name} />
                    <div className="preview-teammate-details">
                      <span className="preview-teammate-name-sm">{m.name}</span>
                      <span className="preview-teammate-role-sm">{m.role}</span>
                    </div>
                  </div>
                ))
              ) : (
                 <p className="empty-text">Aucun membre dans l'équipe.</p>
              )}
            </div>
          </div>

          {/* Links Widget */}
          <div className="preview-widget-modern">
            <h3>Tester le projet</h3>
            <div className="preview-links-modern">
              {workspaceState.detailsRepo && (
                <a href={workspaceState.detailsRepo} className="preview-link-btn" target="_blank" rel="noopener noreferrer">
                  <Code size={16} /> Le code source
                </a>
              )}
              {workspaceState.detailsDemo && (
                <a href={workspaceState.detailsDemo} className="preview-link-btn" target="_blank" rel="noopener noreferrer">
                  <Play size={16} /> Démo en direct
                </a>
              )}
              {workspaceState.detailsVideo && (
                <a href={workspaceState.detailsVideo} className="preview-link-btn video-btn" target="_blank" rel="noopener noreferrer">
                  <Play size={16} fill="currentColor" /> Vidéo de présentation
                </a>
              )}
              {!workspaceState.detailsRepo && !workspaceState.detailsDemo && !workspaceState.detailsVideo && (
                <p className="empty-text">Aucun lien disponible.</p>
              )}
            </div>
          </div>

          {/* Technologies Widget */}
          <div className="preview-widget-modern">
            <h3>Fait avec ❤️ et :</h3>
            <div className="preview-tech-modern">
              {techList.length > 0 ? (
                techList.map((t, idx) => (
                  <span key={idx} className="preview-tech-pill">{t}</span>
                ))
              ) : (
                <p className="empty-text">Aucune technologie spécifiée.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

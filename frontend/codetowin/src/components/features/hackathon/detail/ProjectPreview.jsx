import React from 'react';
import { marked } from 'marked';

export default function ProjectPreview({ workspaceState, techList }) {
  return (
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
  );
}

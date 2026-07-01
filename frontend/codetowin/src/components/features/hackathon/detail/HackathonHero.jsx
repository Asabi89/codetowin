import React from 'react';

export default function HackathonHero({ registered, setActiveTab, handleOnboardingJoin, hackathon }) {
  if (!hackathon) return null;

  return (
    <>
      {/* Hero Section Banner */}
      <section 
        className="hero relative" 
        id="hero" 
        aria-label="Challenge Identity Banner"
        style={{ 
          backgroundImage: `url(${hackathon.banner || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)',
          backgroundBlendMode: 'overlay',
          color: '#fff'
        }}
      >
        <h1>{hackathon.title}</h1>
      </section>

      {/* Detail Header */}
      <header className="detail-header" aria-label="Hackathon Overview Identity">
        <h2 className="detail-subtitle">{hackathon.theme || "Créez des Agents pour des Défis Réels !"}</h2>
        <p className="detail-description-text">
          {hackathon.description || "C'est l'heure de bricoler des outils qui planifient, agissent et résolvent de vrais problèmes. Soumets ton projet, bosse en équipe et amuse-toi !"}
        </p>
      </header>

      {/* Quick Information Panel */}
      <section className="quick-info-panel-container" aria-label="Hackathon Quick Info Panel Section">
        <div className="quick-info-panel">
          <div className="info-item">
            <span className="info-label">Lieu</span>
            <span className="info-value"><span className="status-highlight">{hackathon.location}</span></span>
          </div>
          <div className="info-item">
            <span className="info-label">Format</span>
            <span className="info-value">{hackathon.online ? 'En ligne' : 'Présentiel'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Fin</span>
            <span className="info-value">{new Date(hackathon.end).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Prix</span>
            <span className="info-value">{hackathon.prize}</span>
          </div>
        </div>
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-start' }}>
          {hackathon.is_registered ? (
            <button type="button" className="btn-primary" onClick={() => {
              setActiveTab('my-project');
              setTimeout(() => {
                const workspace = document.getElementById('workspace-editor-flow') || document.querySelector('.preview-container');
                if (workspace) {
                  workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }}>
              Accéder au hackathon
            </button>
          ) : (
            <button type="button" className="btn-primary" onClick={handleOnboardingJoin}>
              Rejoindre l'hackathon
            </button>
          )}
        </div>
      </section>
    </>
  );
}

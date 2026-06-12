import React from 'react';

export default function HackathonHero({ registered, setActiveTab, handleOnboardingJoin }) {
  return (
    <>
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
    </>
  );
}

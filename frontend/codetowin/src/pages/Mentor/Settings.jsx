import React, { useState } from 'react';
import '../../styles/dashboard.css';

export default function MentorSettings() {
  const [activeTab, setActiveTab] = useState('security');

  return (
    <div className="dashboard-content">
      {/* Topbar */}
      <header className="page-header-row">
        <div>
          <h1 className="page-header-title">Paramètres du Mentor</h1>
        </div>
      </header>

      {/* Main scrollable area */}
      <div className="page-container">
        {/* Tabs Navigation */}
        <div className="tabs-container">
          <nav className="tabs-nav" aria-label="Tabs">
            <button 
              onClick={() => setActiveTab('security')}
              className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            >
              Sécurité
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
            >
              Notifications
            </button>
          </nav>
        </div>

        {/* Tab Content: Sécurité */}
        {activeTab === 'security' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card">
              <div>
                <h2 className="card-title">Changer le mot de passe</h2>
                <p className="card-subtitle">Assurez-vous de choisir un mot de passe robuste.</p>
              </div>

              <form style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ maxWidth: '28rem' }}>
                    <label htmlFor="current-password" className="form-label">Mot de passe actuel</label>
                    <input type="password" id="current-password" className="form-input" />
                  </div>
                  <div style={{ maxWidth: '28rem' }}>
                    <label htmlFor="new-password" className="form-label">Nouveau mot de passe</label>
                    <input type="password" id="new-password" className="form-input" />
                  </div>
                  <div style={{ maxWidth: '28rem' }}>
                    <label htmlFor="confirm-password" className="form-label">Confirmer le nouveau mot de passe</label>
                    <input type="password" id="confirm-password" className="form-input" />
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <button type="button" className="btn btn-primary">Mettre à jour le mot de passe</button>
                </div>
              </form>
            </div>

            {/* Double Authentification */}
            <div className="card">
              <div>
                <h2 className="card-title">Authentification à deux facteurs (A2F)</h2>
                <p className="card-subtitle">Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--slate-100)', paddingTop: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Status A2F</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', marginTop: '0.25rem', marginBottom: 0 }}>L'authentification à deux facteurs est actuellement <span style={{ fontWeight: 600, color: 'var(--slate-900)' }}>désactivée</span>.</p>
                </div>
                <button type="button" className="btn btn-secondary">Activer l'A2F</button>
              </div>
            </div>

            {/* Zone de Danger */}
            <div className="card" style={{ border: '1px solid var(--red-200)', backgroundColor: '#FEF2F2' }}>
              <div>
                <h2 className="card-title" style={{ color: 'var(--red-600)' }}>Zone de Danger</h2>
                <p className="card-subtitle" style={{ color: 'var(--red-500)' }}>Actions irréversibles concernant votre compte et votre organisation.</p>
              </div>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--red-200)', paddingTop: '1.5rem', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Supprimer mon compte</h3>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: 'var(--slate-500)', maxWidth: '42rem', margin: 0 }}>La suppression de votre compte effacera de façon permanente votre profil et votre participation à toutes les équipes de mentorat. Cette action est <span style={{ fontWeight: 700, color: 'var(--slate-700)' }}>définitive et irréversible</span>.</p>
                </div>
                <div>
                  <button type="button" className="btn-danger">Supprimer mon compte</button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab Content: Notifications */}
        {activeTab === 'notifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card">
              <div>
                <h2 className="card-title">Préférences de notifications</h2>
                <p className="card-subtitle">Choisissez les événements pour lesquels vous souhaitez être alerté par e-mail.</p>
              </div>

              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--slate-100)', paddingTop: '1.5rem' }}>
                <div className="form-checkbox-row">
                  <div className="form-checkbox-wrapper">
                    <input id="notif-invitations" type="checkbox" defaultChecked className="form-checkbox-input" />
                  </div>
                  <div className="form-checkbox-content">
                    <label htmlFor="notif-invitations" className="form-checkbox-label">Nouvelles invitations</label>
                    <p className="form-checkbox-hint">Recevoir un e-mail à chaque fois qu'un organisateur vous invite en tant que mentor.</p>
                  </div>
                </div>

                <div className="form-checkbox-row">
                  <div className="form-checkbox-wrapper">
                    <input id="notif-messages" type="checkbox" defaultChecked className="form-checkbox-input" />
                  </div>
                  <div className="form-checkbox-content">
                    <label htmlFor="notif-messages" className="form-checkbox-label">Messages des équipes</label>
                    <p className="form-checkbox-hint">Être alerté lorsqu'un participant de vos équipes assignées vous envoie un message.</p>
                  </div>
                </div>

                <div className="form-checkbox-row">
                  <div className="form-checkbox-wrapper">
                    <input id="notif-weekly" type="checkbox" defaultChecked className="form-checkbox-input" />
                  </div>
                  <div className="form-checkbox-content">
                    <label htmlFor="notif-weekly" className="form-checkbox-label">Récapitulatif hebdomadaire</label>
                    <p className="form-checkbox-hint">Recevoir un résumé des événements clés sur vos hackathons chaque lundi.</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', marginTop: '1.5rem', borderTop: '1px solid var(--slate-100)' }}>
                <button type="button" className="btn btn-primary">Enregistrer les préférences</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

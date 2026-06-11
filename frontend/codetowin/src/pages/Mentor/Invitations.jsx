import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import '../../styles/dashboard.css';

export default function MentorInvitations() {
  return (
    <div className="dashboard-content">
      {/* Topbar */}
      <header className="dashboard-header-row" style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: 'white', padding: '1rem', marginLeft: '-1rem', marginRight: '-1rem', marginTop: '-2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--slate-900)', margin: 0 }}>Mes Invitations</h1>
        </div>
      </header>

      {/* Main scrollable area */}
      <div>
        
        <div style={{ display: 'flex', alignItems: 'center' }} className="sm-flex">
          <style>{`
            @media (min-width: 640px) {
              .sm-flex { flex-direction: row !important; }
            }
          `}</style>
          <div style={{ flex: '1 1 auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--slate-900)', margin: 0 }}>Demandes de mentorat</h2>
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--slate-700)', margin: 0 }}>Ces organisateurs souhaitent que vous accompagniez des équipes lors de leurs hackathons.</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Invitation Card 1 */}
          <div className="card hover-shadow" style={{ padding: 0, overflow: 'hidden', transition: 'box-shadow 0.2s' }}>
            <style>{`.hover-shadow:hover { box-shadow: var(--shadow-md) !important; }`}</style>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="sm-flex-row sm-items-center sm-justify-between">
                <style>{`
                  @media (min-width: 640px) {
                    .sm-flex-row { flex-direction: row !important; }
                    .sm-items-start { align-items: flex-start !important; }
                    .sm-justify-between { justify-content: space-between !important; }
                    .sm-mt-0 { margin-top: 0 !important; }
                  }
                `}</style>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="sm-flex-row sm-items-start">
                  <div style={{ height: '3.5rem', width: '3.5rem', flexShrink: 0, borderRadius: 'var(--border-radius-lg)', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--slate-200)', overflow: 'hidden' }}>
                    <img src="https://ui-avatars.com/api/?name=TechHub+Senegal&background=0F172A&color=fff" alt="Logo" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ marginTop: '1rem' }} className="sm-mt-0">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--slate-900)', margin: 0 }}>AI for Climate Africa 2026</h3>
                      <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: '#EFF6FF', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 500, color: '#1D4ED8', border: '1px solid rgba(29, 78, 216, 0.1)' }}>Nouveau</span>
                    </div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-600)', marginTop: '0.25rem', margin: 0 }}>Organisé par <span style={{ color: 'var(--slate-900)' }}>TechHub Sénégal</span></p>
                    
                    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '1rem', fontSize: '0.875rem', color: 'var(--slate-500)' }} className="sm-grid-cols-2">
                      <style>{`@media (min-width: 640px) { .sm-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }`}</style>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Calendar style={{ marginRight: '0.5rem', height: '1rem', width: '1rem', color: 'var(--slate-400)' }} />
                        12 - 14 Août 2026
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Users style={{ marginRight: '0.5rem', height: '1rem', width: '1rem', color: 'var(--slate-400)' }} />
                        Suivi estimé : 3 équipes
                      </div>
                    </div>

                    <div style={{ marginTop: '1rem', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--border-radius-lg)', padding: '1rem', border: '1px solid var(--slate-200)' }}>
                      <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-700)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', margin: 0 }}>Message de l'organisateur</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', fontStyle: 'italic', margin: 0 }}>"Bonjour Seydou, vu votre expertise en Machine Learning, nous adorerions vous avoir parmi nos mentors pour orienter les équipes qui travaillent sur l'analyse de données satellites. Êtes-vous disponible ?"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--slate-200)' }}>
              <button type="button" className="btn btn-secondary">
                Décliner
              </button>
              <button type="button" className="btn btn-primary">
                Accepter l'invitation
              </button>
            </div>
          </div>

          {/* Invitation Card 2 */}
          <div className="card hover-shadow" style={{ padding: 0, overflow: 'hidden', transition: 'box-shadow 0.2s' }}>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="sm-flex-row sm-items-center sm-justify-between">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="sm-flex-row sm-items-start">
                  <div style={{ height: '3.5rem', width: '3.5rem', flexShrink: 0, borderRadius: 'var(--border-radius-lg)', backgroundColor: 'var(--slate-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--slate-200)', overflow: 'hidden' }}>
                    <img src="https://ui-avatars.com/api/?name=Finbank&background=0F172A&color=fff" alt="Logo" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ marginTop: '1rem' }} className="sm-mt-0">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--slate-900)', margin: 0 }}>Fintech Builders Challenge</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-600)', marginTop: '0.25rem', margin: 0 }}>Organisé par <span style={{ color: 'var(--slate-900)' }}>Banque Atlantique</span></p>
                    
                    <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))', gap: '1rem', fontSize: '0.875rem', color: 'var(--slate-500)' }} className="sm-grid-cols-2">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Calendar style={{ marginRight: '0.5rem', height: '1rem', width: '1rem', color: 'var(--slate-400)' }} />
                        01 - 03 Septembre 2026
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Users style={{ marginRight: '0.5rem', height: '1rem', width: '1rem', color: 'var(--slate-400)' }} />
                        Suivi estimé : 2 équipes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem', borderTop: '1px solid var(--slate-200)' }}>
              <button type="button" className="btn btn-secondary">
                Décliner
              </button>
              <button type="button" className="btn btn-primary">
                Accepter l'invitation
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Download, ChevronRight } from 'lucide-react';
import '../../styles/dashboard.css';

export default function MentorSubmissions() {
  return (
    <div className="dashboard-content">
      {/* Topbar */}
      <header className="dashboard-header-row" style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: 'white', padding: '1rem', marginLeft: '-1rem', marginRight: '-1rem', marginTop: '-2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--slate-900)' }}>Soumissions</span>
        </div>
      </header>

      {/* Main scrollable area */}
      <div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h1 className="dashboard-title">Soumissions par Hackathon</h1>
            <p className="dashboard-subtitle">Sélectionnez un hackathon pour évaluer les projets soumis par vos équipes.</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '20rem' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, paddingLeft: '0.75rem', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
              <Search style={{ height: '1.25rem', width: '1.25rem', color: 'var(--slate-400)' }} />
            </div>
            <input type="text" className="form-input" style={{ paddingLeft: '2.5rem', width: '100%', boxSizing: 'border-box' }} placeholder="Chercher un projet, une équipe..." />
          </div>
          <select className="form-input" style={{ width: '100%', maxWidth: '12rem', paddingRight: '2rem' }}>
            <option>Tous les statuts</option>
            <option>Soumis</option>
            <option>Évalué</option>
          </select>
          <button type="button" className="btn btn-secondary" style={{ marginLeft: 'auto' }}>
            <Download style={{ marginLeft: '-0.25rem', marginRight: '0.5rem', height: '1.25rem', width: '1.25rem', color: 'var(--slate-400)' }} />
            Exporter les notes
          </button>
        </div>

        {/* Grid of Hackathons */}
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          
          {/* Hackathon Card 1 */}
          <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', height: '3rem', width: '3rem', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--border-radius-xl)', backgroundColor: 'var(--brand-100)', color: 'var(--brand-700)' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>AI</span>
                </div>
                <span style={{ display: 'inline-flex', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--green-100)', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.5, color: 'var(--green-800)', border: '1px solid rgba(22, 163, 74, 0.2)' }}>En cours</span>
              </div>
              <Link to="/mentor/hackathons/1" className="group" style={{ textDecoration: 'none' }}>
                <h3 className="group-hover-text-brand-600" style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)', transition: 'color 0.2s' }}>AI for Climate Africa</h3>
              </Link>
              <style>{`.group:hover .group-hover-text-brand-600 { color: var(--brand-600) !important; }`}</style>
              <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: 'var(--slate-500)', margin: 0 }}>Hybride · Dakar</p>
              
              <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem', borderTop: '1px solid var(--slate-100)', paddingTop: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Vos équipes</p>
                  <p style={{ marginTop: '0.25rem', fontSize: '1.125rem', fontWeight: 600, color: 'var(--slate-900)', margin: 0 }}>2</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Soumissions</p>
                  <p style={{ marginTop: '0.25rem', fontSize: '1.125rem', fontWeight: 600, color: 'var(--brand-600)', margin: 0 }}>2 <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--slate-500)' }}>à évaluer</span></p>
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1rem', borderTop: '1px solid var(--slate-200)', display: 'flex', gap: '0.5rem' }}>
              <Link to="/mentor/hackathons/1" className="btn btn-secondary" style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}>
                Détails
              </Link>
              <Link to="/mentor/hackathons/1/submissions" className="btn btn-primary" style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}>
                Soumissions
                <ChevronRight style={{ marginLeft: '0.5rem', marginRight: '-0.25rem', height: '1rem', width: '1rem' }} />
              </Link>
            </div>
          </div>

          {/* Hackathon Card 2 */}
          <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', height: '3rem', width: '3rem', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--border-radius-xl)', backgroundColor: '#DBEAFE', color: '#1D4ED8' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>HT</span>
                </div>
                <span style={{ display: 'inline-flex', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-100)', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.5, color: 'var(--slate-800)', border: '1px solid rgba(100, 116, 139, 0.1)' }}>Terminé</span>
              </div>
              <h3 style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)' }}>HealthTech Dakar 2025</h3>
              <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: 'var(--slate-500)', margin: 0 }}>Présentiel · Dakar</p>
              
              <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1rem', borderTop: '1px solid var(--slate-100)', paddingTop: '1rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Vos équipes</p>
                  <p style={{ marginTop: '0.25rem', fontSize: '1.125rem', fontWeight: 600, color: 'var(--slate-900)', margin: 0 }}>1</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Soumissions</p>
                  <p style={{ marginTop: '0.25rem', fontSize: '1.125rem', fontWeight: 600, color: 'var(--slate-500)', margin: 0 }}>1 <span style={{ fontSize: '0.875rem', fontWeight: 400, color: 'var(--slate-500)' }}>évaluée</span></p>
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1rem', borderTop: '1px solid var(--slate-200)', display: 'flex', gap: '0.5rem' }}>
              <Link to="/mentor/hackathons/2" className="btn btn-secondary" style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}>
                Détails
              </Link>
              <Link to="/mentor/hackathons/2/submissions" className="btn btn-secondary" style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}>
                Consulter les notes
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

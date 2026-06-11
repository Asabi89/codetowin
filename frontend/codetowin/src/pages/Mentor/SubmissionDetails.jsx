import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, ExternalLink, Code, FileText } from 'lucide-react';
import '../../styles/dashboard.css';

export default function MentorSubmissionDetails() {
  const { id } = useParams();

  return (
    <div className="dashboard-content">
      {/* Topbar */}
      <header className="dashboard-header-row" style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: 'white', padding: '1rem', marginLeft: '-1rem', marginRight: '-1rem', marginTop: '-2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/mentor/hackathons/1/submissions" style={{ marginRight: '1rem', color: 'var(--slate-400)', textDecoration: 'none' }} className="hover-text-slate-500">
            <ChevronLeft style={{ height: '1.5rem', width: '1.5rem' }} />
          </Link>
          <style>{`.hover-text-slate-500:hover { color: var(--slate-500) !important; }`}</style>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--slate-900)', margin: 0 }}>Projet : EcoPay Solutions</h1>
        </div>
      </header>

      {/* Main scrollable area */}
      <div>
        
        <div style={{ margin: '0 auto', maxWidth: '56rem' }}>
          
          <div className="card" style={{ padding: 0, marginBottom: '2rem', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--slate-100)', paddingBottom: '1.5rem' }} className="sm-flex-row sm-items-start sm-justify-between">
                <style>{`
                  @media (min-width: 640px) {
                    .sm-flex-row { flex-direction: row !important; }
                    .sm-items-start { align-items: flex-start !important; }
                    .sm-justify-between { justify-content: space-between !important; }
                  }
                `}</style>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--slate-900)', margin: 0 }}>Application EcoTrade App</h2>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-500)', margin: 0 }}>Soumis par <span style={{ fontWeight: 600, color: 'var(--brand-600)' }}>EcoPay Solutions</span> • Fintech Builders Challenge</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-100)', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-600)' }}>React Native</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-100)', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-600)' }}>Node.js</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-100)', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-600)' }}>PostgreSQL</span>
                </div>
              </div>

              {/* Content Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Description */}
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--slate-900)', marginBottom: '0.75rem', marginTop: 0 }}>Description du projet</h3>
                  <div style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                    <p style={{ marginTop: 0, marginBottom: '1rem' }}>
                      EcoTrade App est une plateforme mobile de transfert d'argent et de micro-prêts dédiée aux petits commerçants du secteur informel. 
                      Notre solution permet de tracer les transactions et de bâtir un profil de solvabilité pour des personnes non bancarisées.
                    </p>
                    <p style={{ marginTop: 0, marginBottom: 0 }}>
                      La particularité de notre approche réside dans l'utilisation d'USSD pour les zones sans internet et d'une application mobile moderne pour les zones urbaines.
                    </p>
                  </div>
                </div>

                {/* Links and Resources */}
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--slate-900)', marginBottom: '0.75rem', marginTop: 0 }}>Liens et Ressources</h3>
                  <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' }} className="sm-grid-cols-2">
                    <style>{`@media (min-width: 640px) { .sm-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }`}</style>
                    <a href="#" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--slate-200)', padding: '1rem', textDecoration: 'none', transition: 'background-color 0.2s' }} className="hover-bg-slate-50">
                      <Code style={{ height: '1.5rem', width: '1.5rem', color: 'var(--slate-600)' }} />
                      <div style={{ marginLeft: '0.75rem' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Dépôt GitHub</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--brand-600)', marginTop: '0.125rem', marginBottom: 0 }}>github.com/ecopay/app-v1</p>
                      </div>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--slate-200)', padding: '1rem', textDecoration: 'none', transition: 'background-color 0.2s' }} className="hover-bg-slate-50">
                      <ExternalLink style={{ height: '2rem', width: '2rem', color: '#2563EB' }} />
                      <div style={{ marginLeft: '0.75rem' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Vidéo de démo</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--brand-600)', marginTop: '0.125rem', marginBottom: 0 }}>youtu.be/dQw4w9WgXcQ</p>
                      </div>
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--slate-200)', padding: '1rem', textDecoration: 'none', transition: 'background-color 0.2s' }} className="hover-bg-slate-50">
                      <FileText style={{ height: '2rem', width: '2rem', color: '#F59E0B' }} />
                      <div style={{ marginLeft: '0.75rem' }}>
                        <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Lien du prototype</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--brand-600)', marginTop: '0.125rem', marginBottom: 0 }}>figma.com/file/.../ecotrade</p>
                      </div>
                    </a>
                  </div>
                  <style>{`.hover-bg-slate-50:hover { background-color: var(--slate-50) !important; }`}</style>
                </div>

                {/* Screenshots / Documents */}
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--slate-900)', marginBottom: '0.75rem', marginTop: 0 }}>Captures d'écran</h3>
                  <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }} className="md-grid-cols-3">
                    <style>{`@media (min-width: 768px) { .md-grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; } }`}</style>
                    <img src="https://placehold.co/400x300/e2e8f0/64748b?text=App+Login" alt="Capture d'écran 1" style={{ borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--slate-200)', objectFit: 'cover', width: '100%', height: '8rem', cursor: 'pointer' }} className="hover-opacity-90" />
                    <img src="https://placehold.co/400x300/e2e8f0/64748b?text=Dashboard" alt="Capture d'écran 2" style={{ borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--slate-200)', objectFit: 'cover', width: '100%', height: '8rem', cursor: 'pointer' }} className="hover-opacity-90" />
                    <img src="https://placehold.co/400x300/e2e8f0/64748b?text=Transfert" alt="Capture d'écran 3" style={{ borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--slate-200)', objectFit: 'cover', width: '100%', height: '8rem', cursor: 'pointer' }} className="hover-opacity-90" />
                  </div>
                  <style>{`.hover-opacity-90:hover { opacity: 0.9 !important; }`}</style>
                </div>

              </div>

            </div>
            
            {/* Bottom Action Bar */}
            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1rem 1.5rem', borderTop: '1px solid var(--slate-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
                Soumis le 15 Juin 2026 à 23:45
              </span>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link to="/mentor/teams/1/feedback" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                  Passer à l'évaluation
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Download, ChevronLeft, ExternalLink, Code } from 'lucide-react';
import '../../styles/dashboard.css';

export default function MentorHackathonSubmissions() {
  const { id } = useParams();

  return (
    <div className="dashboard-content">
      {/* Topbar */}
      <header className="dashboard-header-row" style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: 'white', padding: '1rem', marginLeft: '-1rem', marginRight: '-1rem', marginTop: '-2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <Link to="/mentor/submissions" style={{ fontWeight: 500, color: 'var(--slate-500)', textDecoration: 'none' }} className="hover-text-slate-900">Soumissions</Link>
          <span style={{ color: 'var(--slate-400)' }}>/</span>
          <span style={{ fontWeight: 500, color: 'var(--slate-900)' }}>AI for Climate Africa</span>
        </div>
      </header>
      <style>{`.hover-text-slate-900:hover { color: var(--slate-900) !important; }`}</style>

      {/* Main scrollable area */}
      <div>
        
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/mentor/submissions" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-500)', textDecoration: 'none' }} className="hover-text-slate-700">
            <ChevronLeft style={{ marginRight: '0.25rem', height: '1rem', width: '1rem' }} />
            Retour aux hackathons
          </Link>
        </div>
        <style>{`.hover-text-slate-700:hover { color: var(--slate-700) !important; }`}</style>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h1 className="dashboard-title">Soumissions (12)</h1>
            <p className="dashboard-subtitle">Évaluez les projets soumis par les équipes.</p>
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

        {/* Grid of Submissions */}
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          
          {/* Submission Card 1 */}
          <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-md)', backgroundColor: 'var(--slate-100)', padding: '0.125rem 0.625rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-800)' }}>Équipe : AgriTech Innovators</span>
                <span style={{ display: 'inline-flex', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--blue-100)', padding: '0 0.5rem', fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.5, color: 'var(--blue-800)' }}>Soumis</span>
              </div>
              <h3 style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)' }}>AgriSense</h3>
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--slate-500)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                AgriSense est une plateforme IoT complète permettant aux petits agriculteurs de surveiller l'humidité du sol et de prédire les besoins en eau grâce à des modèles de machine learning locaux, réduisant la consommation d'eau de 30%.
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-100)', padding: '0.125rem 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-600)' }}>Python</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-100)', padding: '0.125rem 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-600)' }}>React</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-100)', padding: '0.125rem 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-600)' }}>IoT</span>
              </div>
              
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--slate-100)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--slate-500)' }}>GitHub:</span>
                  <a href="#" style={{ fontWeight: 500, color: 'var(--brand-600)', display: 'flex', alignItems: 'center', textDecoration: 'none' }} className="hover-text-brand-800">
                    Voir le repo
                    <ExternalLink style={{ marginLeft: '0.25rem', height: '1rem', width: '1rem' }} />
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--slate-500)' }}>Démo:</span>
                  <a href="#" style={{ fontWeight: 500, color: 'var(--brand-600)', display: 'flex', alignItems: 'center', textDecoration: 'none' }} className="hover-text-brand-800">
                    Voir la vidéo
                    <ExternalLink style={{ marginLeft: '0.25rem', height: '1rem', width: '1rem' }} />
                  </a>
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'var(--slate-50)', padding: '1rem 1.5rem', borderTop: '1px solid var(--slate-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Score Actuel</span>
                  <div style={{ marginTop: '0.25rem', fontSize: '1.5rem', fontWeight: 700, color: 'var(--slate-900)' }}>-- <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-500)' }}>/ 40</span></div>
                </div>
                <Link to="/mentor/submissions/1" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                  Détails
                </Link>
              </div>
            </div>
            <style>{`.hover-text-brand-800:hover { color: var(--brand-800) !important; }`}</style>
          </div>

          {/* Submission Card 2 */}
          <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid var(--brand-500)', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 0 0 1px var(--brand-500)' }}>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-md)', backgroundColor: 'var(--slate-100)', padding: '0.125rem 0.625rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-800)' }}>Équipe : CodeMakers</span>
                <span style={{ display: 'inline-flex', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--green-100)', padding: '0 0.5rem', fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.5, color: 'var(--green-800)' }}>Évalué</span>
              </div>
              <h3 style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)' }}>EcoTrade App</h3>
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--slate-500)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                Une place de marché mobile permettant d'échanger des crédits carbone générés par des initiatives de reboisement locales. Application construite en React Native avec backend Node.js.
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-100)', padding: '0.125rem 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-600)' }}>React Native</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-100)', padding: '0.125rem 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-600)' }}>Node.js</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-100)', padding: '0.125rem 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-600)' }}>MongoDB</span>
              </div>
              
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--slate-100)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--slate-500)' }}>GitHub:</span>
                  <a href="#" style={{ fontWeight: 500, color: 'var(--brand-600)', display: 'flex', alignItems: 'center', textDecoration: 'none' }} className="hover-text-brand-800">
                    Voir le repo
                    <ExternalLink style={{ marginLeft: '0.25rem', height: '1rem', width: '1rem' }} />
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--slate-500)' }}>Démo:</span>
                  <a href="#" style={{ fontWeight: 500, color: 'var(--brand-600)', display: 'flex', alignItems: 'center', textDecoration: 'none' }} className="hover-text-brand-800">
                    Lien direct
                    <ExternalLink style={{ marginLeft: '0.25rem', height: '1rem', width: '1rem' }} />
                  </a>
                </div>
              </div>
            </div>
            
            <div style={{ backgroundColor: 'var(--brand-50)', padding: '1rem 1.5rem', borderTop: '1px solid var(--brand-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--brand-700)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Score Actuel</span>
                  <div style={{ marginTop: '0.25rem', fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand-900)' }}>34 <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--brand-700)' }}>/ 40</span></div>
                </div>
                <Link to="/mentor/submissions/2" style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--brand-300)', backgroundColor: 'white', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--brand-700)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)' }} className="hover-bg-brand-50">
                  Détails
                </Link>
              </div>
            </div>
            <style>{`.hover-bg-brand-50:hover { background-color: var(--brand-50) !important; }`}</style>
          </div>

        </div>

      </div>
    </div>
  );
}

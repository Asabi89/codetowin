import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Info } from 'lucide-react';
import '../../styles/dashboard.css';

export default function MentorTeamFeedback() {
  const { id } = useParams();
  const [problemScore, setProblemScore] = useState(5);
  const [techScore, setTechScore] = useState(5);
  const [designScore, setDesignScore] = useState(5);

  return (
    <div className="dashboard-content">
      {/* Topbar */}
      <header className="dashboard-header-row" style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: 'white', padding: '1rem', marginLeft: '-1rem', marginRight: '-1rem', marginTop: '-2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to={`/mentor/teams/${id}`} style={{ marginRight: '1rem', color: 'var(--slate-400)', textDecoration: 'none' }} className="hover-text-slate-500">
            <ChevronLeft style={{ height: '1.5rem', width: '1.5rem' }} />
          </Link>
          <style>{`.hover-text-slate-500:hover { color: var(--slate-500) !important; }`}</style>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--slate-900)', margin: 0 }}>Évaluation : EcoPay Solutions</h1>
        </div>
      </header>

      {/* Main scrollable area */}
      <div>
        
        <div style={{ margin: '0 auto', maxWidth: '48rem' }}>
          {/* Team Header */}
          <div className="card" style={{ padding: 0, marginBottom: '1.5rem', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--slate-900)', margin: 0 }}>EcoPay Solutions</h2>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-500)', marginTop: '0.25rem', marginBottom: 0 }}>Projet pour le Fintech Builders Challenge</p>
                </div>
                <div style={{ display: 'flex' }}>
                  <img src="https://ui-avatars.com/api/?name=Omar+Fall&background=0284c7&color=fff" alt="" style={{ display: 'inline-block', height: '2.5rem', width: '2.5rem', borderRadius: 'var(--border-radius-full)', border: '2px solid white', marginLeft: 0 }} />
                  <img src="https://ui-avatars.com/api/?name=Awa+Diop&background=c026d3&color=fff" alt="" style={{ display: 'inline-block', height: '2.5rem', width: '2.5rem', borderRadius: 'var(--border-radius-full)', border: '2px solid white', marginLeft: '-0.5rem' }} />
                  <div style={{ display: 'flex', height: '2.5rem', width: '2.5rem', alignItems: 'center', justifyItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-100)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-500)', border: '2px solid white', marginLeft: '-0.5rem', justifyContent: 'center' }}>+2</div>
                </div>
              </div>
            </div>
          </div>

          <form action="#" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Grading Sliders */}
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--slate-900)', borderBottom: '1px solid var(--slate-200)', paddingBottom: '1rem', marginBottom: '1.5rem', marginTop: 0 }}>Critères d'évaluation</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Problem Clarity Score */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label htmlFor="problem-score" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)' }}>Clarté du problème & Pertinence</label>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.125rem 0.625rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--brand-100)', color: 'var(--brand-800)', fontWeight: 700, fontSize: '0.875rem' }}>{problemScore} / 10</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginBottom: '0.75rem', marginTop: 0 }}>L'équipe a-t-elle bien identifié un vrai problème et sa solution est-elle pertinente ?</p>
                  <input 
                    type="range" 
                    id="problem-score" 
                    name="problem-score" 
                    min="0" 
                    max="10" 
                    value={problemScore}
                    onChange={(e) => setProblemScore(e.target.value)}
                    style={{ width: '100%', height: '0.5rem', backgroundColor: 'var(--slate-200)', borderRadius: 'var(--border-radius-lg)', appearance: 'none', cursor: 'pointer', accentColor: 'var(--brand-600)' }} 
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '0.25rem' }}>
                    <span>Médiocre (0)</span>
                    <span>Excellent (10)</span>
                  </div>
                </div>

                {/* Technical Execution Score */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label htmlFor="tech-score" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)' }}>Exécution technique</label>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.125rem 0.625rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--brand-100)', color: 'var(--brand-800)', fontWeight: 700, fontSize: '0.875rem' }}>{techScore} / 10</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginBottom: '0.75rem', marginTop: 0 }}>La qualité du code, l'architecture, et le fonctionnement réel du prototype.</p>
                  <input 
                    type="range" 
                    id="tech-score" 
                    name="tech-score" 
                    min="0" 
                    max="10" 
                    value={techScore}
                    onChange={(e) => setTechScore(e.target.value)}
                    style={{ width: '100%', height: '0.5rem', backgroundColor: 'var(--slate-200)', borderRadius: 'var(--border-radius-lg)', appearance: 'none', cursor: 'pointer', accentColor: 'var(--brand-600)' }} 
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '0.25rem' }}>
                    <span>Médiocre (0)</span>
                    <span>Excellent (10)</span>
                  </div>
                </div>

                {/* Design Score */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label htmlFor="design-score" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)' }}>Design et Expérience Utilisateur (UX/UI)</label>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '0.125rem 0.625rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--brand-100)', color: 'var(--brand-800)', fontWeight: 700, fontSize: '0.875rem' }}>{designScore} / 10</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginBottom: '0.75rem', marginTop: 0 }}>Est-ce que l'interface est intuitive et agréable à utiliser ?</p>
                  <input 
                    type="range" 
                    id="design-score" 
                    name="design-score" 
                    min="0" 
                    max="10" 
                    value={designScore}
                    onChange={(e) => setDesignScore(e.target.value)}
                    style={{ width: '100%', height: '0.5rem', backgroundColor: 'var(--slate-200)', borderRadius: 'var(--border-radius-lg)', appearance: 'none', cursor: 'pointer', accentColor: 'var(--brand-600)' }} 
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--slate-400)', marginTop: '0.25rem' }}>
                    <span>Médiocre (0)</span>
                    <span>Excellent (10)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes and Comments */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div>
                <label htmlFor="public-comment" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', marginBottom: '0.25rem' }}>Commentaires (Public)</label>
                <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginBottom: '0.5rem', marginTop: 0 }}>Ces commentaires seront visibles par l'équipe pour les aider à s'améliorer.</p>
                <textarea id="public-comment" name="public-comment" rows="4" className="form-input" style={{ display: 'block', width: '100%', boxSizing: 'border-box' }} placeholder="Quels sont les points forts du projet ? Que pourraient-ils améliorer ?"></textarea>
              </div>

              <div>
                <label htmlFor="private-note" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', marginBottom: '0.25rem' }}>Notes privées (Jury & Organisateurs)</label>
                <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginBottom: '0.5rem', marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Info style={{ height: '1rem', width: '1rem', color: 'var(--slate-400)' }} />
                  Uniquement visibles par le comité d'organisation.
                </p>
                <textarea id="private-note" name="private-note" rows="3" className="form-input" style={{ display: 'block', width: '100%', boxSizing: 'border-box', backgroundColor: 'var(--slate-50)' }} placeholder="Informations confidentielles, doutes sur la faisabilité, ou raisons justifiant votre notation globale..."></textarea>
              </div>

            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem' }}>
              <button type="button" className="btn btn-secondary">
                Enregistrer le brouillon
              </button>
              <button type="button" className="btn btn-primary">
                Soumettre l'évaluation
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

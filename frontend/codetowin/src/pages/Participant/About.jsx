import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Breadcrumbs / Section Label */}
        <span style={{
          color: '#047857',
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: '0.875rem',
          letterSpacing: '0.05em'
        }}>
          Qui Sommes-Nous
        </span>
        
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          color: '#0f172a',
          marginTop: '0.5rem',
          marginBottom: '2rem'
        }}>
          À Propos de CodeToWin
        </h1>

        {/* Hero Image Section */}
        <div style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '3rem',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=600&q=80" 
            alt="Collaborative Tech Team" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(15,23,42,0.95), transparent)',
            padding: '2rem',
            color: '#fff'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
              Propulser la prochaine génération de talents tech en Afrique.
            </h3>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: '#334155', lineHeight: 1.7, fontSize: '1.05rem' }}>
          
          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
              Notre Mission
            </h2>
            <p>
              CodeToWin est né d'une conviction simple : l'Afrique regorge de talents exceptionnels qui n'attendent qu'une opportunité pour briller. Notre plateforme connecte ces talents aux meilleurs organisateurs de hackathons, mentors d'industrie et recruteurs pour transformer des idées novatrices en solutions concrètes.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
              Le Problème que nous résolvons
            </h2>
            <p>
              Trop souvent, les hackathons se terminent sans réelle suite. Les participants se retrouvent avec des projets inachevés, et les recruteurs peinent à vérifier les compétences réelles des candidats. CodeToWin introduit les <strong>certifications de compétences vérifiables</strong> et un <strong>réseau public de talents (Public Talent Network)</strong>. Chaque projet soumis et chaque rôle tenu (gagnant, finaliste, mentor) fait l'objet d'un certificat unique vérifiable par un QR code.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
              Nos Valeurs
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              marginTop: '1rem'
            }}>
              <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontWeight: 700, color: '#047857', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ⭐ Excellence
                </h4>
                <p style={{ fontSize: '0.925rem', margin: 0 }}>
                  Nous encourageons le dépassement de soi et le développement continu à travers des défis techniques de haut niveau.
                </p>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontWeight: 700, color: '#047857', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🤝 Collaboration
                </h4>
                <p style={{ fontSize: '0.925rem', margin: 0 }}>
                  Le travail en équipe multidisciplinaire et l'échange de connaissances avec des mentors d'expérience sont au cœur de notre vision.
                </p>
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ fontWeight: 700, color: '#047857', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🛡️ Transparence
                </h4>
                <p style={{ fontSize: '0.925rem', margin: 0 }}>
                  Grâce à notre registre de certificats infalsifiables, nous offrons des garanties solides et vérifiables aux recruteurs.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action Banner */}
          <div style={{
            backgroundColor: '#0f172a',
            padding: '2.5rem',
            borderRadius: '12px',
            color: '#fff',
            marginTop: '2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Prêt à rejoindre l'aventure ?</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '500px', margin: 0 }}>
              Rejoignez des milliers de développeurs et de designers africains, participez à des projets stimulants et booster votre carrière professionnelle.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <Link to="/signup" style={{
                backgroundColor: '#047857',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background-color 150ms'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#065f46'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#047857'}
              >
                S'inscrire
              </Link>
              <Link to="/hackathons" style={{
                backgroundColor: 'transparent',
                color: '#fff',
                border: '1px solid #475569',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'border-color 150ms'
              }}
              onMouseOver={(e) => e.target.style.borderColor = '#94a3b8'}
              onMouseOut={(e) => e.target.style.borderColor = '#475569'}
              >
                Explorer
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockTalentsDetails } from '../../mockdata/talents';


export default function TalentProfile() {
  const { id } = useParams();
  const talent = mockTalentsDetails[id] || mockTalentsDetails['seydou-kane'];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Navigation Link back */}
        <Link to="/talents" style={{
          color: '#047857',
          fontWeight: 600,
          textDecoration: 'none',
          fontSize: '0.925rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          alignSelf: 'flex-start'
        }}>
          <span>←</span> Retour au réseau des talents
        </Link>

        {/* Profile Header Card */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.03)',
          padding: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {/* Avatar */}
          <img
            src={talent.avatar}
            alt={talent.fullName}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #f1f5f9'
            }}
          />

          {/* Core Info */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {talent.fullName}
              </h1>
              {/* Availability Badge */}
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: talent.available ? '#047857' : '#64748b',
                backgroundColor: talent.available ? '#ecfdf5' : '#f1f5f9',
                padding: '0.25rem 0.65rem',
                borderRadius: '100px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: talent.available ? '#10b981' : '#94a3b8'
                }} />
                {talent.available ? 'Disponible pour opportunités' : 'Indisponible'}
              </span>
            </div>
            
            <p style={{ fontSize: '1.15rem', color: '#475569', fontWeight: 500, margin: 0 }}>
              {talent.title}
            </p>
            
            <div style={{ fontSize: '0.95rem', color: '#64748b' }}>
              📍 {talent.city}, {talent.country}
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <a href={talent.github} target="_blank" rel="noopener noreferrer" style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                🐱 GitHub
              </a>
              <a href={talent.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                🔗 LinkedIn
              </a>
              <a href={talent.website} target="_blank" rel="noopener noreferrer" style={{ color: '#047857', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                🌐 Site web
              </a>
            </div>
          </div>
        </div>

        {/* Bio & Skills Split */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Bio */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '0.75rem' }}>
              Biographie
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>
              {talent.bio}
            </p>
          </div>

          {/* Skills */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '1rem' }}>
              Compétences Techniques
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {talent.skills.map(skill => (
                <span
                  key={skill}
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    backgroundColor: '#ecfdf5',
                    color: '#047857',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '6px'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hackathons / Certifications Timeline */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '1.5rem' }}>
            Historique de Hackathons & Certifications
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {talent.hackathons.map((h, index) => (
              <div
                key={h.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  paddingBottom: index !== talent.hackathons.length - 1 ? '1.5rem' : 0,
                  borderBottom: index !== talent.hackathons.length - 1 ? '1px solid #f1f5f9' : 'none'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    {h.title}
                  </h4>
                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                    <span>🏷️ Rôle: <strong>{h.role}</strong></span>
                    <span>🚀 Projet: <strong>{h.project}</strong></span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                  <Link
                    to={`/certificates/verify?code=${h.certificateCode}`}
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: '#047857',
                      backgroundColor: '#ecfdf5',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <span>📜 Certificat Vérifié</span>
                  </Link>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Code: {h.certificateCode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

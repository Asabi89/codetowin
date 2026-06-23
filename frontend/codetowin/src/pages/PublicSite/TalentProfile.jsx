import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockTalentsDetails } from '../../mockdata/talents';
import useAuth from '../../hooks/useAuth';
import { usersApi } from '../../api/users';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  canViewFullProfile,
  canViewSensitiveProfileInfo,
  getVisibilityLabel,
  isProfileDiscoverable,
} from '../../services/profileVisibility';

const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
};

export default function TalentProfile({ embedded = false, showBackLink = true }) {
  const { id } = useParams();
  const { registered, role } = useAuth();
  
  const [talent, setTalent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTalent = async () => {
      setLoading(true);
      try {
        const response = await usersApi.getUserById(id || '1');
        const user = response.data || response;
        
        // Enrich with mock details for the frontend simulation if needed
        const enrichedTalent = {
          ...user,
          ...(mockTalentsDetails[user.id] || {}),
          hackathons: mockTalentsDetails[user.id]?.hackathons || [],
          bio: mockTalentsDetails[user.id]?.bio || 'Ce talent partage une identité publique minimale. Les détails complets dépendent de ses paramètres de visibilité.',
        };
        
        setTalent(enrichedTalent);
      } catch (error) {
        console.error("Failed to load talent:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTalent();
  }, [id]);

  const viewer = { registered, role, embedded };
  const canViewFull = talent ? canViewFullProfile(talent, viewer) : false;
  const canViewSensitive = talent ? canViewSensitiveProfileInfo(talent, viewer) : false;

  if (loading) {
    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: embedded ? 'auto' : '100vh', padding: embedded ? '1.5rem 0 0' : '4rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem 0' }}>
          <LoadingSpinner message="Chargement du profil..." />
        </div>
      </div>
    );
  }

  if (!talent) {
    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: embedded ? 'auto' : '100vh', padding: embedded ? '1.5rem 0 0' : '4rem 1.5rem' }}>
        <div style={{ ...cardStyle, maxWidth: '720px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Talent introuvable</h1>
          <p style={{ color: '#64748b', marginTop: '0.75rem' }}>
            Ce profil n'existe pas ou a été supprimé.
          </p>
          <Link to="/talents" style={{ display: 'inline-flex', marginTop: '1.25rem', color: '#047857', fontWeight: 700, textDecoration: 'none' }}>
            Retour au réseau
          </Link>
        </div>
      </div>
    );
  }

  if (!isProfileDiscoverable(talent) && !canViewFull) {
    return (
      <div style={{ backgroundColor: '#f8fafc', minHeight: embedded ? 'auto' : '100vh', padding: embedded ? '1.5rem 0 0' : '4rem 1.5rem' }}>
        <div style={{ ...cardStyle, maxWidth: '720px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Profil privé</h1>
          <p style={{ color: '#64748b', marginTop: '0.75rem' }}>
            Ce talent a choisi de ne pas rendre son profil visible publiquement.
          </p>
          <Link to="/talents" style={{ display: 'inline-flex', marginTop: '1.25rem', color: '#047857', fontWeight: 700, textDecoration: 'none' }}>
            Retour au réseau
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: embedded ? 'auto' : '100vh', padding: embedded ? '1.5rem 0 0' : '4rem 1.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {showBackLink && (
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
        )}

        <div style={{
          ...cardStyle,
          padding: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          alignItems: 'center'
        }}>
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

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {talent.fullName}
              </h1>
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
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: talent.visibility === 'members' ? '#0369a1' : '#047857',
                backgroundColor: talent.visibility === 'members' ? '#e0f2fe' : '#ecfdf5',
                padding: '0.25rem 0.65rem',
                borderRadius: '100px'
              }}>
                {getVisibilityLabel(talent)}
              </span>
            </div>

            <p style={{ fontSize: '1.15rem', color: '#475569', fontWeight: 500, margin: 0 }}>
              {talent.title}
            </p>

            <div style={{ fontSize: '0.95rem', color: '#64748b' }}>
              📍 {talent.city}, {talent.country}
            </div>

            {canViewSensitive && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                {talent.github && (
                  <a href={talent.github} target="_blank" rel="noopener noreferrer" style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    🐱 GitHub
                  </a>
                )}
                {talent.linkedin && (
                  <a href={talent.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    🔗 LinkedIn
                  </a>
                )}
                {talent.website && (
                  <a href={talent.website} target="_blank" rel="noopener noreferrer" style={{ color: '#047857', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    🌐 Site web
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {!canViewFull && (
          <div style={{
            backgroundColor: '#fffbeb',
            borderRadius: '12px',
            border: '1px solid #fde68a',
            padding: '1.25rem',
            color: '#92400e'
          }}>
            <strong>Profil complet réservé aux membres connectés.</strong>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.925rem' }}>
              Vous voyez l’identité publique. Connectez-vous ou ouvrez ce profil depuis un dashboard autorisé pour accéder aux détails.
            </p>
          </div>
        )}

        {canViewFull && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{ ...cardStyle, padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '0.75rem' }}>
                Biographie
              </h3>
              <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>
                {talent.bio}
              </p>
            </div>

            <div style={{ ...cardStyle, padding: '2rem' }}>
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
        )}

        {canViewFull && talent.portfolio && talent.portfolio.length > 0 && (
          <div style={{ ...cardStyle, padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '1.5rem' }}>
              Portfolio des Projets
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {talent.portfolio.map(project => (
                <div key={project.id} style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff' }}>
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#047857', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {project.hackathon}
                    </div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem 0' }}>{project.title}</h4>
                    <p style={{ fontSize: '0.95rem', color: '#475569', margin: '0 0 1.25rem 0', lineHeight: 1.6, flex: 1 }}>{project.description}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      {project.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', backgroundColor: '#f1f5f9', color: '#475569', borderRadius: '6px', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                    <Link to={project.link} style={{ display: 'block', textAlign: 'center', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', padding: '0.65rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s' }}>
                      Découvrir le projet →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {canViewFull && talent.hackathons.length > 0 && (
          <div style={{ ...cardStyle, padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '1.5rem' }}>
              Historique de Hackathons & Certifications
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {talent.hackathons.map((hackathon, index) => (
                <div
                  key={hackathon.id}
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
                      {hackathon.title}
                    </h4>
                    <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                      <span>🏷️ Rôle: <strong>{hackathon.role}</strong></span>
                      <span>🚀 Projet: <strong>{hackathon.project}</strong></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <Link
                      to={`/certificates/verify?code=${hackathon.certificateCode}`}
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
                      Code: {hackathon.certificateCode}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

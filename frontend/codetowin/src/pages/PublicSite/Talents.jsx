import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTalents } from '../../mockdata/talents';
import useAuth from '../../hooks/useAuth';
import { getVisibilityLabel, isProfileDiscoverable } from '../../services/profileVisibility';

export default function Talents() {
  const navigate = useNavigate();
  const { registered, role } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const discoverableTalents = mockTalents.filter(isProfileDiscoverable);

  // Extract all unique countries and skills for filter options
  const countries = ['all', ...new Set(discoverableTalents.map(t => t.country))];
  const allSkills = ['all', ...new Set(discoverableTalents.flatMap(t => t.skills))];

  const filteredTalents = discoverableTalents.filter(t => {
    const matchesSearch = t.fullName.toLowerCase().includes(search.toLowerCase()) || 
                          t.title.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || t.country === selectedCountry;
    const matchesSkill = selectedSkill === 'all' || t.skills.includes(selectedSkill);
    const matchesAvailability = !onlyAvailable || t.available;

    return matchesSearch && matchesCountry && matchesSkill && matchesAvailability;
  });
  const profileBasePath = registered && ['participant', 'mentor', 'organizer'].includes(role)
    ? `/${role}/public/talents`
    : '/talents';

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '3rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Title */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Réseau Public de Talents
          </h1>
          <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '0.5rem', margin: 0 }}>
            Découvrez et collaborez avec les meilleurs talents de la tech africaine, certifiés par leurs participations à des hackathons.
          </p>
        </div>

        {/* Filters Panel */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          padding: '1.5rem',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          alignItems: 'center'
        }}>
          {/* Search bar */}
          <div style={{ flex: 1, minWidth: '240px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Rechercher</label>
            <input
              type="text"
              placeholder="Nom ou titre de poste..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Country Filter */}
          <div style={{ minWidth: '160px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Pays</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                backgroundColor: '#fff',
                outline: 'none'
              }}
            >
              <option value="all">Tous les pays</option>
              {countries.filter(c => c !== 'all').map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* Skill Filter */}
          <div style={{ minWidth: '160px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.4rem' }}>Compétence</label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                backgroundColor: '#fff',
                outline: 'none'
              }}
            >
              <option value="all">Toutes les compétences</option>
              {allSkills.filter(s => s !== 'all').map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          {/* Availability Switch */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-end', height: '40px' }}>
            <input
              type="checkbox"
              id="availability"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              style={{ width: '16px', height: '16px', cursor: 'pointer' }}
            />
            <label htmlFor="availability" style={{ fontSize: '0.925rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
              Disponible pour projets
            </label>
          </div>
        </div>

        {/* Talents Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredTalents.map(talent => (
            <div
              key={talent.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)',
                position: 'relative'
              }}
            >
              {/* Availability Indicator Badge */}
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: talent.available ? '#047857' : '#64748b',
                backgroundColor: talent.available ? '#ecfdf5' : '#f1f5f9',
                padding: '0.25rem 0.5rem',
                borderRadius: '100px'
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: talent.available ? '#10b981' : '#94a3b8',
                  display: 'inline-block'
                }} />
                {talent.available ? 'Disponible' : 'Indisponible'}
              </div>

              <div style={{
                position: 'absolute',
                top: '3.3rem',
                right: '1.25rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: talent.visibility === 'members' ? '#0369a1' : '#047857',
                backgroundColor: talent.visibility === 'members' ? '#e0f2fe' : '#ecfdf5',
                padding: '0.2rem 0.5rem',
                borderRadius: '100px'
              }}>
                {getVisibilityLabel(talent)}
              </div>

              {/* Avatar & Basic Info */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img
                  src={talent.avatar}
                  alt={talent.fullName}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid #e2e8f0'
                  }}
                />
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                    {talent.fullName}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
                    📍 {talent.city}, {talent.country}
                  </div>
                </div>
              </div>

              {/* Professional Title */}
              <p style={{ fontSize: '0.925rem', color: '#475569', fontWeight: 500, margin: 0 }}>
                {talent.title}
              </p>

              {/* Skills Row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {talent.skills.map(skill => (
                  <span
                    key={skill}
                    style={{
                      fontSize: '0.775rem',
                      fontWeight: 600,
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Stats block */}
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
                  <span>🏆 <strong>{talent.wins}</strong> victoires</span>
                  <span>📜 <strong>{talent.certificatesCount}</strong> certifs</span>
                </div>

                {/* View profile button */}
                <button
                  onClick={() => navigate(`${profileBasePath}/${talent.id}`)}
                  style={{
                    backgroundColor: '#047857',
                    color: '#fff',
                    border: 'none',
                    padding: '0.45rem 1rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'background-color 150ms'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#065f46'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#047857'}
                >
                  Voir Profil
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredTalents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#64748b' }}>
            <span style={{ fontSize: '2rem' }}>🔍</span>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginTop: '1rem' }}>Aucun talent trouvé</h3>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>Modifiez vos critères de recherche ou vos filtres pour obtenir des résultats.</p>
          </div>
        )}

      </div>
    </div>
  );
}

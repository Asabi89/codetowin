import React, { useState } from 'react';
import { mockCertificates } from '../../mockdata/certificates';

export default function CertificateVerification() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setSearched(false);

    // Simulate short network delay
    setTimeout(() => {
      const upperCode = code.trim().toUpperCase();
      const certificate = mockCertificates[upperCode];
      
      if (certificate) {
        setResult(certificate);
      } else {
        setResult(null);
      }
      setLoading(false);
      setSearched(true);
    }, 800);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '650px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ color: '#047857', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.825rem', letterSpacing: '0.05em' }}>
            Vérification Officielle
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem', marginBottom: '0.5rem' }}>
            Vérification de Certificat
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.975rem', maxWidth: '480px', margin: '0 auto' }}>
            Saisissez le code unique d'identification du certificat figurant au bas du document PDF ou du code QR.
          </p>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleVerify} style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
          padding: '1.75rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ex: VALID-PARTICIPANT-101 ou REVOKED-404"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#0f172a',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'background-color 150ms',
              opacity: loading ? 0.7 : 1,
              whiteSpace: 'nowrap'
            }}
            onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#1e293b')}
            onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#0f172a')}
          >
            {loading ? 'Vérification...' : 'Vérifier'}
          </button>
        </form>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{
              display: 'inline-block',
              width: '24px',
              height: '24px',
              border: '3px solid rgba(15,23,42,0.1)',
              borderTopColor: '#047857',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '0.5rem' }}>Recherche dans la base de données de CodeToWin...</p>
          </div>
        )}

        {/* Verification Result */}
        {searched && !loading && (
          <div>
            {result ? (
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: result.status === 'valid' ? '1px solid #10b981' : '1px solid #f87171',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                overflow: 'hidden'
              }}>
                {/* Result Header Banner */}
                <div style={{
                  backgroundColor: result.status === 'valid' ? '#ecfdf5' : '#fef2f2',
                  padding: '1.25rem 1.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: result.status === 'valid' ? '1px solid #d1fae5' : '1px solid #fee2e2'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      color: result.status === 'valid' ? '#10b981' : '#ef4444',
                      fontSize: '1.25rem',
                      fontWeight: 800
                    }}>
                      {result.status === 'valid' ? '✓' : '⚠️'}
                    </span>
                    <span style={{
                      fontWeight: 700,
                      color: result.status === 'valid' ? '#065f46' : '#991b1b',
                      fontSize: '1.05rem'
                    }}>
                      {result.status === 'valid' ? 'Certificat Authentique & Valide' : 'Certificat Révoqué'}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '0.8rem',
                    color: '#64748b',
                    fontWeight: 500,
                    backgroundColor: '#f1f5f9',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '4px'
                  }}>
                    ID: {code.trim().toUpperCase()}
                  </span>
                </div>

                {/* Result Details */}
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  
                  {/* Name block */}
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '0.5rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Bénéficiaire</span>
                    <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>{result.recipient}</strong>
                  </div>

                  {/* Role / Type */}
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '0.5rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Rôle / Catégorie</span>
                    <span style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 600 }}>{result.role} ({result.type})</span>
                  </div>

                  {/* Hackathon */}
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '0.5rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Événement</span>
                    <span style={{ color: '#0f172a', fontSize: '0.95rem' }}>{result.hackathon}</span>
                  </div>

                  {/* Issuing Date */}
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '0.5rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Date d'émission</span>
                    <span style={{ color: '#0f172a', fontSize: '0.95rem' }}>{result.issuedDate}</span>
                  </div>

                  {/* Issuer */}
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '0.5rem' }}>
                    <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Organisme émetteur</span>
                    <span style={{ color: '#0f172a', fontSize: '0.95rem' }}>{result.issuer}</span>
                  </div>

                  {/* Revoke reason if applicable */}
                  {result.status === 'revoked' && (
                    <div style={{
                      backgroundColor: '#fffbeb',
                      border: '1px solid #fef3c7',
                      borderRadius: '8px',
                      padding: '1rem',
                      color: '#b45309',
                      fontSize: '0.875rem',
                      marginTop: '0.5rem',
                      lineHeight: 1.5
                    }}>
                      <strong>Motif de révocation :</strong> {result.reason}
                    </div>
                  )}

                </div>
              </div>
            ) : (
              <div style={{
                backgroundColor: '#fef2f2',
                border: '1px solid #fee2e2',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
                color: '#991b1b'
              }}>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>❌</span>
                <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '0.25rem' }}>Aucun certificat trouvé</strong>
                <p style={{ fontSize: '0.9rem', color: '#b91c1c', margin: 0 }}>
                  Le code <strong>{code.trim().toUpperCase()}</strong> ne correspond à aucun certificat actif dans le registre sécurisé de CodeToWin. Veuillez vérifier l'orthographe du code.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
      
      {/* Dynamic spinner keyframes styling injection */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

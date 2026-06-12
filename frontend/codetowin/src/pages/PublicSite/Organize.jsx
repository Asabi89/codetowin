import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Zap, Award, Target, BarChart2, Check, ArrowRight } from 'lucide-react';

export default function Organize() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [hoveredValue, setHoveredValue] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const steps = [
    {
      number: "01",
      title: "Configurez & Publiez",
      description: "Ajoutez la thématique, les dates clés, les critères de notation, les prix et les livrables attendus. Personnalisez votre page d'accueil d'événement.",
      icon: Target,
      color: "from-teal-500 to-emerald-600"
    },
    {
      number: "02",
      title: "Gérez les Candidatures",
      description: "Approuvez les participants, invitez des mentors experts de l'industrie et allouez-les aux équipes via notre tableau de bord de coordination.",
      icon: Sparkles,
      color: "from-emerald-600 to-emerald-800"
    },
    {
      number: "03",
      title: "Suivez en temps réel",
      description: "Visualisez les dépôts GitHub des équipes, leurs vidéos de démos et leurs fiches projets centralisées dans un seul espace sans emails éparpillés.",
      icon: Zap,
      color: "from-teal-600 to-cyan-700"
    },
    {
      number: "04",
      title: "Évaluez & Certifiez",
      description: "Utilisez notre outil de notation collaborative. Générez des certificats numériques sécurisés par QR code signés par vos soins.",
      icon: Award,
      color: "from-emerald-700 to-indigo-900"
    }
  ];

  const valueProps = [
    {
      title: "Gestion centralisée",
      desc: "Plus de listes Excel perdues ni d'échanges d'emails interminables. Inscriptions, messagerie, dépôts de projets et notation sont dans un seul outil."
    },
    {
      title: "Vivier d'élite africain",
      desc: "Connectez votre entreprise avec des milliers de développeurs, designers et ingénieurs d'élite présélectionnés."
    },
    {
      title: "Valorisation de marque",
      desc: "Associez votre marque à l'innovation concrète et valorisez votre impact positif sur la formation technique."
    }
  ];

  return (
    <div style={{ backgroundColor: '#fafbfb', minHeight: '100vh', fontFamily: '"Inter", sans-serif', color: '#1e293b' }}>
      
      {/* Hero Section - B2B Premium Dark Radial */}
      <section style={{
        position: 'relative',
        background: 'radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.12), transparent 50%), linear-gradient(135deg, #022c22 0%, #044e3a 50%, #022c22 100%)',
        padding: '7rem 1.5rem 8rem',
        textAlign: 'center',
        overflow: 'hidden',
        borderBottom: '1px solid #064e3b'
      }}>
        {/* Subtle grid pattern overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>

        <div style={{ maxWidth: '950px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <span style={{
            color: '#34d399',
            fontWeight: 800,
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            letterSpacing: '0.2em',
            display: 'inline-block',
            marginBottom: '1.25rem',
            backgroundColor: 'rgba(52, 211, 153, 0.1)',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            border: '1px solid rgba(52, 211, 153, 0.2)'
          }}>
            Espace Entreprises, Hubs & Sponsors
          </span>
          
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
            fontWeight: 900,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            marginBottom: '1.75rem'
          }}>
            Détectez l'excellence.<br/>
            <span style={{
              background: 'linear-gradient(to right, #34d399, #059669)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Orchestrez vos challenges tech.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.35rem)',
            color: '#cbd5e1',
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: '0 auto 3rem'
          }}>
            CodeToWin vous fournit l'infrastructure complète pour configurer, diffuser et évaluer vos hackathons de A à Z. Accédez à un vivier qualifié de talents.
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/signup?role=organizer" 
              style={{
                backgroundColor: '#10b981',
                color: '#ffffff',
                padding: '1.05rem 2.5rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '1.05rem',
                textDecoration: 'none',
                transition: 'all 250ms ease',
                boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
                border: '1px solid #10b981',
                transform: hoveredBtn === 'primary' ? 'translateY(-2px)' : 'none'
              }}
              onMouseEnter={() => setHoveredBtn('primary')}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              Créer un hackathon
            </Link>
            <Link 
              to="/contact" 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '1.05rem 2.5rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '1.05rem',
                textDecoration: 'none',
                transition: 'all 250ms ease',
                backdropFilter: 'blur(8px)',
                transform: hoveredBtn === 'secondary' ? 'translateY(-2px)' : 'none'
              }}
              onMouseEnter={() => setHoveredBtn('secondary')}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              Demander une démo
            </Link>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            Le parcours de l'organisateur
          </h2>
          <div style={{ width: '60px', height: '4px', backgroundColor: '#10b981', margin: '1rem auto 0', borderRadius: '2px' }}></div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem'
        }}>
          {steps.map((step, index) => {
            const isHovered = hoveredStep === index;
            return (
              <div 
                key={step.number} 
                style={{
                  backgroundColor: '#ffffff',
                  padding: '3rem 2rem 2.5rem',
                  borderRadius: '20px',
                  border: isHovered ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                  boxShadow: isHovered ? '0 20px 40px -15px rgba(16, 185, 129, 0.12)' : '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'translateY(-6px)' : 'none'
                }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Number Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '2rem',
                  fontSize: '2.25rem',
                  fontWeight: 900,
                  color: isHovered ? '#10b981' : '#f1f5f9',
                  transition: 'color 200ms ease'
                }}>
                  {step.number}
                </div>

                <div style={{
                  backgroundColor: isHovered ? '#10b981' : '#f0fdf4',
                  color: isHovered ? '#ffffff' : '#10b981',
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  transition: 'all 200ms ease'
                }}>
                  <step.icon style={{ width: '28px', height: '28px' }} />
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', lineHeight: 1.25 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.98rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Value Props & Corporate Panel */}
      <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '7rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#10b981', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.15em' }}>
                Sécurité & Conformité B2B
              </span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', marginTop: '0.5rem', marginBottom: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Une infrastructure à l'épreuve des normes
              </h2>
              <p style={{ color: '#475569', lineHeight: 1.75, fontSize: '1.05rem', marginBottom: '2rem' }}>
                La mise en place de hackathons d'entreprise requiert des garanties. Notre plateforme s'adapte à vos contraintes de sécurité et de conformité pour héberger vos événements sereinement.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  "Conformité RGPD rigoureuse pour les inscriptions.",
                  "Stockage chiffré des codes sources et livrables.",
                  "Outils d'évaluation blindés contre la triche."
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <Check style={{ width: '22px', height: '22px', color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '1rem', color: '#334155', fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ 
              background: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)', 
              padding: '3rem', 
              borderRadius: '24px', 
              color: '#ffffff',
              boxShadow: '0 20px 40px -10px rgba(2, 44, 34, 0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: 'rgba(52, 211, 153, 0.15)', padding: '0.75rem', borderRadius: '12px' }}>
                  <BarChart2 style={{ width: '28px', height: '28px', color: '#34d399' }} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>Statistiques & Rapports</h3>
              </div>
              <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                Accédez à des statistiques consolidées sur les inscriptions, le taux de rétention, les technos favorites des participants et l'évaluation finale. Mesurez l'impact de vos investissements en communication technique.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section style={{ padding: '7rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            La valeur ajoutée pour vos équipes
          </h2>
          <div style={{ width: '50px', height: '4px', backgroundColor: '#10b981', margin: '1rem auto 0', borderRadius: '2px' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {valueProps.map((b, idx) => {
            const isHovered = hoveredValue === idx;
            return (
              <div 
                key={idx} 
                style={{ 
                  textAlign: 'left', 
                  padding: '2.5rem 2rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  border: isHovered ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                  boxShadow: isHovered ? '0 20px 40px -15px rgba(16, 185, 129, 0.12)' : '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
                  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isHovered ? 'translateY(-6px)' : 'none'
                }}
                onMouseEnter={() => setHoveredValue(idx)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <div style={{ 
                  color: '#10b981', 
                  fontWeight: 800, 
                  fontSize: '1.25rem', 
                  marginBottom: '1rem', 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '0.75rem' 
                }}>
                  <ArrowRight style={{ width: '20px', height: '20px', flexShrink: 0, marginTop: '0.25rem' }} />
                  <span>{b.title}</span>
                </div>
                <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: 1.7, margin: 0 }}>
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Call to Action */}
      <section style={{ 
        backgroundColor: '#020617', 
        color: '#ffffff', 
        padding: '6rem 1.5rem', 
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Prêt à propulser l'innovation ?
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.6, maxWidth: '620px', margin: '0 auto 3rem' }}>
            Inscrivez-vous en tant qu'organisateur ou contactez nos conseillers pour paramétrer un hackathon sur mesure.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              to="/signup?role=organizer" 
              style={{
                backgroundColor: '#ffffff',
                color: '#022c22',
                padding: '1.05rem 2.5rem',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'all 200ms ease',
                boxShadow: '0 10px 20px -5px rgba(2, 44, 34, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f1f5f9';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.transform = 'none';
              }}
            >
              Créer mon espace
            </Link>
            <Link 
              to="/contact" 
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '1.05rem 2.5rem',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                transition: 'all 200ms ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'none';
              }}
            >
              Contacter un conseiller
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

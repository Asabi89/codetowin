import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, MessageSquare, Star, FileCode, Code, ExternalLink, FileText, CheckCircle } from 'lucide-react';
import '../../styles/dashboard.css';

export default function MentorTeamDetails() {
  const { id } = useParams();

  return (
    <div className="dashboard-content">
      {/* Topbar */}
      <header className="dashboard-header-row" style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: 'white', padding: '1rem', marginLeft: '-1rem', marginRight: '-1rem', marginTop: '-2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <Link to="/mentor/teams" style={{ fontWeight: 500, color: 'var(--slate-500)', textDecoration: 'none' }} className="hover-text-slate-900">Mes Équipes</Link>
          <span style={{ color: 'var(--slate-400)' }}>/</span>
          <span style={{ fontWeight: 500, color: 'var(--slate-900)' }}>Détails de l'équipe</span>
        </div>
      </header>
      <style>{`.hover-text-slate-900:hover { color: var(--slate-900) !important; }`}</style>

      {/* Main scrollable area */}
      <div>
        
        {/* Header Section */}
        <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="sm-flex-row sm-items-center sm-justify-between">
          <style>{`
            @media (min-width: 640px) {
              .sm-flex-row { flex-direction: row !important; }
              .sm-items-center { align-items: center !important; }
              .sm-justify-between { justify-content: space-between !important; }
            }
          `}</style>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', height: '4rem', width: '4rem', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--border-radius-xl)', backgroundColor: 'var(--brand-100)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--brand-700)' }}>
              FI
            </div>
            <div>
              <h1 className="dashboard-title" style={{ fontSize: '1.5rem' }}>FinTech Innovators</h1>
              <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--green-100)', padding: '0.125rem 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--green-800)' }}>
                  <span style={{ marginRight: '0.375rem', height: '0.5rem', width: '0.5rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--green-600)' }}></span>
                  Projet soumis
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>• Hackathon "AI for Climate Africa"</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to={`/mentor/teams/${id}/feedback`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
              <Star style={{ marginLeft: '-0.25rem', marginRight: '0.5rem', height: '1.25rem', width: '1.25rem', color: 'var(--brand-100)' }} />
              Évaluer
            </Link>
            <Link to="/mentor/messages" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              <MessageSquare style={{ marginLeft: '-0.25rem', marginRight: '0.5rem', height: '1.25rem', width: '1.25rem', color: 'var(--slate-400)' }} />
              Contacter l'équipe
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' }} className="lg-grid-cols-3">
          <style>{`@media (min-width: 1024px) { .lg-grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; } }`}</style>
          {/* Left Column (2/3) */}
          <div className="lg-col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <style>{`@media (min-width: 1024px) { .lg-col-span-2 { grid-column: span 2 / span 2 !important; } }`}</style>
            
            {/* Project Card */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)', padding: '1rem 1.5rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Le Projet</h2>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-900)', margin: 0 }}>EcoPay : Plateforme de paiement mobile bas carbone</h3>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: 0 }}>
                  EcoPay est une solution Fintech innovante visant à réduire l'empreinte carbone des transactions mobiles. En optimisant les appels API et en hébergeant les nœuds de validation sur des serveurs alimentés aux énergies renouvelables, l'équipe propose une architecture 3x plus efficiente que les standards actuels.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--slate-500)', margin: 0 }}>Technologies utilisées</h4>
                  <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-md)', backgroundColor: '#EFF6FF', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 500, color: '#1D4ED8', border: '1px solid rgba(29, 78, 216, 0.1)' }}>React Native</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-md)', backgroundColor: '#F0FDF4', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 500, color: '#15803D', border: '1px solid rgba(22, 163, 74, 0.2)' }}>Node.js</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-md)', backgroundColor: '#FAF5FF', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 500, color: '#7E22CE', border: '1px solid rgba(126, 34, 206, 0.1)' }}>PostgreSQL</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-md)', backgroundColor: 'var(--slate-100)', padding: '0.25rem 0.5rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-600)', border: '1px solid rgba(100, 116, 139, 0.1)' }}>AWS Green</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members Card */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)', padding: '1rem 1.5rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Membres de l'équipe (3)</h2>
                <span style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>Chef d'équipe : Moussa Diop</span>
              </div>
              <ul role="list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', borderBottom: '1px solid var(--slate-200)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ height: '3rem', width: '3rem', borderRadius: 'var(--border-radius-full)', objectFit: 'cover', border: '2px solid var(--brand-500)' }} src="https://ui-avatars.com/api/?name=Moussa+Diop&background=random" alt="" />
                    <div style={{ marginLeft: '1rem' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Moussa Diop <span style={{ marginLeft: '0.5rem', display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--brand-100)', padding: '0.125rem 0.5rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--brand-800)' }}>Leader</span></p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', margin: 0 }}>Développeur Fullstack • Sénégal</p>
                    </div>
                  </div>

                  <a href="#" className="btn btn-secondary" style={{ textDecoration: 'none', padding: '0.375rem 0.75rem' }}>
                    Voir profil
                  </a>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', borderBottom: '1px solid var(--slate-200)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ height: '3rem', width: '3rem', borderRadius: 'var(--border-radius-full)', objectFit: 'cover' }} src="https://ui-avatars.com/api/?name=Aisha+Fall&background=random" alt="" />
                    <div style={{ marginLeft: '1rem' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Aisha Fall</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', margin: 0 }}>UX/UI Designer • Côte d'Ivoire</p>
                    </div>
                  </div>

                  <a href="#" className="btn btn-secondary" style={{ textDecoration: 'none', padding: '0.375rem 0.75rem' }}>
                    Voir profil
                  </a>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img style={{ height: '3rem', width: '3rem', borderRadius: 'var(--border-radius-full)', objectFit: 'cover' }} src="https://ui-avatars.com/api/?name=Kofi+Mensah&background=random" alt="" />
                    <div style={{ marginLeft: '1rem' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Kofi Mensah</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', margin: 0 }}>Data Engineer • Ghana</p>
                    </div>
                  </div>

                  <a href="#" className="btn btn-secondary" style={{ textDecoration: 'none', padding: '0.375rem 0.75rem' }}>
                    Voir profil
                  </a>
                </li>
              </ul>
            </div>

            {/* Submitted Files Card */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)', padding: '1rem 1.5rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Ressources & Livrables</h2>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' }} className="sm-grid-cols-2">
                  <style>{`@media (min-width: 640px) { .sm-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } }`}</style>
                  <a href="#" style={{ display: 'flex', alignItems: 'center', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--slate-200)', padding: '1rem', textDecoration: 'none' }} className="hover-bg-slate-50">
                    <div style={{ display: 'flex', height: '2.5rem', width: '2.5rem', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--border-radius-lg)', backgroundColor: 'var(--slate-100)' }}>
                      <Code style={{ height: '1.5rem', width: '1.5rem', color: 'var(--slate-600)' }} />
                    </div>
                    <div style={{ marginLeft: '1rem' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Dépôt GitHub</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: 0 }}>github.com/fintech-innovators...</p>
                    </div>
                  </a>
                  
                  <a href="#" style={{ display: 'flex', alignItems: 'center', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--slate-200)', padding: '1rem', textDecoration: 'none' }} className="hover-bg-slate-50">
                    <div style={{ display: 'flex', height: '2.5rem', width: '2.5rem', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--border-radius-lg)', backgroundColor: '#EFF6FF' }}>
                      <ExternalLink style={{ height: '1.5rem', width: '1.5rem', color: '#2563EB' }} />
                    </div>
                    <div style={{ marginLeft: '1rem' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Démo en ligne</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: 0 }}>app.ecopay-demo.com</p>
                    </div>
                  </a>

                  <a href="#" style={{ display: 'flex', alignItems: 'center', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--slate-200)', padding: '1rem', textDecoration: 'none' }} className="hover-bg-slate-50">
                    <div style={{ display: 'flex', height: '2.5rem', width: '2.5rem', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--border-radius-lg)', backgroundColor: '#FEF2F2' }}>
                      <FileText style={{ height: '1.5rem', width: '1.5rem', color: '#DC2626' }} />
                    </div>
                    <div style={{ marginLeft: '1rem' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Pitch Deck (PDF)</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: 0 }}>2.4 MB</p>
                    </div>
                  </a>
                </div>
                <style>{`.hover-bg-slate-50:hover { background-color: var(--slate-50) !important; }`}</style>
              </div>
            </div>

          </div>

          {/* Right Column (1/3) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Timeline Card */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)', padding: '1rem 1.5rem' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Activité de l'équipe</h2>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flow-root' }}>
                  <ul role="list" style={{ marginBottom: '-2rem', listStyle: 'none', padding: 0 }}>
                    <li>
                      <div style={{ position: 'relative', paddingBottom: '2rem' }}>
                        <span style={{ position: 'absolute', left: '1rem', top: '1rem', marginLeft: '-1px', height: '100%', width: '2px', backgroundColor: 'var(--slate-200)' }} aria-hidden="true"></span>
                        <div style={{ position: 'relative', display: 'flex', gap: '0.75rem' }}>
                          <div>
                            <span style={{ height: '2rem', width: '2rem', borderRadius: 'var(--border-radius-full)', backgroundColor: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px white' }}>
                              <CheckCircle style={{ height: '1rem', width: '1rem', color: 'white' }} />
                            </span>
                          </div>
                          <div style={{ display: 'flex', minWidth: 0, flex: 1, justifyContent: 'space-between', gap: '1rem', paddingTop: '0.375rem' }}>
                            <div>
                              <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', margin: 0 }}>Projet soumis pour évaluation</p>
                            </div>
                            <div style={{ whiteSpace: 'nowrap', textAlign: 'right', fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                              <time dateTime="2026-06-05">Hier</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div style={{ position: 'relative', paddingBottom: '2rem' }}>
                        <span style={{ position: 'absolute', left: '1rem', top: '1rem', marginLeft: '-1px', height: '100%', width: '2px', backgroundColor: 'var(--slate-200)' }} aria-hidden="true"></span>
                        <div style={{ position: 'relative', display: 'flex', gap: '0.75rem' }}>
                          <div>
                            <span style={{ height: '2rem', width: '2rem', borderRadius: 'var(--border-radius-full)', backgroundColor: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px white' }}>
                              <span style={{ height: '0.5rem', width: '0.5rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'white' }}></span>
                            </span>
                          </div>
                          <div style={{ display: 'flex', minWidth: 0, flex: 1, justifyContent: 'space-between', gap: '1rem', paddingTop: '0.375rem' }}>
                            <div>
                              <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', margin: 0 }}>Mentor Dr. Ousmane assigné</p>
                            </div>
                            <div style={{ whiteSpace: 'nowrap', textAlign: 'right', fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                              <time dateTime="2026-06-02">2 Juin</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div style={{ position: 'relative', paddingBottom: '2rem' }}>
                        <div style={{ position: 'relative', display: 'flex', gap: '0.75rem' }}>
                          <div>
                            <span style={{ height: '2rem', width: '2rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px white' }}>
                              <span style={{ height: '0.5rem', width: '0.5rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'white' }}></span>
                            </span>
                          </div>
                          <div style={{ display: 'flex', minWidth: 0, flex: 1, justifyContent: 'space-between', gap: '1rem', paddingTop: '0.375rem' }}>
                            <div>
                              <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', margin: 0 }}>Création de l'équipe</p>
                            </div>
                            <div style={{ whiteSpace: 'nowrap', textAlign: 'right', fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                              <time dateTime="2026-05-28">28 Mai</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

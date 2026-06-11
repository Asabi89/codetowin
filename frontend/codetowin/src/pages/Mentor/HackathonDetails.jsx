import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import '../../styles/dashboard.css';

export default function MentorHackathonDetails() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('tab-overview');

  return (
    <div className="dashboard-content">
      {/* Topbar */}
      <header className="dashboard-header-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-200)', backgroundColor: 'white', padding: '1rem', marginLeft: '-1rem', marginRight: '-1rem', marginTop: '-2rem', marginBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <Link to="/mentor/submissions" style={{ fontWeight: 500, color: 'var(--slate-500)', textDecoration: 'none' }} className="hover-text-slate-900">Soumissions</Link>
          <span style={{ color: 'var(--slate-400)' }}>/</span>
          <span style={{ fontWeight: 500, color: 'var(--slate-900)' }}>Détails : AI for Climate Africa</span>
        </div>
      </header>
      <style>{`.hover-text-slate-900:hover { color: var(--slate-900) !important; }`}</style>

      {/* Main scrollable area */}
      <div>
        
        {/* Back button & Actions */}
        <div style={{ borderBottom: '1px solid var(--slate-200)', backgroundColor: 'white', padding: '1rem', marginLeft: '-1rem', marginRight: '-1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/mentor/submissions" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-500)', textDecoration: 'none' }} className="hover-text-slate-700">
            <ChevronLeft style={{ marginRight: '0.25rem', height: '1rem', width: '1rem' }} />
            Retour aux hackathons
          </Link>
          <Link to={`/mentor/hackathons/${id}/submissions`} className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Voir les soumissions
          </Link>
        </div>
        <style>{`.hover-text-slate-700:hover { color: var(--slate-700) !important; }`}</style>

        <div style={{ margin: '0 auto', maxWidth: '64rem' }}>
          
          {/* Banner & Header */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: '12rem', width: '100%' }} className="sm-h-64">
              <style>{`@media (min-width: 640px) { .sm-h-64 { height: 16rem !important; } }`}</style>
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80" alt="Banner" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '0.25rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-800)', backdropFilter: 'blur(4px)', boxShadow: 'var(--shadow)' }}>
                Hybride · Dakar
              </div>
              <img src="https://ui-avatars.com/api/?name=AI&background=047857&color=fff&size=128&rounded=true" alt="Logo" style={{ position: 'absolute', bottom: '-2rem', left: '1.5rem', height: '5rem', width: '5rem', borderRadius: 'var(--border-radius-full)', border: '4px solid white', boxShadow: 'var(--shadow-md)' }} />
            </div>
            
            <div style={{ padding: '1.5rem', paddingTop: '3rem' }} className="sm-px-8">
              <style>{`@media (min-width: 640px) { .sm-px-8 { padding-left: 2rem !important; padding-right: 2rem !important; } }`}</style>
              <div style={{ display: 'flex', flexDirection: 'column' }} className="sm-flex-row sm-items-start sm-justify-between">
                <div>
                  <h1 className="dashboard-title" style={{ fontSize: '1.5rem' }}>AI for Climate Africa</h1>
                  <p className="dashboard-subtitle" style={{ marginTop: '0.5rem' }}>Rejoignez-nous pour créer des solutions d'Intelligence Artificielle au service du climat en Afrique. Participez à ce hackathon de 48h pour construire des outils d'agriculture de précision et de gestion de l'eau.</p>
                </div>
                <div style={{ marginTop: '1rem', flexShrink: 0 }} className="sm-mt-0 sm-ml-6">
                  <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--green-100)', padding: '0.25rem 0.75rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--green-800)', border: '1px solid rgba(22, 163, 74, 0.2)' }}>
                    <span style={{ marginRight: '0.375rem', height: '0.5rem', width: '0.5rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--green-600)' }}></span>
                    En cours
                  </span>
                </div>
              </div>
              <style>{`
                @media (min-width: 640px) {
                  .sm-flex-row { flex-direction: row !important; }
                  .sm-items-start { align-items: flex-start !important; }
                  .sm-justify-between { justify-content: space-between !important; }
                  .sm-mt-0 { margin-top: 0 !important; }
                  .sm-ml-6 { margin-left: 1.5rem !important; }
                }
              `}</style>
              
              <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--brand-50)', padding: '0.125rem 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--brand-700)', border: '1px solid rgba(79, 70, 229, 0.2)' }}>Data Science</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--brand-50)', padding: '0.125rem 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--brand-700)', border: '1px solid rgba(79, 70, 229, 0.2)' }}>GreenTech</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--brand-50)', padding: '0.125rem 0.625rem', fontSize: '0.75rem', fontWeight: 500, color: 'var(--brand-700)', border: '1px solid rgba(79, 70, 229, 0.2)' }}>IoT</span>
              </div>
            </div>
            
            {/* Quick Stats Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', borderTop: '1px solid var(--slate-100)', backgroundColor: 'var(--slate-50)' }} className="sm-grid-cols-4 stat-bar-divide">
              <style>{`
                @media (min-width: 640px) { .sm-grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; } }
                .stat-bar-divide > div { border-right: 1px solid var(--slate-100); }
                .stat-bar-divide > div:last-child { border-right: none; }
                @media (max-width: 639px) {
                  .stat-bar-divide > div:nth-child(even) { border-right: none; }
                  .stat-bar-divide > div:nth-child(1), .stat-bar-divide > div:nth-child(2) { border-bottom: 1px solid var(--slate-100); }
                }
              `}</style>
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--slate-500)', margin: 0 }}>Dates</p>
                <p style={{ marginTop: '0.25rem', fontWeight: 600, color: 'var(--slate-900)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>12 - 14 Août 2026</p>
              </div>
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--slate-500)', margin: 0 }}>Participants</p>
                <p style={{ marginTop: '0.25rem', fontWeight: 600, color: 'var(--slate-900)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>89 / 150</p>
              </div>
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--slate-500)', margin: 0 }}>Équipes</p>
                <p style={{ marginTop: '0.25rem', fontWeight: 600, color: 'var(--slate-900)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>14 (2 à vos soins)</p>
              </div>
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--slate-500)', margin: 0 }}>Premier Prix</p>
                <p style={{ marginTop: '0.25rem', fontWeight: 600, color: 'var(--brand-600)', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>2 000 000 FCFA</p>
              </div>
            </div>
          </div>

          {/* Organizer Section */}
          <div className="card" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://ui-avatars.com/api/?name=TechHub+Senegal&background=047857&color=fff" alt="" style={{ height: '2.5rem', width: '2.5rem', borderRadius: 'var(--border-radius-full)', border: '2px solid white' }} />
              <div style={{ marginLeft: '0.75rem' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Organisé par <span style={{ fontWeight: 700 }}>TechHub Sénégal</span></p>
                <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)', margin: 0 }}>Incubateur d'innovations numériques</p>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem' }}>
              Voir le profil
            </button>
          </div>

          {/* Content Tabs */}
          <div style={{ marginTop: '2rem' }}>
            <div className="sm-hidden">
              <style>{`@media (min-width: 640px) { .sm-hidden { display: none !important; } }`}</style>
              <label htmlFor="tabs-select" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>Sélectionner un onglet</label>
              <select 
                id="tabs-select" 
                name="tabs" 
                className="form-input"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="tab-overview">Vue d'ensemble</option>
                <option value="tab-rules">Règles</option>
                <option value="tab-resources">Ressources</option>
                <option value="tab-prizes">Prix & Récompenses</option>
              </select>
            </div>
            <div className="hidden sm-block">
              <style>{`
                .hidden { display: none; }
                @media (min-width: 640px) { .sm-block { display: block !important; } }
              `}</style>
              <nav style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--slate-200)' }} aria-label="Tabs">
                <button onClick={() => setActiveTab('tab-overview')} className="tab-button" style={{ ...(activeTab === 'tab-overview' ? { backgroundColor: 'var(--brand-50)', color: 'var(--brand-700)', borderBottomColor: 'var(--brand-500)', borderTopLeftRadius: 'var(--border-radius-md)', borderTopRightRadius: 'var(--border-radius-md)' } : { color: 'var(--slate-500)', borderBottomColor: 'transparent' }), padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: 500, borderBottomWidth: '2px', borderBottomStyle: 'solid', cursor: 'pointer', background: activeTab === 'tab-overview' ? 'var(--brand-50)' : 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>Vue d'ensemble</button>
                <button onClick={() => setActiveTab('tab-rules')} className="tab-button" style={{ ...(activeTab === 'tab-rules' ? { backgroundColor: 'var(--brand-50)', color: 'var(--brand-700)', borderBottomColor: 'var(--brand-500)', borderTopLeftRadius: 'var(--border-radius-md)', borderTopRightRadius: 'var(--border-radius-md)' } : { color: 'var(--slate-500)', borderBottomColor: 'transparent' }), padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: 500, borderBottomWidth: '2px', borderBottomStyle: 'solid', cursor: 'pointer', background: activeTab === 'tab-rules' ? 'var(--brand-50)' : 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>Règles</button>
                <button onClick={() => setActiveTab('tab-resources')} className="tab-button" style={{ ...(activeTab === 'tab-resources' ? { backgroundColor: 'var(--brand-50)', color: 'var(--brand-700)', borderBottomColor: 'var(--brand-500)', borderTopLeftRadius: 'var(--border-radius-md)', borderTopRightRadius: 'var(--border-radius-md)' } : { color: 'var(--slate-500)', borderBottomColor: 'transparent' }), padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: 500, borderBottomWidth: '2px', borderBottomStyle: 'solid', cursor: 'pointer', background: activeTab === 'tab-resources' ? 'var(--brand-50)' : 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>Ressources</button>
                <button onClick={() => setActiveTab('tab-prizes')} className="tab-button" style={{ ...(activeTab === 'tab-prizes' ? { backgroundColor: 'var(--brand-50)', color: 'var(--brand-700)', borderBottomColor: 'var(--brand-500)', borderTopLeftRadius: 'var(--border-radius-md)', borderTopRightRadius: 'var(--border-radius-md)' } : { color: 'var(--slate-500)', borderBottomColor: 'transparent' }), padding: '0.5rem 0.75rem', fontSize: '0.875rem', fontWeight: 500, borderBottomWidth: '2px', borderBottomStyle: 'solid', cursor: 'pointer', background: activeTab === 'tab-prizes' ? 'var(--brand-50)' : 'transparent', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>Prix & Récompenses</button>
              </nav>
              <style>{`.tab-button:hover { color: var(--slate-700); }`}</style>
            </div>
          </div>

          {/* Tab Content (Vue d'ensemble) */}
          {activeTab === 'tab-overview' && (
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <div className="rich-text-content" style={{ color: 'var(--slate-700)', lineHeight: 1.6 }}>
                <h3 style={{ marginTop: 0 }}>À propos du Hackathon</h3>
                <p>L'Afrique fait face à des défis climatiques sans précédent. Ce hackathon vise à rassembler les esprits les plus brillants pour développer des solutions tangibles basées sur l'Intelligence Artificielle et l'Internet des Objets (IoT).</p>
                
                <h4>Objectifs Principaux :</h4>
                <ul>
                  <li><strong>Agriculture de précision :</strong> Modèles de prédiction pour optimiser l'utilisation de l'eau et des engrais.</li>
                  <li><strong>Prévention des catastrophes :</strong> Systèmes d'alerte précoce pour les inondations et les sécheresses.</li>
                  <li><strong>Gestion énergétique :</strong> Algorithmes d'optimisation pour les micro-réseaux solaires.</li>
                </ul>

                <h4>Calendrier de l'événement</h4>
                <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flow-root' }}>
                    <ul role="list" style={{ marginBottom: '-2rem', listStyle: 'none', padding: 0 }}>
                      <li>
                        <div style={{ position: 'relative', paddingBottom: '2rem' }}>
                          <span style={{ position: 'absolute', top: '1rem', left: '1rem', marginLeft: '-1px', height: '100%', width: '2px', backgroundColor: 'var(--brand-200)' }} aria-hidden="true"></span>
                          <div style={{ position: 'relative', display: 'flex', gap: '0.75rem' }}>
                            <div>
                              <span style={{ height: '2rem', width: '2rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--brand-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px white' }}>
                                <span style={{ height: '0.5rem', width: '0.5rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--brand-600)' }}></span>
                              </span>
                            </div>
                            <div style={{ display: 'flex', minWidth: 0, flex: 1, justifyContent: 'space-between', gap: '1rem', paddingTop: '0.375rem' }}>
                              <div><p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', margin: 0 }}>Début du Hackathon (Cérémonie d'ouverture)</p></div>
                              <div style={{ whiteSpace: 'nowrap', textAlign: 'right', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)' }}>12 Août, 09:00</div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div style={{ position: 'relative', paddingBottom: '2rem' }}>
                          <span style={{ position: 'absolute', top: '1rem', left: '1rem', marginLeft: '-1px', height: '100%', width: '2px', backgroundColor: 'var(--brand-200)' }} aria-hidden="true"></span>
                          <div style={{ position: 'relative', display: 'flex', gap: '0.75rem' }}>
                            <div>
                              <span style={{ height: '2rem', width: '2rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--brand-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px white' }}>
                                <span style={{ height: '0.5rem', width: '0.5rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--brand-600)' }}></span>
                              </span>
                            </div>
                            <div style={{ display: 'flex', minWidth: 0, flex: 1, justifyContent: 'space-between', gap: '1rem', paddingTop: '0.375rem' }}>
                              <div><p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', margin: 0 }}>Session de Mentorat 1</p></div>
                              <div style={{ whiteSpace: 'nowrap', textAlign: 'right', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)' }}>12 Août, 15:00</div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div style={{ position: 'relative', paddingBottom: '2rem' }}>
                          <div style={{ position: 'relative', display: 'flex', gap: '0.75rem' }}>
                            <div>
                              <span style={{ height: '2rem', width: '2rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--brand-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px white' }}>
                                <span style={{ height: '0.5rem', width: '0.5rem', borderRadius: 'var(--border-radius-full)', backgroundColor: 'white' }}></span>
                              </span>
                            </div>
                            <div style={{ display: 'flex', minWidth: 0, flex: 1, justifyContent: 'space-between', gap: '1rem', paddingTop: '0.375rem' }}>
                              <div><p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-900)', margin: 0 }}>Limite des soumissions</p></div>
                              <div style={{ whiteSpace: 'nowrap', textAlign: 'right', fontSize: '0.875rem', fontWeight: 500, color: 'var(--brand-600)' }}>14 Août, 12:00</div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tab Content (Règles) */}
          {activeTab === 'tab-rules' && (
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <div className="rich-text-content" style={{ color: 'var(--slate-700)', lineHeight: 1.6 }}>
                <h3 style={{ marginTop: 0 }}>Règlement du Hackathon</h3>
                <ul>
                  <li><strong>Équipes :</strong> De 2 à 5 membres maximum.</li>
                  <li><strong>Code original :</strong> Tout le code doit être écrit pendant l'événement. Vous pouvez utiliser des librairies open-source publiques, mais aucune partie de l'application principale ne doit être pré-codée.</li>
                  <li><strong>Propriété intellectuelle :</strong> Vous conservez la propriété de tout ce que vous créez pendant le hackathon.</li>
                  <li><strong>Soumission :</strong> Une vidéo de démonstration de 3 minutes maximum est obligatoire, accompagnée d'un dépôt GitHub public.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab Content (Ressources) */}
          {activeTab === 'tab-resources' && (
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <div className="rich-text-content" style={{ color: 'var(--slate-700)', lineHeight: 1.6 }}>
                <h3 style={{ marginTop: 0 }}>Ressources et APIs</h3>
                <p>Voici les ressources mises à votre disposition par nos partenaires :</p>
                <ul>
                  <li><a href="#" style={{ color: 'var(--brand-600)', textDecoration: 'none' }} className="hover-underline">API Météo de précision (AccuWeather)</a> - Clés d'API fournies le jour J.</li>
                  <li><a href="#" style={{ color: 'var(--brand-600)', textDecoration: 'none' }} className="hover-underline">Dataset Agriculture (Sénégal 2020-2025)</a> - Données sur les rendements agricoles.</li>
                  <li><a href="#" style={{ color: 'var(--brand-600)', textDecoration: 'none' }} className="hover-underline">Cloud Computing AWS</a> - $100 de crédits pour chaque équipe inscrite.</li>
                </ul>
                <style>{`.hover-underline:hover { text-decoration: underline !important; }`}</style>
              </div>
            </div>
          )}

          {/* Tab Content (Prix) */}
          {activeTab === 'tab-prizes' && (
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(1, minmax(0, 1fr))' }} className="sm-grid-cols-3">
                <style>{`@media (min-width: 640px) { .sm-grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; } }`}</style>
                <div style={{ borderRadius: 'var(--border-radius-xl)', border: '1px solid #FEF08A', backgroundColor: '#FEFCE8', padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ margin: '0 auto', display: 'flex', height: '3rem', width: '3rem', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: '#FEF9C3', color: '#CA8A04', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>1</div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--slate-900)', margin: 0 }}>Grand Prix</h4>
                  <p style={{ marginTop: '0.5rem', fontSize: '1.5rem', fontWeight: 900, color: 'var(--brand-600)', margin: '0.5rem 0 0 0' }}>2 000 000 FCFA</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--slate-600)', margin: '0.5rem 0 0 0' }}>Incubation de 6 mois et accès direct au programme Seed de TechHub.</p>
                </div>
                <div style={{ borderRadius: 'var(--border-radius-xl)', border: '1px solid var(--slate-200)', backgroundColor: 'var(--slate-50)', padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ margin: '0 auto', display: 'flex', height: '3rem', width: '3rem', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: 'var(--slate-200)', color: 'var(--slate-600)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>2</div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--slate-900)', margin: 0 }}>Deuxième Prix</h4>
                  <p style={{ marginTop: '0.5rem', fontSize: '1.25rem', fontWeight: 900, color: 'var(--slate-700)', margin: '0.5rem 0 0 0' }}>1 000 000 FCFA</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--slate-600)', margin: '0.5rem 0 0 0' }}>Ordinateurs portables pour l'équipe + 3 mois d'incubation.</p>
                </div>
                <div style={{ borderRadius: 'var(--border-radius-xl)', border: '1px solid #FED7AA', backgroundColor: '#FFF7ED', padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ margin: '0 auto', display: 'flex', height: '3rem', width: '3rem', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--border-radius-full)', backgroundColor: '#FFEDD5', color: '#EA580C', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>3</div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--slate-900)', margin: 0 }}>Prix Coup de Cœur</h4>
                  <p style={{ marginTop: '0.5rem', fontSize: '1.25rem', fontWeight: 900, color: 'var(--slate-700)', margin: '0.5rem 0 0 0' }}>500 000 FCFA</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--slate-600)', margin: '0.5rem 0 0 0' }}>Offert par notre partenaire sponsor pour la solution la plus innovante.</p>
                </div>
              </div>
            </div>
          )}
          <style>{`
            .rich-text-content h3 { font-size: 1.25rem; font-weight: 600; color: var(--slate-900); margin-bottom: 1rem; }
            .rich-text-content h4 { font-size: 1rem; font-weight: 600; color: var(--slate-900); margin-top: 1.5rem; margin-bottom: 0.5rem; }
            .rich-text-content p { margin-bottom: 1rem; margin-top: 0; }
            .rich-text-content ul { padding-left: 1.5rem; margin-bottom: 1rem; list-style-type: disc; }
            .rich-text-content li { margin-bottom: 0.5rem; }
            .rich-text-content strong { font-weight: 600; }
          `}</style>
        </div>
      </div>
    </div>
  );
}

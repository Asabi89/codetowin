import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import ConfirmModal from '../../components/common/ConfirmModal';
import '../../styles/pages/participant/hackaton-detail.css';

import HackathonHero from '../../components/features/hackathon/detail/HackathonHero';
import HackathonTabs from '../../components/features/hackathon/detail/HackathonTabs';
import ProjectWorkspace from '../../components/features/hackathon/detail/ProjectWorkspace';
import FAQAccordion from '../../components/features/hackathon/detail/FAQAccordion';

export default function HackathonDetail() {
  const { workspaceState, registered, updateWorkspaceState, resetWorkspace } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState('overview');
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location]);

  const handleOnboardingJoin = () => {
    navigate('/profile');
  };

  const handleResetWorkspace = () => {
    setConfirmResetOpen(true);
  };

  const doResetWorkspace = () => {
    resetWorkspace();
    setConfirmResetOpen(false);
  };

  const setIsSubmitted = (status) => {
    updateWorkspaceState({ submitted: status });
    if (status) showToast('Félicitations ! Votre projet a été soumis avec succès au Google Cloud Rapid Agent Hackathon.', 'success');
  };

  return (
    <>
    <div>
      <HackathonHero 
        registered={registered} 
        setActiveTab={setActiveTab} 
        handleOnboardingJoin={handleOnboardingJoin} 
      />

      <div className="layout-wrapper">
        <main className="content-pane">
          <HackathonTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="screens-container">
            
            {/* OVERVIEW SCREEN */}
            {activeTab === 'overview' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <div className="textarea-render-body">
                    <h2>C'est quoi ce défi ?</h2>
                    <p>Bienvenue au Google Cloud Rapid Agent Hackathon ! Fini les vieux chatbots ennuyeux, on passe aux vrais Agents IA : des trucs intelligents qui réfléchissent, planifient et utilisent des API pour de vrai.</p>
                    <p>Avec Gemini et les outils MCP, ton but est de créer un agent (presque) autonome qui fait le boulot à la place des humains dans l'une des catégories ci-dessous.</p>
                    <p>Que tu sois un pro du code, un as du design ou juste un débutant curieux, on a tout ce qu'il faut pour t'aider. Viens t'amuser avec nous !</p>
                    
                    <h2>Les Pistes (et les Prix !)</h2>
                    <p>Choisis ton camp et essaie de gagner le gros lot :</p>
                    <ul>
                      <li><strong>Piste Arize (10 000 $ en jeu)</strong> : Fais des agents qui surveillent les erreurs et tracent tout. (1er: 5 000 $ | 2e: 3 000 $ | 3e: 2 000 $)</li>
                      <li><strong>Piste Elastic (10 000 $ en jeu)</strong> : Utilise la recherche vectorielle pour rendre ton agent super malin. (1er: 5 000 $ | 2e: 3 000 $ | 3e: 2 000 $)</li>
                      <li><strong>Piste Fivetran (10 000 $ en jeu)</strong> : Construis des pipelines de données et automatise tout le bazar. (1er: 5 000 $ | 2e: 3 000 $ | 3e: 2 000 $)</li>
                      <li><strong>Piste MongoDB (10 000 $ en jeu)</strong> : Stocke et recherche des trucs avec MongoDB Atlas. (1er: 5 000 $ | 2e: 3 000 $ | 3e: 2 000 $)</li>
                    </ul>

                    <h2>Quelques idées pour t'inspirer 💡</h2>
                    <p>T'as pas d'idée ? Pas de panique, voici de quoi te lancer :</p>
                    <ul>
                      <li><strong>Le Planificateur de la Coupe du Monde 2026</strong> : Aide les fans à trouver des hôtels, des billets et à s'organiser sans stress.</li>
                      <li><strong>Le Chasseur de Fraudes</strong> : Un agent qui fouille dans les transactions pour attraper les méchants.</li>
                      <li><strong>Le Superviseur de Magasin</strong> : Gère les stocks, les livraisons et crie au secours (poliment) quand il manque des trucs.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* MY PROJECT SCREEN */}
            {activeTab === 'my-project' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <ProjectWorkspace 
                    workspaceState={workspaceState}
                    updateWorkspaceState={updateWorkspaceState}
                    resetWorkspace={handleResetWorkspace}
                    registered={registered}
                    handleOnboardingJoin={handleOnboardingJoin}
                    isSubmitted={workspaceState.submitted}
                    setIsSubmitted={setIsSubmitted}
                  />
                </div>
              </div>
            )}

            {/* PARTICIPANTS SCREEN */}
            {activeTab === 'participants' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <h2 className="slice-title">Les Génies Inscrits</h2>
                  
                  <div className="search-filter-row">
                    <div className="search-box-wrap">
                      <input type="text" placeholder="Cherche des potes, des skills..." />
                    </div>
                    <div className="filter-chips-list">
                      <span className="filter-chip-item active">Tous</span>
                      <span className="filter-chip-item">Bricoleurs</span>
                      <span className="filter-chip-item">Artistes</span>
                      <span className="filter-chip-item">Chefs d'orchestre</span>
                    </div>
                  </div>

                  <div className="users-grid">
                    <div className="user-profile-card">
                      <div className="user-avatar-wrap">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80" alt="Sarah Chen" className="profile-avatar" />
                        <span className="user-status-dot"></span>
                      </div>
                      <div className="user-profile-details">
                        <span className="profile-name">Sarah Chen</span>
                        <span className="profile-role">AI Developer • Montreal</span>
                        <div className="profile-skills-tags">
                          <span className="skill-tag">Python</span>
                          <span className="skill-tag">Gemini API</span>
                          <span className="skill-tag">LangChain</span>
                        </div>
                      </div>
                    </div>

                    <div className="user-profile-card">
                      <div className="user-avatar-wrap">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" alt="Marcus Vance" className="profile-avatar" />
                        <span className="user-status-dot"></span>
                      </div>
                      <div className="user-profile-details">
                        <span className="profile-name">Marcus Vance</span>
                        <span className="profile-role">Product Designer • SF</span>
                        <div className="profile-skills-tags">
                          <span className="skill-tag">Figma</span>
                          <span className="skill-tag">UX Research</span>
                          <span className="skill-tag">HTML/CSS</span>
                        </div>
                      </div>
                    </div>

                    <div className="user-profile-card">
                      <div className="user-avatar-wrap">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80" alt="Elena Rostova" className="profile-avatar" />
                        <span className="user-status-dot"></span>
                      </div>
                      <div className="user-profile-details">
                        <span className="profile-name">Elena Rostova</span>
                        <span className="profile-role">Data Scientist • Berlin</span>
                        <div className="profile-skills-tags">
                          <span className="skill-tag">PyTorch</span>
                          <span className="skill-tag">MongoDB</span>
                          <span className="skill-tag">Vector Search</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RESOURCES SCREEN */}
            {activeTab === 'resources' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <div className="textarea-render-body">
                    <h2>La boîte à outils ! 🛠️</h2>
                    <p>Voici tous les trucs cool pour t'aider à construire ton projet :</p>

                    <h3>Les papiers officiels</h3>
                    <ul>
                      <li><a href="#mcp-doc" onClick={(e) => e.preventDefault()}>La doc MCP</a> - Pour comprendre comment faire des outils magiques.</li>
                      <li><a href="#gcloud-models" onClick={(e) => e.preventDefault()}>Les modèles Google Cloud</a> - Des petits bouts de code pour te lancer plus vite.</li>
                    </ul>

                    <h3>Les guides de nos amis</h3>
                    <ul>
                      <li><a href="#mongo-guide" onClick={(e) => e.preventDefault()}>Le guide MongoDB</a> - Pour apprendre à stocker plein de trucs super facilement.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* RULES SCREEN */}
            {activeTab === 'rules' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <div className="textarea-render-body">
                    <h2>Les Règles du Jeu 📜</h2>
                    
                    <h3>1. Qui peut jouer ?</h3>
                    <p>Tout le monde peut participer au Google Cloud Rapid Agent Hackathon ! Faut juste avoir 18 ans, parce qu'on fait les choses bien.</p>
                    <p>Par contre, si tu bosses chez Google ou nos partenaires, tu pourras pas gagner les prix (faut laisser la chance aux autres !).</p>

                    <h3>2. Comment ça marche ?</h3>
                    <p>Ton projet doit être tout frais, codé pendant le hackathon. Pas de recyclage d'anciens trucs ! Mais tu peux utiliser des librairies gratuites, évidemment.</p>
                    <p>Et devine quoi ? Vous pouvez être jusqu'à 4 dans l'équipe. Mélangez les talents, c'est encore plus rigolo !</p>
                  </div>
                </div>
              </div>
            )}

            {/* UPDATES SCREEN */}
            {activeTab === 'updates' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <h2 className="slice-title">Les actus croustillantes 📰</h2>
                  <div className="updates-timeline">
                    <div className="update-item">
                      <span className="update-node"></span>
                      <div className="update-date">5 Juin 2026</div>
                      <h3 className="update-title">Cadeaux Google Cloud distribués !</h3>
                      <span className="update-author">par Sarah Chen • Organisatrice</span>
                      <p className="update-body-text">Regarde tes emails ! On t'a envoyé un super code promo pour tester Vertex. Profites-en bien avant le 11 juin !</p>
                    </div>

                    <div className="update-item">
                      <span className="update-node"></span>
                      <div className="update-date">1 Juin 2026</div>
                      <h3 className="update-title">Petits webinaires sympas</h3>
                      <span className="update-author">par l'Équipe</span>
                      <p className="update-body-text">On lance des vidéos en direct demain. Les pros de MongoDB, Arize et GitLab vont t'expliquer des trucs cools sur les serveurs MCP.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DISCUSSIONS SCREEN */}
            {activeTab === 'discussions' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <h2 className="slice-title">Le coin Bla-bla 🗣️</h2>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div className="search-box-wrap" style={{ flex: 1, marginRight: '1rem' }}>
                      <input type="text" placeholder="Cherche de quoi papoter..." />
                    </div>
                    <a href="#new-post" onClick={(e) => { e.preventDefault(); showToast("Bla-bla bientôt disponible !", 'warning'); }} className="btn-action-primary">Nouveau truc à dire</a>
                  </div>

                  <div className="discussions-pane">
                    <div className="discussion-item-card">
                      <div className="discussion-info">
                        <a href="#topic1" onClick={(e) => e.preventDefault()} className="discussion-topic">Au secours avec les erreurs Fivetran !</a>
                        <div className="discussion-meta">
                          <span>Lancé par Tariq Johnson • il y a 2 heures</span>
                          <span>dans Aide Technique</span>
                        </div>
                      </div>
                      <span className="discussion-replies">4 réponses</span>
                    </div>

                    <div className="discussion-item-card">
                      <div className="discussion-info">
                        <a href="#topic2" onClick={(e) => e.preventDefault()} className="discussion-topic">On cherche un artiste UX pour notre équipe !</a>
                        <div className="discussion-meta">
                          <span>Lancé par Sarah Chen • il y a 1 jour</span>
                          <span>dans Recherche d'équipe</span>
                        </div>
                      </div>
                      <span className="discussion-replies">8 réponses</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FAQ SCREEN */}
            {activeTab === 'faq' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <h2 className="slice-title">Questions Fréquentes (FAQ)</h2>
                  <FAQAccordion />
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>

    {/* Modale de confirmation réinitialisation workspace */}
    <ConfirmModal
      isOpen={confirmResetOpen}
      title="Réinitialiser le projet ?"
      message="Toutes vos données de brouillon (nom, pitch, équipe, détails) seront définitivement effacées. Cette action est irréversible."
      confirmLabel="Oui, réinitialiser"
      cancelLabel="Annuler"
      variant="warning"
      onConfirm={doResetWorkspace}
      onClose={() => setConfirmResetOpen(false)}
    />
    </>
  );
}

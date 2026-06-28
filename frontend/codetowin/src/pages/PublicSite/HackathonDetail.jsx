import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { hackathonsApi } from '../../api/hackathons';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmModal from '../../components/common/ConfirmModal';
import '../../styles/pages/participant/hackaton-detail.css';

import { marked } from 'marked';
import DOMPurify from 'dompurify';

import HackathonHero from '../../components/features/hackathon/detail/HackathonHero';
import HackathonTabs from '../../components/features/hackathon/detail/HackathonTabs';
import ProjectWorkspace from '../../components/features/hackathon/detail/ProjectWorkspace';
import FAQAccordion from '../../components/features/hackathon/detail/FAQAccordion';

export default function HackathonDetail() {
  const { workspaceState, registered, updateWorkspaceState, resetWorkspace } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState('overview');
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [participants, setParticipants] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [discussions, setDiscussions] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
  const [newDiscussionContent, setNewDiscussionContent] = useState('');
  const [showDiscussionForm, setShowDiscussionForm] = useState(false);
  const [submittingDiscussion, setSubmittingDiscussion] = useState(false);

  const [participantSearch, setParticipantSearch] = useState('');
  const [participantFilter, setParticipantFilter] = useState('Tous');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [location]);

  useEffect(() => {
    const fetchHackathonData = async () => {
      setLoading(true);
      try {
        const response = await hackathonsApi.getHackathonById(id || '1');
        const h = response.data || response;
        setHackathon({
          ...h,
          start: h.start_date || h.start,
          end: h.end_date || h.end,
          logoText: h.logo_text || h.logoText,
          participants: h.participants_count !== undefined ? h.participants_count : h.participants,
          online: h.type === 'En ligne' || h.online,
        });
      } catch (error) {
        console.error("Hackathon details failed to load", error);
        showToast("Impossible de charger les détails de ce hackathon.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchHackathonData();
  }, [id, showToast]);

  // Clear workspace if navigating to a different hackathon
  useEffect(() => {
    if (hackathon) {
      if (workspaceState.currentHackathonId && workspaceState.currentHackathonId !== hackathon.id) {
        resetWorkspace();
        updateWorkspaceState({ currentHackathonId: hackathon.id });
      } else if (!workspaceState.currentHackathonId) {
        updateWorkspaceState({ currentHackathonId: hackathon.id });
      }
    }
  }, [hackathon, workspaceState.currentHackathonId]);

  useEffect(() => {
    if (!hackathon) return;
    
    const fetchTabData = async () => {
      setLoadingData(true);
      try {
        if (activeTab === 'participants') {
          const res = await hackathonsApi.getRegistrations(hackathon.id);
          setParticipants(Array.isArray(res) ? res : (res.data || []));
        } else if (activeTab === 'updates') {
          const res = await hackathonsApi.getAnnouncements(hackathon.id);
          setAnnouncements(Array.isArray(res) ? res : (res.data || []));
        } else if (activeTab === 'discussions') {
          const res = await hackathonsApi.getDiscussions(hackathon.id);
          setDiscussions(Array.isArray(res) ? res : (res.data || []));
        }
      } catch (error) {
        console.error("Failed to load tab data", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchTabData();
  }, [activeTab, hackathon]);

  const [joining, setJoining] = useState(false);

  const handleHackathonJoin = async () => {
    if (!registered) {
      navigate('/auth/signup');
    } else {
      setJoining(true);
      try {
        await hackathonsApi.register(hackathon.id, { motivation: "Je veux participer !" });
        showToast("Vous avez rejoint le hackathon avec succès !", "success");
        setHackathon({ ...hackathon, is_registered: true });
        setActiveTab('my-project');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
           showToast(error.response.data.error, "error");
        } else {
           showToast("Erreur lors de l'inscription à ce hackathon.", "error");
        }
      } finally {
        setJoining(false);
      }
    }
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
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem 0' }}>
          <LoadingSpinner message="Chargement des détails du hackathon..." />
        </div>
      ) : hackathon ? (
        <>
          <HackathonHero 
            registered={registered} 
            setActiveTab={setActiveTab} 
            handleOnboardingJoin={handleHackathonJoin} 
            hackathon={hackathon}
          />

          <div className="layout-wrapper">
            <main className="content-pane">
              <HackathonTabs activeTab={activeTab} setActiveTab={setActiveTab} />

              <div className="screens-container">
                
                {/* OVERVIEW SCREEN */}
            {activeTab === 'overview' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <div className="textarea-render-body prose prose-sm max-w-none prose-slate"
                       dangerouslySetInnerHTML={{ __html: hackathon.overview ? DOMPurify.sanitize(marked.parse(hackathon.overview)) : '<p class="text-slate-500 italic">Aucune vue d\'ensemble fournie pour le moment.</p>' }}
                  />
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
                    handleOnboardingJoin={handleHackathonJoin}
                    isSubmitted={workspaceState.submitted}
                    setIsSubmitted={setIsSubmitted}
                    hackathon={hackathon}
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
                      <input 
                        type="text" 
                        placeholder="Cherche des potes, des skills..." 
                        value={participantSearch}
                        onChange={(e) => setParticipantSearch(e.target.value)}
                      />
                    </div>
                    <div className="filter-chips-list">
                      <span 
                        className={`filter-chip-item ${participantFilter === 'Tous' ? 'active' : ''}`}
                        onClick={() => setParticipantFilter('Tous')}
                      >
                        Tous
                      </span>
                      {Array.from(new Set(participants.flatMap(p => p.user?.skills || []))).filter(Boolean).slice(0, 5).map(skill => (
                        <span 
                          key={skill}
                          className={`filter-chip-item ${participantFilter === skill ? 'active' : ''}`}
                          onClick={() => setParticipantFilter(skill)}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="users-grid">
                    {loadingData ? (
                      <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center' }}>
                        <LoadingSpinner message="Chargement des participants..." />
                      </div>
                    ) : participants.length > 0 ? (
                      participants.filter(reg => {
                        const searchLower = participantSearch.toLowerCase();
                        const matchesSearch = !participantSearch || 
                          reg.user?.name?.toLowerCase().includes(searchLower) || 
                          reg.user?.skills?.some(s => s.toLowerCase().includes(searchLower));
                        const matchesFilter = participantFilter === 'Tous' || reg.user?.skills?.includes(participantFilter);
                        return matchesSearch && matchesFilter;
                      }).map(reg => (
                        <div className="user-profile-card" key={reg.id}>
                          <div className="user-avatar-wrap">
                            <img src={reg.user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(reg.user.name)}&background=random`} alt={reg.user.name} className="profile-avatar" />
                            <span className="user-status-dot"></span>
                          </div>
                          <div className="user-profile-details">
                            <span className="profile-name">{reg.user.name}</span>
                            <span className="profile-role">{reg.user.role || 'Participant'}</span>
                            <div className="profile-skills-tags">
                              {reg.user.skills?.map(skill => (
                                <span className="skill-tag" key={skill}>{skill}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>Aucun participant pour le moment.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* RESOURCES SCREEN */}
            {activeTab === 'resources' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <div className="textarea-render-body prose prose-sm max-w-none prose-slate"
                       dangerouslySetInnerHTML={{ __html: hackathon.resources ? DOMPurify.sanitize(marked.parse(hackathon.resources)) : '<p class="text-slate-500 italic">Aucune ressource fournie pour le moment.</p>' }}
                  />
                </div>
              </div>
            )}

            {/* RULES SCREEN */}
            {activeTab === 'rules' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <div className="textarea-render-body prose prose-sm max-w-none prose-slate"
                       dangerouslySetInnerHTML={{ __html: hackathon.rules ? DOMPurify.sanitize(marked.parse(hackathon.rules)) : '<p class="text-slate-500 italic">Aucune règle définie pour le moment.</p>' }}
                  />
                </div>
              </div>
            )}

            {/* UPDATES SCREEN */}
            {activeTab === 'updates' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <h2 className="slice-title">Les actus croustillantes 📰</h2>
                  <div className="updates-timeline">
                    {loadingData ? (
                      <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <LoadingSpinner message="Chargement des actus..." />
                      </div>
                    ) : announcements.length > 0 ? (
                      announcements.map(ann => (
                        <div className="update-item" key={ann.id}>
                          <span className="update-node"></span>
                          <div className="update-date">{new Date(ann.date).toLocaleDateString()}</div>
                          <h3 className="update-title">{ann.title}</h3>
                          <span className="update-author">par {ann.author || 'l\'Équipe'}</span>
                          <p className="update-body-text">{ann.content}</p>
                        </div>
                      ))
                    ) : (
                      <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Aucune actualité pour le moment.</p>
                    )}
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
                    {registered ? (
                      <button onClick={() => setShowDiscussionForm(!showDiscussionForm)} className="btn-action-primary">
                        {showDiscussionForm ? 'Annuler' : 'Nouveau truc à dire'}
                      </button>
                    ) : (
                      <button onClick={() => showToast("Connectez-vous pour participer.", "warning")} className="btn-action-primary">Nouveau truc à dire</button>
                    )}
                  </div>

                  {showDiscussionForm && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 shadow-sm">
                      <h3 className="text-lg font-bold text-slate-800 mb-4">Lancer une nouvelle discussion</h3>
                      <input 
                        type="text" 
                        value={newDiscussionTitle} 
                        onChange={(e) => setNewDiscussionTitle(e.target.value)} 
                        placeholder="Titre de la discussion" 
                        className="w-full mb-3 rounded-md border-slate-300 py-2 px-3 text-sm focus:border-brand-500 focus:ring-brand-500" 
                      />
                      <textarea 
                        value={newDiscussionContent} 
                        onChange={(e) => setNewDiscussionContent(e.target.value)} 
                        placeholder="De quoi voulez-vous parler ?" 
                        rows="4" 
                        className="w-full mb-3 rounded-md border-slate-300 py-2 px-3 text-sm focus:border-brand-500 focus:ring-brand-500" 
                      ></textarea>
                      <button 
                        onClick={async () => {
                          if (!newDiscussionTitle || !newDiscussionContent) {
                            showToast('Veuillez remplir le titre et le contenu.', 'error');
                            return;
                          }
                          setSubmittingDiscussion(true);
                          try {
                            const res = await hackathonsApi.createDiscussion(hackathon.id, { title: newDiscussionTitle, content: newDiscussionContent });
                            setDiscussions([res.data || res, ...discussions]);
                            setNewDiscussionTitle('');
                            setNewDiscussionContent('');
                            setShowDiscussionForm(false);
                            showToast('Discussion publiée !', 'success');
                          } catch (err) {
                            showToast('Erreur lors de la publication', 'error');
                          } finally {
                            setSubmittingDiscussion(false);
                          }
                        }}
                        disabled={submittingDiscussion}
                        className="btn-action-primary w-full text-center flex justify-center items-center"
                      >
                        {submittingDiscussion ? 'Publication...' : 'Publier'}
                      </button>
                    </div>
                  )}

                  <div className="discussions-pane">
                    {loadingData ? (
                      <div style={{ padding: '3rem', textAlign: 'center' }}>
                        <LoadingSpinner message="Chargement des discussions..." />
                      </div>
                    ) : discussions.length > 0 ? (
                      discussions.map(disc => (
                        <div className="discussion-item-card" key={disc.id}>
                          <img src={disc.author_avatar} alt={disc.author_name} className="w-10 h-10 rounded-full mr-4" />
                          <div className="discussion-info" style={{ flex: 1 }}>
                            <a href={`#discussion-${disc.id}`} onClick={(e) => e.preventDefault()} className="discussion-topic">{disc.title}</a>
                            <div className="discussion-meta text-xs text-slate-500 mt-1">
                              <span>Lancé par {disc.author_name} • {new Date(disc.created_at).toLocaleDateString()}</span>
                              {disc.category && <span> dans {disc.category}</span>}
                            </div>
                            <p className="text-sm text-slate-700 mt-2">{disc.content}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Soyez le premier à lancer une discussion !</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* FAQ SCREEN */}
            {activeTab === 'faq' && (
              <div className="tab-screen active">
                <div className="section-slice">
                  <h2 className="slice-title">Questions Fréquentes (FAQ)</h2>
                  <FAQAccordion faqs={hackathon.faqs} />
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '10rem 0' }}>
          <h2>Hackathon introuvable</h2>
          <p>Le hackathon que vous cherchez n'existe pas ou a été supprimé.</p>
        </div>
      )}
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

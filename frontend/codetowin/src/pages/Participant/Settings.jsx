import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import SecuritySettings from '../../components/features/settings/SecuritySettings';
import { usersApi } from '../../api/users';
import '../../styles/pages/participant/profile.css';

export default function ParticipantSettings() {
  const { profile, registerUser } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('privacy');

  // Privacy tab state
  const [keepProfilePublic, setKeepProfilePublic] = useState(true);
  const [showEmail, setShowEmail] = useState(true);
  const [showSocialLinks, setShowSocialLinks] = useState(true);
  const [allowTeammateSearch, setAllowTeammateSearch] = useState(true);
  const [allowRecruiterContact, setAllowRecruiterContact] = useState(true);
  const [savingPrivacy, setSavingPrivacy] = useState(false);

  // Notifications tab state
  const [notifDeadlines, setNotifDeadlines] = useState(true);
  const [notifFeedbacks, setNotifFeedbacks] = useState(true);
  const [notifTeamActivity, setNotifTeamActivity] = useState(true);
  const [notifCertificates, setNotifCertificates] = useState(true);
  const [savingNotifications, setSavingNotifications] = useState(false);

  // Pre-fill from context
  useEffect(() => {
    if (profile) {
      setKeepProfilePublic(profile.visibility !== 'members' && profile.isPublic !== false);
      if (profile.privacyPrefs) {
        setShowEmail(profile.privacyPrefs.showEmail !== false);
        setShowSocialLinks(profile.privacyPrefs.showSocialLinks !== false);
        setAllowTeammateSearch(profile.privacyPrefs.allowTeammateSearch !== false);
        setAllowRecruiterContact(profile.privacyPrefs.allowRecruiterContact !== false);
      }
      if (profile.notificationPrefs) {
        setNotifDeadlines(profile.notificationPrefs.deadlines !== false);
        setNotifFeedbacks(profile.notificationPrefs.feedbacks !== false);
        setNotifTeamActivity(profile.notificationPrefs.teamActivity !== false);
        setNotifCertificates(profile.notificationPrefs.certificates !== false);
      }
    }
  }, [profile]);

  const handlePrivacySubmit = async (e) => {
    e.preventDefault();
    if (profile) {
      setSavingPrivacy(true);
      try {
        const privacyData = {
          visibility: keepProfilePublic ? 'public' : 'members',
          isPublic: keepProfilePublic,
          privacyPrefs: {
            showEmail,
            showSocialLinks,
            allowTeammateSearch,
            allowRecruiterContact,
          }
        };
        await usersApi.updateProfile(privacyData);
        registerUser({
          ...profile,
          ...privacyData
        });
        if (showToast) {
          showToast('Paramètres de confidentialité mis à jour avec succès.', 'success');
        } else {
          alert('Paramètres de confidentialité mis à jour avec succès.');
        }
      } catch (error) {
        if (showToast) showToast("Erreur lors de la mise à jour des paramètres", "error");
      } finally {
        setSavingPrivacy(false);
      }
    }
  };

  const handleNotificationsSubmit = async (e) => {
    e.preventDefault();
    setSavingNotifications(true);
    try {
      if (profile) {
        const notifData = {
          notificationPrefs: {
            deadlines: notifDeadlines,
            feedbacks: notifFeedbacks,
            teamActivity: notifTeamActivity,
            certificates: notifCertificates,
          }
        };
        await usersApi.updateProfile(notifData);
        registerUser({
          ...profile,
          ...notifData
        });
        if (showToast) {
          showToast('Préférences de notifications enregistrées avec succès.', 'success');
        } else {
          alert('Préférences de notifications enregistrées avec succès.');
        }
      }
    } catch (error) {
      if (showToast) showToast("Erreur lors de l'enregistrement des notifications", "error");
    } finally {
      setSavingNotifications(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await usersApi.requestAccountDeletion();
      if (showToast) {
        showToast('Suppression du compte demandée.', 'warning');
      } else {
        alert('Suppression du compte demandée.');
      }
    } catch (error) {
      if (showToast) showToast("Erreur lors de la demande de suppression", "error");
    }
  };

  return (
    <div className="dashboard-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Tabs */}
      <div className="settings-tabs" style={{ marginTop: '1rem' }}>
        <button
          type="button"
          className={`settings-tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          Confidentialité
        </button>
        <button
          type="button"
          className={`settings-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Sécurité
        </button>
        <button
          type="button"
          className={`settings-tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </div>

      {activeTab === 'privacy' && (
        <div className="profile-card">
          <div className="profile-header" style={{ marginBottom: '2rem' }}>
            <h1>Paramètres de confidentialité</h1>
            <p>Configure comment tes données et ton profil sont partagés sur la plateforme.</p>
          </div>

          <form onSubmit={handlePrivacySubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Section 1: Profil Public */}
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--text)' }}>Visibilité du profil</h3>
                <div className="profile-visibility-card" style={{ marginBottom: 0 }}>
                  <div>
                    <label htmlFor="profile-public-toggle" className="form-label" style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text)' }}>
                      Garder mon profil public
                    </label>
                    <p>
                      Recommandé sur CodeToWin : ton profil, ton portfolio et tes réalisations restent visibles pour les visiteurs de la plateforme.
                    </p>
                  </div>
                  <label className="visibility-switch">
                    <input
                      id="profile-public-toggle"
                      type="checkbox"
                      checked={keepProfilePublic}
                      onChange={(e) => setKeepProfilePublic(e.target.checked)}
                    />
                    <span className="visibility-slider" />
                  </label>
                </div>
              </div>

              {/* Section 2: Données de Contact */}
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text)' }}>Informations &amp; Coordonnées</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <input
                      id="privacy-show-email"
                      type="checkbox"
                      checked={showEmail}
                      onChange={(e) => setShowEmail(e.target.checked)}
                      style={{ width: '1.2rem', height: '1.2rem', marginTop: '0.2rem', accentColor: 'var(--green)' }}
                    />
                    <div>
                      <label htmlFor="privacy-show-email" style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text)' }}>
                        Afficher mon adresse email publique
                      </label>
                      <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Permettre aux autres builders et mentors de voir mon adresse e-mail sur ma fiche de profil.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <input
                      id="privacy-show-social"
                      type="checkbox"
                      checked={showSocialLinks}
                      onChange={(e) => setShowSocialLinks(e.target.checked)}
                      style={{ width: '1.2rem', height: '1.2rem', marginTop: '0.2rem', accentColor: 'var(--green)' }}
                    />
                    <div>
                      <label htmlFor="privacy-show-social" style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text)' }}>
                        Afficher mes réseaux sociaux &amp; liens externes
                      </label>
                      <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Rendre visible mes liens vers GitHub, LinkedIn et mon portfolio personnel.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Section 3: Collaboration & Opportunités */}
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text)' }}>Collaboration &amp; Opportunités</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <input
                      id="privacy-teammate-search"
                      type="checkbox"
                      checked={allowTeammateSearch}
                      onChange={(e) => setAllowTeammateSearch(e.target.checked)}
                      style={{ width: '1.2rem', height: '1.2rem', marginTop: '0.2rem', accentColor: 'var(--green)' }}
                    />
                    <div>
                      <label htmlFor="privacy-teammate-search" style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text)' }}>
                        Rendre mon profil disponible pour la recherche d'équipiers
                      </label>
                      <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Apparaître dans la liste de recherche pour permettre aux chefs d'équipe de m'inviter à les rejoindre.
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <input
                      id="privacy-recruiter-contact"
                      type="checkbox"
                      checked={allowRecruiterContact}
                      onChange={(e) => setAllowRecruiterContact(e.target.checked)}
                      style={{ width: '1.2rem', height: '1.2rem', marginTop: '0.2rem', accentColor: 'var(--green)' }}
                    />
                    <div>
                      <label htmlFor="privacy-recruiter-contact" style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text)' }}>
                        Autoriser le contact par des recruteurs partenaires
                      </label>
                      <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Permettre aux entreprises et sponsors officiels du hackathon de me contacter pour des offres d'emploi ou de stage.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* ── Action buttons ── */}
            <div className="form-actions" style={{ marginTop: '2.5rem' }}>
              <button type="button" className="btn-action-secondary" onClick={() => navigate(-1)} disabled={savingPrivacy}>
                Annuler
              </button>
              <button type="submit" className="btn-action-primary" disabled={savingPrivacy}>
                {savingPrivacy ? "Enregistrement..." : "Enregistrer les modifications"}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6">
          <SecuritySettings onDeleteAccount={handleDeleteAccount} />
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="profile-card">
          <div className="profile-header" style={{ marginBottom: '2rem' }}>
            <h1>Préférences de notifications</h1>
            <p>Choisis les événements pour lesquels tu souhaites être alerté par e-mail.</p>
          </div>

          <form onSubmit={handleNotificationsSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', border: '1px solid var(--line)', borderRadius: '0.75rem', background: '#f8fafc' }}>
                <input
                  id="notif-deadlines"
                  type="checkbox"
                  checked={notifDeadlines}
                  onChange={(e) => setNotifDeadlines(e.target.checked)}
                  style={{ width: '1.2rem', height: '1.2rem', marginTop: '0.2rem', accentColor: 'var(--green)' }}
                />
                <div>
                  <label htmlFor="notif-deadlines" className="form-label" style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text)' }}>
                    Rappels de deadlines
                  </label>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Recevoir des e-mails de rappel pour la soumission finale des projets (par exemple à 24h et 8h de la clôture).
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', border: '1px solid var(--line)', borderRadius: '0.75rem', background: '#f8fafc' }}>
                <input
                  id="notif-feedbacks"
                  type="checkbox"
                  checked={notifFeedbacks}
                  onChange={(e) => setNotifFeedbacks(e.target.checked)}
                  style={{ width: '1.2rem', height: '1.2rem', marginTop: '0.2rem', accentColor: 'var(--green)' }}
                />
                <div>
                  <label htmlFor="notif-feedbacks" className="form-label" style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text)' }}>
                    Feedbacks des mentors
                  </label>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Être alerté dès qu'un mentor dépose des commentaires ou des évaluations sur le projet de ton équipe.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', border: '1px solid var(--line)', borderRadius: '0.75rem', background: '#f8fafc' }}>
                <input
                  id="notif-team-activity"
                  type="checkbox"
                  checked={notifTeamActivity}
                  onChange={(e) => setNotifTeamActivity(e.target.checked)}
                  style={{ width: '1.2rem', height: '1.2rem', marginTop: '0.2rem', accentColor: 'var(--green)' }}
                />
                <div>
                  <label htmlFor="notif-team-activity" className="form-label" style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text)' }}>
                    Invitations &amp; Activité d'équipe
                  </label>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Être averti lorsqu'un membre rejoint l'équipe, lorsqu'un rôle est modifié, ou pour des rappels de tâches assignées.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem', border: '1px solid var(--line)', borderRadius: '0.75rem', background: '#f8fafc' }}>
                <input
                  id="notif-certificates"
                  type="checkbox"
                  checked={notifCertificates}
                  onChange={(e) => setNotifCertificates(e.target.checked)}
                  style={{ width: '1.2rem', height: '1.2rem', marginTop: '0.2rem', accentColor: 'var(--green)' }}
                />
                <div>
                  <label htmlFor="notif-certificates" className="form-label" style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text)' }}>
                    Certificats &amp; Résultats
                  </label>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                    Recevoir un e-mail dès que vos certificats de participation ou de finaliste sont disponibles au téléchargement.
                  </p>
                </div>
              </div>

            </div>

            {/* ── Action buttons ── */}
            <div className="form-actions" style={{ marginTop: '2.5rem' }}>
              <button type="button" className="btn-action-secondary" onClick={() => navigate(-1)} disabled={savingNotifications}>
                Annuler
              </button>
              <button type="submit" className="btn-action-primary" disabled={savingNotifications}>
                {savingNotifications ? 'Enregistrement...' : 'Enregistrer les modifications'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

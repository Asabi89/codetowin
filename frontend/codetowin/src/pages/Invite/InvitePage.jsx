import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { teamsApi } from '../../api/teams';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/pages/invite.css';

export default function InvitePage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [status, setStatus] = useState('loading'); // loading | joining | success | error | not_auth
  const [message, setMessage] = useState('');
  const [teamInfo, setTeamInfo] = useState(null);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage("Lien d'invitation invalide.");
      return;
    }

    if (!isAuthenticated) {
      // Store token in sessionStorage and redirect to login
      sessionStorage.setItem('pendingInviteToken', token);
      setStatus('not_auth');
      return;
    }

    // Authenticated — try to join immediately
    handleJoin();
  }, [token, isAuthenticated]);

  const handleJoin = async () => {
    setStatus('joining');
    try {
      const data = await teamsApi.joinTeamByToken(token);
      setTeamInfo(data);
      setStatus('success');
      setMessage(data.status || "Vous avez rejoint l'équipe avec succès !");
      // Redirect to hackathon workspace after 3s
      setTimeout(() => {
        navigate('/participant', { replace: true });
      }, 3000);
    } catch (err) {
      setStatus('error');
      const errMsg = err?.response?.data?.error || err?.message || "Lien d'invitation invalide ou expiré.";
      setMessage(errMsg);
    }
  };

  const handleLoginRedirect = () => {
    navigate(`/login?redirect=/invite/${token}`);
  };

  const handleRegisterRedirect = () => {
    navigate(`/register?redirect=/invite/${token}`);
  };

  return (
    <div className="invite-page">
      <div className="invite-card">
        {/* Logo */}
        <div className="invite-logo">
          <span className="invite-logo-text">CodeToWin</span>
        </div>

        {status === 'loading' && (
          <div className="invite-content">
            <div className="invite-spinner" />
            <h2>Vérification du lien...</h2>
            <p>Un instant, nous vérifions votre invitation.</p>
          </div>
        )}

        {status === 'not_auth' && (
          <div className="invite-content">
            <div className="invite-icon">🔗</div>
            <h2>Vous avez été invité !</h2>
            <p>Connectez-vous ou créez un compte pour rejoindre l'équipe.</p>
            <div className="invite-actions">
              <button className="invite-btn-primary" onClick={handleLoginRedirect}>
                Se connecter
              </button>
              <button className="invite-btn-secondary" onClick={handleRegisterRedirect}>
                Créer un compte
              </button>
            </div>
          </div>
        )}

        {status === 'joining' && (
          <div className="invite-content">
            <div className="invite-spinner" />
            <h2>Rejoindre l'équipe...</h2>
            <p>Nous vous ajoutons à l'équipe en cours.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="invite-content">
            <div className="invite-icon success">✅</div>
            <h2>Bienvenue dans l'équipe !</h2>
            <p>{message}</p>
            <p className="invite-redirect-hint">Redirection vers votre espace dans 3 secondes...</p>
            <button className="invite-btn-primary" onClick={() => navigate('/participant')}>
              Aller à mon espace
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="invite-content">
            <div className="invite-icon error">❌</div>
            <h2>Lien invalide</h2>
            <p>{message}</p>
            <div className="invite-actions">
              <button className="invite-btn-primary" onClick={() => navigate('/participant')}>
                Mon espace
              </button>
              <button className="invite-btn-secondary" onClick={() => navigate('/')}>
                Accueil
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

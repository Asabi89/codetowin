import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/error.css';

export default function ServerError() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Erreur interne (500) | CodeToWin";
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="error-page-container">
      <div className="error-content-card">
        <div className="error-illustration-wrap">
          <img 
            src="/assets/illustrations/errors/error-500.png" 
            alt="Page 500 Erreur serveur" 
            className="error-illustration" 
          />
        </div>
        
        <span className="error-badge error-badge--500">ERREUR SERVEUR (500)</span>
        <h1 className="error-title">Une panne inattendue s'est produite.</h1>
        <p className="error-description">
          Nos serveurs ont rencontré un problème interne temporaire. Essayez de rafraîchir la page, ou revenez un peu plus tard.
        </p>

        <div className="error-actions">
          <button 
            type="button" 
            onClick={handleRetry} 
            className="btn-error-primary"
          >
            Réessayer / Rafraîchir
          </button>
          <button 
            type="button" 
            onClick={handleGoHome} 
            className="btn-error-secondary"
          >
            Aller à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}

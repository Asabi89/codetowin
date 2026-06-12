import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/error.css';

export default function Forbidden() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Accès refusé (403) | CodeToWin";
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="error-page-container">
      <div className="error-content-card">
        <div className="error-illustration-wrap">
          <img 
            src="/assets/illustrations/errors/error-403.png" 
            alt="Page 403 Accès interdit" 
            className="error-illustration" 
          />
        </div>
        
        <span className="error-badge error-badge--403">ACCÈS RESTREINT (403)</span>
        <h1 className="error-title">Accès non autorisé !</h1>
        <p className="error-description">
          Vous n'avez pas les permissions requises pour consulter cette ressource. Veuillez vous assurer d'être connecté avec le bon type de compte.
        </p>

        <div className="error-actions">
          <button 
            type="button" 
            onClick={handleGoBack} 
            className="btn-error-primary"
          >
            Retourner en arrière
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

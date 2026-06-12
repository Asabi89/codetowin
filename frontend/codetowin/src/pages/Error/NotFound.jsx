import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/pages/error.css';

export default function NotFound() {
  const navigate = useNavigate();
  const { registered, role } = useContext(AuthContext);

  useEffect(() => {
    document.title = "Page introuvable (404) | CodeToWin";
    // Optional: add meta description dynamically if needed
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoDashboard = () => {
    if (!registered) {
      navigate('/login');
      return;
    }
    if (role === 'organizer') {
      navigate('/organizer');
    } else if (role === 'mentor') {
      navigate('/mentor');
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="error-page-container">
      <div className="error-content-card">
        <div className="error-illustration-wrap">
          <img 
            src="/assets/illustrations/errors/error-404.png" 
            alt="Page 404 introuvable" 
            className="error-illustration" 
          />
        </div>
        
        <span className="error-badge error-badge--404">ERREUR 404</span>
        <h1 className="error-title">Oups ! Cette page s'est perdue dans le code.</h1>
        <p className="error-description">
          Le chemin que vous avez suivi n'existe pas ou la page a été déplacée. Pas de panique, vous pouvez facilement rebrousser chemin.
        </p>

        <div className="error-actions">
          <button 
            type="button" 
            onClick={handleGoHome} 
            className="btn-error-primary"
          >
            Retourner à l'accueil
          </button>
          <button 
            type="button" 
            onClick={handleGoDashboard} 
            className="btn-error-secondary"
          >
            {registered ? "Accéder à mon espace" : "Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
}

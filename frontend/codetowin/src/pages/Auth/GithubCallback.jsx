import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function GithubCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { socialLogin } = useContext(AuthContext);
  const { showToast } = useToast();
  const [error, setError] = useState('');

  useEffect(() => {
    const processGithubAuth = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const role = params.get('role') || 'participant';

      if (!code) {
        setError('Aucun code d\'autorisation trouvé.');
        return;
      }

      try {
        await socialLogin('github', code, role);
        const redirectPath = role === 'participant' ? '/participant/hackathons' : role === 'organizer' ? '/organizer/dashboard' : '/mentor/hackathons';
        navigate(redirectPath, { replace: true });
        showToast('Connexion GitHub réussie.', 'success');
      } catch (err) {
        console.error('Erreur Github Auth:', err);
        setError('Échec de l\'authentification GitHub.');
        showToast('Échec de la connexion GitHub.', 'error');
        navigate('/login/' + role, { replace: true });
      }
    };

    processGithubAuth();
  }, [location, socialLogin, navigate, showToast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      {error ? (
        <div className="text-red-500 font-medium">{error}</div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Authentification GitHub en cours...</p>
        </div>
      )}
    </div>
  );
}

import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import '../../styles/pages/auth/signup.css';

const validSignupRoles = ['participant', 'organizer', 'mentor'];

const roleLabels = {
  participant: {
    title: 'Développeur',
    heading: 'Rejoins-nous !',
    subtitle: 'Crée ton compte et commence à bâtir.',
    redirectTo: '/profile',
  },
  organizer: {
    title: 'Organisateur',
    heading: 'Crée ton espace organisateur',
    subtitle: 'Ton compte sera configuré pour publier et gérer des hackathons.',
    redirectTo: '/organizer/hackathons/create',
  },
  mentor: {
    title: 'Mentor',
    heading: 'Crée ton espace mentor',
    subtitle: 'Ton compte sera configuré pour accompagner des équipes.',
    redirectTo: '/mentor',
  },
};

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { registerUser } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const requestedRole = new URLSearchParams(location.search).get('role');
  const role = validSignupRoles.includes(requestedRole) ? requestedRole : 'participant';
  const roleContext = roleLabels[role];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      showToast("Les mots de passe ne correspondent pas.", "danger");
      return;
    }
    // Generate a 6-digit verification code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Redirect to verify email, passing state
    navigate('/verify-email', {
      state: {
        email: email,
        username: username,
        otpCode: generatedOtp,
        role: role
      }
    });
  };

  const handleSocialSignup = (provider) => {
    // Simulate social signup
    registerUser({
      firstName: `${provider}User`,
      lastName: '',
      email: `${provider.toLowerCase()}user@codetowin.com`,
      role: role,
      title: roleContext.title,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
    });
    
    navigate(roleContext.redirectTo);
  };

  return (
    <div className="signup-page-wrapper">
      <div className="auth-container">
        <div className="brand-header">
          <Link to="/">
            <img src="/assets/brand/codetowin-brand.png" alt="CodeToWin" className="brand-mark" />
          </Link>
          <h1 className="auth-title">{roleContext.heading}</h1>
          <p className="auth-subtitle">{roleContext.subtitle}</p>
        </div>

        <div className="social-login">
          <button type="button" onClick={() => handleSocialSignup('GitHub')} className="btn-social">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Continuer avec GitHub
          </button>
          <button type="button" onClick={() => handleSocialSignup('Google')} className="btn-social">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuer avec Google
          </button>
        </div>

        <div className="divider">ou avec un email, à l'ancienne</div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">Pseudo</label>
            <input
              type="text"
              id="username"
              className="form-input"
              required
              placeholder="Choisis un pseudo sympa"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Adresse Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              required
              placeholder="toi@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="form-input"
              required
              placeholder="Un mot de passe costaud"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password_confirm" className="form-label">Confirme ton mot de passe</label>
            <input
              type="password"
              id="password_confirm"
              className="form-input"
              required
              placeholder="Répète-le pour être sûr"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">Je m'inscris !</button>
        </form>

        <div className="auth-footer">
          T'as déjà un compte ? <Link to="/login" className="auth-link">Connecte-toi ici</Link>
        </div>
      </div>
    </div>
  );
}

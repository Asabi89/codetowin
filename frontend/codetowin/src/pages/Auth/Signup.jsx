import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { authApi } from '../../api/auth';
import '../../styles/pages/auth/signup.css';

const validSignupRoles = ['participant', 'organizer', 'mentor'];

const roleLabels = {
  participant: {
    title: 'Développeur',
    heading: 'Rejoins-nous !',
    subtitle: 'Crée ton compte, puis choisis l’espace qui correspond à ton usage.',
    redirectTo: '/choose-role',
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
  const [fieldErrors, setFieldErrors] = useState({});
  const { registerUser } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const requestedRole = new URLSearchParams(location.search).get('role');
  const hasExplicitRole = validSignupRoles.includes(requestedRole);
  const role = hasExplicitRole ? requestedRole : 'participant';
  const roleContext = roleLabels[role];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});

    if (password !== passwordConfirm) {
      setFieldErrors({ password: "Les mots de passe ne correspondent pas." });
      return;
    }

    try {
      // Check availability before proceeding
      await authApi.checkAvailability(email, username);
    } catch (err) {
      if (err.message) {
        try {
          const parsedErrors = JSON.parse(err.message);
          setFieldErrors(parsedErrors);
        } catch(e) {
          setFieldErrors({ general: err.message });
        }
      }
      return; // Stop submission
    }

    // Generate a 6-digit verification code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Log OTP to terminal
    authApi.logOtp(email, generatedOtp).catch(console.error);
    
    if (hasExplicitRole) {
      // Redirect to verify email, passing state
      navigate('/verify-email', {
        state: {
          email: email,
          username: username,
          password: password,
          otpCode: generatedOtp,
          role: role,
          hasExplicitRole: true
        }
      });
    } else {
      // Redirect to choose role first
      navigate('/choose-role', {
        state: {
          email: email,
          username: username,
          password: password,
          otpCode: generatedOtp,
          fromSignup: true,
          hasExplicitRole: false
        }
      });
    }
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
    
    navigate(hasExplicitRole ? roleContext.redirectTo : '/choose-role');
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



        <form className="auth-form" onSubmit={handleSubmit}>
          {fieldErrors.general && <div className="inline-error-message">{fieldErrors.general}</div>}

          <div className="form-group">
            <label htmlFor="username" className="form-label">Pseudo</label>
            <input
              type="text"
              id="username"
              className={`form-input ${fieldErrors.username ? 'input-error' : ''}`}
              required
              placeholder="Choisis un pseudo sympa"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {fieldErrors.username && <div className="field-error-text">{fieldErrors.username}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Adresse Email</label>
            <input
              type="email"
              id="email"
              className={`form-input ${fieldErrors.email ? 'input-error' : ''}`}
              required
              placeholder="toi@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {fieldErrors.email && <div className="field-error-text">{fieldErrors.email}</div>}
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
              className={`form-input ${fieldErrors.password ? 'input-error' : ''}`}
              required
              placeholder="Répète-le pour être sûr"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            {fieldErrors.password && <div className="field-error-text">{fieldErrors.password}</div>}
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

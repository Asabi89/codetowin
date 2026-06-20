import React, { useState, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { DEMO_ACCOUNTS, getDemoAccount, getRoleHome } from '../../mockdata/demoAccounts';
import '../../styles/pages/auth/login.css';

const roleFromPath = (pathname = '') => {
  if (pathname.startsWith('/mentor')) return 'mentor';
  if (pathname.startsWith('/organizer')) return 'organizer';
  return null;
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const resolveRedirect = (loginEmail) => {
    const demoAccount = getDemoAccount(loginEmail);
    if (from && from !== '/' && from !== '/login') {
      return from;
    }
    return demoAccount?.redirectTo || getRoleHome(demoAccount?.role || roleFromPath(from) || 'participant');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginEmail = email;
    if (!loginEmail || !password) {
       // Should be handled by required attribute, but just in case
       return;
    }
    
    try {
      setErrorMsg('');
      await login(loginEmail, password);
      navigate(resolveRedirect(loginEmail), { replace: true });
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setErrorMsg("Identifiants incorrects ou compte inexistant.");
    }
  };

  const handleSocialLogin = (provider) => {
    // Simulate social login
    const loginEmail = `${provider.toLowerCase()}user@codetowin.com`;
    const targetRole = roleFromPath(from) || 'participant';
    login(loginEmail, { role: targetRole });
    navigate(from && from !== '/' ? from : getRoleHome(targetRole), { replace: true });
  };

  const handleDemoLogin = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    login(account.email, { role: account.role });
    navigate(account.redirectTo || getRoleHome(account.role), { replace: true });
  };

  return (
    <div className="login-page-wrapper">
      <div className="auth-container">
        <div className="brand-header">
          <Link to="/">
            <img src="/assets/brand/codetowin-brand.png" alt="CodeToWin" className="brand-mark" />
          </Link>
          <h1 className="auth-title">Te revoilà !</h1>
          <p className="auth-subtitle">Connecte-toi pour continuer l'aventure.</p>
        </div>





        <form className="auth-form" onSubmit={handleSubmit}>
          {errorMsg && <div className="inline-error-message">{errorMsg}</div>}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email ou pseudo</label>
            <input
              type="text"
              id="email"
              className="form-input"
              required
              placeholder="Entre ton email ou ton pseudo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <div className="form-header-group">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <Link to="/forgot-password" className="forgot-link">
                Mot de passe oublié ?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              className="form-input"
              required
              placeholder="Entre ton mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary">C'est parti !</button>
        </form>

        <div className="auth-footer">
          T'as pas encore de compte ? <Link to="/signup" className="auth-link">Viens t'inscrire !</Link>
        </div>
      </div>
    </div>
  );
}

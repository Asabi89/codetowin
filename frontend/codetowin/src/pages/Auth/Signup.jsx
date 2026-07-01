import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useGoogleLogin } from '@react-oauth/google';
import { authApi } from '../../api/auth';

const validSignupRoles = ['participant', 'organizer', 'mentor'];

const roleLabels = {
  participant: {
    title: 'Développeur',
    heading: 'Rejoins-nous !',
    subtitle: 'Crée ton compte participant',
    redirectTo: '/choose-role',
    sideBg: 'bg-brand-100',
    sideImage: "/assets/illustrations/1000353279.png"
  },
  organizer: {
    title: 'Organisateur',
    heading: 'Crée ton espace',
    subtitle: 'Publie et gère des hackathons',
    redirectTo: '/organizer/hackathons/create',
    sideBg: 'bg-emerald-100',
    sideImage: "https://illustrations.popsy.co/amber/student-going-to-school.svg"
  },
  mentor: {
    title: 'Mentor',
    heading: 'Deviens Mentor',
    subtitle: 'Accompagne les équipes',
    redirectTo: '/mentor',
    sideBg: 'bg-green-100',
    sideImage: "https://illustrations.popsy.co/amber/teaching.svg"
  },
};

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const { registerUser, socialLogin } = useContext(AuthContext);
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
      return;
    }

    try {
      await authApi.sendOtp(email);
    } catch (err) {
      console.error(err);
      setFieldErrors({ general: "Erreur lors de l'envoi du code de vérification." });
      return;
    }
    
    if (hasExplicitRole) {
      navigate('/verify-email', {
        state: { email, username, password, role, hasExplicitRole: true }
      });
    } else {
      navigate('/choose-role', {
        state: { email, username, password, fromSignup: true, hasExplicitRole: false }
      });
    }
  };

  const handleGoogleLoginSuccess = async (tokenResponse) => {
    try {
      await socialLogin('google', tokenResponse.access_token, role);
      navigate(hasExplicitRole ? roleContext.redirectTo : '/choose-role');
    } catch (err) {
      console.error(err);
      setFieldErrors({ general: "Erreur lors de l'inscription Google." });
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: () => setFieldErrors({ general: "Échec de la connexion Google" }),
  });

  const handleGithubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID || 'YOUR_GITHUB_CLIENT_ID';
    const redirectUri = window.location.origin + '/oauth/github/callback?role=' + role;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow-xl sm:rounded-2xl flex justify-center flex-1 overflow-hidden">
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 overflow-y-auto">
                <div>
                    <Link to="/">
                      <img src="/assets/brand/codetowin-brand.png" alt="CodeToWin" className="h-8 mx-auto" />
                    </Link>
                </div>
                <div className="mt-8 flex flex-col items-center">
                    <h1 className="text-2xl xl:text-3xl font-extrabold text-center text-slate-800">
                        {roleContext.heading}
                    </h1>
                    <p className="text-sm text-slate-500 mt-2">{roleContext.subtitle}</p>
                    <div className="w-full flex-1 mt-6">
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => googleLogin()}
                                type="button"
                                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-brand-50 text-brand-900 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                <div className="bg-white p-2 rounded-full">
                                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                                        <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                                        <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                                        <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                                        <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                                    </svg>
                                </div>
                                <span className="ml-4">S'inscrire avec Google</span>
                            </button>

                            <button
                                onClick={handleGithubLogin}
                                type="button"
                                className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-brand-50 text-brand-900 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                                <div className="bg-white p-1 rounded-full">
                                    <svg className="w-6" viewBox="0 0 32 32">
                                        <path fillRule="evenodd" d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z" />
                                    </svg>
                                </div>
                                <span className="ml-4">S'inscrire avec GitHub</span>
                            </button>
                        </div>

                        <div className="my-8 border-b text-center">
                            <div className="leading-none px-2 inline-block text-sm text-slate-500 tracking-wide font-medium bg-white transform translate-y-1/2">
                                Ou par e-mail
                            </div>
                        </div>

                        <form className="mx-auto max-w-xs" onSubmit={handleSubmit}>
                            {fieldErrors.general && <div className="text-red-500 text-sm mb-4 text-center font-medium">{fieldErrors.general}</div>}
                            
                            <input
                                className={`w-full px-8 py-4 rounded-lg font-medium bg-slate-50 border ${fieldErrors.username ? 'border-red-400' : 'border-slate-200'} placeholder-slate-400 text-sm focus:outline-none focus:border-brand-400 focus:bg-white focus:ring-1 focus:ring-brand-400 transition-colors`}
                                type="text" placeholder="Pseudo"
                                value={username} onChange={(e) => setUsername(e.target.value)} required />
                            {fieldErrors.username && <p className="text-red-500 text-xs mt-1">{fieldErrors.username}</p>}

                            <input
                                className={`w-full px-8 py-4 rounded-lg font-medium bg-slate-50 border ${fieldErrors.email ? 'border-red-400' : 'border-slate-200'} placeholder-slate-400 text-sm focus:outline-none focus:border-brand-400 focus:bg-white focus:ring-1 focus:ring-brand-400 transition-colors mt-4`}
                                type="email" placeholder="Adresse Email"
                                value={email} onChange={(e) => setEmail(e.target.value)} required />
                            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}

                            <input
                                className={`w-full px-8 py-4 rounded-lg font-medium bg-slate-50 border ${fieldErrors.password ? 'border-red-400' : 'border-slate-200'} placeholder-slate-400 text-sm focus:outline-none focus:border-brand-400 focus:bg-white focus:ring-1 focus:ring-brand-400 transition-colors mt-4`}
                                type="password" placeholder="Mot de passe"
                                value={password} onChange={(e) => setPassword(e.target.value)} required />

                            <input
                                className={`w-full px-8 py-4 rounded-lg font-medium bg-slate-50 border ${fieldErrors.password ? 'border-red-400' : 'border-slate-200'} placeholder-slate-400 text-sm focus:outline-none focus:border-brand-400 focus:bg-white focus:ring-1 focus:ring-brand-400 transition-colors mt-4`}
                                type="password" placeholder="Confirmer le mot de passe"
                                value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
                            {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}

                            <button
                                type="submit"
                                className="mt-5 tracking-wide font-semibold bg-brand-600 text-white w-full py-4 rounded-lg hover:bg-brand-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                    <path d="M20 8v6M23 11h-6" />
                                </svg>
                                <span className="ml-3">S'inscrire</span>
                            </button>
                            <p className="mt-6 text-xs text-slate-600 text-center">
                                J'accepte les{' '}
                                <Link to="/conditions" className="border-b border-brand-500 border-dotted text-brand-600 hover:text-brand-800">
                                    Conditions d'utilisation
                                </Link>{' '}
                                et la{' '}
                                <Link to="/politique" className="border-b border-brand-500 border-dotted text-brand-600 hover:text-brand-800">
                                    Politique de confidentialité
                                </Link>
                                {' '}de CodeToWin.
                            </p>
                            <p className="mt-4 text-sm text-slate-600 text-center font-medium">
                                Déjà un compte ?{' '}
                                <Link to={`/login/${role}`} className="border-b border-brand-500 border-dotted text-brand-600 hover:text-brand-800">
                                    Se connecter
                                </Link>
                            </p>

                            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-2">
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Vous n'êtes pas {role === 'participant' ? 'participant' : role === 'mentor' ? 'mentor' : 'organisateur'} ?</p>
                                <div className="flex gap-4 text-xs">
                                    {role !== 'participant' && <Link to="/signup?role=participant" className="text-slate-600 hover:text-brand-600 font-medium">Inscription Participant</Link>}
                                    {role !== 'organizer' && <Link to="/signup?role=organizer" className="text-slate-600 hover:text-brand-600 font-medium">Inscription Organisateur</Link>}
                                    {role !== 'mentor' && <Link to="/signup?role=mentor" className="text-slate-600 hover:text-brand-600 font-medium">Inscription Mentor</Link>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className={`flex-1 ${roleContext.sideBg} text-center hidden lg:flex items-center justify-center`}>
                <div className="w-full h-full bg-contain bg-center bg-no-repeat m-6 xl:m-8 scale-110"
                    style={{ backgroundImage: `url('${roleContext.sideImage}')` }}>
                </div>
            </div>
        </div>
    </div>
  );
}

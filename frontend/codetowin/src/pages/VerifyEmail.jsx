import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/css/verify-email.css';

export default function VerifyEmail() {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve state passed from signup page
  const signupData = location.state || null;
  const email = signupData?.email || '';
  const username = signupData?.username || '';
  const initialOtp = signupData?.otpCode || '123456';

  // OTP inputs state (6 digits)
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(59);
  const [currentOtpCode, setCurrentOtpCode] = useState(initialOtp);

  // Refs for focusing inputs
  const inputRefs = useRef([]);

  // Countdown timer effect
  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(() => {
        setResendCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  // Log the active OTP to console for easy developer testing
  useEffect(() => {
    if (email) {
      console.log(`[TESTING] OTP Code for ${email} is: ${currentOtpCode}`);
    }
  }, [currentOtpCode, email]);

  // Handle changes in the digit boxes
  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ''); // Allow digits only
    if (!value) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      return;
    }

    // Take the last character typed
    const digit = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto focus next input
    if (index < 5 && element.value !== '') {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle keydown for backspace deletion
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        // If current digit is empty, focus previous and clear it
        if (index > 0) {
          const newOtp = [...otp];
          newOtp[index - 1] = '';
          setOtp(newOtp);
          inputRefs.current[index - 1].focus();
        }
      } else {
        // Clear current digit
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  // Handle pasting of full OTP codes (e.g. 123456)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (pastedData.length === 6) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  // Resend code simulated logic
  const handleResendCode = () => {
    // Generate a new 6-digit random OTP code
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCurrentOtpCode(newCode);
    setOtp(new Array(6).fill(''));
    setErrorMsg('');
    setResendCountdown(59);
    alert(`Un nouveau code de vérification a été simulé. Vérifiez votre console !`);
    inputRefs.current[0].focus();
  };

  // Submit and verify code
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    
    if (enteredCode.length !== 6) {
      setErrorMsg('Veuillez entrer le code de 6 chiffres.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    // Simulate network delay
    setTimeout(() => {
      if (enteredCode === currentOtpCode) {
        // Register/authenticate mock user state
        registerUser({
          firstName: username || 'User',
          lastName: '',
          email: email || 'user@codetowin.com',
          title: 'Développeur',
          about: '',
          bio: '',
          skills: 'React, Tailwind',
          interests: 'Hackathons',
          city: '',
          country: '',
          github: '',
          linkedin: '',
          website: '',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
        });
        
        setIsVerifying(false);
        // Direct to profile completion page so they complete profile details
        navigate('/profile');
      } else {
        setIsVerifying(false);
        setErrorMsg('Code incorrect. Veuillez réessayer ou demander un nouveau code.');
      }
    }, 1000);
  };

  // Fallback layout if user accesses page directly without signup state
  if (!signupData) {
    return (
      <div className="verify-email-page-wrapper">
        <div className="verify-container">
          <div className="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h1 className="verify-title">Accès non autorisé</h1>
          <p className="verify-subtitle">
            Veuillez d'abord vous inscrire pour recevoir un code de vérification par email.
          </p>
          <div className="back-to-auth">
            <Link to="/signup" className="back-link">&larr; Retour à l'inscription</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="verify-email-page-wrapper">
      <div className="verify-container">
        {/* Verification Icon (animated pulse ring) */}
        <div className="icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>

        <h1 className="verify-title">Vérifie ton email</h1>
        <p className="verify-subtitle">
          Un code de vérification à 6 chiffres a été envoyé à l'adresse <br />
          <span className="verify-email-bold">{email}</span>. <br />
          Entre-le ci-dessous pour valider ton inscription.
        </p>

        {errorMsg && (
          <div style={{ color: '#ef4444', fontSize: '0.88rem', fontWeight: 600, marginBottom: '1.25rem', padding: '0.5rem 1rem', background: '#fef2f2', borderRadius: '8px' }}>
            {errorMsg}
          </div>
        )}

        <form className="otp-form" onSubmit={handleSubmit}>
          {/* OTP Digit Inputs */}
          <div className="otp-inputs-row" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength="1"
                className={`otp-digit-input ${digit ? 'filled' : ''}`}
                value={digit}
                onChange={e => handleChange(e.target, index)}
                onKeyDown={e => handleKeyDown(e, index)}
                disabled={isVerifying}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button type="submit" className="btn-verify" disabled={isVerifying}>
            {isVerifying ? 'Vérification en cours...' : 'Confirmer mon adresse'}
          </button>
        </form>

        {/* Resend Action */}
        <div className="resend-box">
          {resendCountdown > 0 ? (
            <span>Renvoyer le code dans <strong style={{ color: 'var(--text)' }}>{resendCountdown}s</strong></span>
          ) : (
            <span>
              Je n'ai pas reçu le code.{' '}
              <button type="button" className="btn-resend" onClick={handleResendCode}>
                Renvoyer
              </button>
            </span>
          )}
        </div>

        {/* Change email link */}
        <div className="back-to-auth">
          <Link to="/signup" className="back-link">&larr; Modifier l'adresse email</Link>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function PublicFooter() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      showToast("Inscription à la newsletter validée avec succès !", "success");
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12 overflow-hidden">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand & Socials */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block transition-opacity hover:opacity-90">
              <img
                src="/assets/brand/codetowin-brand.png"
                alt="CodeToWin"
                className="h-9 w-auto filter brightness-0 invert"
                decoding="async"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              CodeToWin relie les talents tech africains et les organisateurs autour de projets concrets, de profils publics et de preuves vérifiables.
            </p>
            
            {/* Elegant Social Icon Pill Buttons */}
            <div className="flex gap-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950/50 text-slate-400 border border-slate-800/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white hover:border-brand-500 hover:shadow-lg hover:shadow-brand-600/20" 
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950/50 text-slate-400 border border-slate-800/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white hover:border-brand-500 hover:shadow-lg hover:shadow-brand-600/20" 
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950/50 text-slate-400 border border-slate-800/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white hover:border-brand-500 hover:shadow-lg hover:shadow-brand-600/20" 
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950/50 text-slate-400 border border-slate-800/80 transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white hover:border-brand-500 hover:shadow-lg hover:shadow-brand-600/20" 
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explorer Column */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Explorer</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/hackathons" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Hackathons
                </Link>
              </li>
              <li>
                <Link to="/participer" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Participer
                </Link>
              </li>
              <li>
                <Link to="/organiser" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Organiser
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Aide & Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors duration-200">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/aide" className="text-slate-400 hover:text-white transition-colors duration-200">
                  FAQ & Aide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Newsletter</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Rejoignez notre newsletter pour recevoir les opportunités de hackathons directement dans votre boîte.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex rounded-lg overflow-hidden border border-slate-800 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all duration-200">
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com" 
                className="bg-slate-950/40 text-white placeholder-slate-500 text-xs px-3.5 py-2.5 outline-none border-0 flex-1 min-w-0"
              />
              <button 
                type="submit" 
                className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2.5 transition-colors duration-200 flex items-center justify-center shrink-0"
                aria-label="S'inscrire à la newsletter"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} <strong className="text-slate-400 font-medium">CodeToWin</strong>. Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <Link to="/conditions" className="text-slate-500 hover:text-slate-300 transition-colors duration-200">
              Conditions d'utilisation
            </Link>
            <Link to="/politique" className="text-slate-500 hover:text-slate-300 transition-colors duration-200">
              Politique de confidentialité
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

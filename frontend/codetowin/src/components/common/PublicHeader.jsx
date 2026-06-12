import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { registered, role } = useAuth();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="border-b border-slate-200 bg-white" id="site-header" style={{ position: 'sticky', top: 0, zIndex: 40 }}>
        <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="inline-flex items-center" aria-label="CodeToWin">
              <img
                src="/assets/brand/codetowin-brand.png"
                alt="CodeToWin"
                style={{ height: '2.25rem', width: 'auto', marginBottom: 0, display: 'block' }}
                decoding="async"
              />
            </Link>

            <nav className="hidden items-center gap-7 sm:flex" aria-label="Navigation principale">
              <Link to="/hackathons" className="text-sm font-semibold text-slate-700 transition hover:text-emerald-700">
                Explorer les hackathons
              </Link>
              <Link to="/participer" className="text-sm font-semibold text-slate-700 transition hover:text-emerald-700">
                Rejoindre un hackathon
              </Link>
              <Link to="/organiser" className="text-sm font-semibold text-slate-700 transition hover:text-emerald-700">
                Créer un hackathon
              </Link>
              
              <span className="h-5 w-px bg-slate-200" aria-hidden="true" />
              
              {registered ? (
                <Link to={`/${role}`} className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800">
                  Mon Espace
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-semibold text-slate-700 transition hover:text-emerald-700">
                    Connexion
                  </Link>
                  <Link to="/signup" className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800">
                    S'inscrire
                  </Link>
                </>
              )}
            </nav>

            <button
              type="button"
              className="mobile-nav-button sm:!hidden"
              aria-label="Ouvrir le menu"
              aria-controls="mobile-nav-sidebar"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ width: '24px', height: '24px' }}>
                <path d="M4 7h16M4 12h16M4 17h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <button
        id="mobile-nav-backdrop"
        type="button"
        className={`mobile-nav-backdrop${mobileMenuOpen ? ' is-open' : ''} sm:!hidden`}
        onClick={closeMobileMenu}
        aria-label="Fermer le menu"
        tabIndex={-1}
      ></button>

      <aside
        id="mobile-nav-sidebar"
        className={`mobile-nav-sidebar${mobileMenuOpen ? ' is-open' : ''} sm:!hidden`}
        aria-label="Navigation mobile"
      >
        <div className="mobile-nav-sidebar-header">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Menu</span>
          <button
            type="button"
            className="mobile-nav-button"
            aria-label="Fermer le menu"
            onClick={closeMobileMenu}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18"></path>
            </svg>
          </button>
        </div>
        <div className="mobile-nav-sidebar-links">
          <Link to="/hackathons" className="mobile-nav-sidebar-link" onClick={closeMobileMenu}>
            Explorer les hackathons
          </Link>
          <Link to="/participer" className="mobile-nav-sidebar-link" onClick={closeMobileMenu}>
            Rejoindre un hackathon
          </Link>
          <Link to="/organiser" className="mobile-nav-sidebar-link" onClick={closeMobileMenu}>
            Créer un hackathon
          </Link>
        </div>
        <div className="mobile-nav-sidebar-actions">
          {registered ? (
            <Link to={`/${role}`} className="mobile-nav-primary" onClick={closeMobileMenu}>Mon Espace</Link>
          ) : (
            <>
              <Link to="/signup" className="mobile-nav-primary" onClick={closeMobileMenu}>S'inscrire</Link>
              <Link to="/login" className="mobile-nav-secondary" onClick={closeMobileMenu}>Connexion</Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

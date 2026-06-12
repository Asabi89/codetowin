import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/* Import the CSS that contains all the original navbar classes */
import '../styles/pages/participant/hackaton.css';

export default function MainLayout({ children }) {
  const { registered, profile, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  /* Close avatar dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = (e) => {
    e.preventDefault();
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const handleSearchClick = () => {
    navigate('/hackathons');
  };

  const fullName =
    profile
      ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'User'
      : 'User';
  const username =
    profile
      ? `@${(profile.firstName || 'user').toLowerCase()}${(profile.lastName || '').toLowerCase()}`
      : '@user';
  const avatar =
    profile?.avatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80';
  const publicPageHashes = ['#conditions', '#politique', '#aide'];
  const isPublicHashPage = location.pathname === '/' && publicPageHashes.includes(location.hash);
  const isHome = location.pathname === '/' && !isPublicHashPage;
  const usesAuthenticatedPrototypeHeader =
    registered ||
    location.pathname === '/hackathons' ||
    location.pathname.startsWith('/hackathons/') ||
    location.pathname === '/profile' ||
    location.pathname === '/participant';
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const homeSectionHref = (section) => (isHome ? `#${section}` : `/#${section}`);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ===== AUTHENTICATED HEADER ===== */}
      {usesAuthenticatedPrototypeHeader ? (
        <header className="auth-header" id="auth-header">
          <div className="auth-header-inner">
            {/* Left: Logo + Nav */}
            <div className="auth-header-left">
              <Link to="/" className="brand-link" aria-label="CodeToWin">
                <img
                  src="/assets/brand/codetowin-brand.png"
                  alt="CodeToWin"
                  className="brand-mark brand-mark-header"
                  decoding="async"
                />
              </Link>
              <nav className="auth-nav-links" aria-label="Navigation">
                <Link
                  to="/hackathons"
                  className={`auth-nav-link${location.pathname === '/hackathons' ? ' active' : ''}`}
                >
                  Explorer
                </Link>
                <Link
                  to="/hackathons/google-cloud-rapid-agent?tab=my-project"
                  className={`auth-nav-link${location.pathname.startsWith('/hackathons/') ? ' active' : ''}`}
                >
                  Mes Projets
                </Link>
              </nav>
            </div>

            {/* Right: Search + Avatar pill */}
            <div className="auth-header-right">
              {/* Search icon → navigates to /hackathons */}
              <button
                type="button"
                className="search-icon-btn"
                aria-label="Rechercher un hackathon"
                onClick={handleSearchClick}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </button>

              {/* Avatar pill + dropdown */}
              <div className="avatar-pill-wrap" ref={dropdownRef}>
                <button
                  type="button"
                  className={`avatar-pill${dropdownOpen ? ' is-open' : ''}`}
                  id="hk-avatar-pill"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="avatar-pill-img"
                    id="hk-header-avatar"
                  />
                  <span className="avatar-pill-name" id="hk-header-name">
                    {profile?.firstName || 'User'}
                  </span>
                  <svg
                    className="avatar-pill-chevron"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 4.5L6 7.5L9 4.5"></path>
                  </svg>
                </button>

                {/* Dropdown menu */}
                <div
                  className={`avatar-dropdown${dropdownOpen ? ' is-open' : ''}`}
                  id="hk-avatar-dropdown"
                >
                  {/* User info block */}
                  <div className="dropdown-user-block">
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="dropdown-user-avatar"
                      id="hk-dd-avatar"
                    />
                    <div className="dropdown-user-info">
                      <div className="dropdown-user-name" id="hk-dd-name">
                        {fullName}
                      </div>
                      <div className="dropdown-user-email" id="hk-dd-email">
                        {username}
                      </div>
                    </div>
                  </div>

                  {/* Nav links */}
                  <div className="dropdown-links">
                    <Link
                      to="/participant"
                      className="dropdown-link"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4"></circle>
                        <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"></path>
                      </svg>
                      Mon Profil
                    </Link>
                    <Link
                      to="/profile"
                      className="dropdown-link"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"></path>
                      </svg>
                      Paramètres
                    </Link>
                    <Link
                      to="/hackathons/google-cloud-rapid-agent?tab=my-project"
                      className="dropdown-link"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                        <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                        <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                        <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                      </svg>
                      Mes Projets
                    </Link>

                    <div className="dropdown-divider"></div>

                    <button
                      className="dropdown-link dropdown-link--danger"
                      onClick={handleSignOut}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
                        <polyline points="16,17 21,12 16,7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

      ) : (
        /* ===== GUEST HEADER ===== */
        <>
          <header className={isHome ? 'border-b border-slate-200 bg-white' : 'site-header'} id="site-header">
            <div className={isHome ? 'mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8' : 'header-inner'}>
              <div className={isHome ? 'flex items-center justify-between gap-4' : 'contents'}>
                <Link to="/" className={isHome ? 'inline-flex items-center' : 'brand-link'} aria-label="CodeToWin">
                  <img
                    src="/assets/brand/codetowin-brand.png"
                    alt="CodeToWin"
                    className="brand-mark brand-mark-header"
                    decoding="async"
                  />
                </Link>

                <nav className={isHome ? 'hidden items-center gap-7 sm:flex' : 'desktop-nav'} aria-label="Navigation principale">
                  <a href={isHome ? '#hackathons' : '/hackathons'} className={isHome ? 'text-sm font-semibold text-slate-700 transition hover:text-emerald-700' : 'desktop-nav-link'}>
                    Explorer les hackathons
                  </a>
                  {isHome ? (
                    <>
                      <a href="#participer" className="text-sm font-semibold text-slate-700 transition hover:text-emerald-700">Rejoindre un hackathon</a>
                      <a href="#organiser" className="text-sm font-semibold text-slate-700 transition hover:text-emerald-700">Créer un hackathon</a>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="desktop-nav-link">Connexion</Link>
                      <Link to="/signup" className="desktop-nav-cta">S'inscrire</Link>
                    </>
                  )}
                </nav>

                <button
                  type="button"
                  className={isHome ? 'mobile-nav-button sm:hidden' : 'mobile-nav-button'}
                  aria-label="Ouvrir le menu"
                  aria-controls="mobile-nav-sidebar"
                  aria-expanded={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M4 7h16M4 12h16M4 17h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </header>

          <button
            id="mobile-nav-backdrop"
            type="button"
            className={`mobile-nav-backdrop${mobileMenuOpen ? ' is-open' : ''}${isHome ? ' sm:hidden' : ''}`}
            onClick={closeMobileMenu}
            aria-label="Fermer le menu"
            tabIndex={-1}
          ></button>

          <aside
            id="mobile-nav-sidebar"
            className={`mobile-nav-sidebar${mobileMenuOpen ? ' is-open' : ''}${isHome ? ' sm:hidden' : ''}`}
            aria-label="Navigation mobile"
          >
            <div className="mobile-nav-sidebar-header">
              <span className={isHome ? 'text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700' : 'mobile-nav-label'}>Menu</span>
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
              <a href={isHome ? '#hackathons' : '/hackathons'} className="mobile-nav-sidebar-link" onClick={closeMobileMenu}>
                Explorer les hackathons
              </a>
            </div>
            <div className="mobile-nav-sidebar-actions">
              {isHome ? (
                <>
                  <a href={homeSectionHref('participer')} className="mobile-nav-secondary" onClick={closeMobileMenu}>Rejoindre un hackathon</a>
                  <a href={homeSectionHref('organiser')} className="mobile-nav-primary" onClick={closeMobileMenu}>Créer un hackathon</a>
                </>
              ) : (
                <>
                  <Link to="/signup" className="mobile-nav-primary" onClick={closeMobileMenu}>S'inscrire</Link>
                  <Link to="/login" className="mobile-nav-secondary" onClick={closeMobileMenu}>Connexion</Link>
                </>
              )}
            </div>
          </aside>
        </>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className={isHome ? 'border-t border-white/10 bg-slate-950 py-10 text-slate-300' : 'site-footer'} style={isHome ? undefined : {
        background: '#0f172a',
        color: '#94a3b8',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '2.5rem 0',
      }}>
        <div className={isHome ? 'mx-auto max-w-7xl px-6 lg:px-8' : undefined} style={isHome ? undefined : { width: 'min(1200px, calc(100% - 2rem))', margin: '0 auto' }}>
          <div className={isHome ? 'flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between' : undefined} style={isHome ? undefined : { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>
            <div>
              <a href={isHome ? '#hero' : '/'} className={isHome ? 'inline-flex items-center' : undefined} aria-label="CodeToWin">
                <img
                  src="/assets/brand/codetowin-brand.png"
                  alt="CodeToWin"
                  className={isHome ? 'brand-mark brand-mark-footer' : undefined}
                  decoding="async"
                  style={isHome ? undefined : { height: '2rem', width: 'auto', filter: 'brightness(0) invert(1)' }}
                />
              </a>
              <p className={isHome ? 'mt-4 max-w-2xl text-sm leading-7 text-slate-400' : undefined} style={isHome ? undefined : { marginTop: '1rem', maxWidth: '38ch', fontSize: '0.875rem', lineHeight: 1.7, color: '#64748b' }}>
                <strong className={isHome ? 'font-semibold text-white' : undefined} style={isHome ? undefined : { color: '#fff' }}>CodeToWin</strong> relie les talents tech africains et les organisateurs autour de projets concrets, de profils publics et de preuves vérifiables.
              </p>
            </div>
            <div className={isHome ? 'grid gap-3 text-sm text-slate-400 sm:text-right' : undefined} style={isHome ? undefined : { display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'right', fontSize: '0.875rem' }}>
              <Link className={isHome ? 'transition hover:text-white' : undefined} to="/#conditions" style={isHome ? undefined : { color: '#64748b', textDecoration: 'none', transition: 'color 150ms ease' }}>Conditions</Link>
              <Link className={isHome ? 'transition hover:text-white' : undefined} to="/#politique" style={isHome ? undefined : { color: '#64748b', textDecoration: 'none', transition: 'color 150ms ease' }}>Politique</Link>
              <Link className={isHome ? 'transition hover:text-white' : undefined} to="/#aide" style={isHome ? undefined : { color: '#64748b', textDecoration: 'none', transition: 'color 150ms ease' }}>Aide</Link>
            </div>
          </div>
          <div className={isHome ? 'mt-10 border-t border-white/10 pt-6 text-sm text-slate-500' : undefined} style={isHome ? undefined : { marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', fontSize: '0.8rem', color: '#475569' }}>
            <p>© 2026 <strong className={isHome ? 'font-semibold text-white' : undefined} style={isHome ? undefined : { color: '#e2e8f0' }}>CodeToWin</strong>. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

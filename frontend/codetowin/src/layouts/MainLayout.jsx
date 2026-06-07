import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function MainLayout({ children }) {
  const { registered, profile, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = (e) => {
    e.preventDefault();
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const fullName = profile ? `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'User' : 'User';
  const username = profile ? `@${(profile.firstName || 'user').toLowerCase()}${(profile.lastName || '').toLowerCase()}` : '@user';
  const avatar = profile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80';

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased">
      {/* HEADER SECTION */}
      {registered ? (
        /* Authenticated Header */
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between gap-4">
              <div className="flex items-center gap-8">
                <Link to="/" className="inline-flex items-center" aria-label="CodeToWin">
                  <img src="/assets/brand/codetowin-brand.png" alt="CodeToWin" className="h-9 w-auto object-contain" />
                </Link>
                <nav className="hidden md:flex items-center gap-1" aria-label="Navigation">
                  <Link
                    to="/hackathons"
                    className={`text-sm font-semibold px-3 py-2 rounded-lg transition ${
                      location.pathname === '/hackathons'
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                    }`}
                  >
                    Explorer
                  </Link>
                  <Link
                    to="/hackathons/google-cloud-rapid-agent?tab=my-project"
                    className={`text-sm font-semibold px-3 py-2 rounded-lg transition ${
                      location.pathname.includes('/hackathons/')
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                    }`}
                  >
                    Mes Projets
                  </Link>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                  onClick={() => alert('Recherche bientôt disponible !')}
                  aria-label="Search"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7"></circle>
                    <path d="m21 21-4.3-4.3" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>

                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className={`flex items-center gap-2 p-1 pl-2 pr-3 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition duration-150 ${
                      dropdownOpen ? 'border-emerald-500 ring-2 ring-emerald-500/20' : ''
                    }`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <img src={avatar} alt="Avatar" className="h-7 w-7 rounded-full object-cover bg-slate-200" />
                    <span className="hidden sm:inline text-xs font-bold text-slate-700 max-w-[100px] truncate">{profile?.firstName || 'User'}</span>
                    <svg
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-200 bg-white shadow-lg ring-1 ring-black/5 z-50 overflow-hidden py-1">
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
                        <img src={avatar} alt="Avatar" className="h-9 w-9 rounded-full object-cover bg-slate-200" />
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-slate-900 truncate">{fullName}</div>
                          <div className="text-xs text-slate-500 truncate">{username}</div>
                        </div>
                      </div>
                      <div className="p-1">
                        <Link
                          to="/participant"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <svg className="h-4.5 w-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round"></circle>
                            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                          Mon Profil
                        </Link>
                        <Link
                          to="/hackathons/google-cloud-rapid-agent?tab=my-project"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <svg className="h-4.5 w-4.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"></rect>
                            <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"></rect>
                            <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"></rect>
                            <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"></rect>
                          </svg>
                          Mes Projets
                        </Link>
                      </div>
                      <div className="border-t border-slate-100 p-1">
                        <button
                          onClick={handleSignOut}
                          className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                        >
                          <svg className="h-4.5 w-4.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round"></path>
                            <polyline points="16,17 21,12 16,7" strokeLinecap="round" strokeLinejoin="round"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12" strokeLinecap="round" strokeLinejoin="round"></line>
                          </svg>
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : (
        /* Guest Header */
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <Link to="/" className="inline-flex items-center" aria-label="CodeToWin">
                <img src="/assets/brand/codetowin-brand.png" alt="CodeToWin" className="h-10 w-auto object-contain" />
              </Link>

              <nav className="hidden sm:flex items-center gap-7" aria-label="Navigation principale">
                <Link to="/hackathons" className="text-sm font-semibold text-slate-700 transition hover:text-emerald-700">Explorer les hackathons</Link>
                <Link to="/login" className="text-sm font-semibold text-slate-700 transition hover:text-emerald-700">Connexion</Link>
                <Link to="/signup" className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800">S'inscrire</Link>
              </nav>

              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-emerald-700 sm:hidden"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Ouvrir le menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* MOBILE BACKDROP & DRAWER */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm sm:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col border-l border-slate-200 bg-white p-6 shadow-xl sm:hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">Menu</span>
              <button
                type="button"
                className="rounded-lg p-2 text-slate-500 hover:text-emerald-700"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fermer le menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <Link to="/hackathons" className="text-lg font-semibold text-slate-800 hover:text-emerald-700 py-2" onClick={() => setMobileMenuOpen(false)}>Explorer les hackathons</Link>
              {registered ? (
                <>
                  <Link to="/hackathons/google-cloud-rapid-agent?tab=my-project" className="text-lg font-semibold text-slate-800 hover:text-emerald-700 py-2" onClick={() => setMobileMenuOpen(false)}>Mes Projets</Link>
                  <Link to="/participant" className="text-lg font-semibold text-slate-800 hover:text-emerald-700 py-2" onClick={() => setMobileMenuOpen(false)}>Mon Profil</Link>
                  <button onClick={(e) => { setMobileMenuOpen(false); handleSignOut(e); }} className="text-left text-lg font-semibold text-red-600 hover:text-red-700 py-2">Déconnexion</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-lg font-semibold text-slate-800 hover:text-emerald-700 py-2" onClick={() => setMobileMenuOpen(false)}>Connexion</Link>
                  <Link to="/signup" className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 py-3 text-base font-semibold text-white hover:bg-emerald-800" onClick={() => setMobileMenuOpen(false)}>S'inscrire</Link>
                </>
              )}
            </div>
          </aside>
        </>
      )}

      {/* MAIN VIEWPORT */}
      <main className="flex-1">
        {children}
      </main>

      {/* FOOTER SECTION */}
      <footer className="border-t border-slate-200 bg-slate-950 py-10 text-slate-300">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link to="/" className="inline-flex items-center" aria-label="CodeToWin">
                <img src="/assets/brand/codetowin-brand.png" alt="CodeToWin" className="h-8 w-auto object-contain" />
              </Link>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
                <strong className="font-semibold text-white">CodeToWin</strong> relie les talents tech africains et les organisateurs autour de projets concrets, de profils publics et de preuves vérifiables.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-slate-400 sm:text-right">
              <a className="transition hover:text-white" href="#conditions">Conditions</a>
              <a className="transition hover:text-white" href="#politique">Politique</a>
              <a className="transition hover:text-white" href="#aide">Aide</a>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">
            <p>© 2026 <strong className="font-semibold text-white">CodeToWin</strong>. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function ParticipantHeader() {
  const { profile, role, workspaceState, logout } = useContext(AuthContext);
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

  const roleConfig = {
    participant: {
      dashboardTo: '/participant',
      dashboardLabel: 'Espace participant',
      profileTo: '/participant/profile',
      settingsTo: '/participant/settings',
      secondaryTo: '/participant/hackathons',
      secondaryLabel: 'Mes Hackathons',
      badge: 'Participant',
    },
    mentor: {
      dashboardTo: '/mentor',
      dashboardLabel: 'Espace mentor',
      profileTo: '/mentor/profile',
      settingsTo: '/mentor/settings',
      secondaryTo: '/mentor/teams',
      secondaryLabel: 'Mes Équipes',
      badge: 'Mentor',
    },
    organizer: {
      dashboardTo: '/organizer',
      dashboardLabel: workspaceState?.memberRole ? 'Espace membre' : 'Espace organisateur',
      profileTo: workspaceState?.memberRole ? '/organizer/members' : '/organizer/settings',
      settingsTo: '/organizer/settings',
      secondaryTo: workspaceState?.memberRole ? '/organizer/hackathons/google-cloud-rapid-agent/evaluation' : '/organizer/hackathons',
      secondaryLabel: workspaceState?.memberRole ? 'Évaluations' : 'Mes Hackathons',
      badge: workspaceState?.memberRole || 'Organisateur',
    },
  };

  const currentRoleConfig = roleConfig[role] || roleConfig.participant;

  return (
    <header className="auth-header" id="auth-header">
      <div className="auth-header-inner">
        {/* Left: Logo + Nav */}
        <div className="auth-header-left">
          <Link to={currentRoleConfig.dashboardTo} className="brand-link" aria-label="CodeToWin">
            <img
              src="/assets/brand/codetowin-brand.png"
              alt="CodeToWin"
              style={{ height: '2rem', width: 'auto', marginBottom: 0, display: 'block' }}
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
              to={currentRoleConfig.dashboardTo}
              className={`auth-nav-link${location.pathname.startsWith(currentRoleConfig.dashboardTo) ? ' active' : ''}`}
            >
              {currentRoleConfig.dashboardLabel}
            </Link>
            {role !== 'participant' && (
              <Link
                to={currentRoleConfig.secondaryTo}
                className={`auth-nav-link${location.pathname.startsWith(currentRoleConfig.secondaryTo) ? ' active' : ''}`}
              >
                {currentRoleConfig.secondaryLabel}
              </Link>
            )}
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
              <span className="ml-2 hidden rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 lg:inline-flex">
                {currentRoleConfig.badge}
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
                  to={currentRoleConfig.dashboardTo}
                  className="dropdown-link"
                  onClick={() => setDropdownOpen(false)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"></circle>
                    <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"></path>
                  </svg>
                  {currentRoleConfig.dashboardLabel}
                </Link>
                <Link
                  to={currentRoleConfig.profileTo}
                  className="dropdown-link"
                  onClick={() => setDropdownOpen(false)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Mon profil
                </Link>
                {role !== 'participant' && (
                  <Link
                    to={currentRoleConfig.secondaryTo}
                    className="dropdown-link"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                      <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                      <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                      <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                    </svg>
                    {currentRoleConfig.secondaryLabel}
                  </Link>
                )}
                <Link
                  to={currentRoleConfig.settingsTo}
                  className="dropdown-link"
                  onClick={() => setDropdownOpen(false)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"></path>
                  </svg>
                  Paramètres
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
  );
}

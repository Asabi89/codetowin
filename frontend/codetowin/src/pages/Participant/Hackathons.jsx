import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { initialHackathons } from '../../mockdata/hackathons';
import '../../styles/pages/participant/hackaton.css';


export default function Hackathons() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterMenu, setActiveFilterMenu] = useState(null); // 'status', 'location', 'interest' or null
  const [filters, setFilters] = useState({
    status: 'all',
    location: 'all',
    interest: 'all'
  });

  const [hackathons, setHackathons] = useState([]);

  // Normalize text for search comparison
  const normalizeText = (val) => {
    return String(val || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  };

  const getStatusFromDates = (startVal, endVal) => {
    const today = new Date();
    const start = new Date(`${startVal}T00:00:00`);
    const end = new Date(`${endVal}T23:59:59`);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDay = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    const msPerDay = 24 * 60 * 60 * 1000;

    if (todayStart < startDay) {
      return { filter: 'upcoming', label: 'À venir' };
    }
    if (todayStart > endDay) {
      return { filter: 'ended', label: 'Terminé' };
    }
    const daysLeft = Math.max(0, Math.ceil((endDay - todayStart) / msPerDay));
    if (daysLeft === 0) {
      return { filter: 'live', label: "Finit aujourd'hui" };
    }
    return {
      filter: 'live',
      label: `Il reste ${daysLeft} jour${daysLeft === 1 ? '' : 's'}`
    };
  };

  // Build the list of available locations and themes (interests)
  const locations = ['all', ...new Set(initialHackathons.map(h => h.location))];
  const interests = ['all', ...new Set(initialHackathons.map(h => h.interest))];

  useEffect(() => {
    const enriched = initialHackathons.map(h => {
      const statusInfo = getStatusFromDates(h.start, h.end);
      return {
        ...h,
        statusFilter: statusInfo.filter,
        statusLabel: statusInfo.label,
        searchStr: normalizeText(
          [h.keywords, h.title, h.prize, h.location, h.interest].join(' ')
        )
      };
    });
    setHackathons(enriched);
  }, []);

  // Filter logic
  const filteredHackathons = hackathons.filter(h => {
    const query = normalizeText(searchQuery);
    const matchesSearch = !query || h.searchStr.includes(query);
    const matchesStatus = filters.status === 'all' || h.statusFilter === filters.status;
    const matchesLocation = filters.location === 'all' || h.location === filters.location;
    const matchesInterest = filters.interest === 'all' || h.interest === filters.interest;

    return matchesSearch && matchesStatus && matchesLocation && matchesInterest;
  });

  const handleToggleMenu = (menuName) => {
    setActiveFilterMenu(prev => (prev === menuName ? null : menuName));
  };

  const handleSelectFilter = (group, value) => {
    setFilters(prev => ({
      ...prev,
      [group]: value
    }));
    setActiveFilterMenu(null);
  };

  const getFilterDisplayValue = (group) => {
    const val = filters[group];
    if (val === 'all') {
      if (group === 'status') return 'Status';
      if (group === 'location') return 'Location';
      if (group === 'interest') return 'Interest';
    }
    const firstWord = val.split(/[,\s]+/)[0];
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
  };

  const formatDateRange = (startVal, endVal) => {
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit' });
    const start = new Date(`${startVal}T00:00:00`);
    const end = new Date(`${endVal}T00:00:00`);
    return `${formatter.format(start)} - ${formatter.format(end)}`;
  };

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.filter-chip-group')) {
        setActiveFilterMenu(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="hackathon-page-wrapper">
      <section className="hero-strip" aria-label="Hackathon highlight">
        <p><strong>Les meilleurs hackatons tech</strong> ,Réjoins maitenant.</p>
      </section>

      <main className="page-shell">
        {/* Search Bar */}
        <form className="search-bar" onSubmit={(e) => e.preventDefault()} role="search">
          <div className="search-input-wrap">
            <input
              id="searchInput"
              type="search"
              placeholder="Chercher un hackathon"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="search-btn" type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
              <path d="M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm7.15 11.73 3.08 3.09a1 1 0 0 1-1.42 1.41l-3.08-3.08a1 1 0 0 1 1.42-1.42Z" />
            </svg>
          </button>
        </form>

        {/* Filters */}
        <section className="filter-tabs" aria-label="Filter hackathons">
          {/* Status Filter */}
          <div className={`filter-chip-group ${activeFilterMenu === 'status' ? 'is-open' : ''}`}>
            <button
              type="button"
              className="filter-chip"
              onClick={() => handleToggleMenu('status')}
            >
              <span className="filter-chip__text">
                <span className="filter-chip__label">Statut</span>
                <span className="filter-chip__value">{getFilterDisplayValue('status')}</span>
              </span>
              <svg className="filter-chip__chevron" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            {activeFilterMenu === 'status' && (
              <div className="filter-menu is-open" role="listbox">
                <button
                  type="button"
                  className={`filter-option ${filters.status === 'all' ? 'is-selected' : ''}`}
                  onClick={() => handleSelectFilter('status', 'all')}
                >
                  <span>Tous</span>
                  <span className="filter-option__marker">✓</span>
                </button>
                <button
                  type="button"
                  className={`filter-option ${filters.status === 'live' ? 'is-selected' : ''}`}
                  onClick={() => handleSelectFilter('status', 'live')}
                >
                  <span>En cours</span>
                  <span className="filter-option__marker">✓</span>
                </button>
                <button
                  type="button"
                  className={`filter-option ${filters.status === 'upcoming' ? 'is-selected' : ''}`}
                  onClick={() => handleSelectFilter('status', 'upcoming')}
                >
                  <span>À venir</span>
                  <span className="filter-option__marker">✓</span>
                </button>
                <button
                  type="button"
                  className={`filter-option ${filters.status === 'ended' ? 'is-selected' : ''}`}
                  onClick={() => handleSelectFilter('status', 'ended')}
                >
                  <span>Terminés</span>
                  <span className="filter-option__marker">✓</span>
                </button>
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className={`filter-chip-group ${activeFilterMenu === 'location' ? 'is-open' : ''}`}>
            <button
              type="button"
              className="filter-chip"
              onClick={() => handleToggleMenu('location')}
            >
              <span className="filter-chip__text">
                <span className="filter-chip__label">Lieu</span>
                <span className="filter-chip__value">{getFilterDisplayValue('location')}</span>
              </span>
              <svg className="filter-chip__chevron" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            {activeFilterMenu === 'location' && (
              <div className="filter-menu is-open" role="listbox">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    className={`filter-option ${filters.location === loc ? 'is-selected' : ''}`}
                    onClick={() => handleSelectFilter('location', loc)}
                  >
                    <span>{loc === 'all' ? 'Partout' : loc}</span>
                    <span className="filter-option__marker">✓</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme/Interest Filter */}
          <div className={`filter-chip-group ${activeFilterMenu === 'interest' ? 'is-open' : ''}`}>
            <button
              type="button"
              className="filter-chip"
              onClick={() => handleToggleMenu('interest')}
            >
              <span className="filter-chip__text">
                <span className="filter-chip__label">Thème</span>
                <span className="filter-chip__value">{getFilterDisplayValue('interest')}</span>
              </span>
              <svg className="filter-chip__chevron" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
            {activeFilterMenu === 'interest' && (
              <div className="filter-menu is-open" role="listbox">
                {interests.map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    className={`filter-option ${filters.interest === theme ? 'is-selected' : ''}`}
                    onClick={() => handleSelectFilter('interest', theme)}
                  >
                    <span>{theme === 'all' ? 'Tous' : theme}</span>
                    <span className="filter-option__marker">✓</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="divider" aria-hidden="true"></div>

        {/* Results Heading */}
        <section className="section-heading">
          <h2>Tous les hackathons</h2>
          <span className="section-count">{filteredHackathons.length} hackathon{filteredHackathons.length === 1 ? '' : 's'}</span>
        </section>

        {/* Cards list */}
        <section className="cards">
          {filteredHackathons.map((hackathon) => (
            <article
              key={hackathon.id}
              className="card cursor-pointer hover:shadow-md transition"
              onClick={() => navigate(`/hackathons/${hackathon.id}`)}
            >
              <div className="card-top">
                <div className="card-logo" aria-hidden="true"><span>{hackathon.logoText}</span></div>
                <div className="card-location">
                  <span className="card-location-status">{hackathon.online ? 'Online' : 'In person'}</span>
                  <span className="card-location-place">{hackathon.location}</span>
                </div>
              </div>
              <h3>{hackathon.title}</h3>
              <div className="card-meta">
                <span className={`badge ${hackathon.statusFilter}`}>{hackathon.statusLabel}</span>
                <span className="participant-stat"><strong>{hackathon.participants}</strong> participants</span>
                <span className="date-range">{formatDateRange(hackathon.start, hackathon.end)}</span>
                <span className="prize"><strong>{hackathon.prize}</strong> prize</span>
              </div>
            </article>
          ))}
        </section>

        {filteredHackathons.length === 0 && (
          <p className="empty-state is-visible" style={{ display: 'block' }}>
            Aucun hackathon ne correspond à votre recherche ou à vos filtres.
          </p>
        )}
      </main>
    </div>
  );
}

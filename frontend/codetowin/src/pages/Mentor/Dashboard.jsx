import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Mail, CheckSquare, ArrowRight } from 'lucide-react';
import '../../styles/dashboard.css';

export default function MentorDashboard() {
  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="mentor-welcome-banner">
        <div className="mentor-welcome-content">
          <div>
            <h2 className="mentor-welcome-title">Bonjour, Seydou ! 👋</h2>
            <p className="mentor-welcome-subtitle">Merci pour votre implication ! Vous avez de nouvelles invitations en attente et 2 équipes qui comptent sur vous cette semaine.</p>
          </div>
          <div className="welcome-action">
            <Link to="/mentor/teams" className="btn-white">
              Voir mes équipes
              <ArrowRight style={{ marginLeft: '0.5rem', height: '1rem', width: '1rem' }} />
            </Link>
          </div>
        </div>
        {/* Decorative element */}
        <svg className="mentor-welcome-svg" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/>
        </svg>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="mentor-stat-card">
          <div className="stat-icon-wrapper">
            <Users className="stat-icon" />
          </div>
          <div className="stat-content">
            <p className="stat-title">Équipes actives</p>
            <p className="stat-value">4</p>
          </div>
        </div>

        <div className="mentor-stat-card">
          <div className="stat-icon-wrapper icon-wrapper-blue">
            <Mail className="stat-icon icon-blue" />
          </div>
          <div className="stat-content">
            <p className="stat-title">Invitations en attente</p>
            <p className="stat-value">2</p>
          </div>
          <Link to="/mentor/invitations" className="mentor-stat-card-overlay" aria-label="Voir les invitations"></Link>
        </div>

        <div className="mentor-stat-card">
          <div className="stat-icon-wrapper icon-wrapper-amber">
            <CheckSquare className="stat-icon icon-amber" />
          </div>
          <div className="stat-content">
            <p className="stat-title">Feedbacks requis</p>
            <p className="stat-value">1</p>
          </div>
        </div>
      </div>

      {/* Recent Activity / Action Needed */}
      <div className="activity-grid">
        {/* Upcoming Sessions / Teams */}
        <div className="list-container">
          <div className="list-header">
            <h3 className="list-title">Vos équipes à suivre</h3>
            <Link to="/mentor/teams" className="section-link">Voir tout</Link>
          </div>
          <ul className="list-group">
            <li className="list-item">
              <div className="list-item-flex">
                <div>
                  <p className="list-item-title">EcoPay Solutions</p>
                  <p className="list-item-subtitle">Hackathon: Fintech Builders Challenge</p>
                </div>
                <Link to="/mentor/teams/1/feedback" className="btn-outline-small">
                  Noter
                </Link>
              </div>
            </li>
            <li className="list-item">
              <div className="list-item-flex">
                <div>
                  <p className="list-item-title">CryptoFarm</p>
                  <p className="list-item-subtitle">Hackathon: Agrotech Africa</p>
                </div>
                <Link to="/mentor/teams/2/feedback" className="btn-brand-light-small">
                  Voir progrès
                </Link>
              </div>
            </li>
          </ul>
        </div>

        {/* Pending Invitations Snippet */}
        <div className="list-container">
          <div className="list-header">
            <h3 className="list-title">Nouvelles Invitations</h3>
            <Link to="/mentor/invitations" className="section-link">Voir les 2</Link>
          </div>
          <div className="snippet-card-content">
            <div className="snippet-card">
              <div className="snippet-card-header">
                <div>
                  <h4 className="snippet-card-title">AI for Climate Africa 2026</h4>
                  <p className="snippet-card-subtitle">Par TechHub Sénégal</p>
                </div>
                <span className="badge-blue-outline">Nouveau</span>
              </div>
              <p className="snippet-card-desc line-clamp-2">Nous recherchons un expert en Machine Learning pour encadrer 3 équipes lors de ce hackathon intensif de 48h.</p>
              <div className="snippet-card-actions">
                <button type="button" className="btn btn-primary btn-flex-1">Accepter</button>
                <Link to="/mentor/invitations" className="btn btn-secondary btn-flex-1">Détails</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

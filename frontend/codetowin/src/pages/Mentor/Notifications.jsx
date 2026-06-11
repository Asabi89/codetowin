import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, MessageSquare, Users } from 'lucide-react';
import '../../styles/dashboard.css';
import '../../styles/messaging.css';

export default function MentorNotifications() {
  return (
    <div className="dashboard-content" style={{ padding: 0 }}>
      {/* Topbar */}
      <header className="notifications-header">
        <div className="notifications-title-wrap">
          <h1 className="notifications-title">Centre de notifications</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button type="button" className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}>
            Tout marquer comme lu
          </button>
        </div>
      </header>

      {/* Main scrollable area */}
      <div className="notifications-main">
        <div className="notifications-content">
          
          <div className="notifications-page-header">
            <div>
              <h1 className="notifications-h1">Vos Notifications</h1>
              <p className="notifications-sub">Restez informé de l'activité de vos équipes et des organisateurs.</p>
            </div>
            
            {/* Filters */}
            <div className="notifications-filter">
              <select className="form-input" style={{ width: 'auto' }}>
                <option>Toutes les notifications</option>
                <option>Non lues (2)</option>
                <option>Équipes</option>
                <option>Hackathons</option>
              </select>
            </div>
          </div>

          {/* Notification List */}
          <div className="notification-list-container">
            <div>
              {/* Unread Notification 1 */}
              <div className="notification-item notification-item-unread">
                <div className="notification-indicator"></div>
                
                <div className="notification-content">
                  <div className="notification-icon-wrap">
                    <span className="notification-icon" style={{ backgroundColor: '#DBEAFE' }}>
                      <Users style={{ height: '1.25rem', width: '1.25rem', color: '#2563EB' }} />
                    </span>
                  </div>
                  <div className="notification-text-wrap">
                    <div className="notification-header-row">
                      <p className="notification-title">Nouvelle équipe assignée</p>
                      <p className="notification-time" style={{ color: 'var(--brand-600)', fontWeight: 600 }}>Il y a 10 min</p>
                    </div>
                    <p className="notification-desc">
                      L'organisateur vient de vous assigner l'équipe <strong style={{ fontWeight: 600, color: 'var(--slate-900)' }}>"EcoPay Solutions"</strong> pour le hackathon <span style={{ fontWeight: 500, color: 'var(--slate-900)' }}>"Fintech Builders Challenge"</span>.
                    </p>
                    <div className="notification-actions">
                      <button type="button" className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                        Contacter l'équipe
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unread Notification 2 */}
              <div className="notification-item notification-item-unread">
                <div className="notification-indicator"></div>

                <div className="notification-content">
                  <div className="notification-icon-wrap">
                    <span className="notification-icon" style={{ backgroundColor: '#D1FAE5' }}>
                      <MessageSquare style={{ height: '1.25rem', width: '1.25rem', color: '#16A34A' }} />
                    </span>
                  </div>
                  <div className="notification-text-wrap">
                    <div className="notification-header-row">
                      <p className="notification-title">Nouveau message</p>
                      <p className="notification-time" style={{ color: 'var(--brand-600)', fontWeight: 600 }}>Il y a 1 heure</p>
                    </div>
                    <p className="notification-desc">
                      Vous avez reçu un nouveau message de <strong style={{ fontWeight: 600, color: 'var(--slate-900)' }}>Moussa Diop</strong> dans le groupe <span style={{ fontWeight: 500, color: 'var(--slate-900)' }}>"EcoPay Solutions"</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Read Notification 1 */}
              <div className="notification-item notification-item-read">
                <div className="notification-content">
                  <div className="notification-icon-wrap">
                    <span className="notification-icon" style={{ backgroundColor: 'var(--slate-100)' }}>
                      <CheckCircle style={{ height: '1.25rem', width: '1.25rem', color: 'var(--slate-500)' }} />
                    </span>
                  </div>
                  <div className="notification-text-wrap">
                    <div className="notification-header-row">
                      <p className="notification-title" style={{ color: 'var(--slate-700)' }}>Soumission de projet requise</p>
                      <p className="notification-time" style={{ color: 'var(--slate-500)' }}>Hier</p>
                    </div>
                    <p className="notification-desc" style={{ color: 'var(--slate-500)' }}>
                      L'équipe <strong style={{ fontWeight: 600, color: 'var(--slate-700)' }}>"CryptoFarm"</strong> a soumis son projet final. Vous pouvez maintenant consulter les détails et procéder à l'évaluation.
                    </p>
                    <div className="notification-actions">
                      <Link to="/mentor/submissions/1" className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                        Voir la soumission
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <button type="button" className="btn btn-secondary">
              Charger plus de notifications
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Users, MessageSquare, AlertCircle } from 'lucide-react';
import '../../styles/dashboard.css';

export default function MentorTeams() {
  return (
    <div className="dashboard-content">
      {/* Topbar */}
      <header className="page-header-row">
        <div>
          <h1 className="page-header-title">Mes Équipes</h1>
        </div>
      </header>

      {/* Main scrollable area */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h1 className="dashboard-title">Mes Équipes (2)</h1>
            <p className="dashboard-subtitle">Consultez vos équipes assignées.</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '20rem' }}>
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, paddingLeft: '0.75rem', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
              <Search style={{ height: '1.25rem', width: '1.25rem', color: 'var(--slate-400)' }} />
            </div>
            <input type="text" className="form-input" style={{ paddingLeft: '2.5rem', width: '100%' }} placeholder="Chercher une équipe..." />
          </div>
          <select className="form-input" style={{ width: '100%', maxWidth: '12rem' }}>
            <option>Tous les mentors</option>
            <option>Sans mentor</option>
            <option>Vous</option>
            <option>Marie Koné</option>
          </select>
        </div>

        {/* Grid of Teams */}
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          
          {/* Team Card 1 */}
          <div className="card card-flush">
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Link to="/mentor/teams/1" style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--slate-900)', textDecoration: 'none' }} className="hover-text-brand-600">AgriTech Innovators</Link>
                <span className="badge-brand">4 membres</span>
              </div>
              <p className="text-ellipsis-1" style={{ fontSize: '0.875rem', color: 'var(--slate-500)', margin: 0 }}>Solution IoT pour optimisation d'irrigation</p>
              
              <div style={{ marginTop: '1rem' }}>
                {/* Members Avatars */}
                <div className="avatar-group">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704e" alt="" className="avatar-group-img" />
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026705e" alt="" className="avatar-group-img" />
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026706e" alt="" className="avatar-group-img" />
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026707e" alt="" className="avatar-group-img" />
                </div>
              </div>
            </div>
            
            <div className="card-footer-stats">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="https://ui-avatars.com/api/?name=Seydou+Kane&background=047857&color=fff" alt="" style={{ height: '1.5rem', width: '1.5rem', borderRadius: 'var(--border-radius-full)', border: '1px solid var(--slate-200)' }} />
                <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-600)' }}>Vous</span>
              </div>
              <div>
                <span className="badge-amber">Soumission en cours</span>
              </div>
            </div>
            
            <div className="card-actions-grid">
              <Link to="/mentor/messages" className="card-action-btn card-action-btn-border">
                <MessageSquare style={{ height: '1.25rem', width: '1.25rem', color: 'var(--slate-400)', marginRight: '0.5rem' }} />
                Contacter
              </Link>
              <Link to="/mentor/teams/1" className="card-action-btn">
                <Users style={{ height: '1.25rem', width: '1.25rem', color: 'var(--slate-400)', marginRight: '0.5rem' }} />
                Détails
              </Link>
            </div>
          </div>

          {/* Team Card 2 (No Mentor) */}
          <div className="card card-flush">
            <div className="card-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Link to="/mentor/teams/2" style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--slate-900)', textDecoration: 'none' }} className="hover-text-brand-600">Green Data Squad</Link>
                <span className="badge-brand">3 membres</span>
              </div>
              <p className="text-ellipsis-1" style={{ fontSize: '0.875rem', color: 'var(--slate-500)', margin: 0 }}>Analyse de données climatiques API</p>
              
              <div style={{ marginTop: '1rem' }}>
                {/* Members Avatars */}
                <div className="avatar-group">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026708e" alt="" className="avatar-group-img" />
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026709e" alt="" className="avatar-group-img" />
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026710e" alt="" className="avatar-group-img" />
                </div>
              </div>
            </div>
            
            <div className="card-footer-stats">
              <div></div>
              <div>
                <span className="badge-slate">Pas encore de projet</span>
              </div>
            </div>
            
            <div className="card-actions-grid">
              <Link to="/mentor/messages" className="card-action-btn card-action-btn-border">
                <MessageSquare style={{ height: '1.25rem', width: '1.25rem', color: 'var(--slate-400)', marginRight: '0.5rem' }} />
                Contacter
              </Link>
              <Link to="/mentor/teams/2" className="card-action-btn">
                <Users style={{ height: '1.25rem', width: '1.25rem', color: 'var(--slate-400)', marginRight: '0.5rem' }} />
                Détails
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

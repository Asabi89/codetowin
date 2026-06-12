import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PublicFooter from '../components/common/PublicFooter';
import ParticipantHeader from '../components/common/ParticipantHeader';
import PublicHeader from '../components/common/PublicHeader';

/* Import the CSS that contains all the original navbar classes */
import '../styles/pages/participant/hackaton.css';

export default function MainLayout({ children }) {
  const { registered } = useContext(AuthContext);
  const location = useLocation();

  const usesAuthenticatedPrototypeHeader =
    location.pathname === '/profile' ||
    location.pathname === '/participant' ||
    location.pathname.startsWith('/participant/');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {usesAuthenticatedPrototypeHeader ? <ParticipantHeader /> : <PublicHeader />}

      {/* ===== MAIN CONTENT ===== */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* ===== FOOTER ===== */}
      {!location.pathname.startsWith('/participant/messages') && <PublicFooter />}
    </div>
  );
}

import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainLayout from './MainLayout';
import '../styles/dashboard.css';

export default function ParticipantLayout() {
  const location = useLocation();
  const isMessagesPage = location.pathname === '/participant/messages';



  return (
    <MainLayout>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Reset padding for pages inside the portal content container */
        .participant-portal-content .dashboard-content {
          padding: 0 !important;
        }

        ${isMessagesPage ? `
          body, #root, main {
            overflow: hidden !important;
            height: 100vh;
          }
        ` : ''}
      `}</style>



      {/* Main Content Area */}
      <div 
        className={isMessagesPage ? "participant-portal-content w-full" : "participant-portal-content mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"}
        style={isMessagesPage ? { height: 'calc(100vh - 121px)', padding: 0, overflow: 'hidden' } : {}}
      >
        <Outlet />
      </div>
    </MainLayout>
  );
}

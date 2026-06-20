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
            height: 100dvh;
          }
        ` : ''}
      `}</style>



      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col" style={{ backgroundColor: '#F2F2F2', minHeight: 0 }}>
        <div 
          className={isMessagesPage ? "participant-portal-content w-full flex-1 flex flex-col" : "participant-portal-content mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8 flex-1 flex flex-col"}
          style={isMessagesPage ? { padding: 0, overflow: 'hidden', minHeight: 0 } : { minHeight: 0 }}
        >
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}

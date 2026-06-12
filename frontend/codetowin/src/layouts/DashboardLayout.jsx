import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import OrganizerSidebar from '../components/features/dashboard/OrganizerSidebar';
import MentorSidebar from '../components/features/dashboard/MentorSidebar';
import Topbar from '../components/features/dashboard/Topbar';
import '../styles/dashboard.css';

export default function DashboardLayout({ role = 'organizer' }) {
  const location = useLocation();
  const Sidebar = role === 'mentor' ? MentorSidebar : OrganizerSidebar;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar role={role} />
        
        <main className={`flex-1 overflow-y-auto bg-slate-50 ${location.pathname === '/mentor/messages' ? 'p-0' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

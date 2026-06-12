import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, Send, Award, User, Bell, MessageSquare } from 'lucide-react';
import MainLayout from './MainLayout';
import '../styles/dashboard.css';

export default function ParticipantLayout() {
  const location = useLocation();
  const isMessagesPage = location.pathname === '/participant/messages';

  const navItems = [
    { name: "Tableau de bord", path: "/participant", icon: LayoutDashboard, end: true },
    { name: "Mes Hackathons", path: "/participant/hackathons", icon: Calendar },
    { name: "Mon Équipe", path: "/participant/team", icon: Users },
    { name: "Messages", path: "/participant/messages", icon: MessageSquare },
    { name: "Soumission", path: "/participant/submission", icon: Send },
    { name: "Certificats", path: "/participant/certificates", icon: Award },
    //{ name: "Mon Profil", path: "/participant/profile", icon: User },
    { name: "Notifications", path: "/participant/notifications", icon: Bell, badge: 2 }
  ];

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

      {/* Sub-navigation bar for Participant */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto no-scrollbar" aria-label="Tabs">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center space-x-2 border-b-2 py-4 px-1 text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "border-brand-600 text-brand-600 font-semibold"
                      : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`h-4.5 w-4.5 ${
                        isActive ? "text-brand-600" : "text-slate-400 group-hover:text-slate-500"
                      }`}
                    />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className={`ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-xxs font-bold ${
                        isActive ? "bg-brand-100 text-brand-800" : "bg-slate-100 text-slate-600"
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

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

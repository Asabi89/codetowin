import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Bell, Menu, LayoutDashboard, Calendar, PlusSquare, Users, MessageSquare, Settings, Award, Mail, FileText, User } from 'lucide-react';

const OrganizerSidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/organizer', icon: LayoutDashboard },
    { name: 'Mes Hackathons', path: '/organizer/hackathons', icon: Calendar },
    { name: 'Créer un hackathon', path: '/organizer/hackathons/create', icon: PlusSquare },
    { name: 'Membres', path: '/organizer/members', icon: Users },
    { name: 'Messages', path: '/organizer/messages', icon: MessageSquare, badge: 2 },
    { name: 'Paramètres', path: '/organizer/settings', icon: Settings },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white sm:flex">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <div className="flex items-center text-brand-700 font-bold text-xl">
          CodeToWin
        </div>
        <span className="ml-2 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
          Organisateur
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/organizer'}
              className={({ isActive }) =>
                `flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-brand-700' : 'text-slate-400'
                    }`}
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center rounded-full bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="border-t border-slate-200 p-4">
        <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">
          <img src="https://ui-avatars.com/api/?name=TechHub+Senegal&background=047857&color=fff" alt="" className="mr-3 h-8 w-8 rounded-full" />
          <span className="truncate">TechHub Sénégal</span>
        </a>
      </div>
    </aside>
  );
};

const MentorSidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/mentor', icon: LayoutDashboard },
    { name: 'Invitations', path: '/mentor/invitations', icon: Mail, badge: 2 },
    { name: 'Mes Équipes', path: '/mentor/teams', icon: Users },
    { name: 'Soumissions', path: '/mentor/submissions', icon: FileText },
    { name: 'Messages', path: '/mentor/messages', icon: MessageSquare, badge: 1 },
    { name: 'Mon Profil', path: '/mentor/profile', icon: User },
    { name: 'Paramètres', path: '/mentor/settings', icon: Settings },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white sm:flex z-10 shadow-sm">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <div className="flex items-center text-brand-700 font-bold text-xl">
          CodeToWin
        </div>
        <span className="ml-2 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
          Mentor
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/mentor'}
              className={({ isActive }) =>
                `flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-brand-700' : 'text-slate-400 group-hover:text-slate-500'
                    }`}
                  />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-800">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="border-t border-slate-200 p-4">
        <a href="#" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">
          <img src="https://ui-avatars.com/api/?name=Seydou+Kane&background=047857&color=fff" alt="" className="mr-3 h-8 w-8 rounded-full" />
          <span className="truncate">Seydou Kane</span>
        </a>
      </div>
    </aside>
  );
};

const Topbar = ({ role = 'organizer' }) => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center">
        <button className="text-slate-500 focus:outline-none sm:hidden">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="ml-4 text-xl font-semibold text-slate-900 sm:ml-0">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <NavLink to={`/${role}/notifications`} className="relative block text-slate-400 hover:text-slate-500">
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
            {role === 'organizer' ? '3' : '1'}
          </span>
          <Bell className="h-6 w-6" />
        </NavLink>
      </div>
    </header>
  );
};

const DashboardLayout = ({ role = 'organizer' }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans text-slate-900">
      {role === 'organizer' ? <OrganizerSidebar /> : <MentorSidebar />}
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar role={role} />
        
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

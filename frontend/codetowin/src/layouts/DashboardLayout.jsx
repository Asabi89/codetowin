import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation, matchPath } from 'react-router-dom';
import { Bell, Menu, LayoutDashboard, Calendar, PlusSquare, Users, MessageSquare, Settings, Award, Mail, FileText, User } from 'lucide-react';
import '../styles/dashboard.css';

const OrganizerSidebar = () => {
  const location = useLocation();
  
  // Determine if we are in a hackathon context
  let activeHackathonId = null;
  const editMatch = matchPath('/organizer/hackathons/edit/:id', location.pathname);
  const actionMatch = matchPath('/organizer/hackathons/:id/*', location.pathname);
  
  if (editMatch && editMatch.params.id !== 'create') {
    activeHackathonId = editMatch.params.id;
  } else if (actionMatch && actionMatch.params.id !== 'create') {
    activeHackathonId = actionMatch.params.id;
  }

  const navItems = [
    { name: 'Dashboard', path: '/organizer', icon: LayoutDashboard },
    { name: 'Mes Hackathons', path: '/organizer/hackathons', icon: Calendar },
    { name: 'Créer un hackathon', path: '/organizer/hackathons/create', icon: PlusSquare },
    { name: 'Membres', path: '/organizer/members', icon: Users },
    { name: 'Messages', path: '/organizer/messages', icon: MessageSquare, badge: 2 },
    { name: 'Paramètres', path: '/organizer/settings', icon: Settings },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white sm:flex z-10 shadow-sm">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <span className="font-display font-bold text-xl text-brand-700">CodeToWin</span>
        <span className="ml-2 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">Organisateur</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <React.Fragment key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/organizer'}
                className={({ isActive }) => {
                  const isHackathonActive = item.path === '/organizer/hackathons' && location.pathname.startsWith('/organizer/hackathons') && location.pathname !== '/organizer/hackathons/create';
                  const active = isActive || isHackathonActive;
                  return `group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    active ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  } ${item.badge ? 'justify-between' : ''}`;
                }}
              >
                {({ isActive }) => {
                  const isHackathonActive = item.path === '/organizer/hackathons' && location.pathname.startsWith('/organizer/hackathons') && location.pathname !== '/organizer/hackathons/create';
                  const active = isActive || isHackathonActive;
                  return (
                    <>
                      <div className="flex items-center">
                        <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${active ? 'text-brand-700' : 'text-slate-400 group-hover:text-slate-500'}`} />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="inline-flex items-center justify-center rounded-full bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )
                }}
              </NavLink>
              
              {/* Nested Hackathon Menu */}
              {item.path === '/organizer/hackathons' && activeHackathonId && (
                <div className="mt-1 space-y-1 border-l-2 border-slate-200 ml-[22px]">
                  <NavLink to={`/organizer/hackathons/edit/${activeHackathonId}`} className={({ isActive }) => `group flex items-center pl-6 pr-3 py-2 text-sm rounded-r-md hover:bg-slate-50 ${isActive ? 'text-brand-700 font-semibold' : 'text-slate-600 font-medium hover:text-slate-900'}`}><span className="truncate">Configuration</span></NavLink>
                  <NavLink to={`/organizer/hackathons/${activeHackathonId}/participants`} className={({ isActive }) => `group flex items-center pl-6 pr-3 py-2 text-sm rounded-r-md hover:bg-slate-50 ${isActive ? 'text-brand-700 font-semibold' : 'text-slate-600 font-medium hover:text-slate-900'}`}><span className="truncate">Participants</span></NavLink>
                  <NavLink to={`/organizer/hackathons/${activeHackathonId}/teams`} className={({ isActive }) => `group flex items-center pl-6 pr-3 py-2 text-sm rounded-r-md hover:bg-slate-50 ${isActive ? 'text-brand-700 font-semibold' : 'text-slate-600 font-medium hover:text-slate-900'}`}><span className="truncate">Équipes</span></NavLink>
                  <NavLink to={`/organizer/hackathons/${activeHackathonId}/submissions`} className={({ isActive }) => `group flex items-center pl-6 pr-3 py-2 text-sm rounded-r-md hover:bg-slate-50 ${isActive ? 'text-brand-700 font-semibold' : 'text-slate-600 font-medium hover:text-slate-900'}`}><span className="truncate">Soumissions</span></NavLink>
                  <NavLink to={`/organizer/hackathons/${activeHackathonId}/results`} className={({ isActive }) => `group flex items-center pl-6 pr-3 py-2 text-sm rounded-r-md hover:bg-slate-50 ${isActive ? 'text-brand-700 font-semibold' : 'text-slate-600 font-medium hover:text-slate-900'}`}><span className="truncate">Résultats</span></NavLink>
                  <NavLink to={`/organizer/hackathons/${activeHackathonId}/mentors`} className={({ isActive }) => `group flex items-center pl-6 pr-3 py-2 text-sm rounded-r-md hover:bg-slate-50 ${isActive ? 'text-brand-700 font-semibold' : 'text-slate-600 font-medium hover:text-slate-900'}`}><span className="truncate">Mentors</span></NavLink>
                  <NavLink to={`/organizer/hackathons/${activeHackathonId}/announcements`} className={({ isActive }) => `group flex items-center pl-6 pr-3 py-2 text-sm rounded-r-md hover:bg-slate-50 ${isActive ? 'text-brand-700 font-semibold' : 'text-slate-600 font-medium hover:text-slate-900'}`}><span className="truncate">Annonces</span></NavLink>
                </div>
              )}
            </React.Fragment>
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
    { name: 'Invitations', path: '/mentor/invitations', icon: Mail, badge: 2, badgeClass: 'nav-item-badge-brand' },
    { name: 'Mes Équipes', path: '/mentor/teams', icon: Users },
    { name: 'Soumissions', path: '/mentor/submissions', icon: FileText },
    { name: 'Messages', path: '/mentor/messages', icon: MessageSquare, badge: 1, badgeClass: 'nav-item-badge-primary' },
    { name: 'Mon Profil', path: '/mentor/profile', icon: User },
    { name: 'Paramètres', path: '/mentor/settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">CodeToWin</div>
        <span className="sidebar-role-badge">Mentor</span>
      </div>
      <div className="sidebar-nav-container">
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/mentor'}
              className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <item.icon className="nav-item-icon" />
                  <span className="nav-item-text">{item.name}</span>
                  {item.badge && (
                    <span className={`nav-item-badge ${item.badgeClass || 'nav-item-badge-primary'}`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="sidebar-footer">
        <a href="#" className="user-profile-link">
          <img src="https://ui-avatars.com/api/?name=Seydou+Kane&background=047857&color=fff" alt="" className="user-avatar" />
          <span className="truncate">Seydou Kane</span>
        </a>
      </div>
    </aside>
  );
};

const Topbar = ({ role = 'organizer' }) => {
  if (role === 'organizer') {
    return (
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
        <div className="flex items-center">
          <button className="text-slate-500 focus:outline-none sm:hidden">
            <Menu size={24} />
          </button>
          <div className="ml-4 flex items-center space-x-2 text-sm sm:ml-0">
            <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NavLink to={`/${role}/notifications`} className="relative block text-slate-400 hover:text-slate-500">
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">3</span>
            <Bell size={24} />
          </NavLink>
        </div>
      </header>
    );
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="mobile-menu-btn">
          <Menu size={24} />
        </button>
        <h1 className="topbar-title">Dashboard</h1>
      </div>
      <div className="topbar-right">
        <NavLink to={`/${role}/notifications`} className="notification-btn">
          <span className="notification-badge">
            {role === 'organizer' ? '3' : '1'}
          </span>
          <Bell size={24} />
        </NavLink>
      </div>
    </header>
  );
};

const DashboardLayout = ({ role = 'organizer' }) => {
  return (
    <div className={role === 'organizer' ? 'flex h-screen overflow-hidden bg-slate-50' : 'dashboard-layout'}>
      {role === 'organizer' ? <OrganizerSidebar /> : <MentorSidebar />}
      
      <div className={role === 'organizer' ? 'flex flex-1 flex-col overflow-hidden' : 'dashboard-main'}>
        <Topbar role={role} />
        
        <main className={role === 'organizer' ? 'flex-1 overflow-y-auto bg-slate-50' : 'dashboard-content-area'}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

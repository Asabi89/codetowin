import React from 'react';
import { Link, NavLink, useLocation, matchPath, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, PlusSquare, Users, MessageSquare, Settings, LogOut } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';

export default function OrganizerSidebar() {
  const { logout, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  
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
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white sm:flex">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <img
          src="/assets/brand/codetowin-brand.png"
          alt="CodeToWin"
          className="h-8"
          decoding="async"
        />
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
      <div className="border-t border-slate-200 p-4 space-y-1">
        <Link to="/organizer/settings" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent((profile?.firstName || 'O') + '+' + (profile?.lastName || ''))}&background=047857&color=fff`} alt="" className="mr-3 h-8 w-8 rounded-full" />
          <span className="truncate">{profile?.firstName ? `${profile.firstName} ${profile.lastName || ''}`.trim() : 'Organisateur'}</span>
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-red-400 group-hover:text-red-600" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}

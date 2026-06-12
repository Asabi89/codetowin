import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LayoutDashboard, Mail, Users, FileText, MessageSquare, User, Settings } from 'lucide-react';

export default function MentorSidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/mentor', icon: LayoutDashboard },
    { name: 'Invitations', path: '/mentor/invitations', icon: Mail, badge: 2, badgeClass: 'bg-brand-100 px-2.5 font-medium text-brand-800' },
    { name: 'Mes Équipes', path: '/mentor/teams', icon: Users },
    { name: 'Soumissions', path: '/mentor/submissions', icon: FileText },
    { name: 'Messages', path: '/mentor/messages', icon: MessageSquare, badge: 1, badgeClass: 'bg-brand-600 px-2 font-bold text-white' },
    { name: 'Mon Profil', path: '/mentor/profile', icon: User },
    { name: 'Paramètres', path: '/mentor/settings', icon: Settings },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white sm:flex z-10 shadow-sm">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <img
          src="/assets/brand/codetowin-brand.png"
          alt="CodeToWin"
          className="h-8"
          decoding="async"
        />
        <span className="ml-2 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">Mentor</span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/mentor'}
              className={({ isActive }) => `group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              } ${item.badge ? 'justify-between' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center">
                    <item.icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-brand-700' : 'text-slate-400 group-hover:text-slate-500'}`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={`inline-flex items-center justify-center rounded-full py-0.5 text-xs ${item.badgeClass}`}>
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
        <Link to="/mentor/profile" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">
          <img src="https://ui-avatars.com/api/?name=Seydou+Kane&background=047857&color=fff" alt="" className="mr-3 h-8 w-8 rounded-full" />
          <span className="truncate">Seydou Kane</span>
        </Link>
      </div>
    </aside>
  );
}

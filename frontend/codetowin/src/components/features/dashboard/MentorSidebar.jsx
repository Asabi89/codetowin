import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Mail, Users, FileText, MessageSquare, User, Settings, LogOut, X } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';

export default function MentorSidebar({ isOpen, setIsOpen }) {
  const { logout, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-slate-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 shadow-sm ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6 shrink-0">
          <div className="flex items-center">
            <img
              src="/assets/brand/codetowin-brand.png"
              alt="CodeToWin"
              className="h-8"
              decoding="async"
            />
            <span className="ml-2 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">Mentor</span>
          </div>
          <button 
            className="lg:hidden text-slate-500 hover:text-slate-700 focus:outline-none" 
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/mentor'}
              onClick={() => setIsOpen(false)}
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
      <div className="border-t border-slate-200 p-4 space-y-1">
        <Link to="/mentor/profile" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900">
          <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent((profile?.firstName || 'M') + '+' + (profile?.lastName || ''))}&background=047857&color=fff`} alt="" className="mr-3 h-8 w-8 rounded-full" />
          <span className="truncate">{profile?.firstName ? `${profile.firstName} ${profile.lastName || ''}`.trim() : 'Mentor'}</span>
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
    </>
  );
}

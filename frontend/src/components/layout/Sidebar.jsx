import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Map, 
  CalendarCheck, 
  FileText, 
  BarChart3, 
  User, 
  LogOut,
  Flame
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-brand-blue' },
    { to: '/roadmaps', label: 'Roadmaps', icon: Map, color: 'text-brand-green' },
    { to: '/tracker', label: 'Daily Tracker', icon: CalendarCheck, color: 'text-brand-orange' },
    { to: '/notes', label: 'My Notes', icon: FileText, color: 'text-brand-pink' },
    { to: '/analytics', label: 'Analytics', icon: BarChart3, color: 'text-brand-purple' },
    { to: '/profile', label: 'Profile & Badges', icon: User, color: 'text-brand-yellow' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed inset-y-0 left-0 w-64 glass-panel border-r border-dark-border z-30 flex flex-col justify-between py-6">
      <div>
        {/* Logo Section */}
        <div className="px-6 mb-8 flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-green flex items-center justify-center font-black text-white text-xl shadow-lg shadow-brand-blue/20">
            P
          </div>
          <div>
            <h1 className="font-extrabold text-xl leading-none bg-gradient-to-r from-white to-dark-textMuted bg-clip-text text-transparent">
              PathForge
            </h1>
            <span className="text-[10px] uppercase tracking-widest text-brand-blue font-bold">
              Student Ecosystem
            </span>
          </div>
        </div>

        {/* User Quick Info */}
        {user && (
          <div className="px-6 mb-6">
            <div className="p-3 bg-dark-card/50 rounded-xl border border-dark-border flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue/30 to-brand-purple/30 border border-brand-blue/50 flex items-center justify-center text-lg font-bold text-brand-blue">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-sm truncate">{user.name}</p>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <Flame className="w-3.5 h-3.5 text-brand-orange fill-brand-orange animate-pulse" />
                  <span className="text-xs font-bold text-brand-orange">{user.streak || 0} Day Streak</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="px-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-dark-card text-white shadow-glass-inner border border-white/10' 
                    : 'text-dark-textMuted hover:text-white hover:bg-dark-card/30 border border-transparent'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${link.color}`} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout button at bottom */}
      <div className="px-4">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

import { Link, useLocation } from 'react-router-dom';
import { Home, Users, ClipboardList, Zap, Bookmark, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/candidates', label: 'Candidates', icon: Users },
  { to: '/candidates/add', label: 'Add Candidate', icon: ClipboardList },
  { to: '/jobs', label: 'Job Requests', icon: Zap },
  { to: '/shortlist', label: 'Shortlist', icon: Bookmark }
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  return (
    <aside className="w-72 hidden xl:block shrink-0 bg-slate-950/90 border-r border-white/10 px-5 py-8">
      <div className="mb-10">
        <div className="text-2xl font-semibold tracking-tight text-white">HireGenius AI</div>
        <p className="mt-2 text-sm text-slate-400">Smart candidate shortlisting for modern recruiters.</p>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to;
          return (
            <Link key={item.to} to={item.to} className={`group flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${active ? 'bg-violet-700/20 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <button onClick={logout} className="mt-10 flex items-center gap-2 rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/10">
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </aside>
  );
};

export default Sidebar;

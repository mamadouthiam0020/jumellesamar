import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiLayout, FiImage, FiClipboard, FiMessageSquare, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin', label: 'Tableau de bord', icon: <FiLayout />, end: true },
  { to: '/admin/collections', label: 'Collections', icon: <FiImage /> },
  { to: '/admin/actualites', label: 'Actualités', icon: <FiClipboard /> },
  { to: '/admin/messages', label: 'Messages', icon: <FiMessageSquare /> },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="pt-24 min-h-screen max-w-7xl mx-auto px-6 pb-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serifDisplay text-3xl text-ivory">Administration</h1>
          <p className="text-sm text-ivory/50 mt-1">Bonjour, {user?.name}</p>
        </div>
        <button onClick={handleLogout} className="btn-outline !py-2">
          <FiLogOut /> Déconnexion
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <aside className="lg:col-span-1">
          <nav className="space-y-1 sticky top-28">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm border transition-all ${
                    isActive
                      ? 'border-platine/50 text-platine bg-platine/10'
                      : 'border-transparent text-ivory/60 hover:text-ivory hover:border-ivory/20'
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="lg:col-span-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

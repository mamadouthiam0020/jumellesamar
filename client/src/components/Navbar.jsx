import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiHome, FiGrid, FiFileText, FiInfo, FiMail } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/collections', label: 'Collections' },
  { to: '/actualites', label: 'Actualités' },
  { to: '/a-propos', label: 'À Propos' },
  { to: '/contact', label: 'Contact' },
];

const mobileIcons = {
  '/': FiHome,
  '/collections': FiGrid,
  '/actualites': FiFileText,
  '/a-propos': FiInfo,
  '/contact': FiMail,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-noir/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="group z-50 flex items-center gap-3">
          <img
            src="/assets/logo-blanc.png"
            alt="Jumelles Amar"
            className="h-10 w-auto opacity-90 transition-opacity duration-300 group-hover:opacity-100"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-serifDisplay text-lg tracking-[0.18em] uppercase text-ivory">
              Jumelles
            </span>
            <span className="text-[10px] tracking-[0.5em] uppercase text-ivory/50">Amar</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-item ${isActive ? '!text-platine' : ''}`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center space-x-6">
          {user ? (
            <div className="flex items-center space-x-4">
              <NavLink to="/profil" className="nav-item flex items-center gap-2">
                <FiUser className="w-4 h-4" />
                {user?.name?.split(' ')[0] || 'Profil'}
              </NavLink>
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className="nav-item"
                >
                  Admin
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="text-ivory/70 hover:text-platine transition-colors"
                title="Déconnexion"
              >
                <FiLogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link to="/login" className="nav-item flex items-center gap-2">
                <FiUser className="w-4 h-4" />
                Se connecter
              </Link>
              <Link to="/register" className="btn-metal !py-2 !px-5 text-[11px]">
                S'inscrire
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function MobileTabBar() {
  const { user, isAdmin } = useAuth();

  const profileTo = user ? '/profil' : '/login';

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-noir/95 backdrop-blur-md border-t border-platine/20 pb-[env(safe-area-inset-bottom)]"
      aria-label="Navigation mobile"
    >
      <div className="flex items-stretch">
        {navLinks.map((link) => {
          const Icon = mobileIcons[link.to];
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative flex flex-1 flex-col items-center justify-center gap-1 py-2.5 transition-colors duration-300 ${
                  isActive ? 'text-platine' : 'text-ivory/50 hover:text-ivory'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute top-0 h-0.5 w-8 rounded-full bg-platine" />
                  )}
                  <Icon className="w-5 h-5" />
                  <span className="text-[9px] font-medium uppercase tracking-widest">
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}

        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `relative flex flex-1 flex-col items-center justify-center gap-1 py-2.5 transition-colors duration-300 ${
                isActive ? 'text-platine' : 'text-ivory/50 hover:text-ivory'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute top-0 h-0.5 w-8 rounded-full bg-platine" />
                )}
                <FiGrid className="w-5 h-5" />
                <span className="text-[9px] font-medium uppercase tracking-widest">
                  Admin
                </span>
              </>
            )}
          </NavLink>
        )}

        <NavLink
          to={profileTo}
          className={({ isActive }) =>
            `relative flex flex-1 flex-col items-center justify-center gap-1 py-2.5 transition-colors duration-300 ${
              isActive && user ? 'text-platine' : 'text-ivory/50 hover:text-ivory'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && user && (
                <span className="absolute top-0 h-0.5 w-8 rounded-full bg-platine" />
              )}
              {user ? (
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-platine-light to-platine-dark text-noir text-[10px] font-semibold flex items-center justify-center uppercase">
                  {(user.name || 'P').charAt(0)}
                </span>
              ) : (
                <FiUser className="w-5 h-5" />
              )}
              <span className="text-[9px] font-medium uppercase tracking-widest">
                {user ? 'Profil' : 'Connexion'}
              </span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
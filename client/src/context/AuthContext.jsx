import { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api';

const AuthContext = createContext();

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const WARNING_TIMEOUT = 4.5 * 60 * 1000; // 4.5 minutes (warn 30s before)
const ACTIVITY_EVENTS = ['mousedown', 'keydown', 'scroll', 'touchstart'];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('jumelles_amar_user')) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const logoutTimerRef = useRef(null);
  const warningTimerRef = useRef(null);
  const userRef = useRef(user);

  // Keep userRef in sync with user state
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const setToken = (token) => localStorage.setItem('jumelles_amar_token', token);
  const setStoredUser = (userData) => {
    localStorage.setItem('jumelles_amar_user', JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setToken(data.token);
      setStoredUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('jumelles_amar_token');
    localStorage.removeItem('jumelles_amar_user');
    setUser(null);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    logoutTimerRef.current = null;
    warningTimerRef.current = null;
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/profile');
      setStoredUser(data);
      return data;
    } catch {
      return null;
    }
  }, []);

  const updateProfile = async (userData) => {
    const { data } = await api.put('/auth/profile', userData);
    setStoredUser({ ...user, ...data });
    return data;
  };

  // Auto-logout on inactivity
  useEffect(() => {
    if (!user) return;

    const resetTimers = () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);

      warningTimerRef.current = setTimeout(() => {
        toast('Vous serez déconnecté(e) dans 30 secondes pour inactivité.', {
          icon: '⏳',
          duration: 6000,
        });
      }, WARNING_TIMEOUT);

      logoutTimerRef.current = setTimeout(() => {
        toast('Déconnexion automatique pour inactivité.', { icon: '🔒' });
        logout();
      }, INACTIVITY_TIMEOUT);
    };

    const handleActivity = () => {
      if (userRef.current) resetTimers();
    };

    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, handleActivity, { passive: true })
    );

    resetTimers();

    return () => {
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    };
  }, [user, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshProfile,
        updateProfile,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

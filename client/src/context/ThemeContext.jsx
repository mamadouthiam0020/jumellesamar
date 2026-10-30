import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem('jumelles-theme');
  return stored === 'light' ? 'light' : 'dark';
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('light', theme === 'light');
    root.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('jumelles-theme', theme);

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'light' ? '#FAF8F4' : '#0A0A0A');
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans un ThemeProvider');
  }
  return context;
}

import { AnimatePresence, motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';
  const label = isLight ? 'Activer le mode sombre' : 'Activer le mode clair';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory/70 transition-colors duration-300 hover:border-platine/50 hover:text-platine"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center"
        >
          {isLight ? <FiMoon className="h-4 w-4" /> : <FiSun className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

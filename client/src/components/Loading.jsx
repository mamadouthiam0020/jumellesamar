import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function Loading({ fullScreen = false, text = 'Chargement...' }) {
  const { theme } = useTheme();
  const logoSrc = theme === 'light' ? '/assets/logo-noir.png' : '/assets/logo-blanc.png';

  if (fullScreen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-noir">
        <img src={logoSrc} alt="" className="h-20 w-auto mb-8 opacity-80" />
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-platine"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
        <p className="mt-6 text-xs uppercase tracking-widest text-ivory/50">{text}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24">
      <motion.div
        className="w-12 h-12 border-2 border-platine/30 border-t-platine rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <p className="mt-6 text-xs uppercase tracking-widest text-ivory/50 animate-pulse">{text}</p>
    </div>
  );
}

import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '221777327474';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Bonjour Jumelles Amar, je souhaite avoir plus d’informations sur vos créations.'
);

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter sur WhatsApp"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-6 lg:bottom-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-green-900/30 flex items-center justify-center text-white"
    >
      <FaWhatsapp className="w-7 h-7" />
    </motion.a>
  );
}

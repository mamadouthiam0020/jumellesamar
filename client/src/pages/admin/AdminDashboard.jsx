import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { fadeIn, fadeInUp, staggerContainer, viewportOnce } from '../../utils/motion';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    collections: 0,
    news: 0,
    messages: 0,
    unread: 0,
  });
  const [loading, setLoading] = useState(true);

  const loadCounts = async () => {
    try {
      const [collections, news, contacts] = await Promise.all([
        api.get('/collections', { params: { active: 'all' } }),
        api.get('/news', { params: { published: 'all', limit: 1 } }),
        api.get('/contact'),
      ]);

      setStats({
        collections: Array.isArray(collections.data) ? collections.data.length : collections.data.total || 0,
        news: news.data.total || 0,
        messages: Array.isArray(contacts.data) ? contacts.data.length : contacts.data.total || 0,
        unread: Array.isArray(contacts.data)
          ? contacts.data.filter((c) => c.status === 'new').length
          : 0,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  const cards = [
    { label: 'Collections', value: stats.collections },
    { label: 'Actualités', value: stats.news },
    { label: 'Messages', value: stats.messages },
    { label: 'Messages non lus', value: stats.unread },
  ];

  if (loading) return <Loading />;

  return (
    <div>
      <h2 className="font-serifDisplay text-2xl text-ivory mb-8">Vue d'ensemble</h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {cards.map((card) => (
          <motion.div key={card.label} variants={fadeInUp} className="card-luxury rounded-none p-6">
            <p className="text-xs uppercase tracking-widest text-ivory/50 mb-2">{card.label}</p>
            <p className="font-serifDisplay text-3xl text-gradient-metal">{card.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mt-10 bg-noir-light p-6 border border-platine/20">
        <h3 className="text-sm uppercase tracking-widest text-platine mb-4">Conseils</h3>
        <ul className="space-y-2 text-sm text-ivory/60 leading-relaxed">
          <li>• Utilisez des images haute résolution (au moins 1200px) pour un rendu optimal.</li>
          <li>• Pensez à marquer vos collections comme "En vedette" pour l'accueil.</li>
          <li>• Vérifiez régulièrement vos messages pour répondre aux clients rapidement.</li>
        </ul>
      </motion.div>
    </div>
  );
}

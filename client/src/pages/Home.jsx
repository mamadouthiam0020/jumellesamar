import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import api from '../utils/api';
import SectionHeading from '../components/SectionHeading';
import CollectionCard from '../components/CollectionCard';
import NewsCard from '../components/NewsCard';
import Loading from '../components/Loading';
import { fadeIn, fadeInUp, staggerContainer, viewportOnce, scaleIn } from '../utils/motion';

const scaleFrame = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.3 },
  },
};

const heroImages = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Boubou_homme.jpg/1920px-Boubou_homme.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Boubou_en_ndop.jpg/1920px-Boubou_en_ndop.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Boubou_-_MCN_4232.jpg/1920px-Boubou_-_MCN_4232.jpg',
];

export default function Home() {
  const [collections, setCollections] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [collectionsRes, newsRes] = await Promise.all([
          api.get('/collections?featured=true'),
          api.get('/news', { params: { limit: 3 } }),
        ]);
        setCollections(collectionsRes.data);
        setNews(newsRes.data.news);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[heroIndex]}
              alt="Jumelles Amar"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-noir/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-noir/40 via-transparent to-noir" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="font-serifDisplay text-4xl md:text-7xl lg:text-8xl text-ivory leading-tight mb-6"
          >
            L'Élégance
            <br />
            <span className="text-gradient-metal italic">Réinventée</span>
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="metal-hairline mb-8"
          />

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="max-w-xl text-ivory/70 leading-relaxed mb-10"
          >
            Découvrez des créations uniques façonnées à la main dans notre atelier.
            Chaque pièce raconte une histoire, chaque couture est un héritage.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/collections" className="btn-metal">
              Découvrir les Collections
              <FiArrowRight />
            </Link>
            <Link to="/contact" className="btn-outline">
              Prendre Rendez-vous
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-widest text-ivory/50 mb-2">Scroll</span>
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-platine to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeIn} className="relative">
            <div className="overflow-hidden aspect-[3/4]">
              <img
                src={heroImages[1]}
                alt="Atelier Jumelles Amar"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              variants={scaleIn}
              className="absolute -bottom-8 -right-4 md:-right-8 bg-noir-light border border-platine/30 p-6 backdrop-blur"
            >
              <p className="font-serifDisplay text-4xl text-gradient-metal">6</p>
              <p className="text-xs uppercase tracking-widest text-ivory/60 mt-1">
                Années de savoir-faire
              </p>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <span className="text-xs uppercase tracking-widest text-platine">Notre Maison</span>
            <h2 className="font-serifDisplay text-3xl md:text-5xl text-ivory leading-tight mt-3 mb-6">
              L'art de la haute couture,
              <br />
              <span className="italic text-gradient-metal">transmis avec passion</span>
            </h2>
            <div className="metal-hairline mb-6" />
            <p className="text-ivory/60 leading-relaxed mb-6">
              Chez Jumelles Amar, chaque création naît d'une rencontre entre tradition
              et modernité. Nos maîtres artisans perpétuent un savoir-faire d'exception,
              du choix des plus belles étoffes jusqu'à la dernière main.
            </p>
            <p className="text-ivory/60 leading-relaxed mb-8">
              Nous croyons en une mode lente, responsable et profondément humaine,
              où chaque vêtement est taillé pour durer et pour sublimer.
            </p>
            <Link to="/a-propos" className="btn-outline">
              Notre Histoire
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="py-24 bg-noir-light">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading
            eyebrow="Collections"
            title="Nos Créations Signature"
            subtitle="Chaque collection est une ode à l'élégance, pensée pour sublimer vos moments les plus précieux."
          />
          {loading ? (
            <Loading />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.slice(0, 3).map((collection) => (
                <CollectionCard key={collection._id} collection={collection} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link to="/collections" className="btn-outline">
              Voir toutes les collections
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <img
          src={heroImages[2]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-noir/75" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <SectionHeading
            eyebrow="Sur-Mesure"
            title="Une création pour vous"
            subtitle="Confiez-nous votre vision et laissez nos artisans la transformer en pièce unique, taillée à vos mesures."
            align="center"
          />
          <Link to="/contact" className="btn-metal">
            Demander un Rendez-vous
          </Link>
        </div>
      </section>

      {/* NEWS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Actualités"
          title="Les Dernières Nouvelles"
          subtitle="Suivez la vie de la maison : événements, coulisses et nouveautés."
        />
        {loading ? (
          <Loading />
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((article) => (
              <NewsCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

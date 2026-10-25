import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../utils/api';
import Loading from '../components/Loading';
import { fadeInUp, viewportOnce } from '../utils/motion';

export default function CollectionDetail() {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/collections/slug/${slug}`);
        setCollection(data);
        setActiveImage(0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) return <Loading fullScreen />;
  if (!collection) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24">
      <p className="font-serifDisplay text-2xl mb-4">Collection non trouvée</p>
      <Link to="/collections" className="btn-outline">Retour aux collections</Link>
    </div>
  );

  const images = collection.images.length > 0 ? collection.images : [collection.coverImage];

  const next = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prev = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/collections" className="nav-item inline-flex items-center gap-2 mb-8">
          ← Retour aux collections
        </Link>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <div className="relative overflow-hidden aspect-[3/4] bg-noir-light">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={images[activeImage]}
                  alt={collection.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-noir/50 hover:bg-noir/80 backdrop-blur text-ivory transition-colors"
                    aria-label="Précédent"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-noir/50 hover:bg-noir/80 backdrop-blur text-ivory transition-colors"
                    aria-label="Suivant"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 overflow-hidden border-2 transition-all ${
                      i === activeImage ? 'border-platine' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${collection.title} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <span className="text-xs uppercase tracking-widest text-platine">{collection.category}</span>
            <h1 className="font-serifDisplay text-3xl md:text-5xl text-ivory mt-3 mb-4">
              {collection.title}
            </h1>
            <div className="metal-hairline mb-6" />
            <p className="text-ivory/70 leading-relaxed mb-6">{collection.longDescription || collection.description}</p>

            {collection.designerNote && (
              <blockquote className="border-l-2 border-platine pl-6 my-8">
                <p className="font-serifDisplay italic text-xl text-ivory/80">{collection.designerNote}</p>
              </blockquote>
            )}

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-noir-light p-4">
                <p className="text-[10px] uppercase tracking-widest text-platine mb-1">Année</p>
                <p className="text-ivory">{collection.year}</p>
              </div>
              <div className="bg-noir-light p-4">
                <p className="text-[10px] uppercase tracking-widest text-platine mb-1">Pièces</p>
                <p className="text-ivory">{collection.images.length}</p>
              </div>
            </div>

            <Link to="/contact" className="btn-metal w-full">
              Commander cette création
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

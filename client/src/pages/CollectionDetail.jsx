import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import Loading from '../components/Loading';
import CollectionGallery from '../components/CollectionGallery';
import { fadeInUp, viewportOnce } from '../utils/motion';

export default function CollectionDetail() {
  const { slug } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/collections/slug/${slug}`);
        setCollection(data);
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

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/collections" className="nav-item inline-flex items-center gap-2 mb-10">
          ← Retour aux collections
        </Link>

        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8"
          >
            <span className="text-xs uppercase tracking-[0.35em] text-platine">
              {collection.category}
            </span>
            <h1 className="font-serifDisplay text-3xl md:text-5xl text-ivory mt-3 mb-5">
              {collection.title}
            </h1>
            <div className="metal-hairline mb-6" />
            <p className="text-ivory/70 leading-relaxed max-w-2xl">
              {collection.longDescription || collection.description}
            </p>

            {collection.designerNote && (
              <blockquote className="border-l-2 border-platine pl-6 mt-8">
                <p className="font-serifDisplay italic text-xl text-ivory/80">
                  {collection.designerNote}
                </p>
              </blockquote>
            )}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            className="lg:col-span-4"
          >
            <div className="border border-ivory/10 bg-noir-light/40 backdrop-blur p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-platine mb-1">Année</p>
                  <p className="text-ivory">{collection.year}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-platine mb-1">Pièces</p>
                  <p className="text-ivory">{collection.images.length}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] uppercase tracking-widest text-platine mb-1">Collection</p>
                  <p className="text-ivory">{collection.category}</p>
                </div>
              </div>
              <div className="metal-hairline my-6 w-full" />
              <Link to="/contact" className="btn-metal w-full">
                Commander cette création
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <CollectionGallery
            images={images}
            title={collection.title}
            category={collection.category}
          />
        </motion.div>
      </div>
    </div>
  );
}

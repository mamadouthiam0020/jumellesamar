import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import api from '../utils/api';
import PageHeader from '../components/PageHeader';
import CollectionCard from '../components/CollectionCard';
import Loading from '../components/Loading';
import { fadeIn } from '../utils/motion';

const categories = ['Toutes', 'Robes', 'Tenues Hommes', 'Accessoires', 'Sur-Mesure', 'Mariage'];

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('categorie') || 'Toutes';

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory !== 'Toutes') params.category = activeCategory;
        const { data } = await api.get('/collections', { params });
        setCollections(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [activeCategory]);

  const onChangeCategory = (cat) => {
    if (cat === 'Toutes') setSearchParams({});
    else setSearchParams({ categorie: cat });
  };

  return (
    <div>
      <PageHeader
        title="Nos Collections"
        subtitle="Des créations uniques, pensées et façonnées à la main dans notre atelier."
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Boubou_homme.jpg/1920px-Boubou_homme.jpg"
      />

      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChangeCategory(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-widest border transition-all duration-300 ${
                activeCategory === cat
                  ? 'border-platine text-platine bg-platine/10'
                  : 'border-ivory/20 text-ivory/60 hover:border-platine/50 hover:text-ivory'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <Loading />
        ) : collections.length === 0 ? (
          <div className="text-center py-20 text-ivory/50">
            <p className="font-serifDisplay text-2xl mb-4">Aucune collection trouvée</p>
            <p className="text-sm">Essayez une autre catégorie ou revenez plus tard.</p>
          </div>
        ) : (
          <motion.div
            key={activeCategory}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {collections.map((collection) => (
              <CollectionCard key={collection._id} collection={collection} />
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import PageHeader from '../components/PageHeader';
import NewsCard from '../components/NewsCard';
import Loading from '../components/Loading';
import { fadeIn } from '../utils/motion';
import { pageImages } from '../utils/images';

const categories = ['Toutes', 'Mode', 'Événement', 'Coulisses', 'Nouveauté', 'Presse'];

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('categorie') || 'Toutes';

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = { page, limit: 6 };
        if (category !== 'Toutes') params.category = category;
        const { data } = await api.get('/news', { params });
        setNews(data.news);
        setPages(data.pages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category, page]);

  const onChangeCategory = (cat) => {
    if (cat === 'Toutes') setSearchParams({});
    else setSearchParams({ categorie: cat });
    setPage(1);
  };

  return (
    <div>
      <PageHeader
        title="Actualités"
        subtitle="Suivez la vie de la maison Jumelles Amar."
        image={pageImages.news}
      />

      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onChangeCategory(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-widest border transition-all ${
                category === cat
                  ? 'border-platine text-platine bg-platine/10'
                  : 'border-ivory/20 text-ivory/60 hover:border-platine/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <Loading />
        ) : news.length === 0 ? (
          <div className="text-center py-20 text-ivory/50">
            <p className="font-serifDisplay text-2xl mb-4">Aucun article trouvé</p>
          </div>
        ) : (
          <motion.div
            key={`${category}-${page}`}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {news.map((article) => (
              <NewsCard key={article._id} article={article} />
            ))}
          </motion.div>
        )}

        {pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 text-sm border transition-all ${
                  page === p
                    ? 'border-platine text-platine bg-platine/10'
                    : 'border-ivory/20 text-ivory/60 hover:border-platine/50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

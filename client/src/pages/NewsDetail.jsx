import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../utils/api';
import Loading from '../components/Loading';
import { formatDate } from '../utils/helpers';
import { fadeInUp } from '../utils/motion';

export default function NewsDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/news/slug/${slug}`);
        setArticle(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) return <Loading fullScreen />;
  if (!article) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24">
      <p className="font-serifDisplay text-2xl mb-4">Article non trouvé</p>
      <Link to="/actualites" className="btn-outline">Retour aux actualités</Link>
    </div>
  );

  return (
    <div className="pt-32">
      <motion.article
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto px-6"
      >
        <Link to="/actualites" className="nav-item inline-flex items-center gap-2 mb-8">
          ← Retour aux actualités
        </Link>

        <span className="text-xs uppercase tracking-widest text-platine">{article.category}</span>
        <h1 className="font-serifDisplay text-3xl md:text-5xl text-ivory mt-3 mb-6 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-6 text-sm text-ivory/50 mb-10">
          <span>{article.author}</span>
          <span className="text-platine">•</span>
          <span>{formatDate(article.createdAt)}</span>
        </div>

        <div className="overflow-hidden mb-10">
          <img src={article.coverImage} alt={article.title} className="w-full aspect-[16/9] object-cover" />
        </div>

        <div className="prose prose-invert max-w-none">
          {article.content.split('\n').map((para, i) => (
            <p key={i} className="text-ivory/70 leading-relaxed mb-6">
              {para}
            </p>
          ))}
        </div>

        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-ivory/10">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] uppercase tracking-widest text-platine border border-platine/30 bg-platine/5"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </motion.article>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, viewportOnce } from '../utils/motion';
import { formatDate } from '../utils/helpers';

export default function NewsCard({ article, index = 0 }) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ duration: 0.6 }}
    >
      <Link to={`/actualites/${article.slug}`} className="group block">
        <div className="card-luxury rounded-none">
          <div className="relative overflow-hidden aspect-[16/10]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-noir/70 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest text-platine border border-platine/30">
                {article.category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-xs text-ivory/40 mb-2">{formatDate(article.createdAt)}</p>
            <h3 className="font-serifDisplay text-xl text-ivory mb-3 group-hover:text-platine transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-ivory/60 line-clamp-2 mb-4">{article.excerpt}</p>
            <span className="text-xs uppercase tracking-widest text-platine inline-flex items-center gap-2">
              Lire la suite
              <motion.span
                className="inline-block"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

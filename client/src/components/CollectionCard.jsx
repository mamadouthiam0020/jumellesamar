import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, viewportOnce } from '../utils/motion';

export default function CollectionCard({ collection, index = 0 }) {
  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ duration: 0.6 }}
    >
      <Link to={`/collections/${collection.slug}`} className="group block">
        <div className="card-luxury rounded-none">
          <div className="relative overflow-hidden aspect-[3/4]">
            <img
              src={collection.coverImage}
              alt={collection.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-70" />
            <div className="absolute top-4 left-4">
              <span className="bg-noir/70 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-widest text-platine border border-platine/30">
                {collection.category}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-serifDisplay text-xl text-ivory mb-2 group-hover:text-platine transition-colors">
              {collection.title}
            </h3>
            <p className="text-sm text-ivory/60 line-clamp-2 mb-4">{collection.description}</p>
            <span className="text-xs uppercase tracking-widest text-platine inline-flex items-center gap-2">
              Découvrir
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

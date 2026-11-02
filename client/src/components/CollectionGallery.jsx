import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiArrowUpRight } from 'react-icons/fi';

const ease = [0.22, 1, 0.36, 1];
const pad = (n) => String(n).padStart(2, '0');

function CornerFrame() {
  return (
    <span className="pointer-events-none absolute inset-3 z-10">
      <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-platine/60" />
      <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-platine/60" />
      <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-platine/60" />
      <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-platine/60" />
    </span>
  );
}

export default function CollectionGallery({ images, title, category }) {
  const [active, setActive] = useState(0);
  const railRef = useRef(null);
  const total = images.length;

  const go = useCallback(
    (dir) => setActive((prev) => (prev + dir + total) % total),
    [total]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const thumb = rail.children[active];
    if (!thumb) return;
    rail.scrollTo({
      left: thumb.offsetLeft - rail.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: 'smooth',
    });
  }, [active]);

  return (
    <div className="relative">
      {/* En-tête */}
      <div className="flex items-end justify-between gap-6 mb-7">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-platine/60" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-platine">Galerie</span>
          </div>
          <h2 className="font-serifDisplay text-2xl md:text-3xl text-ivory">
            La collection en images
          </h2>
        </div>

        <div className="flex items-center gap-5">
          <span className="font-sansBody text-[10px] tracking-[0.35em] text-platine">
            {pad(active + 1)}
            <span className="mx-1 text-platine/40">—</span>
            {pad(total)}
          </span>
          {total > 1 && (
            <div className="hidden sm:flex">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Image précédente"
                className="group p-2.5 border border-ivory/15 text-ivory/60 hover:text-noir hover:bg-platine hover:border-platine transition-all duration-300"
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Image suivante"
                className="group -ml-px p-2.5 border border-ivory/15 text-ivory/60 hover:text-noir hover:bg-platine hover:border-platine transition-all duration-300"
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cadre décoratif */}
      <div className="relative">
        <span className="pointer-events-none absolute -inset-2 hidden md:block border border-ivory/[0.06]" />
        <div className="hidden md:block p-1.5 border border-ivory/10 bg-noir-light/30 backdrop-blur-sm">
          <div className="flex gap-1.5 h-[64vh] min-h-[440px] max-h-[780px]">
            {images.map((img, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  type="button"
                  key={`${img}-${i}`}
                  onClick={() => setActive(i)}
                  aria-label={`Voir l'image ${i + 1}`}
                  aria-expanded={isActive}
                  className="group relative overflow-hidden text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-platine"
                  style={{ flexBasis: 0, minWidth: 0 }}
                  animate={{ flexGrow: isActive ? 7.5 : 1 }}
                  transition={{ duration: 0.8, ease }}
                >
                  <motion.img
                    src={img}
                    alt={`${title} ${i + 1}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-700 ${
                      isActive
                        ? 'brightness-100 saturate-100'
                        : 'brightness-[0.55] saturate-[0.75] group-hover:brightness-[0.8] group-hover:saturate-100'
                    }`}
                    animate={{ scale: isActive ? 1 : 1.18 }}
                    transition={{ duration: 1.4, ease }}
                  />

                  {/* Voile */}
                  <div
                    className={`absolute inset-0 transition-all duration-700 ${
                      isActive
                        ? 'bg-gradient-to-t from-noir via-noir/20 to-noir/10'
                        : 'bg-noir/40 group-hover:bg-noir/20'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-noir/30 via-transparent to-transparent opacity-60" />

                  {/* Liseré */}
                  <div
                    className={`absolute inset-0 border transition-colors duration-500 ${
                      isActive
                        ? 'border-platine/50'
                        : 'border-ivory/10 group-hover:border-platine/30'
                    }`}
                  />

                  {isActive && (
                    <>
                      <CornerFrame />
                      <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(232,232,232,0.10),transparent_60%)]" />

                      <motion.div
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.18 }}
                        className="absolute inset-x-0 bottom-0 p-7 lg:p-9"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-serifDisplay text-4xl leading-none text-platine/80">
                            {pad(i + 1)}
                          </span>
                          <span className="h-px flex-1 bg-gradient-to-r from-platine/60 to-transparent" />
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-platine mb-2">
                          {category}
                        </p>
                        <div className="flex items-end justify-between gap-6">
                          <h3 className="font-serifDisplay text-2xl lg:text-3xl text-ivory leading-tight">
                            {title}
                          </h3>
                          <span className="shrink-0 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ivory/70">
                            Voir
                            <FiArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </motion.div>
                    </>
                  )}

                  {!isActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-between py-6">
                      <span className="font-serifDisplay text-sm text-ivory/50 group-hover:text-platine transition-colors duration-500">
                        {pad(i + 1)}
                      </span>
                      <span className="[writing-mode:vertical-rl] rotate-180 text-[9px] uppercase tracking-[0.5em] text-ivory/60 group-hover:text-platine transition-colors duration-500 whitespace-nowrap">
                        {title}
                      </span>
                      <span className="h-8 w-px bg-gradient-to-b from-platine/0 via-platine/50 to-platine/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Miniatures défilantes */}
      {total > 1 && (
        <div
          ref={railRef}
          className="relative mt-4 hidden md:flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {images.map((img, i) => (
            <button
              type="button"
              key={`thumb-${img}-${i}`}
              onClick={() => setActive(i)}
              aria-label={`Miniature ${i + 1}`}
              className={`relative h-16 w-24 shrink-0 overflow-hidden border transition-all duration-300 ${
                i === active
                  ? 'border-platine opacity-100'
                  : 'border-ivory/10 opacity-45 hover:opacity-90 hover:border-platine/40'
              }`}
            >
              <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noir/90 to-transparent px-1.5 pb-1 pt-3 text-[8px] tracking-[0.2em] text-ivory/80">
                {pad(i + 1)}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Mobile : accordéon vertical */}
      <div className="md:hidden space-y-2.5">
        {images.map((img, i) => {
          const isActive = i === active;
          return (
            <motion.button
              type="button"
              key={`${img}-m-${i}`}
              onClick={() => setActive(i)}
              aria-expanded={isActive}
              className={`relative block w-full overflow-hidden text-left border transition-colors duration-500 ${
                isActive ? 'border-platine/50' : 'border-ivory/10'
              }`}
            >
              <motion.div
                animate={{ height: isActive ? 380 : 72 }}
                transition={{ duration: 0.6, ease }}
                className="relative w-full"
              >
                <img
                  src={img}
                  alt={`${title} ${i + 1}`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-700 ${
                    isActive ? 'brightness-100' : 'brightness-[0.55]'
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-noir via-noir/20 to-noir/10'
                      : 'bg-noir/50'
                  }`}
                />

                {isActive ? (
                  <>
                    <CornerFrame />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-serifDisplay text-3xl leading-none text-platine/80">
                          {pad(i + 1)}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-platine/60 to-transparent" />
                      </div>
                      <p className="text-[9px] uppercase tracking-[0.4em] text-platine mb-1">
                        {category}
                      </p>
                      <h3 className="font-serifDisplay text-xl text-ivory">{title}</h3>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-between px-5">
                    <span className="font-serifDisplay text-sm text-ivory/60">
                      {pad(i + 1)}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.4em] text-ivory/70">
                      {title}
                    </span>
                    <FiChevronRight className="w-4 h-4 text-platine/70" />
                  </div>
                )}
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

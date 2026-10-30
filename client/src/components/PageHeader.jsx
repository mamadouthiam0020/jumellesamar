import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/motion';

export default function PageHeader({ title, subtitle, image }) {
  return (
    <section className="on-dark relative pt-40 pb-24 overflow-hidden bg-black">
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-[center_28%]"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/85" />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 top-24 md:inset-x-8 border border-white/10" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-xs uppercase tracking-[0.4em] text-white/70 mb-4"
        >
          Jumelles Amar
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="font-serifDisplay text-4xl md:text-6xl text-white mb-4 drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)]"
        >
          {title}
        </motion.h1>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.25 }}
          className="metal-hairline mx-auto"
        />
        {subtitle && (
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.35 }}
            className="max-w-xl mx-auto text-white/65 mt-6 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

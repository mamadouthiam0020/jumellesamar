import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/motion';

export default function PageHeader({ title, subtitle, image }) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-noir/70" />
        </>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="text-xs uppercase tracking-[0.4em] text-platine mb-4"
        >
          Jumelles Amar
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="font-serifDisplay text-4xl md:text-6xl text-ivory mb-4"
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
            className="max-w-xl mx-auto text-ivory/60 mt-6 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}

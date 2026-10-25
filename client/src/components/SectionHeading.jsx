import { motion } from 'framer-motion';
import { fadeInUp, viewportOnce } from '../utils/motion';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment =
    align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`flex flex-col ${alignment} mb-16`}
    >
      <span className="text-xs uppercase tracking-widest text-platine mb-3">{eyebrow}</span>
      <h2 className="font-serifDisplay text-3xl md:text-5xl text-ivory leading-tight mb-4">
        {title}
      </h2>
      <div className="metal-hairline mb-6" />
      {subtitle && (
        <p className="max-w-xl text-ivory/60 leading-relaxed text-sm md:text-base">{subtitle}</p>
      )}
    </motion.div>
  );
}

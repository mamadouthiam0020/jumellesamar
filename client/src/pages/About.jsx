import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { fadeInUp, viewportOnce, staggerContainer } from '../utils/motion';

const values = [
  {
    title: 'Excellence',
    description: 'Une exigence absolue dans chaque couture, chaque finition, chaque détail.',
    icon: '✦',
  },
  {
    title: 'Artisanat',
    description: 'Un savoir-faire transmis de génération en génération, façonné à la main.',
    icon: '✂',
  },
  {
    title: 'Sur-Mesure',
    description: 'Chaque pièce est pensée pour une personne, son histoire, sa silhouette.',
    icon: '◎',
  },
  {
    title: 'Tradition',
    description: 'Un ancrage profond dans la culture et les savoirs africains.',
    icon: '❧',
  },
];

const timeline = [
  {
    year: '2020',
    title: 'La naissance',
    description: 'Jumelles Amar voit le jour dans un petit atelier à Dakar, animé par une passion dévorante pour la couture.',
  },
  {
    year: '2022',
    title: 'La reconnaissance',
    description: 'Première grande distinction lors d\'un concours national de haute couture.',
  },
  {
    year: '2024',
    title: 'L\'expansion',
    description: 'Ouverture de la maison phare et agrandissement de l\'atelier de fabrication.',
  },
  {
    year: '2026',
    title: 'L\u2019international',
    description: 'La maison représente fièrement le Sénégal sur la scène internationale de la mode.',
  },
];

export default function About() {
  return (
    <div>
      <PageHeader
        title="Notre Histoire"
        subtitle="La maison Jumelles Amar, une passion transformée en héritage."
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Boubou_Ivoirien.jpg/1920px-Boubou_Ivoirien.jpg"
      />

      {/* Story */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={fadeInUp}>
            <span className="text-xs uppercase tracking-widest text-platine">La Maison</span>
            <h2 className="font-serifDisplay text-3xl md:text-5xl text-ivory mt-3 mb-6 leading-tight">
              Une vision,
              <br />
              <span className="italic text-gradient-metal">un héritage</span>
            </h2>
            <div className="metal-hairline mb-6" />
            <div className="space-y-5 text-ivory/60 leading-relaxed">
              <p>
                Née il y a six ans d'une passion dévorante pour la couture,
                Jumelles Amar s'est imposée comme une référence de la haute couture à Dakar.
              </p>
              <p>
                Notre maison incarne l'alliance subtile entre un savoir-faire ancestral
                et une vision contemporaine. Chaque création est le fruit d'un dialogue
                entre notre équipe d'artisans et ceux qui la porteront.
              </p>
              <p>
                Aujourd'hui, nous accompagnons nos clients dans les moments les plus
                précieux de leur vie : mariages, grandes occasions, événements d'exception.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <div className="overflow-hidden aspect-[3/4]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Boubou_traditionnel_du_S%C3%A9n%C3%A9gal.jpg/1280px-Boubou_traditionnel_du_S%C3%A9n%C3%A9gal.jpg"
                alt="Atelier"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-4 md:-left-8 bg-noir-light border border-platine/30 p-6 backdrop-blur">
              <p className="font-serifDisplay text-4xl text-gradient-metal">6</p>
              <p className="text-xs uppercase tracking-widest text-ivory/60 mt-1">
                Années d'expérience
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="py-24 bg-noir-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-platine">Nos Valeurs</span>
            <h2 className="font-serifDisplay text-3xl md:text-5xl text-ivory mt-3">Ce qui nous anime</h2>
            <div className="metal-hairline mx-auto mt-5" />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="card-luxury rounded-none p-8 text-center group"
              >
                <div className="text-4xl text-platine mb-6 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="font-serifDisplay text-xl text-ivory mb-3">{value.title}</h3>
                <p className="text-sm text-ivory/60 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-platine">Notre Parcours</span>
          <h2 className="font-serifDisplay text-3xl md:text-5xl text-ivory mt-3">Les grandes étapes</h2>
          <div className="metal-hairline mx-auto mt-5" />
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-platine/20 md:-translate-x-px" />
          <div className="space-y-12">
            {timeline.map((step, i) => (
              <motion.div
                key={step.year}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className={`relative flex md:w-1/2 ${
                  i % 2 === 0
                    ? 'md:mr-auto md:pr-12 pl-12 md:pl-12'
                    : 'md:ml-auto md:pl-12 pl-12'
                }`}
              >
                <div className="absolute left-4 md:left-auto top-1 w-2.5 h-2.5 rounded-full bg-platine -translate-x-1/2 md:translate-x-0" />
                <div className="card-luxury rounded-none p-6 w-full">
                  <span className="font-serifDisplay text-2xl text-gradient-metal">{step.year}</span>
                  <h3 className="text-xl text-ivory mt-2 mb-2">{step.title}</h3>
                  <p className="text-sm text-ivory/60 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-noir-light text-center px-6">
        <h2 className="font-serifDisplay text-3xl md:text-4xl text-ivory mb-4">
          Prêt à créer votre histoire ?
        </h2>
        <p className="text-ivory/60 mb-8 max-w-lg mx-auto">
          Rencontrez nos artisans et donnez vie à la pièce qui vous ressemble.
        </p>
        <Link to="/contact" className="btn-metal inline-flex">
          Nous Contacter
        </Link>
      </section>
    </div>
  );
}

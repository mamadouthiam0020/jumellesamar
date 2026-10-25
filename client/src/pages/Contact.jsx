import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../utils/api';
import PageHeader from '../components/PageHeader';
import { fadeInUp, viewportOnce, staggerContainer } from '../utils/motion';
import { FiMail, FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'rendez-vous',
    subject: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Veuillez remplir les champs obligatoires');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/contact', form);
      toast.success('Message envoyé avec succès ! Nous vous répondrons rapidement.');
      setForm({
        name: '',
        email: '',
        phone: '',
        type: 'rendez-vous',
        subject: '',
        message: '',
        preferredDate: '',
        preferredTime: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setSubmitting(false);
    }
  };

  const info = [
    {
      icon: <FiPhone className="w-5 h-5" />,
      title: 'Téléphone',
      value: '+229 97 00 00 00',
    },
    {
      icon: <FiMail className="w-5 h-5" />,
      title: 'Email',
      value: 'contact@jumellesamar.com',
    },
    {
      icon: <FiMapPin className="w-5 h-5" />,
      title: 'Adresse',
      value: 'Cotonou, Bénin',
    },
    {
      icon: <FiClock className="w-5 h-5" />,
      title: 'Horaires',
      value: 'Lun - Sam : 9h - 19h',
    },
  ];

  return (
    <div>
      <PageHeader
        title="Contact & Rendez-vous"
        subtitle="Parlons de votre projet. Notre équipe vous répond sous 24h."
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Boubou_en_basin_avec_broderie.png/1280px-Boubou_en_basin_avec_broderie.png"
      />

      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-2 space-y-6"
          >
            {info.map((item) => (
              <motion.div key={item.title} variants={fadeInUp} className="flex items-start gap-5 card-luxury rounded-none p-6">
                <div className="w-12 h-12 flex items-center justify-center border border-platine/30 text-platine">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-ivory/50 mb-1">{item.title}</p>
                  <p className="text-ivory">{item.value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div variants={fadeInUp} className="card-luxury rounded-none p-6">
              <p className="font-serifDisplay text-xl text-ivory mb-3">Rendez-vous privé</p>
              <p className="text-sm text-ivory/60 leading-relaxed">
                Pour un rendez-vous privé dans notre atelier, sélectionnez l'option
                "Rendez-vous" et précisez la date de votre choix. Nous vous confirmerons
                rapidement.
              </p>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.form
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            onSubmit={handleSubmit}
            className="lg:col-span-3"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-platine block mb-1">Nom *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="input-luxury"
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-platine block mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input-luxury"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-platine block mb-1">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="input-luxury"
                  placeholder="+229 ..."
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-platine block mb-1">Type de demande</label>
                <select name="type" value={form.type} onChange={handleChange} className="input-luxury bg-noir">
                  <option value="rendez-vous">Rendez-vous</option>
                  <option value="information">Information</option>
                  <option value="sur-mesure">Sur-mesure</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            {form.type === 'rendez-vous' && (
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-platine block mb-1">Date souhaitée</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={form.preferredDate}
                    onChange={handleChange}
                    className="input-luxury bg-noir"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-platine block mb-1">Heure</label>
                  <input
                    type="time"
                    name="preferredTime"
                    value={form.preferredTime}
                    onChange={handleChange}
                    className="input-luxury bg-noir"
                  />
                </div>
              </div>
            )}

            <div className="mb-6">
              <label className="text-xs uppercase tracking-widest text-platine block mb-1">Objet</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="input-luxury"
                placeholder="Objet de votre demande"
              />
            </div>

            <div className="mb-10">
              <label className="text-xs uppercase tracking-widest text-platine block mb-1">Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                className="input-luxury resize-none"
                placeholder="Décrivez votre projet..."
                required
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-metal w-full disabled:opacity-60">
              {submitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}

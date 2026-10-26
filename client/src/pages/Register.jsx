import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { fadeInUp } from '../utils/motion';
import PasswordInput from '../components/PasswordInput';

export default function Register() {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate('/');
    return null;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
      });
      toast.success('Compte créé avec succès !');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-24">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg"
      >
        <div className="text-center mb-10">
          <h1 className="font-serifDisplay text-3xl text-ivory mb-2">Créer un compte</h1>
          <p className="text-ivory/60 text-sm">Rejoignez la maison Jumelles Amar</p>
          <div className="metal-hairline mx-auto mt-5" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-platine block mb-1">Nom complet *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input-luxury"
              placeholder="Votre nom et prénom"
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

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-platine block mb-1">Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="input-luxury"
                placeholder="+221 ..."
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-platine block mb-1">Adresse</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="input-luxury"
                placeholder="Votre ville"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <PasswordInput
                label="Mot de passe *"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="6 caractères minimum"
              />
            </div>
            <div>
              <PasswordInput
                label="Confirmer le mot de passe *"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-metal w-full disabled:opacity-60">
            {loading ? 'Création du compte...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="text-center text-sm text-ivory/50 mt-8">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-platine hover:underline">
            Se connecter
          </Link>
        </p>
        <p className="text-center mt-6">
          <Link to="/" className="text-xs uppercase tracking-widest text-platine hover:underline">
            ← Retour au site
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

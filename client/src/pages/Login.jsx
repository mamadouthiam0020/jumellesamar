import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { fadeInUp } from '../utils/motion';
import PasswordInput from '../components/PasswordInput';

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
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
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Connexion réussie !');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Identifiants invalides');
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
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <h1 className="font-serifDisplay text-3xl text-ivory mb-2">Bienvenue</h1>
          <p className="text-ivory/60 text-sm">Connectez-vous à votre espace</p>
          <div className="metal-hairline mx-auto mt-5" />
        </div>

        <form onSubmit={handleSubmit} autoComplete="new-password" className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-widest text-platine block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="new-password"
              className="input-luxury"
              placeholder="votre@email.com"
              required
            />
          </div>
          <div>
            <PasswordInput
              label="Mot de passe"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-metal w-full disabled:opacity-60">
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-sm text-ivory/50 mt-8">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-platine hover:underline">
            Créer un compte
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

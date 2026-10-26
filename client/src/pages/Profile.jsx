import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiMapPin, FiShield, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/PageHeader';
import PasswordInput from '../components/PasswordInput';
import { fadeInUp } from '../utils/motion';
import { formatDate } from '../utils/helpers';

export default function Profile() {
  const { user, isAdmin, logout, refreshProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [pwd, setPwd] = useState({ password: '', confirmPassword: '' });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePwdChange = (e) => {
    setPwd((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      toast.success('Profil mis à jour');
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    if (pwd.password.length < 6) {
      toast.error('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    if (pwd.password !== pwd.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }
    setSaving(true);
    try {
      await updateProfile({ password: pwd.password });
      setPwd({ password: '', confirmPassword: '' });
      setPasswordMode(false);
      toast.success('Mot de passe mis à jour');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  const initials = (user.name || 'U')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const infoRows = [
    { icon: <FiUser className="w-4 h-4" />, label: 'Nom', value: user.name },
    { icon: <FiMail className="w-4 h-4" />, label: 'Email', value: user.email },
    { icon: <FiPhone className="w-4 h-4" />, label: 'Téléphone', value: user.phone || '—' },
    { icon: <FiMapPin className="w-4 h-4" />, label: 'Adresse', value: user.address || '—' },
    {
      icon: <FiShield className="w-4 h-4" />,
      label: 'Rôle',
      value: isAdmin ? 'Administrateur' : 'Client',
    },
  ];

  return (
    <div>
      <PageHeader title="Mon Profil" subtitle="Gérez vos informations personnelles." />

      <section className="py-16 max-w-4xl mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="card-luxury rounded-none overflow-hidden"
        >
          {/* Header */}
          <div className="bg-noir-light p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-ivory/10">
            <div className="w-24 h-24 rounded-full metal-gradient flex items-center justify-center shrink-0">
              <span className="font-serifDisplay text-2xl text-noir font-bold">{initials}</span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-serifDisplay text-2xl text-ivory">{user.name}</h2>
              <p className="text-ivory/60 text-sm mt-1">{user.email}</p>
              {user.createdAt && (
                <p className="text-xs text-ivory/40 mt-2">
                  Membre depuis le {formatDate(user.createdAt)}
                </p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              {isAdmin && (
                <button onClick={() => navigate('/admin')} className="btn-outline !py-2">
                  Administration
                </button>
              )}
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="btn-outline !py-2 !text-red-400/80 hover:!border-red-400/50"
              >
                <FiLogOut /> Déconnexion
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            {!editMode ? (
              <>
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  {infoRows.map((row) => (
                    <div key={row.label} className="flex items-start gap-4 p-4 bg-noir-light border border-ivory/10">
                      <div className="w-10 h-10 flex items-center justify-center border border-platine/30 text-platine shrink-0">
                        {row.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-widest text-ivory/50 mb-1">{row.label}</p>
                        <p className="text-ivory break-words">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setEditMode(true)} className="btn-metal flex-1">
                    Modifier mes informations
                  </button>
                  <button onClick={() => setPasswordMode(true)} className="btn-outline flex-1">
                    Changer mon mot de passe
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-platine block mb-1">Nom complet</label>
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
                    <label className="text-xs uppercase tracking-widest text-platine block mb-1">Email</label>
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

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button type="submit" disabled={saving} className="btn-metal flex-1 disabled:opacity-60">
                    {saving ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="btn-outline flex-1"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            )}

            {passwordMode && (
              <form onSubmit={handlePassword} className="mt-8 pt-8 border-t border-ivory/10 space-y-6">
                <h3 className="font-serifDisplay text-xl text-ivory">Changer le mot de passe</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <PasswordInput
                    label="Nouveau mot de passe"
                    name="password"
                    value={pwd.password}
                    onChange={handlePwdChange}
                    placeholder="6 caractères minimum"
                  />
                  <PasswordInput
                    label="Confirmer le mot de passe"
                    name="confirmPassword"
                    value={pwd.confirmPassword}
                    onChange={handlePwdChange}
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button type="submit" disabled={saving} className="btn-metal flex-1 disabled:opacity-60">
                    {saving ? 'Enregistrement...' : 'Mettre à jour le mot de passe'}
                  </button>
                  <button type="button" onClick={() => setPasswordMode(false)} className="btn-outline flex-1">
                    Annuler
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

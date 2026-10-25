import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2, FiPlus, FiX, FiStar } from 'react-icons/fi';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { AdminFormField, inputCls } from './ui';

const categories = ['Robes', 'Tenues Hommes', 'Accessoires', 'Sur-Mesure', 'Mariage'];

const emptyForm = {
  title: '',
  description: '',
  longDescription: '',
  category: 'Robes',
  images: [],
  coverImage: '',
  featured: false,
  year: new Date().getFullYear(),
  designerNote: '',
};

export default function AdminCollections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageUrl, setImageUrl] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/collections', { params: { active: 'all' } });
      setCollections(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setImageUrl('');
    setModalOpen(true);
  };

  const openEdit = (collection) => {
    setEditing(collection);
    setForm({
      title: collection.title,
      description: collection.description,
      longDescription: collection.longDescription || '',
      category: collection.category,
      images: collection.images || [],
      coverImage: collection.coverImage,
      featured: collection.featured,
      year: collection.year,
      designerNote: collection.designerNote || '',
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addImage = () => {
    if (!imageUrl.trim()) {
      toast.error('Entrez une URL d\'image');
      return;
    }
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, imageUrl.trim()],
      coverImage: prev.coverImage || imageUrl.trim(),
    }));
    setImageUrl('');
  };

  const removeImage = (index) => {
    setForm((prev) => {
      const removed = prev.images[index];
      const images = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images,
        coverImage: prev.coverImage === removed ? (images[0] || '') : prev.coverImage,
      };
    });
  };

  const setCover = (url) => setForm((prev) => ({ ...prev, coverImage: url }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.coverImage) {
      toast.error('Titre, description et image de couverture sont requis');
      return;
    }
    try {
      if (editing) {
        await api.put(`/collections/${editing._id}`, form);
        toast.success('Collection mise à jour');
      } else {
        await api.post('/collections', form);
        toast.success('Collection créée');
      }
      setModalOpen(false);
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette collection ?')) return;
    try {
      await api.delete(`/collections/${id}`);
      toast.success('Collection supprimée');
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serifDisplay text-2xl text-ivory">Collections</h2>
        <button onClick={openCreate} className="btn-metal !py-2">
          <FiPlus /> Nouvelle collection
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : collections.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-ivory/20 text-ivory/50">
          <p className="font-serifDisplay text-xl mb-4">Aucune collection</p>
          <button onClick={openCreate} className="btn-outline !py-2">Créer votre première collection</button>
        </div>
      ) : (
        <div className="space-y-4">
          {collections.map((collection) => (
            <div key={collection._id} className="card-luxury rounded-none flex items-center gap-5 p-4">
              <img src={collection.coverImage} alt="" className="w-24 h-28 object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-serifDisplay text-lg text-ivory truncate">{collection.title}</h3>
                  {collection.featured && (
                    <span className="text-platine"><FiStar /></span>
                  )}
                </div>
                <p className="text-sm text-ivory/50 mt-1">{collection.category} · {collection.year}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => openEdit(collection)}
                  className="p-2 text-ivory/60 hover:text-platine border border-ivory/20 hover:border-platine/50 transition-colors"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => handleDelete(collection._id)}
                  className="p-2 text-ivory/60 hover:text-red-400 border border-ivory/20 hover:border-red-400/50 transition-colors"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-noir/80 backdrop-blur z-50 flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-noir border border-platine/30 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serifDisplay text-2xl text-ivory">
                  {editing ? 'Modifier la collection' : 'Nouvelle collection'}
                </h3>
                <button onClick={() => setModalOpen(false)} className="text-ivory/60 hover:text-ivory">
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <AdminFormField label="Titre" required>
                    <input name="title" value={form.title} onChange={handleChange} className={inputCls} required />
                  </AdminFormField>
                  <AdminFormField label="Catégorie">
                    <select name="category" value={form.category} onChange={handleChange} className={inputCls}>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </AdminFormField>
                </div>

                <AdminFormField label="Description courte" required>
                  <textarea name="description" value={form.description} onChange={handleChange} rows="2" className={`${inputCls} resize-none`} required />
                </AdminFormField>

                <AdminFormField label="Description longue">
                  <textarea name="longDescription" value={form.longDescription} onChange={handleChange} rows="4" className={`${inputCls} resize-none`} />
                </AdminFormField>

                <AdminFormField label="Note du designer">
                  <input name="designerNote" value={form.designerNote} onChange={handleChange} className={inputCls} />
                </AdminFormField>

                <AdminFormField label="Année">
                  <input type="number" name="year" value={form.year} onChange={handleChange} className={inputCls} />
                </AdminFormField>

                <AdminFormField label="Images (URL)">
                  <div className="flex gap-2">
                    <input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className={inputCls}
                      placeholder="https://... (image)"
                    />
                    <button type="button" onClick={addImage} className="btn-outline !px-4 !py-2 shrink-0">Ajouter</button>
                  </div>
                  {form.images.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-3">
                      {form.images.map((img, i) => (
                        <div key={i} className="relative">
                          <button
                            type="button"
                            onClick={() => setCover(img)}
                            title="Définir comme couverture"
                            className={`w-24 h-28 overflow-hidden border-2 ${form.coverImage === img ? 'border-platine' : 'border-transparent'}`}
                          >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                          </button>
                          {form.coverImage === img && (
                            <span className="absolute bottom-1 right-1 text-platine text-xs bg-noir px-1">Couverture</span>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </AdminFormField>

                <label className="flex items-center gap-3 text-sm text-ivory">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))}
                    className="accent-platine"
                  />
                  Mettre en vedette sur l'accueil
                </label>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-metal flex-1">
                    {editing ? 'Mettre à jour' : 'Créer la collection'}
                  </button>
                  <button type="button" onClick={() => setModalOpen(false)} className="btn-outline">
                    Annuler
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

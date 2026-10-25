import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2, FiPlus, FiX, FiStar } from 'react-icons/fi';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { AdminFormField, inputCls } from './ui';
import { formatDate } from '../../utils/helpers';

const fetchNewsAll = async () => {
  const all = [];
  let page = 1;
  let pages = 1;
  do {
    const { data } = await api.get('/news', {
      params: { page, limit: 100, published: 'all' },
    });
    all.push(...data.news);
    pages = data.pages;
    page += 1;
  } while (page <= pages);
  return all;
};

const categories = ['Événement', 'Mode', 'Coulisses', 'Nouveauté', 'Presse'];

const emptyForm = {
  title: '',
  excerpt: '',
  content: '',
  coverImage: '',
  category: 'Mode',
  tags: '',
  featured: false,
  published: true,
};

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchNewsAll();
      setNews(Array.isArray(data) ? data : []);
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
    setModalOpen(true);
  };

  const openEdit = (article) => {
    setEditing(article);
    setForm({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      coverImage: article.coverImage,
      category: article.category,
      tags: (article.tags || []).join(', '),
      featured: article.featured,
      published: article.published,
    });
    setModalOpen(true);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.content || !form.coverImage) {
      toast.error('Titre, accroche, contenu et image sont requis');
      return;
    }
    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await api.put(`/news/${editing._id}`, payload);
        toast.success('Article mis à jour');
      } else {
        await api.post('/news', payload);
        toast.success('Article créé');
      }
      setModalOpen(false);
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cet article ?')) return;
    try {
      await api.delete(`/news/${id}`);
      toast.success('Article supprimé');
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serifDisplay text-2xl text-ivory">Actualités</h2>
        <button onClick={openCreate} className="btn-metal !py-2">
          <FiPlus /> Nouvel article
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : news.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-ivory/20 text-ivory/50">
          <p className="font-serifDisplay text-xl mb-4">Aucun article</p>
          <button onClick={openCreate} className="btn-outline !py-2">Créer votre premier article</button>
        </div>
      ) : (
        <div className="space-y-4">
          {news.map((article) => (
            <div key={article._id} className="card-luxury rounded-none flex items-center gap-5 p-4">
              <img src={article.coverImage} alt="" className="w-24 h-20 object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-serifDisplay text-lg text-ivory truncate">{article.title}</h3>
                  {article.featured && <span className="text-platine"><FiStar /></span>}
                  {!article.published && (
                    <span className="text-xs text-ivory/40 border border-ivory/20 px-2 py-0.5">Brouillon</span>
                  )}
                </div>
                <p className="text-sm text-ivory/50 mt-1">{article.category} · {formatDate(article.createdAt)}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(article)} className="p-2 text-ivory/60 hover:text-platine border border-ivory/20 hover:border-platine/50 transition-colors">
                  <FiEdit />
                </button>
                <button onClick={() => handleDelete(article._id)} className="p-2 text-ivory/60 hover:text-red-400 border border-ivory/20 hover:border-red-400/50 transition-colors">
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
                  {editing ? 'Modifier l\'article' : 'Nouvel article'}
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

                <AdminFormField label="Image de couverture (URL)" required>
                  <input name="coverImage" value={form.coverImage} onChange={handleChange} className={inputCls} placeholder="https://..." required />
                </AdminFormField>

                <AdminFormField label="Accroche" required>
                  <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows="2" className={`${inputCls} resize-none`} required />
                </AdminFormField>

                <AdminFormField label="Contenu" required>
                  <textarea name="content" value={form.content} onChange={handleChange} rows="8" className={`${inputCls} resize-none`} required />
                </AdminFormField>

                <AdminFormField label="Tags (séparés par des virgules)">
                  <input name="tags" value={form.tags} onChange={handleChange} className={inputCls} placeholder="mode, évènement, ..." />
                </AdminFormField>

                <div className="flex gap-6">
                  <label className="flex items-center gap-3 text-sm text-ivory">
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))} className="accent-platine" />
                    En vedette
                  </label>
                  <label className="flex items-center gap-3 text-sm text-ivory">
                    <input type="checkbox" checked={form.published} onChange={(e) => setForm((prev) => ({ ...prev, published: e.target.checked }))} className="accent-platine" />
                    Publié
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-metal flex-1">
                    {editing ? 'Mettre à jour' : 'Créer l\'article'}
                  </button>
                  <button type="button" onClick={() => setModalOpen(false)} className="btn-outline">Annuler</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

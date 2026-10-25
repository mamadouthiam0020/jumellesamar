import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiMail, FiPhone } from 'react-icons/fi';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { formatDate } from '../../utils/helpers';

const typeLabels = {
  information: 'Information',
  'rendez-vous': 'Rendez-vous',
  'sur-mesure': 'Sur-mesure',
  autre: 'Autre',
};

const statusLabels = {
  new: { label: 'Nouveau', color: 'text-platine border-platine/40' },
  read: { label: 'Lu', color: 'text-blue-400 border-blue-400/40' },
  replied: { label: 'Répondu', color: 'text-emerald-400 border-emerald-400/40' },
  archived: { label: 'Archivé', color: 'text-ivory/50 border-ivory/30' },
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/contact', { params: { limit: 100 } });
      setContacts(data.contacts || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status });
      toast.success('Statut mis à jour');
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce message ?')) return;
    try {
      await api.delete(`/contact/${id}`);
      toast.success('Message supprimé');
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serifDisplay text-2xl text-ivory">Messages</h2>
      </div>

      {loading ? (
        <Loading />
      ) : contacts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-ivory/20 text-ivory/50">
          <p className="font-serifDisplay text-xl">Aucun message</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact._id} className="card-luxury rounded-none p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm uppercase tracking-widest text-platine">{typeLabels[contact.type]}</span>
                    <span className={`text-xs border px-2 py-1 ${statusLabels[contact.status]?.color}`}>
                      {statusLabels[contact.status]?.label}
                    </span>
                  </div>
                  <h3 className="font-serifDisplay text-lg text-ivory mt-2">{contact.name}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-ivory/50 mt-1">
                    <span className="flex items-center gap-2"><FiMail />{contact.email}</span>
                    {contact.phone && <span className="flex items-center gap-2"><FiPhone />{contact.phone}</span>}
                    <span>{formatDate(contact.createdAt)}</span>
                  </div>
                </div>
              </div>

              {contact.subject && (
                <p className="text-sm text-ivory/70 mb-3"><span className="text-platine text-[10px] uppercase tracking-widest">Objet : </span>{contact.subject}</p>
              )}
              <p className="text-sm text-ivory/70 leading-relaxed mb-4">{contact.message}</p>

              {contact.preferredDate && (
                <p className="text-sm text-ivory/50 mb-4">
                  <span className="text-platine text-[10px] uppercase tracking-widest">RDV souhaité : </span>
                  {new Date(contact.preferredDate).toLocaleDateString('fr-FR')} à {contact.preferredTime || '—'}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs uppercase tracking-widest text-ivory/40">Statut :</span>
                <select
                  value={contact.status}
                  onChange={(e) => updateStatus(contact._id, e.target.value)}
                  className="bg-noir-light border border-ivory/20 px-3 py-2 text-sm text-ivory focus:outline-none focus:border-platine"
                >
                  {Object.entries(statusLabels).map(([value, info]) => (
                    <option key={value} value={value}>{info.label}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="text-xs uppercase tracking-widest text-ivory/40 hover:text-red-400 ml-auto"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

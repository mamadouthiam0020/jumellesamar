const Contact = require('../models/Contact');

const createContact = async (req, res) => {
  const { name, email, phone, type, subject, message, preferredDate, preferredTime } = req.body;

  const contact = await Contact.create({
    name,
    email,
    phone,
    type,
    subject,
    message,
    preferredDate,
    preferredTime,
  });

  res.status(201).json(contact);
};

const getContacts = async (req, res) => {
  const { status, type, page = 1, limit = 20 } = req.query;

  let filter = {};
  if (status) filter.status = status;
  if (type) filter.type = type;

  const total = await Contact.countDocuments(filter);
  const contacts = await Contact.find(filter)
    .sort({ createdAt: -1 })
    .skip((parseInt(page) - 1) * parseInt(limit))
    .limit(parseInt(limit));

  res.json({
    contacts,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
  });
};

const getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: 'Message non trouvé' });
  }
  res.json(contact);
};

const updateContactStatus = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: 'Message non trouvé' });
  }

  contact.status = req.body.status || contact.status;

  if (contact.status === 'read' && !contact.readAt) {
    contact.readAt = Date.now();
  }

  await contact.save();
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: 'Message non trouvé' });
  }
  await contact.deleteOne();
  res.json({ message: 'Message supprimé' });
};

const getContactStats = async (req, res) => {
  const total = await Contact.countDocuments();
  const unread = await Contact.countDocuments({ status: 'new' });
  const rdv = await Contact.countDocuments({ type: 'rendez-vous' });

  res.json({ total, unread, rdv });
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats,
};

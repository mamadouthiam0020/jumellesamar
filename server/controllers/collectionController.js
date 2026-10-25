const Collection = require('../models/Collection');
const { generateSlug } = require('../utils/helpers');

const getCollections = async (req, res) => {
  const { category, featured, active, search, limit } = req.query;

  let filter = {};
  if (category) filter.category = category;
  if (featured) filter.featured = true;
  if (active !== undefined) filter.active = active === 'true';
  else filter.active = true;

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const collections = await Collection.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit ? parseInt(limit) : 0);

  res.json(collections);
};

const getCollectionById = async (req, res) => {
  const collection = await Collection.findById(req.params.id);
  if (!collection) {
    return res.status(404).json({ message: 'Collection non trouvée' });
  }
  collection.viewCount += 1;
  await collection.save();
  res.json(collection);
};

const getCollectionBySlug = async (req, res) => {
  const collection = await Collection.findOne({ slug: req.params.slug });
  if (!collection) {
    return res.status(404).json({ message: 'Collection non trouvée' });
  }
  collection.viewCount += 1;
  await collection.save();
  res.json(collection);
};

const createCollection = async (req, res) => {
  const { title, description, longDescription, category, coverImage, images, featured, year, designerNote } =
    req.body;

  let slug = generateSlug(title);
  const existing = await Collection.findOne({ slug });
  if (existing) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  const collection = await Collection.create({
    title,
    slug,
    description,
    longDescription,
    category,
    coverImage,
    images: images || [],
    featured: featured || false,
    year,
    designerNote,
  });

  res.status(201).json(collection);
};

const updateCollection = async (req, res) => {
  const collection = await Collection.findById(req.params.id);
  if (!collection) {
    return res.status(404).json({ message: 'Collection non trouvée' });
  }

  const fields = [
    'title',
    'description',
    'longDescription',
    'category',
    'images',
    'coverImage',
    'featured',
    'year',
    'designerNote',
    'active',
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      collection[field] = req.body[field];
    }
  });

  if (req.body.title && req.body.title !== collection.title) {
    let slug = generateSlug(req.body.title);
    const existing = await Collection.findOne({ slug, _id: { $ne: collection._id } });
    if (existing) slug = `${slug}-${Date.now().toString().slice(-4)}`;
    collection.slug = slug;
  }

  await collection.save();
  res.json(collection);
};

const deleteCollection = async (req, res) => {
  const collection = await Collection.findById(req.params.id);
  if (!collection) {
    return res.status(404).json({ message: 'Collection non trouvée' });
  }
  await collection.deleteOne();
  res.json({ message: 'Collection supprimée' });
};

module.exports = {
  getCollections,
  getCollectionById,
  getCollectionBySlug,
  createCollection,
  updateCollection,
  deleteCollection,
};

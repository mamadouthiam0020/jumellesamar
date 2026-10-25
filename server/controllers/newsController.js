const News = require('../models/News');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateSlug } = require('../utils/helpers');

const getNews = async (req, res) => {
  const { category, featured, published, search, page = 1, limit = 9 } = req.query;

  let filter = {};
  if (category) filter.category = category;
  if (featured) filter.featured = true;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  let isAdmin = false;
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
      const authUser = await User.findById(decoded.id);
      isAdmin = authUser?.role === 'admin';
    } catch {
      isAdmin = false;
    }
  }

  if (!(isAdmin && published === 'all')) {
    filter.published = true;
  }

  const total = await News.countDocuments(filter);
  const news = await News.find(filter)
    .sort({ createdAt: -1 })
    .skip((parseInt(page) - 1) * parseInt(limit))
    .limit(parseInt(limit));

  res.json({
    news,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
  });
};

const getNewsById = async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    return res.status(404).json({ message: 'Article non trouvé' });
  }
  res.json(news);
};

const getNewsBySlug = async (req, res) => {
  const news = await News.findOne({ slug: req.params.slug });
  if (!news) {
    return res.status(404).json({ message: 'Article non trouvé' });
  }
  news.viewCount += 1;
  await news.save();
  res.json(news);
};

const createNews = async (req, res) => {
  const { title, excerpt, content, coverImage, category, tags, author, featured, published } = req.body;

  let slug = generateSlug(title);
  const existing = await News.findOne({ slug });
  if (existing) {
    slug = `${slug}-${Date.now().toString().slice(-4)}`;
  }

  const news = await News.create({
    title,
    slug,
    excerpt,
    content,
    coverImage,
    category,
    tags: tags || [],
    author: author || 'Jumelles Amar',
    featured: featured || false,
    published: published !== undefined ? published : true,
  });

  res.status(201).json(news);
};

const updateNews = async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    return res.status(404).json({ message: 'Article non trouvé' });
  }

  const fields = [
    'title',
    'excerpt',
    'content',
    'coverImage',
    'category',
    'tags',
    'author',
    'featured',
    'published',
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      news[field] = req.body[field];
    }
  });

  if (req.body.title && req.body.title !== news.title) {
    let slug = generateSlug(req.body.title);
    const existing = await News.findOne({ slug, _id: { $ne: news._id } });
    if (existing) slug = `${slug}-${Date.now().toString().slice(-4)}`;
    news.slug = slug;
  }

  await news.save();
  res.json(news);
};

const deleteNews = async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    return res.status(404).json({ message: 'Article non trouvé' });
  }
  await news.deleteOne();
  res.json({ message: 'Article supprimé' });
};

module.exports = {
  getNews,
  getNewsById,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
};

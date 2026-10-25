const express = require('express');
const router = express.Router();
const {
  getNews,
  getNewsById,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { protect, admin } = require('../middleware/auth');

router.route('/').get(getNews).post(protect, admin, createNews);
router.get('/slug/:slug', getNewsBySlug);
router
  .route('/:id')
  .get(getNewsById)
  .put(protect, admin, updateNews)
  .delete(protect, admin, deleteNews);

module.exports = router;

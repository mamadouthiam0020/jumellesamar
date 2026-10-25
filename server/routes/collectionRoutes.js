const express = require('express');
const router = express.Router();
const {
  getCollections,
  getCollectionById,
  getCollectionBySlug,
  createCollection,
  updateCollection,
  deleteCollection,
} = require('../controllers/collectionController');
const { protect, admin } = require('../middleware/auth');

router.route('/').get(getCollections).post(protect, admin, createCollection);
router.get('/slug/:slug', getCollectionBySlug);
router
  .route('/:id')
  .get(getCollectionById)
  .put(protect, admin, updateCollection)
  .delete(protect, admin, deleteCollection);

module.exports = router;

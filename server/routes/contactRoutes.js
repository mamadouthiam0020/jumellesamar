const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats,
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

router.route('/').post(createContact).get(protect, admin, getContacts);
router.get('/stats', protect, admin, getContactStats);
router
  .route('/:id')
  .get(protect, admin, getContactById)
  .put(protect, admin, updateContactStatus)
  .delete(protect, admin, deleteContact);

module.exports = router;

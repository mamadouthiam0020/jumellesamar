const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { uploadFile, uploadMultiple } = require('../controllers/uploadController');
const { protect, admin } = require('../middleware/auth');

router.post('/single', protect, admin, upload.single('image'), uploadFile);
router.post('/multiple', protect, admin, upload.array('images', 10), uploadMultiple);

module.exports = router;

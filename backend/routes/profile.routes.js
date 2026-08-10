const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profile.controller');
const protect = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', protect, getProfile);
router.patch('/', protect, updateProfile);

module.exports = router;

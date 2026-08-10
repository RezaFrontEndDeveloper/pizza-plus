const express = require('express');
const { getAllMenu, getMenuItem } = require('../controllers/menu.controller');

const router = express.Router();

router.get('/', getAllMenu);
router.get('/:id', getMenuItem);

module.exports = router;

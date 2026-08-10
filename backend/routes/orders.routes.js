const express = require('express');
const { createOrder, getOrders, getOrder, updateOrder } = require('../controllers/orders.controller');
const protect = require('../middleware/auth.middleware');

const router = express.Router();

// Requires auth: returns the logged-in user's own orders
router.get('/', protect, getOrders);

// Public: matches the original Fast React Pizza flow (order confirmation by id, no login needed)
router.get('/:id', getOrder);
router.post('/', createOrder);
router.patch('/:id', updateOrder);

module.exports = router;

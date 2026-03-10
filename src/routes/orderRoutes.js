const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createOrder, getOrderById, listOrders, updateOrder, deleteOrder } = require('../controllers/orderController');

router.post('/',           auth, createOrder);
router.get('/list',        auth, listOrders);
router.get('/:orderId',    auth, getOrderById);
router.put('/:orderId',    auth, updateOrder);
router.delete('/:orderId', auth, deleteOrder);

module.exports = router;

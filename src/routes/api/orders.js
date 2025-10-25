const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/orderController');

const orderController = new OrderController();

// Route to create a new order
router.post('/', orderController.createOrder.bind(orderController));

// Route to get all orders
router.get('/', orderController.getAllOrders.bind(orderController));

// Route to get a specific order by ID
router.get('/:id', orderController.getOrderById.bind(orderController));

module.exports = router;
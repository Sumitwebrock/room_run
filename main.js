const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const dbConfig = require('./config/db');
const routes = require('./routes/index');
const logger = require('./utils/logger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // allow frontend connection
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
dbConfig();

// Routes
app.use('/api', routes);

// Default route
app.get('/', (req, res) => res.send('RoomRun API running ✅'));

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: e.target.name.value,
        roomNumber: e.target.roomNumber.value,
        orderDetails: e.target.orderDetails.value
    };

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
            alert(`Order submitted successfully! Order ID: ${data.orderId}`);
            e.target.reset();
        } else {
            alert('Error submitting order: ' + data.message);
        }
    } catch (error) {
        alert('Error submitting order: ' + error.message);
    }
});
async function placeOrder() {
    if (cart.length === 0) {
        showNotification('Cart is empty!', true);
        return;
    }

    try {
        // Generate tracking ID
        const trackingId = 'RR' + Date.now().toString().slice(-6);
        
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id,
                trackingId: trackingId,
                status: 'placed',
                items: cart.map(item => ({
                    name: item.name,
                    quantity: 1,
                    price: item.price
                }))
            })
        });

        const data = await res.json();
        if (res.ok) {
            showNotification(`Order placed! Tracking ID: ${trackingId}`);
            cart = [];
            updateCartCount();
            closeCartModal();
        } else {
            showNotification(data.message || 'Failed to place order', true);
        }
    } catch (err) {
        console.error(err);
        showNotification('Server error', true);
    }
}
class OrderController {
    constructor(Order) {
        this.Order = Order;
    }

    async createOrder(req, res) {
        try {
            const orderData = req.body;
            const newOrder = new this.Order(orderData);
            await newOrder.save();
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ message: 'Error creating order', error: error.message });
        }
    }

    async getOrders(req, res) {
        try {
            const orders = await this.Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving orders', error: error.message });
        }
    }
}

export default OrderController;
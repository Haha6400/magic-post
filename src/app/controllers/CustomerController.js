class CustomerController {
    //@desc Get all orders
    //@route GET /home/order
    async getAllOrders(req, res) {
        res.status(200).json({ message: 'GET ALL ORDERS' })
    }

    //@desc Post order
    //@route GET /home/order
    async createOrder(req, res) {
        const { sender, senderAddress, receiver, receiverAddress } = req.body;
        if (!sender || !senderAddress || !receiver || !receiverAddress) {
            res.status(400)
            throw new Error('All fields are mandatory')
        }
        res.status(201).json({ message: 'POST ORDER' })
    }

    //@desc Get order
    //@route GET /home/order/:id
    async getOrder(req, res) {
        res.status(200).json({ message: `GET ORDER FOR ID ${req.params.id}` })
    }


    //@desc Update order
    //@route PUT /home/order/:id
    async updateOrder(req, res) {
        res.status(201).json({ message: `UPDATE ORDER FOR ID ${req.params.id}` })
    }

    //@desc Delete order
    //@route DELETE /home/order/:id
    async deleteOrder(req, res) {
        res.status(200).json({ message: `DELETE ORDER FOR ID ${req.params.id}` })
    }
}

module.exports = new CustomerController;

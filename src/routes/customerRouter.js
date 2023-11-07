const express = require('express')
const router = express.Router()

const CustomerController = require('../app/controllers/CustomerController')

router.route('/').get(CustomerController.getAllOrders)
    .post(CustomerController.createOrder)
    
router.route('/:id').get(CustomerController.getOrder)
    .put(CustomerController.updateOrder)
    .delete(CustomerController.deleteOrder)

module.exports = router
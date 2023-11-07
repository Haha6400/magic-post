const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()

const CustomerController = require('../app/controllers/CustomerController')

router.route('/').get(asyncHandler(CustomerController.getAllOrders))
    .post(asyncHandler(CustomerController.createOrder))

router.route('/:id').get(asyncHandler(CustomerController.getOrder))
    .put(asyncHandler(CustomerController.updateOrder))
    .delete(asyncHandler(CustomerController.deleteOrder))

module.exports = router

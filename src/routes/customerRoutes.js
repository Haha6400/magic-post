const express = require('express')
const router = express.Router()

const { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder } = require("../app/controllers/customerController")

router.route('/').get(getAllOrders).post(createOrder)
router.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder)

module.exports = router

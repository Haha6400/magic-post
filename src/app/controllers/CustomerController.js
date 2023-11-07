const asyncHandler = require('express-async-handler')
const Customer = require('../models/customerModel')

/*
@desc Get all orders
@route GET /home/order
@access supervisor
*/
const getAllOrders = asyncHandler(async (req, res) => { 
    res.status(200).json({ message: 'GET ALL ORDERS' })
})

/*
@desc Post order
@route GET /home/order
@access staff
*/
const createOrder = asyncHandler(async (req, res) => {
    const { sender, senderAddress, receiver, receiverAddress } = req.body;
    if (!sender || !senderAddress || !receiver || !receiverAddress) {
        res.status(400)
        throw new Error('All fields are mandatory')
    }
    res.status(201).json({ message: 'POST ORDER' })
})
/*
@desc Get order
@route GET /home/order/:id
@access staff
*/
const getOrder = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `GET ORDER FOR ID ${req.params.id}` })
})

/*
@desc Update order
@route PUT /home/order/:id
@access staff
*/
const updateOrder = asyncHandler(async (req, res) => {
    res.status(201).json({ message: `UPDATE ORDER FOR ID ${req.params.id}` })
})
/*
@desc Delete order
@route DELETE /home/order/:id
@access staff
*/
const deleteOrder = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `DELETE ORDER FOR ID ${req.params.id}` })
})


module.exports = {getAllOrders, getOrder, createOrder, updateOrder, deleteOrder};

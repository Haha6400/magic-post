const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Customer = require("../models/customerModel")

/*
@desc Get all orders
@route GET /home/order
@access supervisor
*/
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    res.status(200).json(orders)
})

/*
@desc Post order
@route GET /home/order
@access staff
*/
const createOrder = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {type, note, status, senderName, senderAddress, senderPhone, senderZipcode,
        receiverName, receiverAddress, receiverPhone, receiverZipcode, amount, price, mass } = req.body


    if (!type || !status || !senderName || !senderAddress || !senderPhone || !senderZipcode
        || !receiverName || !receiverAddress || !receiverPhone || !receiverZipcode) {
        res.status(400);
        throw new Error(`All fields should not be empty!`);
    }
    var sender = await Customer.findOne(
        {
            'fullname': senderName,
            'phoneNumber': senderPhone,
        })
    var receiver = await Customer.findOne(
        {
            'fullname': receiverName,
            'phoneNumber': receiverPhone,
        })
    if (!sender) {
        sender = await Customer.create({
            fullname: senderName,
            address: senderAddress,
            phoneNumber: senderPhone,
            zipCode: senderZipcode
        })
    }
    if (!receiver) {
        receiver = await Customer.create({
            fullname: receiverName,
            address: receiverAddress,
            phoneNumber: receiverPhone,
            zipCode: receiverZipcode
        })
    }

    const order = await Order.create({
        type, note, amount, price, mass,
        'sender_id': sender,
        'receiver_id': receiver
    });
    if (!order) {
        res.status(400);
        throw new Error(`Invalid`);
    }
    res.status(200).json(order);

});

/*
@desc Get order
@route GET /home/order/:id
@access staff
*/
const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(404)
        throw new Error("Order not found")
    }
    res.status(200).json(order)
})

/*
@desc Update order
@route PUT /home/order/:id
@access staff
*/
const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(404)
        throw new Error("Order not found")
    }
    const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedOrder)
})


/*
@desc Delete order
@route DELETE /home/order/:id
@access staff
*/
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        res.status(404)
        throw new Error("Order not found")
    }
    await Order.deleteOne({ _id: req.params.id })
    res.json('Delete succeed')
})

module.exports = { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder };
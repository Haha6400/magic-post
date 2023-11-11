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
    const { note, status, senderName, senderAddress, senderPhone, senderZipcode,
        receiverName, receiverAddress, receiverPhone, receiverZipcode } = req.body


    if (!status || !senderName || !senderAddress || !senderPhone || !senderZipcode
        || !receiverName || !receiverAddress || !receiverPhone || !receiverZipcode) {
        res.status(400);
        throw new Error(`All fields should not be left blank!`);
    }

    if (!Customer.find(senderName, senderPhone)) {
        const sender = await Customer.create({
            fullname: senderName,
            address: senderAddress,
            phoneNumber: senderPhone,
            zipCode: senderZipcode
        })
    }
    if (!Customer.find(receiverName, receiverPhone)) {
        const receiver = await Customer.create({
            fullname: receiverName,
            address: receiverAddress,
            phoneNumber: receiverPhone,
            zipCode: receiverZipcode
        })
    }
    if (!Order.find()) {
        const order = await Order.create({
            note, status, sender, receiver
        });
    }
    if (order) res.status(200).json(order);
    else {
        res.status(400);
        throw new Error(`Invalid`);
    }
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
})

module.exports = { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder };
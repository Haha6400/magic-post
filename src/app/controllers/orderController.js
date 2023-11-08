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
        receiverName, receiverAddress, receiverPhone, receiverZipcode } = req.body;
    if (!status || !senderName || !senderAddress || !senderPhone || !senderZipcode
        || !receiverName || !receiverAddress || !receiverPhone || !receiverZipcode) {
        res.status(400);
        throw new Error(`All fields should not be left blank!`);
    }
    const sender = await Customer.create({
        fullname:senderName, 
        address: senderAddress, 
        phoneNumber: senderPhone, 
        zipCode: senderZipcode
    })

    const receiver = await Customer.create({
        fullname: receiverName, 
        address: receiverAddress, 
        phoneNumber: receiverPhone, 
        zipCode: receiverZipcode
    })

    const order = await Order.create({
        note, status, sender, receiver
    });

    if (order) res.status(200).json({ _id: order.id });
    else {
        res.status(400);
        throw new Error(`Invalid`);
    }
    res.status(200).json(order)
});

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

module.exports = { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder };
const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Branch = require("../models/branchModel");
const { createCustomer,
    createFeeModel,
    createMassModel,
    createReceiverFeeModel,
    createProcesses } = require('../utils/orderFunctions');


/*
@desc Get all orders
@route GET /api/orders/all
@access supervisor
*/
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    res.status(200).json(orders)
})

/*
@desc Post order
@route POST /api/orders/create
@access staff
*/
const createOrder = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { type, note, special_service, instructions, sender_commitment, //order attributes
        branchName, status, // process attrs
        senderName, senderAddress, senderPhone, // sender attrs
        receiverName, receiverAddress, receiverPhone, //receiver attrs
        charge, surcharge, vat, other_fee, total_fee, //transporting fee
        actual_mass, converted_mass, // mass attrs
        cod, rf_other_fee, rf_total, // the fee receiver will pay
    } = req.body

    const sender = await createCustomer(senderName, senderAddress, senderPhone, branchName)
    const receiver = await createCustomer(receiverName, receiverAddress, receiverPhone, branchName)
    const mass = await createMassModel(actual_mass, converted_mass)
    const fee = await createFeeModel(charge, surcharge, vat, other_fee, total_fee)
    const receiver_fee = await createReceiverFeeModel(cod, rf_other_fee, rf_total)
    const processes = await createProcesses(branchName, status)
    const branch = await Branch.findOne({ name: branchName })

    var order = await Order.create({
        type, note, special_service, instructions, sender_commitment,
        'order_code': branch.postal_code,
        'processes_id': processes,
        'sender_id': sender,
        'receiver_id': receiver,
        'fee_id': fee,
        'mass_id': mass,
        'receiver_fee_id': receiver_fee,
    })
    if (!order) {
        res.status(400);
        throw new Error(`Invalid`);
    }
    res.status(200).json(order);

});

/*
@desc Get order
@route GET /api/orders/:id
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
@route PUT /api/orders/update/:id
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
@route DELETE /api/orders/delete/:id
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


/*
@desc Get orders by branch name
@route GET /api/orders/branch/:branchName
@access staff
*/
const getOrdersByBranchName = asyncHandler(async (req,res) => {
    const branch = await Branch.findOne({'name': req.params.branchName})
    const orders = await Order.find({'order_code': branch.postal_code})
    res.status(200).json(orders)
})
module.exports = { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder, getOrdersByBranchName };



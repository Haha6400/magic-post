const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Branch = require("../models/branchModel");
const Process = require('../models/processesModel')
const Fee = require('../models/feeModel')
const { printLabel } = require("../utils/createLabel");
const {
    createCustomer,
    createFeeModel,
    createMassModel,
    createReceiverFeeModel,
    createProcesses,
    createPackage,
    getOrder,
    getOrders } = require('../utils/orderFunctions');


/*
@desc Get all orders
@route GET /api/orders/all
@access supervisor
*/
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
    const result = await getOrders(orders)
    res.status(200).json(result)
})

/*
@desc Post order
@route POST /api/orders/create
@access staff
*/
const createOrder = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { note, special_service, instructions, sender_commitment, //order attributes
        senderName, senderAddress, senderPhone, // sender attrs
        receiverName, receiverAddress, receiverPhone, //receiver attrs
        charge, surcharge, vat, other_fee, total_fee, receiverBranchName,//transporting fee
        actual_mass, converted_mass, // mass attrs
        type, amount, price,//package attrs
        cod, rf_other_fee, rf_total, // the fee receiver will pay
    } = req.body
    const currentAccount = req.currentAccount;
    const currentBranch = currentAccount.branch_id;
    console.log(currentBranch.name)

    const sender = await createCustomer(senderName, senderAddress, senderPhone, currentBranch.name)
    const receiver = await createCustomer(receiverName, receiverAddress, receiverPhone, receiverBranchName)
    const mass = await createMassModel(actual_mass, converted_mass)
    const fee = await createFeeModel(charge, surcharge, vat, other_fee, total_fee)
    const receiver_fee = await createReceiverFeeModel(cod, rf_other_fee, rf_total)
    const processes = await createProcesses(currentBranch)
    const orderCode = (Math.random() + 1).toString(36).substring(7).toUpperCase(); //random orderCode
    const package = await createPackage(type, amount, price, mass)
    var order = await Order.create({
        note, special_service, instructions, sender_commitment,
        'package_id': package,
        'order_code': orderCode,
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
const getOrderById = asyncHandler(async (req, res) => {
    const order = await getOrder(req.params.id)
    if (!order) {
        res.status(404)
        throw new Error("Order not found")
    }
    console.log(order)
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
        res.status(404);
        throw new Error("Order not found")
    }
    const processes = await Process.findByIdAndUpdate(
        order.processes_id._id,
        {
            $push: {
                'events': {
                    'branch_id': req.currentAccount.branch_id,
                    'status': req.body.status
                }
            }
        },
        { new: true }
    )

    //End date
    const end = (req.body.status == 'DELIVERED') ? processes.updatedAt : order.endedAt

    //Check if the order is refused by the receiver?
    const returnConfirmation = (req.body.status == ('RETURN' || 'PRE-RETURN') ? true : false)
    if (returnConfirmation) {
        const temp = order.sender_id
        order.sender_id = order.receiver_id
        order.receiver_id = temp
    }


    var updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
            ...req.body,
            'sender_id': order.sender_id,
            'receiver_id': order.receiver_id,
            'is_returned': returnConfirmation,
            'endedAt': end
        },
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
    console.log("here")
    await Order.deleteOne({ _id: req.params.id })
    res.json('Delete succeed')
})


/*
@desc Get orders by branch name
@route GET /api/orders/branch/:branchName
@access staff
*/

const getOrdersByBranchName = asyncHandler(async (req, res) => {
    const branch = await Branch.findOne({ 'name': req.params.branchName })
    const proccesses = await Process.find({ 'events.branch_id': branch })
    const orders = await Order.find({ processes_id: proccesses })
    res.status(200).json(orders)
})

/*
@desc Get orders by order code
@route GET /api/orders/code/:order_code
@access staff
*/
const getOrderByCode = asyncHandler(async (req, res) => {
    const order = await Order.findOne({ 'order_code': req.params.order_code })
    res.status(200).json(order)
})


/*
@desc print label for order
@route GET /api/orders/label/:order_id 
@access staff
*/
const printOrderLabel = asyncHandler(async (req, res) => {
    await printLabel(req, res);
});

module.exports = {
    getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder,
    getOrdersByBranchName, printOrderLabel, getOrderByCode
};



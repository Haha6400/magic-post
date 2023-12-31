const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Branch = require("../models/branchModel");
const Process = require('../models/processesModel')
const Fee = require('../models/feeModel')
const Customer = require('../models/customerModel')
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
        surcharge, other_fee, receiverBranchName,//transporting fee
        actual_mass, converted_mass, // mass attrs
        type, amount, price,//package attrs
        rf_other_fee, // the fee receiver will pay
    } = req.body
    const currentAccount = req.currentAccount;
    const currentBranch = currentAccount.branch_id;
    console.log(currentBranch.name)

    const cod = price + 1.1 * await feeCalculator(actual_mass)
    const sender = await createCustomer(senderName, senderAddress, senderPhone, currentBranch.name)
    const receiver = await createCustomer(receiverName, receiverAddress, receiverPhone, receiverBranchName)
    const mass = await createMassModel(actual_mass, converted_mass)
    const fee = await createFeeModel(await feeCalculator(actual_mass), surcharge, other_fee)
    const receiver_fee = await createReceiverFeeModel(cod, rf_other_fee)
    const processes = await createProcesses(currentBranch)
    const randomInRange = Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
    const orderCode = "MG" + randomInRange.toString() + "VN"
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
    res.status(200).json(order)
})

/*
@desc Update order
@route PUT /api/orders/update/:order_code
@access staff
*/
const updateOrder = asyncHandler(async (req, res) => {
    console.log(req.body.status)

    const order = await Order.findOne({
        order_code: req.params.order_code
    }
    )

    if (!order) {
        res.status(404);
        throw new Error("Order not found")
    }
    const currentBranch = req.currentAccount.branch_id

    const processes = await Process.updateOne(
        { _id: order.processes_id._id },
        {
            $addToSet: {
                'events': {
                    'branch_id': currentBranch,
                    'status': req.body.status
                }
            }
        }
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
        order._id,
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
    const order = await Order.findOne({ order_code: req.params.order_code })
    if (!order) {
        res.status(404)
        throw new Error("Order not found")
    }
    console.log("here")
    await Order.deleteOne({ _id: order._id })
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
    const result = await getOrders(orders)
    res.status(200).json(result)
})

/*
@desc Get orders by order code
@route GET /api/orders/code/:order_code
@access staff
*/
const getOrderByCode = asyncHandler(async (req, res) => {
    const order = await Order.findOne({ 'order_code': req.params.order_code })
    const result = await getOrder(order)

    res.status(200).json(result)
})


/*
@desc print label for order
@route GET /api/orders/label/:order_id 
@access staff
*/
const printOrderLabel = asyncHandler(async (req, res) => {
    await printLabel(req, res);
});


/**
 * Magic-post fee calculator
 * 
 */
async function feeCalculator(actual_mass) {
    var fee;
    if (0 <= actual_mass < 0.25) {
        fee = 30000
    } else if (actual_mass < 0.5) {
        fee = 35000
    } else if (actual_mass < 1) {
        fee = 50000
    } else if (actual_mass < 1.5) {
        fee = 68000
    } else {
        var rem = actual_mass - 1.5
        fee = 68000 + rem * 2300
    }
    return fee
}

module.exports = {
    getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder,
    getOrdersByBranchName, printOrderLabel, getOrderByCode
};



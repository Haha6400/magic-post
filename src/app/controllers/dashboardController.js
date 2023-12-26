const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Fee = require("../models/feeModel");
const Process = require('../models/processesModel');
const Branch = require("../models/branchModel");
const Customer = require("../models/customerModel");

const {
    getOrder, getOrders } = require('../utils/orderFunctions');
const { getCurrentBranch } = require("../middleware/branch");
const { getAllWarehouse } = require("../controllers/branchController");


const getMonthlyIncome = asyncHandler(async (req, res) => {
    const currentDate = new Date(req.body.currentDate)
    console.log("date: " + Date.now())
    const orders = await Order.find({
        createdAt: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        },
    })
    for await (const order of orders) {
        const fee = await Fee.findById({ _id: order.fee_id })
        total += fee.total
    }
    res.status(200).json(total)
})

const getMonthlyOrders = asyncHandler(async (req, res) => {
    const currentDate = new Date(req.body.currentDate)

    const ordersCount = await Order.countDocuments({
        createdAt: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        },
    })

    res.status(200).json(ordersCount)
})

const getMonthlyIncomeByBranch = asyncHandler(async (req, res) => {
    const currentDate = new Date(req.body.currentDate)
    const currentBranch = req.params.branch_id

    console.log(currentBranch)
    var total = 0;

    const processes = await Process.find({
        'events.branch_id': currentBranch
    })
    console.log(processes)
    const orders = await Order.find({
        processes_id: processes,
        createdAt: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        },
    })
    for await (const order of orders) {
        console.log(order.processes_id.branch_id)
        const fee = await Fee.findById({ _id: order.fee_id })
        total += fee.total
    }
    res.status(200).json(total)
})

const getMonthlyOrdersByBranch = asyncHandler(async (req, res) => {
    const currentDate = new Date(req.body.currentDate)
    const currentBranch = req.params.branch_id
    console.log(currentBranch)
    const processes = await Process.find({
        'events.branch_id': currentBranch
    })

    const ordersCount = await Order.countDocuments({
        'processes_id': processes,
        createdAt: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        },
    })

    res.status(200).json(ordersCount)
})

/*
@desc Orders are received from other branch, send to other branch or customer
*/
async function statisticFunction(req, res, currentBranch, statusArray, senders) {
    const start = req.body.start;
    const end = req.body.end;
    if (!start || !end) return "Fill start and end";
    const processes = await Process.find({
        events: {
            $elemMatch: {
                'branch_id': currentBranch,
                'status': { $in: statusArray }
            }
        }
    }).sort('createdAt');

    const orders = await Order.find({
        createdAt: { $gt: new Date(start), $lt: new Date(end) },
        processes_id: processes,
        sender_id: senders
    }).sort('createdAt');
    // console.log(orders);
    // orders = 
    return orders;
}

async function receiveFunction(req, res, currentBranch, statusArray) {
    currentBranch = currentBranch[0]
    const lowerBranch = await Branch.find({ higherBranch_id: currentBranch });
    lowerBranch.push(currentBranch);
    const senders = await Customer.find({ branch_id: { $nin: lowerBranch } }).sort('createdAt');
    return statisticFunction(req, res, currentBranch, statusArray, senders);
}

async function sendFunction(req, res, currentBranch, statusArray) {
    currentBranch = currentBranch[0]
    // console.log("currentBranch", currentBranch)
    const lowerBranch = await Branch.find({ higherBranch_id: currentBranch });
    lowerBranch.push(currentBranch);
    // console.log("lowerBranch", lowerBranch)
    const senders = await Customer.find({ branch_id: { $in: lowerBranch } }).sort('createdAt');
    return statisticFunction(req, res, currentBranch, statusArray, senders);
}

const allReceive = asyncHandler(async (req, res) => {
    const currentBranch = await getCurrentBranch(req, res);
    const statusArray = ["DELIVERED", "TRANSIT", "RETURNED"]
    const orders = await receiveFunction(req, res, currentBranch, statusArray);
    res.status(200).json({ orders, count: orders.length });
})


const allSend = asyncHandler(async (req, res) => {
    const currentBranch = await getCurrentBranch(req, res);
    const statusArray = ["PRE_TRANSIT", "TRANSIT", "DELIVERED", "PRE_RETURN", "RETURNED", "FAILRE"];
    const orders = await sendFunction(req, res, currentBranch, statusArray);
    res.status(200).json({ orders, count: orders.length });
})

const allSendByStatus = asyncHandler(async (req, res) => {
    const currentBranch = await getCurrentBranch(req, res);
    const statisticStatus = req.body.status;
    const processes = await Process.find({
        events: {
            $elemMatch: {
                'branch_id': currentBranch,
                'status': statisticStatus
            }
        }
    });
    const senders = await Customer.find({ branch_id: currentBranch }).sort('createdAt');
    console.log("senders", senders)
    const filteredProcess = processes.filter(item => item.events[item.events.length - 1].status === statisticStatus);
    console.log("filteredProcess", filteredProcess)
    const orders = await Order.find({
        processes_id: { $in: filteredProcess },
        sender_id: senders
    }).sort('createdAt');
    const result = await getOrders(orders)
    res.status(200).json({ result, count: result.length });
})

const allReceive_Supervisors = asyncHandler(async (req, res) => {
    const currentBranch = await Branch.find({
        name: req.body.name
    })
    const statusArray = ["DELIVERED", "TRANSIT", "RETURNED"]
    const orders = await receiveFunction(req, res, currentBranch, statusArray);
    res.status(200).json({ orders, count: orders.length });
})

const allSend_Supervisors = asyncHandler(async (req, res) => {
    const currentBranch = await Branch.find({
        name: req.body.name
    })
    console.log("currentBranch", currentBranch)
    const statusArray = ["PRE_TRANSIT", "TRANSIT", "DELIVERED", "PRE_RETURN", "RETURNED", "FAILRE"];
    const orders = await sendFunction(req, res, currentBranch, statusArray);
    res.status(200).json({ orders, count: orders.length });
})


module.exports = {
    getMonthlyIncome, getMonthlyOrders, getMonthlyIncomeByBranch, getMonthlyOrdersByBranch,
    allReceive, allSend, allReceive_Supervisors, allSend_Supervisors, allSendByStatus
}
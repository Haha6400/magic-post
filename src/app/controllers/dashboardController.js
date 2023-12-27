const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Fee = require("../models/feeModel");
const Process = require('../models/processesModel');
const Branch = require("../models/branchModel");
const Customer = require("../models/customerModel");

const { getOrder, getOrders } = require('../utils/orderFunctions');
const { getCurrentBranch } = require("../middleware/branch");
const { getAllWarehouse } = require("../controllers/branchController");


/*
@desc get monthly income of a branch
@path GET /api/dashboard/income
*/
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

/*
@desc get monthly orders of a branch
@path GET /api/dashboard/count
*/
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

/*
@desc get monthly income of a branch that has req.params.branch_id
@path POST /api/dashboard/income/:branch_id
*/
const getMonthlyIncomeByBranch = asyncHandler(async (req, res) => {
    const currentDate = new Date(req.body.currentDate)
    const currentBranch = req.params.branch_id

    console.log(currentBranch)
    var total = 0;

    const processes = await Process.find({
        'events.branch_id': currentBranch
    })
    const orders = await Order.find({
        processes_id: processes,
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

/*
@desc get monthly income of a branch that has req.params.branch_id
@path GET /api/dashboard/count/:branch_id
*/
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
    return orders;
}

async function statisticReceiveFunction(req, res, currentBranch, statusArray, receivers) {
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
    const filteredProcess = processes.filter(item => (item.events[item.events.length - 1].status === "DELIVERING" ||
        item.events[item.events.length - 1].status === "DELIVERED" ||
        item.events[item.events.length - 1].status === "RETURNED")
        && item.events[item.events.length - 1].branch_id.toString() === currentBranch._id.toString());
    const orders = await Order.find({
        createdAt: { $gt: new Date(start), $lt: new Date(end) },
        processes_id: { $in: filteredProcess },
        receiver_id: receivers
    }).sort('createdAt');
    return orders;
}

async function receiveFunction(req, res, currentBranch, statusArray) {
    console.log("currentBranch", currentBranch)
    const receivers = await Customer.find({ branch_id: currentBranch }).sort('createdAt');
    return statisticReceiveFunction(req, res, currentBranch, statusArray, receivers);
}

async function sendFunction(req, res, currentBranch, statusArray) {
    currentBranch = currentBranch[0]
    const lowerBranch = await Branch.find({ higherBranch_id: currentBranch });
    lowerBranch.push(currentBranch);
    const senders = await Customer.find({ branch_id: { $in: lowerBranch } }).sort('createdAt');
    return statisticFunction(req, res, currentBranch, statusArray, senders);
}

/*
@desc get all receive orders of a branch
@access login user
@path POST /api/dashboard/all/receive
*/
const allReceive = asyncHandler(async (req, res) => {
    const currentBranch = await getCurrentBranch(req, res);
    const statusArray = ["DELIVERED", "TRANSIT", "RETURNED"]
    const orders = await receiveFunction(req, res, currentBranch, statusArray);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc get all send orders of a branch
@access login user
@path POST /api/dashboard/all/send
*/
const allSend = asyncHandler(async (req, res) => {
    const currentBranch = await getCurrentBranch(req, res);
    const statusArray = ["PRE_TRANSIT", "TRANSIT", "DELIVERED", "PRE_RETURN", "RETURNED", "FAILRE"];
    const orders = await sendFunction(req, res, currentBranch, statusArray);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc get all send orders of a branch by status
@access login user
@path POST /api/dashboard/send/bystatus
*/
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
    const filteredProcess = processes.filter(item => item.events[item.events.length - 1].status === statisticStatus);
    const orders = await Order.find({
        processes_id: { $in: filteredProcess },
        sender_id: senders
    }).sort('createdAt');
    const result = await getOrders(orders)
    res.status(200).json({ result, count: result.length });
})

/*
@desc get all receive orders of a branch
@access supervisor
@path POST /api/dashboard/all/receive/supervisor
*/
const allReceive_Supervisors = asyncHandler(async (req, res) => {
    const currentBranch = await Branch.find({
        name: req.body.name
    })
    const statusArray = ["DELIVERED", "TRANSIT", "RETURNED"]
    const orders = await receiveFunction(req, res, currentBranch[0], statusArray);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc get all send orders of a branch
@access supervisor
@path POST /api/dashboard/all/send/supervisor
*/
const allSend_Supervisors = asyncHandler(async (req, res) => {
    const currentBranch = await Branch.find({
        name: req.body.name
    })
    const statusArray = ["PRE_TRANSIT", "TRANSIT", "DELIVERED", "PRE_RETURN", "RETURNED", "FAILRE"];
    const orders = await sendFunction(req, res, currentBranch, statusArray);
    res.status(200).json({ orders, count: orders.length });
})


module.exports = {
    getMonthlyIncome, getMonthlyOrders, getMonthlyIncomeByBranch, getMonthlyOrdersByBranch,
    allReceive, allSend, allReceive_Supervisors, allSend_Supervisors, allSendByStatus
}
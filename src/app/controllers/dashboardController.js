// /*TODO:  lấy doanh thu tháng hiện tại,
// tổng số order tháng hiện tại,
// số đơn hàng chưa xử lý tháng hiện tại,
// tỷ lệ đơn hàng giao thành công,
// hoàn trả gì gì đó để nhét vô pie
// => Truy vấn theo branch chứ hong chia ra hub với warehouse (hoặc chia ra nhma hạn chế thui)
// */
const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Fee = require("../models/feeModel");
const Process = require('../models/processesModel');
const Branch = require("../models/branchModel");
const Customer = require("../models/customerModel");

const {
    getOrder, getOrders } = require('../utils/orderFunctions');
const { getCurrentBranch } = require("../middleware/branch");


const getMonthlyIncome = asyncHandler(async (req, res) => {
    const currentDate = new Date(req.body.currentDate)
    var total = 0;
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
    var total = 0;
    const orders = await Order.find({
        processes_id: {
            'events.branch_id': currentBranch
        },
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
    console.log(orders);
    return orders;
}

async function receiveFunction(req, res, currentBranch, statusArray) {
    const lowerBranch = await Branch.find({ higherBranch_id: currentBranch });
    lowerBranch.push(currentBranch);
    const senders = await Customer.find({ branch_id: { $nin: lowerBranch } }).sort('createdAt');
    return statisticFunction(req, res, currentBranch, statusArray, senders);
}

async function sendFunction(req, res, currentBranch, statusArray) {
    const lowerBranch = await Branch.find({ higherBranch_id: currentBranch });
    lowerBranch.push(currentBranch);
    const senders = await Customer.find({ branch_id: { $in: lowerBranch } }).sort('createdAt');
    return statisticFunction(req, res, currentBranch, statusArray, senders);
}

const allReceive = asyncHandler(async (req, res) => {
    const currentBranch = await getCurrentBranch(req, res);
    const statusArray = ["DELIVERED", "TRANSIT", "RETURNED"]
    const orders = await receiveFunction(req, res, currentBranch, statusArray);
    res.status(200).json({ orders, count: orders.length });
})

const availableReceive = asyncHandler(async (req, res) => {
    const currentBranch = await getCurrentBranch(req, res);
    const statusArray = ["TRANSIT"]
    const orders = await receiveFunction(req, res, currentBranch, statusArray);
    res.status(200).json({ orders, count: orders.length });
})

const allSend = asyncHandler(async (req, res) => {
    const currentBranch = await getCurrentBranch(req, res);
    const statusArray = ["PRE_TRANSIT", "TRANSIT", "DELIVERED", "PRE_RETURN", "RETURNED", "FAILRE"];
    const orders = await sendFunction(req, res, currentBranch, statusArray);
    res.status(200).json({ orders, count: orders.length });
})

const availableSend = asyncHandler(async (req, res) => {
    const currentBranch = await getCurrentBranch(req, res);
    const statusArray = ["PRE_TRANSIT", "PRE_RETURN", "TRANSIT"];
    const orders = await sendFunction(req, res, currentBranch, statusArray);
    res.status(200).json({ orders, count: orders.length });
})

module.exports = {
    getMonthlyIncome, getMonthlyOrders, getMonthlyIncomeByBranch, getMonthlyOrdersByBranch,
    allReceive, availableReceive, allSend, availableSend
}
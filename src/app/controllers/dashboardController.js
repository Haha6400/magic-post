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
const Process = require('../models/processesModel')

const {
    getOrder, getOrders } = require('../utils/orderFunctions');


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
module.exports = { getMonthlyIncome, getMonthlyOrders, getMonthlyIncomeByBranch, getMonthlyOrdersByBranch }
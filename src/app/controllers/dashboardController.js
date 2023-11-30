// /*TODO:  lấy doanh thu tháng hiện tại,
// tổng số order tháng hiện tại,
// số đơn hàng chưa xử lý tháng hiện tại,
// tỷ lệ đơn hàng giao thành công,
// hoàn trả gì gì đó để nhét vô pie
// => Truy vấn theo branch chứ hong chia ra hub với warehouse (hoặc chia ra nhma hạn chế thui)
// */
const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Branch = require("../models/branchModel");
const Fee = require("../models/feeModel");
const Customer = require("../models/customerModel");
const Process = require("../models/processesModel");
const {
    getOrder, getOrders } = require('../utils/orderFunctions');


const getMonthlyIncome = asyncHandler(async (req, res) => {
    const currentDate = req.body.currentDate
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
    console.log(total)
    res.status(200).send(total)
})

const getMonthlyOrders = asyncHandler(async (req, res) => {
    const currentDate = new Date(req.body.currentDate)

    const orders = await Order.countDocuments({
        createdAt: {
            $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        },
    })

    console.log(orders)
    res.status(200).send()
})
module.exports = { getMonthlyIncome, getMonthlyOrders }
/*TODO:  lấy doanh thu tháng hiện tại, 
tổng số order tháng hiện tại, 
số đơn hàng chưa xử lý tháng hiện tại,
tỷ lệ đơn hàng giao thành công, 
hoàn trả gì gì đó để nhét vô pie 
=> Truy vấn theo branch chứ hong chia ra hub với warehouse (hoặc chia ra nhma hạn chế thui)
*/
const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Branch = require("../models/branchModel");
const Fee = require("../models/feeModel");
const Customer = require("../models/customerModel");
const Process = require("../models/processesModel");
const {
    getOrder, getOrders } = require('../utils/orderFunctions');


const getTotalIncome = asyncHandler(async (req, res) => {
    var total = 123;
    const orders = await Order.find({})
    for await (const order of orders) {
        const fee = await Fee.findById({ _id: order.fee_id })
        total += fee.total
        console.log(total)
    }
})

module.exports = { getTotalIncome }
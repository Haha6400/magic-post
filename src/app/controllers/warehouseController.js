//TODO: Thống kê hàng đi, đến của từng warehouse và tất cả warehouse trên cả nước

/*
@desc Functions for warehouse management.
Includes: Thống kê tất cả mặt hàng (bao gồm đã và đang có tại branch):
2 loại hàng:
- Hàng đang có mặt tại warehouse (Orders are available at warehouse)
- Hàng đã hoặc đang có mặt tại warehouse (All orders)

Hàng nhận được từ nơi khác tới:
- Nhận được từ warehouse khác, gửi tới hub dưới
Hàng gửi tới nơi khác:
- Nhận được từ hub dưới, gửi tới warehouse khác

=> Input có start và end date
=> Chia ra với currentAccount là warehouseManager, supervisor

=> Tổng là: 2x2x2x2 = 16 link hehe
*/

const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Branch = require("../models/branchModel");
const Customer = require("../models/customerModel");
const Process = require("../models/processesModel");
const {
    getOrder, getOrders } = require('../utils/orderFunctions');




/**
 * @access warehouseManager, supervisor
 * WH which receive order
 * 
 */
const getCurrentBranchReceivingOrders = asyncHandler(async (req, res) => {
    const currentStaff = req.currentAccount
    const currentBranch = currentStaff.branch_id
    console.log(currentStaff.branch_id)
    const lower_branch = await Branch.findOne({ 'higherBranch_id': currentBranch })
    const sender = await Customer.find({ 'branch_id': lower_branch })
    const processes = await Process.find({ 'branch_id': currentBranch })
    const ordersFromHUB = await Order.find({ 'processes_id': processes, 'sender_id': sender })
    //Order from other warehouses
    const receiver = await Customer.find({ 'branch_id': lower_branch })
    const ordersFromOtherWH = await Order.find({ 'processes_id': processes, 'receiver_id': receiver })
    const result = (await getOrders(ordersFromHUB)).concat(await getOrders(ordersFromOtherWH))
    res.status(200).json(result)
})

//TODO: logic giống receiving nên trả lại y hệt receiving :)
// const getCurrentBranchSendingOrders = asyncHandler(async (req, res) => {
//     const currentStaff = req.currentAccount
//     const currentBranch = currentStaff.branch_id
//     if (!currentBranch.higherBranch_id) {
//         const lower_branch = await Branch.findOne({ 'higherBranch_id': currentBranch })
//         const sender = await Customer.find({ 'branch_id': lower_branch })
//         const processes = await Process.find({ 'branch_id': currentBranch })
//         const ordersFromHUB = await Order.find({ 'processes_id': processes, 'sender_id': sender })
//         //Order from other warehouses
//         const receiver = await Customer.find({ 'branch_id': lower_branch })
//         const ordersFromOtherWH = await Order.find({ 'processes_id': processes, 'receiver_id': receiver })
//         const result = (await getOrders(ordersFromHUB)).concat(await getOrders(ordersFromOtherWH))

//         res.status(200).json(result)
//     }
// })

/**
 * @access supervisor
 * get order statistics by warehouse
 */
const getOrdersByWareHouseID = asyncHandler(async (req, res) => {
    const warehouse = await Branch.findById({ _id: req.params.branch_id })
    console.log(req.branch_id)
    const lower_branch = await Branch.findOne({ 'higherBranch_id': warehouse })
    const sender = await Customer.find({ 'branch_id': lower_branch })
    const processes = await Process.find({ 'branch_id': warehouse })
    const ordersFromHUB = await Order.find({ 'processes_id': processes, 'sender_id': sender })
    //Order from other warehouses
    const receiver = await Customer.find({ 'branch_id': lower_branch })
    const ordersFromOtherWH = await Order.find({ 'processes_id': processes, 'receiver_id': receiver })
    const result = await (await getOrders(ordersFromHUB)).concat(await getOrders(ordersFromOtherWH))
    res.status(200).json(result)

})


module.exports = { getCurrentBranchReceivingOrders, getOrdersByWareHouseID }


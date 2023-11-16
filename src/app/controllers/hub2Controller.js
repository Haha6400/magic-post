/*
@desc Functions for hub management.
Includes: Thống kê
- Hàng nhận được từ nơi khác tới 
(tức là nhận được từ warehouse, gửi tới receiver)
(bao gồm cả hàng được hoàn trả về)
- Hàng gửi tới nơi khác 
(tức là nhận được từ sender, gửi tới warehouse)
(bao gồm cả hàng được hoàn trả đi)
process:
- branch_id: currentHub
- status: PRE_RETURNED 

=> Tổng hàng nhận, hàng gửi
=> Tìm kiếm theo tên warehouse, theo ngày, tháng, năm
@access hubManager, supervisor
*/
const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Branch = require("../models/branchModel");
const Customer = require("../models/customerModel");
const Process = require("../models/processesModel");

const {getCurrentBranch} = require("../middleware/branch");

/*-------------------------------------------------------RECEIVE-------------------------------------------------------*/
/*
@desc All orders are received from warehouse, send to receiver
@process {branch_id: currentBranch, 
    status: ["PRE_TRANSIT", "PRE_RETURNED"],
    createdAt [start, end]}  
*/
async function huhReceive_Function(req, res, currentHub) {
    const start = req.body.start;
    const end = req.body.end;
    console.log(new Date(start));
    if(!start || !end) return "Fill start and end";

    // sender -> hubA -> warehouseA -> warehouseB -> hubB -> receiver
    const receivers = await Customer.find({branch_id: currentHub}).sort('createdAt');
    //Ví dụ đang ở điểm gđ B. Thống kê những hàng được gửi tới B <=> Người nhận nhận hàng ở B
    // => receiver.branch_id == hubB 

    const statusArray = ["DELIVERED", "TRANSIT", "RETURNED"]
    const processes = await Process.find({
        branch_id: currentHub, //Hàng đã tới hubB
        status: { $in: statusArray }
    }).sort('createdAt');
    // if(!processes) console.log("No processes");
    // else console.log(processes);
    const orders = await Order.find({
        createdAt: { $gt: new Date(start), $lt: new Date(end)},
        processes_id: processes,
        receiver_id: receivers
    })
    if(!orders) {
        res.status(404);
        throw new Error("orders not found");
    }
    return orders;
}

/*
@desc All orders are received from sender, send to warehouse
@process {
    status: ["DELIVERED", "TRANSIT", "RETURNED"],
    createdAt [start, end]}  
*/
async function huhSend_Function(req, res, currentHub) {
    const start = req.body.start;
    const end = req.body.end;
    console.log(new Date(start));
    if(!start || !end) return "Fill start and end";
    //---
    const senders = await Customer.find({branch_id: currentHub}).sort('createdAt');
    //---------
    const statusArray = ["DELIVERED", "TRANSIT", "RETURNED"]
    const processes = await Process.find({
        branch_id: currentHub,
        status: { $in: statusArray }
    }).sort('createdAt');
    // if(!processes) console.log("No processes");
    // else console.log(processes);
    const orders = await Order.find({
        createdAt: { $gt: new Date(start), $lt: new Date(end)},
        processes_id: processes,
        receiver_id: receivers
    })
    if(!orders) {
        res.status(404);
        throw new Error("orders not found");
    }
    return orders;
}

const huhReceive_Manager = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const orders = await huhReceive_Function(req, res, currentHub);
    res.status(200).json({orders, count: orders.length});
})

const huhReceive_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findOne({name: req.body.BranchName});
    const orders = await huhReceive_Function(req, res, currentHub);
    res.status(200).json({orders, count: orders.length});
})

module.exports = {huhReceive_Manager , huhReceive_Supervisor }
/*
@desc Functions for hub management.
Includes: Thống kế
- Hàng nhận:
+ Nhận từ warehouse (hub_fromWarehouse)
+ Nhận từ sender (hub_fromSender)
=> Tổng hàng nhận (hub_receiveTotal)
- Hàng gửi:
+ Cần gửi tới warehouse (hub_toWarehouse)
+ Cần gửi tới tay receiver (hub_toReceiver)
=> Tổng hàng gửi (hub_sendTotal)
=> Tìm kiếm theo tên warehouse, theo ngày, tháng, năm
@access hubManager
*/

const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Branch = require("../models/branchModel");
const Customer = require("../models/customerModel");
const {getCurrentBranch} = require("../middleware/branch");

/*-------------------------------------------------------RECEIVE-------------------------------------------------------*/

/*
@des Statistics of the orders received by hub received from all warehouse 
a.k.a the orders have receiver that has branch_id === currentHub
@range all
@route GET /api/hub/fromwarehouse/all
*/
async function fromAllWarehouseFunction(req, res){
    const currentHub = await getCurrentBranch(req, res);
    console.log(currentHub);
    const receivers = await Customer.find({branch_id: currentHub}).sort('createdAt');
    console.log(receivers);
    const ordersFromWH = await Order.find({receiver_id: receivers}) 
    if(!receivers || !ordersFromWH){
        res.status(404);
        throw new Error("receivers or orders not found");
    }
    return ordersFromWH;
}
const hub_fromAllWarehouse = asyncHandler(async (req, res) => {
    const ordersFromWH = await fromAllWarehouseFunction(req, res);
    res.status(200).json({ordersFromWH, count: ordersFromWH.length});
})

/*
@des Statistics of the orders received by hub received from a warehouse (using warehouse_id)
a.k.a the orders have receiver that has branch_id === currentHub
@range all
@route GET /api/hub/fromwarehouse/:warehouse_id
*/
async function fromWarehouseFunction(req, res){
    const allOrdersFromWH = await fromAllWarehouseFunction(req, res);
    const warehouse = await Branch.findById(req.params.warehouse_id);
    console.log("warehouse:", warehouse);
    const hubsSender = await Branch.find({higherBranch_id: warehouse})
    console.log("hubsSender:", hubsSender);
    const sender = await Customer.find({branch_id: hubsSender});
    console.log({sender});
    const orders = allOrdersFromWH.find({sender_id: sender});
    return orders;
}
const hub_fromWarehouse = asyncHandler(async (req, res) =>{
    const orders = await fromWarehouseFunction(req, res);
    res.status(200).json({orders, count: orders.length});
});

/*
@des Statistics of the orders received by hub received from customer 
a.k.a the orders have sender that has branch_id === currentHub
@range all
@route GET /api/hub/fromwarehouse/all
*/
async function fromSenderFunction(req, res){
    const currentHub = await getCurrentBranch(req, res);
    const senders = await Customer.find({branch_id: currentHub}).sort('createdAt');
    const ordersFromSender = await Order.find({sender_id: senders}) 
    if(!senders || !ordersFromSender){
        res.status(404);
        throw new Error("receivers or orders not found");
    }
    return ordersFromSender;
}
const hub_fromSender = asyncHandler(async (req, res) => {
    const ordersFromSender = await fromSenderFunction(req, res);
    res.status(200).json({ordersFromSender, count: ordersFromSender.length});
})

/*
@des Statistics of the orders received by hub received
@range all
@route GET /api/hub/receive/all
*/
const hub_receiveAll = asyncHandler(async(req, res) => {
    const ordersFromSender = await fromSenderFunction(req, res);
    const ordersFromWH = await fromAllWarehouseFunction(req, res);
    res.status(200).json({ordersFromSender, ordersFromWH, count: ordersFromSender.length + ordersFromWH.length});
})

/*-------------------------------------------------------SEND-------------------------------------------------------*/

module.exports = {hub_fromAllWarehouse, hub_fromSender, hub_receiveAll, hub_fromWarehouse}
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
const moment = require('moment');
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
    const receivers = await Customer.find({branch_id: currentHub}).sort('createdAt');
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

//by time
async function fromAllWarehouseByDayFunction(req, res, fullyear, month, day){
    const date = new Date(fullyear, month, day);
    console.log(date);
    const currentHub = await getCurrentBranch(req, res);
    console.log(currentHub);
    const receivers = await Customer.find({branch_id: currentHub}).sort('createdAt');
    console.log(receivers);
    const orders = await Order.find({receiver_id: receivers, createdAt: {$gte: date}});
    if(!orders) console.log("no order");
    return orders;
}
/*
@des Statistics of the orders received by hub received from all warehouse 
a.k.a the orders have receiver that has branch_id === currentHub
@range all
@date today
@route GET /api/hub/fromwarehouse/all/today
*/
const hub_fromAllWarehouse_Today = asyncHandler(async(req, res) => {
    const Now = new Date();
    const orders = await fromAllWarehouseByDayFunction(req, res, Now.getFullYear(), Now.getMonth(), Now.getDate());
    if(!orders) console.log("no order");
    res.status(200).json({orders, count: orders.length});
})

/*
@des Statistics of the orders received by hub received from all warehouse 
a.k.a the orders have receiver that has branch_id === currentHub
@range all
@date YYYY-MM-DD
@route GET /api/hub/fromwarehouse/all/:fullyear/:month/:day
*/
const hub_fromAllWarehouse_ByDay = asyncHandler(async(req, res) => {
    const fullyear = req.params.fullyear - 1;
    const month = req.params.month - 1;
    const day = req.params.day - 1;
    const orders = await fromAllWarehouseByDayFunction(req, res, fullyear, month, day);
    if(!orders) console.log("no order");
    res.status(200).json({orders, count: orders.length});
})

/*
@des Statistics of the orders received by hub received from a warehouse (using warehouse_id)
a.k.a the orders have receiver that has branch_id === currentHub
@range all
@route GET /api/hub/fromwarehouse/:warehouse_id
*/
async function fromWarehouseFunction(req, res){
    const warehouse = await Branch.findById(req.params.warehouse_id);
    console.log("warehouse:", warehouse);
    const hubsSender = await Branch.find({higherBranch_id: warehouse})
    console.log("hubsSender:", hubsSender);
    const senders = await Customer.find({branch_id: hubsSender});
    console.log({senders});

    const currentHub = await getCurrentBranch(req, res);
    const receivers = await Customer.find({branch_id: currentHub}).sort('createdAt');
    const orders = await Order.find({receiver_id: receivers, sender_id: senders}) 
    return orders;
}
const hub_fromWarehouseID = asyncHandler(async (req, res) =>{
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

//by time
async function fromSenderByDayFunction(req, res, fullyear, month, day){
    const date = new Date(fullyear, month, day);
    console.log(date);
    const currentHub = await getCurrentBranch(req, res);
    console.log(currentHub);
    const senders = await Customer.find({branch_id: currentHub}).sort('createdAt');
    const orders = await Order.find({sender_id: senders, createdAt: {$gte: date}});
    if(!orders) console.log("no order");
    return orders;
}
/*
@des Statistics of the orders received by hub received from all customer today 
a.k.a the orders have receiver that has branch_id === currentHub
@range all
@date today
@route GET /api/hub/fromcustomer/all/today
*/
const hub_fromSender_Today = asyncHandler(async(req, res) => {
    const Now = new Date();
    const orders = await fromSenderByDayFunction(req, res, Now.getFullYear(), Now.getMonth(), Now.getDate());
    if(!orders) console.log("no order");
    res.status(200).json({orders, count: orders.length});
})

/*
@des Statistics of the orders received by hub received from all customer  
a.k.a the orders have receiver that has branch_id === currentHub
@range all
@date YYYY-MM-DD
@route GET /api/hub/fromsender/all/:fullyear/:month/:day
*/
const hub_fromSender_ByDay = asyncHandler(async(req, res) => {
    const fullyear = req.params.fullyear - 1;
    const month = req.params.month - 1;
    const day = req.params.day - 1;
    const orders = await fromSenderByDayFunction(req, res, fullyear, month, day);
    if(!orders) console.log("no order");
    res.status(200).json({orders, count: orders.length});
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
//by time
// async function fromSenderByDayFunction(req, res, fullyear, month, day){
//     const date = new Date(fullyear, month, day);
//     console.log(date);
//     const currentHub = await getCurrentBranch(req, res);
//     console.log(currentHub);
//     const senders = await Customer.find({branch_id: currentHub}).sort('createdAt');
//     const orders = await Order.find({sender_id: senders, createdAt: {$gte: date}});
//     if(!orders) console.log("no order");
//     return orders;
// }
/*
@des Statistics of the orders received by hub received from all customer today 
a.k.a the orders have receiver that has branch_id === currentHub
@range all
@date today
@route GET /api/hub/fromcustomer/all/today
*/
const hub_receiveAll_Today = asyncHandler(async(req, res) => {
    const Now = new Date();
    const ordersSender = await fromSenderByDayFunction(req, res, Now.getFullYear(), Now.getMonth(), Now.getDate());
    const ordersWarehouse = await fromAllWarehouseByDayFunction(req, res, Now.getFullYear(), Now.getMonth(), Now.getDate());
    if(!ordersSender || !ordersWarehouse) console.log("no order");
    res.status(200).json({ordersSender, ordersWarehouse, count: ordersSender.length + ordersWarehouse.length});
})

/*
@des Statistics of the orders received by hub received from all customer  
a.k.a the orders have receiver that has branch_id === currentHub
@range all
@date YYYY-MM-DD
@route GET /api/hub/fromsender/all/:fullyear/:month/:day
*/
const hub_receiveAll_ByDay = asyncHandler(async(req, res) => {
    const fullyear = req.params.fullyear - 1;
    const month = req.params.month - 1;
    const day = req.params.day - 1;
    const ordersSender = await fromSenderByDayFunction(req, res, fullyear, month, day);
    const ordersWarehouse = await fromAllWarehouseByDayFunction(req, res, fullyear, month, day);
    if(!ordersSender || !ordersWarehouse) console.log("no order");
    res.status(200).json({ordersSender, ordersWarehouse, count: ordersSender.length + ordersWarehouse.length});
})

/*-------------------------------------------------------SEND-------------------------------------------------------*/

module.exports = {hub_fromAllWarehouse, hub_fromSender, hub_receiveAll, hub_fromWarehouseID, hub_fromAllWarehouse_Today, hub_fromAllWarehouse_ByDay,
    hub_fromSender_Today, hub_fromSender_ByDay, hub_receiveAll_Today, hub_receiveAll_ByDay }
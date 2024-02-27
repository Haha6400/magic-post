/*
@desc Functions for hub management.
Includes: Thống kê tất cả mặt hàng (bao gồm đã và đang có tại branch):
2 loại hàng:
- Hàng đang có mặt tại hub (Orders are available at hub)
- Hàng đã hoặc đang có mặt tại hub (All orders)

Hàng nhận được từ nơi khác tới:
- Nhận được từ warehouse, gửi tới receiver
(Lúc đầu có Hàng được hoàn trả về currentHub, 
tuy nhiên sau khi viết hàm Xác nhận hoàn trả hàng trong orderController thì 0 cần nữa)

Hàng gửi tới nơi khác:
- Nhận được từ sender, gửi tới warehouse
(Lúc đầu có Hàng được hoàn trả đi nhưng lý do tương tự như trên)

=> Tìm kiếm theo tên warehouse, theo ngày, tháng, năm
=> Chia hubManager, supervisor
*/

const asyncHandler = require('express-async-handler');
const Order = require("../models/orderModel");
const Branch = require("../models/branchModel");
const Customer = require("../models/customerModel");
const Process = require("../models/processesModel");

const { getCurrentBranch } = require("../middleware/branch");
const { getOrders } = require("../utils/orderFunctions");

/*
@desc Orders are received from warehouse, send to receiver
*/
async function hubReceive_Function(req, res, currentHub, warehouse, statusArray) {
    const start = req.body.start;
    const end = req.body.end;
    console.log(new Date(start));
    if (!start || !end) return "Fill start and end";
    processes = await Process.find({
        events: {
            $elemMatch: {
                'branch_id': currentHub,
                'status': { $in: statusArray }
            }
        }
    });

    const receivers = await Customer.find({ branch_id: currentHub }).sort('createdAt'); //Receiver receive order in currentHub
    if (warehouse == null) { //Orders from all warehouses
        var orders = await Order.find({
            createdAt: { $gt: new Date(start), $lt: new Date(end) },
            processes_id: processes,
            receiver_id: receivers
        })
        if (!orders) {
            res.status(404);
            throw new Error("orders not found"); //hubA -> WHA-> WHB -> hubB -> receiver
            //huba -> WHa -> WHB -> hubB -> receiver
        }
        orders = await getOrders(orders)
        return orders;
    } else { //Orders from a warehouse in request
        const fromHub = await Branch.find({ higherBranch_id: warehouse }).sort('createdAt');
        const senders = await Customer.find({ branch_id: fromHub }).sort('createdAt');
        var orders = await Order.find({
            createdAt: { $gt: new Date(start), $lt: new Date(end) },
            processes_id: processes,
            receiver_id: receivers,
            sender_id: senders
        })
        if (!orders) {
            res.status(404);
            throw new Error("orders not found");
        }
        orders = await getOrders(orders)
        return orders;
    }
}

/*
@desc Orders are received from sender, send to warehouse.
*/
async function hubSend_Function(req, res, currentHub, warehouse, statusArray) {
    const start = req.body.start;
    const end = req.body.end;
    if (!start || !end) return "Fill start and end";
    const senders = await Customer.find({ branch_id: currentHub }).sort('createdAt');
    const processes = await Process.find({
        events: {
            $elemMatch: {
                'status': { $in: statusArray }
            }
        }
    });

    if (warehouse == null) { //All orders to all warehouse
        var orders = await Order.find({
            createdAt: { $gt: new Date(start), $lt: new Date(end) },
            processes_id: processes,
            sender_id: senders
        })
        if (!orders) {
            console.log("No orders");
        }
        orders = await getOrders(orders)
        return orders;
    }
    else { //All orders to a warehouse in request
        const toHub = await Branch.find({ higherBranch_id: warehouse }).sort('createdAt');
        const receivers = await Customer.find({ branch_id: toHub }).sort('createdAt');
        var orders = await Order.find({
            createdAt: { $gt: new Date(start), $lt: new Date(end) },
            processes_id: processes,
            receiver_id: receivers
        })
        if (!orders) {
            console.log("No orders");
        }
        orders = await getOrders(orders)
        return orders;
    }
}

/*-------------------------------------------------------ALL ORDERS-------------------------------------------------------*/

/*
@desc All orders are received from warehouse, send to receiver
*/
async function allHubReceive_Function(req, res, currentHub, warehouse) {
    const statusArray = ["DELIVERED", "TRANSIT", "RETURNED"]
    const orders = await hubReceive_Function(req, res, currentHub, warehouse, statusArray);
    return orders;
}

/*
@desc All orders are received from all warehouses, send to receiver
@access hubManager
@path GET /api/hub/receive/all
*/
const allHubReceive_Manager = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const orders = await allHubReceive_Function(req, res, currentHub, null);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received a warehouse in request, send to receiver
@access hubManager
@path GET /api/hub/receive/all/wh
*/
const allHubReceiveByWH_Manager = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const warehouse = await Branch.findOne({ name: req.body.warehouseName });

    const orders = await allHubReceive_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from warehouse, send to receiver
@access supervisor
@path GET /api/hub/receive/all
*/
const allHubReceive_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findOne({ name: req.body.hubName });
    const orders = await allHubReceive_Function(req, res, currentHub, null);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from warehouse, send to receiver
@access supervisor
@path GET /api/hub/receive/all/wh
*/
const allHubReceivByWH_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findOne({ name: req.body.hubName });
    const warehouse = await Branch.findOne({ name: req.body.warehouseName });
    const orders = await allHubReceive_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})


/*
@desc All orders are received from sender, send to warehouse.
*/
async function allHubSend_Function(req, res, currentHub, warehouse) {
    const statusArray = ["PRE_TRANSIT", "TRANSIT", "DELIVERED", "DELIVERING", "PRE_RETURN", "RETURNED", "FAILRE"];
    const orders = await hubSend_Function(req, res, currentHub, warehouse, statusArray);
    return orders;
}

/*
@desc All orders are received from sender, send to warehouse.
@access hubManager
@path GET /api/hub/send/all
*/
const allHubSend_Manager = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const orders = await allHubSend_Function(req, res, currentHub, null);
    res.status(200).json({ orders, count: orders.length });
})
/*
@desc All orders are received from sender, send to a warehouse in request.
@access hubManager
@path GET /api/hub/send/all/wh
*/
const allHubSendByWH_Manager = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const warehouse = await Branch.findOne({ name: req.body.warehouseName });
    const orders = await allHubSend_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from sender, send to warehouse.
@access supervisor
@path GET /api/hub/send/all
*/
const allHubSend_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findOne({ name: req.body.hubName });
    const orders = await allHubSend_Function(req, res, currentHub, null);
    res.status(200).json({ orders, count: orders.length });
})
/*
@desc All orders are received from sender, send to  warehouse in request.
@access supervisor
@path GET /api/hub/send/all/wh
*/
const allHubSendByWH_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findOne({ name: req.body.hubName });
    const warehouse = await Branch.findOne({ name: req.body.warehouseName });
    const orders = await allHubSend_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})


/*
@desc All orders are received from warehouse, send to receiver
*/
async function availableHubReceive_Function(req, res, currentHub, warehouse) {
    const statusArray = ["TRANSIT"]
    const orders = await hubReceive_Function(req, res, currentHub, warehouse, statusArray);
    return orders;
}

/*
@desc All orders are received from all warehouses, send to receiver
@access hubManager
@path GET /api/hub/receive/available
*/
const availableHubReceive_Manager = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const orders = await availableHubReceive_Function(req, res, currentHub, null);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received a warehouse in request, send to receiver
@access hubManager
@path GET /api/hub/receive/available/wh
*/
const availableHubReceiveByWH_Manager = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const warehouse = await Branch.findOne({ name: req.body.warehouseName });
    const orders = await availableHubReceive_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from warehouse, send to receiver
@access supervisor
@path GET /api/hub/receive/s/available
*/
const availableHubReceive_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findOne({ name: req.body.hubName });
    const orders = await availableHubReceive_Function(req, res, currentHub, null);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from warehouse, send to receiver
@access supervisor
@path GET /api/hub/receive/available/wh
*/
const availableHubReceivByWH_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findOne({ name: req.body.hubName });
    const warehouse = await Branch.findOne({ name: req.body.warehouseName });
    const orders = await availableHubReceive_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from sender, send to warehouse.
*/
async function availableHubSend_Function(req, res, currentHub, warehouse) {
    const statusArray = ["PRE_TRANSIT", "PRE_RETURN"];
    const orders = await hubSend_Function(req, res, currentHub, warehouse, statusArray);
    return orders;
}

/*
@desc All orders are received from sender, send to warehouse.
@access hubManager
@path GET /api/hub/send/available
*/
const availableHubSend_Manager = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const orders = await availableHubSend_Function(req, res, currentHub, null);
    res.status(200).json({ orders, count: orders.length });
})
/*
@desc All orders are received from sender, send to a warehouse in request.
@access hubManager
@path GET /api/hub/send/available/wh
*/
const availableHubSendByWH_Manager = asyncHandler(async (req, res) => {
    const warehouse = await Branch.findOne({ name: req.body.warehouseName });
    const orders = await availableHubSend_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from sender, send to warehouse.
@access supervisor
@path GET /api/hub/send/s/available
*/
const availableHubSend_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findOne({ name: req.body.hubName });
    const orders = await availableHubSend_Function(req, res, currentHub, null);
    res.status(200).json({ orders, count: orders.length });
})
/*
@desc All orders are received from sender, send to  warehouse in request.
@access supervisor
@path GET /api/hub/send/s/available/wh
*/
const availableHubSendByWH_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findOne({ name: req.body.hubName });
    const warehouse = await Branch.findOne({ name: req.body.warehouseName });
    const orders = await availableHubSend_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc get order by status
@access hubStaff
@path POST /api/hub/all
*/
const getOrderByStatus = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const { start, end } = req.body;
    const processes = await Process.find({
        branch_id: currentHub,
        status: req.body.status
    }).sort('createdAt');
    const orders = await Order.find({
        createdAt: { $gt: new Date(start), $lt: new Date(end) },
        processes_id: processes
    })
    res.status(200).json({ orders, count: orders.length });
});


module.exports = {
    allHubReceive_Manager, allHubReceive_Supervisor, allHubSend_Manager, allHubSend_Supervisor,
    allHubReceiveByWH_Manager, allHubReceivByWH_Supervisor, allHubSendByWH_Manager, allHubSendByWH_Supervisor,
    availableHubReceive_Manager, availableHubReceive_Supervisor, availableHubSend_Manager, availableHubSend_Supervisor,
    availableHubReceiveByWH_Manager, availableHubReceivByWH_Supervisor, availableHubSendByWH_Manager, availableHubSendByWH_Supervisor,
    getOrderByStatus
}

//TODO: Test cái đống này
//TODO: Viết hàng thống kê hàng nhận, hàng gửi trên cả nước
//TODO: Thống kê các hàng đã chuyển thành công, các hàng chuyển không thành công và trả lại điểm giao dịch.

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

/*
@desc Orders are received from warehouse, send to receiver
*/
async function hubReceive_Function(req, res, currentHub, warehouse, statusArray) {
    const start = req.body.start;
    const end = req.body.end;
    console.log(new Date(start));
    if (!start || !end) return "Fill start and end";
    const processes = await Process.find({
        branch_id: currentHub, //Order has arrived at currentHub
        status: { $in: statusArray } //At least 1 element of arr `status` in `statusArray`
    }).sort('createdAt');

    const receivers = await Customer.find({ branch_id: currentHub }).sort('createdAt'); //Receiver receive order in currentHub
    if (warehouse == null) { //Orders from all warehouses
        const orders = await Order.find({
            createdAt: { $gt: new Date(start), $lt: new Date(end) },
            processes_id: processes,
            receiver_id: receivers
        })
        if (!orders) {
            res.status(404);
            throw new Error("orders not found"); //hubA -> WHA-> WHB -> hubB -> receiver
            //huba -> WHa -> WHB -> hubB -> receiver
        }
        return orders;
    } else { //Orders from a warehouse in request
        const fromHub = await Branch.find({ higherBranch_id: warehouse }).sort('createdAt');
        const senders = await Customer.find({ branch_id: fromHub }).sort('createdAt');
        const orders = await Order.find({
            createdAt: { $gt: new Date(start), $lt: new Date(end) },
            processes_id: processes,
            receiver_id: receivers,
            sender_id: senders
        })
        if (!orders) {
            res.status(404);
            throw new Error("orders not found");
        }
        return orders;
    }
}

/*
@desc Orders are received from sender, send to warehouse.
*/
async function hubSend_Function(req, res, currentHub, warehouse, statusArray) {
    const start = req.body.start;
    const end = req.body.end;
    console.log(new Date(start));
    if (!start || !end) return "Fill start and end";
    const senders = await Customer.find({ branch_id: currentHub }).sort('createdAt');
    const processes = await Process.find({
        status: { $in: statusArray } //At least 1 element of arr `status` in `statusArray`
    }).sort('createdAt');
    if (warehouse == null) { //All orders to all warehouse
        const orders = await Order.find({
            createdAt: { $gt: new Date(start), $lt: new Date(end) },
            processes_id: processes,
            sender_id: senders
        })
        if (!orders) {
            console.log("No orders");
        }
        return orders;
    }
    else { //All orders to a warehouse in request
        const toHub = await Branch.find({ higherBranch_id: warehouse }).sort('createdAt');
        console.log(toHub);
        const receivers = await Customer.find({ branch_id: toHub }).sort('createdAt');
        const orders = await Order.find({
            createdAt: { $gt: new Date(start), $lt: new Date(end) },
            processes_id: processes,
            receiver_id: receivers
        })
        if (!orders) {
            console.log("No orders");
        }
        return orders;
    }
}

/*-------------------------------------------------------ALL ORDERS-------------------------------------------------------*/

/*
@desc All orders are received from warehouse, send to receiver
*/
async function allHubReceive_Function(req, res, currentHub, warehouse) {
    //If status == "DELIVERED" => Order sent to receiver successfully
    //If status == "TRANSIT" => Order has been transited to currentHub and waiting for receiver OR waiting for return
    //If status == "RETURNED" => Order has been returned to sender
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
@path GET /api/hub/receive/all/:warehouse_id
Quản lý truy cập vào hub của mình
=> Tìm hàng tới từ warehouse_id
*/
const allHubReceiveByWH_Manager = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const warehouse = await Branch.findById(req.params.branch_id);
    console.log("warehouse:", warehouse);
    const orders = await allHubReceive_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from warehouse, send to receiver
@access supervisor
@path GET /api/hub/receive/all/:hub_id
*/
const allHubReceive_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findById(req.params.hub_id);
    const orders = await allHubReceive_Function(req, res, currentHub, null);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from warehouse, send to receiver
@access supervisor
@path GET /api/hub/receive/all/:hub_id/:warehouse_id
*/
const allHubReceivByWH_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findById(req.params.hub_id);
    const warehouse = await Branch.findById(req.params.warehouse_id);
    const orders = await allHubReceive_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})


/*
@desc All orders are received from sender, send to warehouse.
*/
async function allHubSend_Function(req, res, currentHub, warehouse) {
    const statusArray = ["PRE_TRANSIT", "TRANSIT", "DELIVERED", "PRE_RETURN", "RETURNED", "FAILRE"];
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
@path GET /api/hub/send/all/:branch_id
*/
const allHubSendByWH_Manager = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const warehouse = await Branch.findById(req.params.branch_id)
    const orders = await allHubSend_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from sender, send to warehouse.
@access supervisor
@path GET /api/hub/send/all/:hub_id
*/
const allHubSend_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findById(req.params.hub_id)
    const orders = await allHubSend_Function(req, res, currentHub, null);
    res.status(200).json({ orders, count: orders.length });
})
/*
@desc All orders are received from sender, send to  warehouse in request.
@access supervisor
@path GET /api/hub/send/all/:hub_id/:warehouse_id
*/
const allHubSendByWH_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findById(req.params.hub_id)
    const warehouse = await Branch.findById(req.params.warehouse_id)
    const orders = await allHubSend_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})


/*
@desc All orders are received from warehouse, send to receiver
*/
async function availableHubReceive_Function(req, res, currentHub, warehouse) {
    //If status == "TRANSIT" => Order has been transited to currentHub and waiting for receiver OR waiting for return
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
@path GET /api/hub/receive/available/:branch_id
*/
const availableHubReceiveByWH_Manager = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const warehouse = await Branch.findById(req.params.branch_id);
    const orders = await availableHubReceive_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from warehouse, send to receiver
@access supervisor
@path GET /api/hub/receive/available/:hub_id
*/
const availableHubReceive_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findById(req.params.hub_id)
    const orders = await availableHubReceive_Function(req, res, currentHub, null);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from warehouse, send to receiver
@access supervisor
@path GET /api/hub/receive/available/:hub_id/:warehouse_id
*/
const availableHubReceivByWH_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findById(req.params.hub_id)
    const warehouse = await Branch.findById(req.params.warehouse_id);
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
@path GET /api/hub/send/available/:branch_id
*/
const availableHubSendByWH_Manager = asyncHandler(async (req, res) => {
    const currentHub = await getCurrentBranch(req, res);
    const warehouse = await Branch.findById(req.params.branch_id)
    const orders = await availableHubSend_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})

/*
@desc All orders are received from sender, send to warehouse.
@access supervisor
@path GET /api/hub/send/available/:hub_id
*/
const availableHubSend_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findById(req.params.hub_id);
    const orders = await availableHubSend_Function(req, res, currentHub, null);
    res.status(200).json({ orders, count: orders.length });
})
/*
@desc All orders are received from sender, send to  warehouse in request.
@access supervisor
@path GET /api/hub/send/available/:hub_id/:warehouse_id
*/
const availableHubSendByWH_Supervisor = asyncHandler(async (req, res) => {
    const currentHub = await Branch.findById(req.params.hub_id);
    const warehouse = await Branch.findById(req.params.warehouse_id)
    const orders = await availableHubSend_Function(req, res, currentHub, warehouse);
    res.status(200).json({ orders, count: orders.length });
})

module.exports = {
    allHubReceive_Manager, allHubReceive_Supervisor, allHubSend_Manager, allHubSend_Supervisor,
    allHubReceiveByWH_Manager, allHubReceivByWH_Supervisor, allHubSendByWH_Manager, allHubSendByWH_Supervisor,
    availableHubReceive_Manager, availableHubReceive_Supervisor, availableHubSend_Manager, availableHubSend_Supervisor,
    availableHubReceiveByWH_Manager, availableHubReceivByWH_Supervisor, availableHubSendByWH_Manager, availableHubSendByWH_Supervisor
}

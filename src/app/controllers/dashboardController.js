// /*TODO:  lấy doanh thu tháng hiện tại,
// tổng số order tháng hiện tại,
// số đơn hàng chưa xử lý tháng hiện tại,
// tỷ lệ đơn hàng giao thành công,
// hoàn trả gì gì đó để nhét vô pie
// => Truy vấn theo branch chứ hong chia ra hub với warehouse (hoặc chia ra nhma hạn chế thui)
// */


// /*
// @desc Functions for hub management.
// Includes: Thống kê tất cả mặt hàng (bao gồm đã và đang có tại branch):
// 2 loại hàng:
// - Hàng đang có mặt tại hub (Orders are available at hub)
// - Hàng đã hoặc đang có mặt tại hub (All orders)

// Hàng nhận được từ nơi khác tới:
// - Nhận được từ warehouse, gửi tới receiver
// (Lúc đầu có Hàng được hoàn trả về currentHub,
// tuy nhiên sau khi viết hàm Xác nhận hoàn trả hàng trong orderController thì 0 cần nữa)

// Hàng gửi tới nơi khác:
// - Nhận được từ sender, gửi tới warehouse
// (Lúc đầu có Hàng được hoàn trả đi nhưng lý do tương tự như trên)

// => Tìm kiếm theo tên warehouse, theo ngày, tháng, năm
// => Chia hubManager, supervisor
// */

// const asyncHandler = require('express-async-handler');
// const Order = require("../models/orderModel");
// const Branch = require("../models/branchModel");
// const Customer = require("../models/customerModel");
// const Process = require("../models/processesModel");

// const { getCurrentBranch } = require("../middleware/branch");
// const { findProcessByLastEvent } = require('../utils/orderFunctions')

// /*
// @desc Orders are received from warehouse, send to receiver
// */

// async function receiveFunction(req, res, currentBranch, warehouse, statusArray) {
//     const start = req.body.start;
//     const end = req.body.end;
//     if (!start || !end) return "Fill start and end";
//     const event = {
//         branch_id: currentBranch, //Order has arrived at currentBranch
//         status: { $in: statusArray } //At least 1 element of arr `status` in `statusArray`
//     }
//     const processes = await findProcessByLastEvent(event);
//     const receivers = "";
//     if (currentBranch.higherBranchName === "company") {
//         const lowerBranch = Branch.find({ name: { $in: currentBranch.lowerBranchName } });
//         receivers = await Customer.find({ branch_id: { $in: lowerBranch } }).sort('createdAt');
//     } else {
//         receivers = await Customer.find({ branch_id: currentBranch }).sort('createdAt');
//     }
//     if (warehouse == null) { //Orders from all warehouses
//         const orders = await Order.find({
//             createdAt: { $gt: new Date(start), $lt: new Date(end) },
//             processes_id: processes,
//             receiver_id: receivers
//         })
//         if (!orders) {
//             res.status(404);
//             throw new Error("orders not found");
//         }
//         return orders;
//     } else { //Orders from a warehouse in request
//         const fromHub = await Branch.find({ higherBranch_id: warehouse }).sort('createdAt');
//         const senders = await Customer.find({ branch_id: fromHub }).sort('createdAt');
//         const orders = await Order.find({
//             createdAt: { $gt: new Date(start), $lt: new Date(end) },
//             processes_id: processes,
//             receiver_id: receivers,
//             sender_id: senders
//         })
//         if (!orders) {
//             res.status(404);
//             throw new Error("orders not found");
//         }
//         return orders;
//     }
// }

// /*-------------------------------------------------------ALL ORDERS-------------------------------------------------------*/
// /*
// @desc All orders are received from warehouse, send to receiver
// */
// async function allReceive_Function(req, res, currentHub, warehouse) {
//     //If status == "DELIVERED" => Order sent to receiver successfully
//     //If status == "TRANSIT" => Order has been transited to currentHub and waiting for receiver OR waiting for return
//     //If status == "RETURNED" => Order has been returned to sender
//     const statusArray = ["DELIVERED", "TRANSIT", "RETURNED"]
//     const orders = await hubReceive_Function(req, res, currentHub, warehouse, statusArray);
//     return orders;
// }
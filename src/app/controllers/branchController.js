const asyncHandler = require("express-async-handler");
const staff = require("../models/staffModel");
const branch = require("../models/branchModel");
const Order = require("../models/orderModel");
const Fee = require("../models/feeModel");
const Process = require('../models/processesModel');
const Customer = require("../models/customerModel");
const { getCurrentBranch } = require("../middleware/branch");
const { getOrders } = require("../utils/orderFunctions");


require("dotenv").config();

async function createBranch(req, res, name, higherBranchName, lowerBranchName) {
    if (!name) {
        res.status(400);
        throw new Error(`Error creating branch`);
    }
    if (await branch.findOne({ name: name })) {
        res.status(400);
        throw new Error(name + " is already exists");
    }
    const postalCode = Math.round(Math.random() * (99999 - 10000) + 10000);
    const higherBranch_id = await branch.findOne({ name: higherBranchName });
    if (!higherBranch_id) {
        console.log("Couldn't find higher branch");
        return null;
    }
    const newBranch = await branch.create({
        name: name,
        higherBranch_id: higherBranch_id,
        higherBranchName: higherBranchName,
        lowerBranchName: lowerBranchName,
        postal_code: postalCode,
    });
    return newBranch;
}

const createHub = asyncHandler(async (req, res) => {
    const hub = await createBranch(req, res, req.body.name, req.body.higherBranchName, null);

    if (hub) {
        const updateWH = await branch.findByIdAndUpdate(
            hub.higherBranch_id,
            { $push: { lowerBranchName: hub.name } },
            { new: true });
        res.status(200).json({ hub, updateWH });
    }
    else {
        res.status(400);
        throw new Error(`Invalid`);
    }
});

const createWarehouse = asyncHandler(async (req, res) => {
    const lowerBranch = await branch.find({ higherBranchName: req.body.name });
    var lowerBranchName = [];
    for (i in lowerBranch) {
        lowerBranchName.push(lowerBranch[i].name);
    }
    const warehouse = await createBranch(
        req,
        res,
        req.body.name,
        "company",
        lowerBranchName
    );
    if (warehouse)
        res.status(200).json({ _id: warehouse.id, name: warehouse.name });
    else {
        res.status(400);
        throw new Error(`Invalid`);
    }
});

/*
@desc get all warehouse
@access supervisor
@path GET /api/workplace/all/warehouse
*/
const getAllWarehouse = asyncHandler(async (req, res) => {
    const allWarehouse = await branch.find({ higherBranch_id: "6554dd73872582fea16dd837" });
    if (!allWarehouse) {
        res.status(404).json("Dont have any warehouse");
    }
    res.status(200).json({ allWarehouse });
})

const getAllWarehouseName = asyncHandler(async (req, res) => {
    const allWarehouse = await branch.find({ higherBranch_id: "6554dd73872582fea16dd837" });
    if (!allWarehouse) {
        res.status(404).json("Dont have any warehouse");
    }
    var warehouseName = [];
    for (i in allWarehouse) {
        warehouseName.push(allWarehouse[i].name);
    }
    res.status(200).json({ warehouseName });
});

/*
@desc get all warehouse
@access supervisor
@path GET /api/workplace/all/hub
*/

const getAllHub = asyncHandler(async (req, res) => {
    const allWarehouse = await branch.find({ higherBranch_id: "6554dd73872582fea16dd837" });
    if (!allWarehouse) {
        console.log("Dont have any warehouse");
    }
    const hub = await branch.find({ higherBranch_id: allWarehouse });
    if (!hub) {
        console.log("Dont have any hub");
    }
    res.status(200).json({ hub });
});

const getBranchNameById = asyncHandler(async (req, res) => {
    const currentBranch = await branch.findById(req.params.branchId);
    if (!currentBranch) {
        res.status(404).json("Branch not found");
    }
    res.status(200).json(currentBranch.name);

})

/*
@desc List orders preparing to arrive at the branch.
*/
const receiveConfirmList = asyncHandler(async (req, res) => {
    const currentBranch = await getCurrentBranch(req, res);
    const currentHigherBranch = currentBranch.higherBranch_id;
    var processes;
    if (currentHigherBranch.toString() === "6554dd73872582fea16dd837") { //Warehouse => Order from lower hub or other warehouse
        const allWarehouse = await branch.find({ higherBranch_id: "6554dd73872582fea16dd837" });
        const allHubName = currentBranch.lowerBranchName;
        const allHub = await branch.find({ 'name': allHubName })
        const allComingBranch = allWarehouse.concat(allHub);
        processes = await Process.find({
            events: {
                $elemMatch: {
                    'branch_id': { $in: allComingBranch },
                    'status': "DELIVERING"
                }
            }
        });
        filteredStatusProcess = processes.filter(item => item.events[item.events.length - 1].status === "DELIVERING");
        var filteredHubProcess = [];
        var filteredWHProcess = [];
        for (i in filteredStatusProcess) {
            for (j in allHub) {
                if (filteredStatusProcess[i].events[filteredStatusProcess[i].events.length - 1].branch_id.toString() === allHub[j]._id.toString()) {
                    filteredHubProcess.push((filteredStatusProcess[i]));
                }
            }
            for (j in allWarehouse) {
                if (filteredStatusProcess[i].events[filteredStatusProcess[i].events.length - 1].branch_id.toString() === allWarehouse[j]._id.toString()) {
                    filteredWHProcess.push((filteredStatusProcess[i]));
                }
            }
        }
        const ordersFromHub = await Order.find({
            processes_id: { $in: filteredHubProcess }
        }).sort('createdAt');
        const receivers = await Customer.find({
            'branch_id': { $in: allHub }
        })
        const ordersFromWH = await Order.find({
            processes_id: { $in: filteredWHProcess },
            receiver_id: receivers
        }).sort('createdAt');
        const resultHub = await getOrders(ordersFromHub)
        const resultWH = await getOrders(ordersFromWH)
        const result = resultHub.concat(resultWH);
        res.status(200).json({ result, count: result.length });
    } else { //Hub => Orders from higher warehouse
        processes = await Process.find({
            events: {
                $elemMatch: {
                    'branch_id': { $in: currentHigherBranch },
                    'status': "DELIVERING"
                }
            }
        });
        filteredStatusProcess = processes.filter(item => item.events[item.events.length - 1].status === "DELIVERING");
        const filteredProcess = filteredStatusProcess.filter(item => item.events[item.events.length - 1].branch_id.toString() === currentHigherBranch._id.toString());
        console.log("filteredProcess", filteredProcess);
        const orders = await Order.find({
            processes_id: { $in: filteredProcess }
        }).sort('createdAt');
        console.log("orders", orders);
        const result = await getOrders(orders)
        res.status(200).json({ result, count: result.length });
    }
});

/*
@desc List orders preparing to leave branch
a.k.a the last event is in current branch and status = TRANSIT
*/
const sendConfirmList = asyncHandler(async (req, res) => {
    const currentBranch = await getCurrentBranch(req, res);
    const processes = await Process.find({
        events: {
            $elemMatch: {
                'branch_id': currentBranch,
                'status': { $nin: ['DELIVERED', 'RETURNED', 'DELIVERING'] }
            }
        }
    });
    const filteredProcess = processes.filter(item => item.events[item.events.length - 1].status !== "DELIVERING"
        && item.events[item.events.length - 1].status !== "RETURNED"
        && item.events[item.events.length - 1].status !== "DELIVERED"
        && item.events[item.events.length - 1].branch_id.toString() === currentBranch._id.toString());
    const orders = await Order.find({
        processes_id: filteredProcess
    }).sort('createdAt');
    const result = await getOrders(orders)
    res.status(200).json({ result, count: result.length });
});

// const sendConfirm = asyncHandler(async (req, res) => {
//     const order = await Order.findOne({
//         order_code: req.params.order_code
//     })
//     if (!order) {
//         res.status(404);
//         throw new Error("Order not found")
//     }
//     updateStatus = null;
//     const currentBranch = await getCurrentBranch(req, res);
//     const receiver = await Customer.findById(order.receiver_id);
//     if (currentBranch.toString() === receiver.branch_id.toString()) {
//         if (order.is_returned) {
//             updateStatus = "RETURNED";
//         } else {
//             updateStatus = "DELIVERED";
//         }
//     } else {
//         updateStatus = "DELIVERING";
//     }

//     const processes = await Process.findByIdAndUpdate(
//         order.processes_id._id,
//         {
//             $push: {
//                 'events': {
//                     'branch_id': req.currentAccount.branch_id,
//                     'status': updateStatus
//                 }
//             }
//         },
//         { new: true }
//     )

//     var updatedOrder = await Order.findByIdAndUpdate(
//         order._id,
//         {
//             ...req.body
//         },
//         { new: true }
//     )
//     res.status(200).json(updatedOrder)
// })

async function confirmFunction(req, res, order, updateStatus) {
    const processes = await Process.findByIdAndUpdate(
        order.processes_id._id,
        {
            $push: {
                'events': {
                    'branch_id': req.currentAccount.branch_id,
                    'status': updateStatus
                }
            }
        },
        { new: true }
    )

    var updatedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
            ...req.body
        },
        { new: true }
    )
    res.status(200).json(updatedOrder)
}

const sendConfirm = asyncHandler(async (req, res) => {
    const order = await Order.findOne({
        order_code: req.params.order_code
    })
    if (!order) {
        res.status(404);
        throw new Error("Order not found")
    }
    updateStatus = null;
    const currentBranch = await getCurrentBranch(req, res);
    const receiver = await Customer.findById(order.receiver_id);
    if (currentBranch.toString() === receiver.branch_id.toString()) {
        if (order.is_returned) {
            updateStatus = "RETURNED";
        } else {
            updateStatus = "DELIVERED";
        }
    } else {
        updateStatus = "DELIVERING";
    }
    confirmFunction(req, res, order, updateStatus);
})

const receiveConfirm = asyncHandler(async (req, res) => {
    const order = await Order.findOne({
        order_code: req.params.order_code
    })
    if (!order) {
        res.status(404);
        throw new Error("Order not found")
    }
    const updateStatus = "TRANSIT";
    confirmFunction(req, res, order, updateStatus);
})

module.exports = { createBranch, getAllWarehouse, getAllHub, createHub, createWarehouse, getAllWarehouseName, getBranchNameById, receiveConfirmList, sendConfirmList, sendConfirm, receiveConfirm }
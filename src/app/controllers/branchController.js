const asyncHandler = require("express-async-handler");
const staff = require("../models/staffModel");
const branch = require("../models/branchModel");
const Order = require("../models/orderModel");
const Fee = require("../models/feeModel");
const Process = require('../models/processesModel');
const Customer = require("../models/customerModel");
const { getCurrentBranch } = require("../middleware/branch");
// const { getOrders } = require("../utils/orderFunctions");


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
    const postalCode = Math.random() * (99999 - 10000) + 10000;
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
    processes = null;
    if (currentHigherBranch === "6554dd73872582fea16dd837") { //Warehouse => Order from lower hub or other warehouse
        const allWarehouse = await getAllWarehouse(req, res);
        const allHubName = currentBranch.lowerBranchName;
        const allHub = await branch.find({ 'name': allHubName })
        const allComingBranch = allWarehouse + allHub;
        processes = await Process.find({
            events: {
                $elemMatch: {
                    'branch_id': { $in: allComingBranch },
                    'status': "TRANSIT"
                }
            }
        }).sort('createdAt');
        for (i in processes) {
            const length = processes[i].events.length;
            console.log(length);
            for (j in allComingBranch) {
                if (processes[i].events[length - 1].branch_id.toString() !== allComingBranch[j].branch_id.toString()) {
                    processes.splice(i, 1);
                }
            }
        }
    } else { //Hub => Orders from higher warehouse
        // console.log("currentHigherBranch", currentHigherBranch);
        processes = await Process.find({
            events: {
                $elemMatch: {
                    'branch_id': currentHigherBranch,
                    'status': "TRANSIT"
                }
            }
        }).sort('createdAt');
        for (i in processes) {
            const length = processes[i].events.length;
            console.log(length);
            if (processes[i].events[length - 1].branch_id.toString() !== currentHigherBranch.toString()) {
                processes.splice(i, 1);
            }
        }
    }
    const orders = await Order.find({
        processes_id: processes
    }).sort('createdAt');
    const result = await getOrders(orders)
    res.status(200).json({ result, count: result.length });
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
                'status': "TRANSIT"
            }
        }
    }).sort('createdAt');
    for (i in processes) {
        const length = processes[i].events.length;
        console.log(length);
        if (processes[i].events[length - 1].branch_id.toString() !== currentBranch.toString()) {
            processes.splice(i, 1);
        }
    }
    const orders = await Order.find({
        processes_id: processes
    }).sort('createdAt');
    const result = await getOrders(orders)
    res.status(200).json({ result, count: result.length });
});

module.exports = { createBranch, getAllWarehouse, getAllHub, createHub, createWarehouse, getAllWarehouseName, getBranchNameById, receiveConfirmList, sendConfirmList }
const asyncHandler = require('express-async-handler');
const staff = require("../models/staffModel");
const branch = require("../models/branchModel");

require('dotenv').config();

async function createBranch(req, res, name, higherBranchName) {
    if (!name) {
        res.status(400);
        throw new Error(`Error creating branch`);
    }
    if (await branch.findOne({ name: name })) {
        res.status(400);
        throw new Error(name + ' is already exists');
    }
    const postalCode = Math.random() * (99999 - 10000) + 10000;
    const higherBranch_id = await branch.findOne({ name: higherBranchName })
    if (!higherBranch_id) {
        console.log("Couldn't find higher branch");
        return null;
    }
    const newBranch = await branch.create({
        name: name,
        higherBranch_id: higherBranch_id,
        postal_code: postalCode
    });
    return newBranch;
}

const createHub = asyncHandler(async (req, res) => {
    const hub = await createBranch(req, res, req.body.name, req.body.higherBranchName);
    if (hub) res.status(200).json({ _id: hub.id, name: hub.name });
    else {
        res.status(400);
        throw new Error(`Invalid`);
    }
});

const createWarehouse = asyncHandler(async (req, res) => {
    const warehouse = await createBranch(req, res, req.body.name, "company");
    if (warehouse) res.status(200).json({ _id: warehouse.id, name: warehouse.name });
    else {
        res.status(400);
        throw new Error(`Invalid`);
    }
});

async function allWarehouse(req, res) {
    const allWarehouse = await branch.find({ higherBranch_id: "6554dd73872582fea16dd837" });
    return allWarehouse;
}

/*
@desc get all warehouse
@access supervisor
@path GET /api/workplace/all/warehouse
*/
const getAllWarehouse = asyncHandler(async (req, res) => {
    const warehouse = await allWarehouse(req, res);
    if (!warehouse) {
        console.log("Dont have any warehouse");
    }
    res.status(200).json({ warehouse });
})

/*
@desc get all warehouse
@access supervisor
@path GET /api/workplace/all/hub
*/

const getAllHub = asyncHandler(async (req, res) => {
    const warehouse = await allWarehouse(req, res);
    if (!warehouse) {
        console.log("Dont have any warehouse");
    }
    const hub = await branch.find({ higherBranch_id: warehouse });
    if (!hub) {
        console.log("Dont have any hub");
    }
    res.status(200).json({ hub });
});


module.exports = { createBranch, getAllWarehouse, getAllHub, createHub, createWarehouse }
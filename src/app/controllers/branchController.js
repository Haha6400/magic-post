const asyncHandler = require('express-async-handler');
const staff = require("../models/staffModel");
const branch = require("../models/branchModel");

require('dotenv').config();

const createBranch = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, higherBranchName} = req.body;
    if(!name) {
        res.status(400);
        throw new Error(`Error creating branch`);
    }
    if(await branch.findOne({name: name})){
        res.status(400);
        throw new Error(name + ' is already exists');
    }
    // const postalCode = (Math.random() + 1).toString(36).substring(7).toUpperCase();
    const postalCode = Math.random() * (99999 - 10000) + 10000;
    const higherBranch_id = await branch.findOne({name: higherBranchName})
    const newBranch = await branch.create({
        // manager_id: await staff.findById(managerId),
        name: name,
        // higherBranch_id: await staff.findById(managerId).branch_id,
        higherBranch_id: higherBranch_id,
        postal_code: postalCode
    });
    if(newBranch) res.status(200).json({_id: newBranch.id, name: newBranch.name});
    else {
        res.status(400);
        throw new Error(`Invalid`);
    }
});


module.exports = {createBranch}
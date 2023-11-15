const jwt = require('jsonwebtoken');
const staff = require("../models/staffModel")
const Branch = require('../models/branchModel')

async function getCurrentBranch(req, res){
    const hubManager = req.currentAccount;
    const hub = await Branch.findById(hubManager.branch_id);
    return hub;
}

module.exports = {getCurrentBranch}
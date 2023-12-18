const jwt = require('jsonwebtoken');
const staff = require("../models/staffModel")
const Branch = require('../models/branchModel')

async function getCurrentBranch(req, res) {
    const currentAccount = req.currentAccount;
    const currentBranch = await Branch.findById(currentAccount.branch_id);
    return currentBranch;
}

module.exports = { getCurrentBranch }
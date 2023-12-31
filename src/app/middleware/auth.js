const jwt = require('jsonwebtoken');
const staff = require("../models/staffModel")
const branch = require('../models/branchModel')
const access_token = require('../models/tokenModel')

/*
@desc Verify JWT from authorization header Middleware
*/
const staffAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log(process.env.ACCESS_TOKEN_SECRET);
    if (!authHeader) {
        console.log(authHeader); //Bearer token
        return res.sendStatus(403);
    }
    const token = authHeader.split(' ')[0];
    console.log("token", token)
    const checkToken = await access_token.findOne({
        'token': token
    })
    console.log("checkToken", checkToken)
    if (checkToken === null) {
        res.status(200).json("Please log in again")
    }
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            console.log("verifying");
            if (err) {
                res.status(403).json(`invalid token`);
            } else {
                console.log("decoded", decoded); //for correct token
                req.currentAccount = decoded.accountInfo;
                req.tokeExp = decoded.exp;
                req.token = token;
                next();
            }
        });
    }
};

/*
@desc check role Middleware but dont using id
*/
const roleCheck = (roles) => async (req, res, next) => {
    console.log("roleCheck");
    const currentAccount = req.currentAccount;
    console.log(currentAccount);
    console.log(currentAccount.role);
    console.log(roles);
    if (!roles.includes(currentAccount.role)) {
        console.log("Role does not exist")
        res.status(401).json("SOrry u dont not have access");
    }
    next();
}

/*
@desc check accessCheck Middleware
- currentAccount access their own account
- If currentAccount is supervisor: access manager account
- If currentAccount is manager: access same branch staff account
*/
const accessAccountCheck = async (req, res, next) => {
    const currentAccount = req.currentAccount;
    const staffAccount = await staff.findById(req.params.id);
    if (!staffAccount) {
        res.status(404);
        throw new Error("Account not found");
    }

    //Access own account
    if ((currentAccount.role == staffAccount.role) && (currentAccount.email !== staffAccount.email)) {
        res.status(401);
        throw new Error("SOrry u dont have access");
    }

    //If currentAccount is supervisor: access manager account
    if (currentAccount.role === "supervisor" &&
        (staffAccount.role === "hubStaff" || staffAccount.role === "warehouseStaff")) {
        res.status(401);
        throw new Error("SOrry u dont have access");
    }

    const currentBranch = await branch.findById(currentAccount.branch_id);
    const staffBranch = await branch.findById(staffAccount.branch_id);
    //If currentAccount is manager: access same branch accounts
    if ((currentAccount.role === "hubManager" || currentAccount.role == "warehouseManager") &&
        (currentBranch._id.toString() !== staffBranch._id.toString())) {
        res.status(401);
        throw new Error("SOrry u dont have access");
    }

    next();
}

module.exports = { staffAuth, roleCheck, accessAccountCheck }
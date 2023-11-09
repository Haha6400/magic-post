const jwt = require('jsonwebtoken');
const staff = require("../models/staffModel")

/*
@desc Verify JWT from authorization header Middleware
*/
const staffAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log(process.env.ACCESS_TOKEN_SECRET);
    if(!authHeader) return res.sendStatus(403);
    console.log(authHeader); //Bearer token
    const token = authHeader.split(' ')[0];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        console.log("verifying");
        if(err) {
            res.status(403)
            throw new Error(`invalid token`);
        }
        console.log(decoded); //for correct token
        req.currentAccount = decoded.accountInfo;
        next();
    });
};

const roleCheck = (roles) => async (req, res, next) =>{
    console.log("roleCheck");
    const currentAccount = req.currentAccount;
    console.log(currentAccount);
    console.log(currentAccount.role);
    !roles.includes(currentAccount.role) ? res.status(401).json("SOrry u dont not have access") : next();
}

const workplaceCheck = async(req, res, next) => {
    console.log("Workplace check");
    const currentAccount = req.currentAccount;
    //If currentAccount is supervisor, they can access all workplace accounts
    if(currentAccount.role === "supervisor"){
        next();
    }
    const staffAccount = await staff.findById(req.params.id);
    if(!staffAccount){
        res.status(404);
        throw new Error("Account not found");
    }
    console.log(staffAccount.workplace);
    //If currentAccount is staff, they only can access their own accounts
    if((currentAccount.role === "hubStaff" || currentAccount.role === "warehouseStaff") && staffAccount.id !== currentAccount.id){
        res.status(401);
        throw new Error("SOrry u dont have access");
    }
    //If currentAccount is manager, they can access same workplace accounts
    if(staffAccount.workplace !== currentAccount.workplace) {
        res.status(401);
        throw new Error("SOrry u dont have access");
    }
    next();
}

module.exports = {staffAuth, roleCheck, workplaceCheck}
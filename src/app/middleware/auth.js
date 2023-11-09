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

/*
@desc check role Middleware but dont using id
*/
const roleCheck = (roles) => async (req, res, next) =>{
    console.log("roleCheck");
    const currentAccount = req.currentAccount;
    console.log(currentAccount);
    console.log(currentAccount.role);
    if(!roles.includes(currentAccount.role)){
        res.status(401).json("SOrry u dont not have access");
    }
    next();
}

/*
@desc check accessCheck Middleware
- currentAccount access their own account
- If currentAccount is supervisor: access manager account
- If currentAccount is manager: access same workplace staff account
*/
const accessCheck = async (req, res, next) => {
    const currentAccount = req.currentAccount;
    const staffAccount = await staff.findById(req.params.id);
    if(!staffAccount){
        res.status(404);
        throw new Error("Account not found");
    }

    //Check if currentAccount has permission to access their own account
    if((currentAccount.id === staffAccount.id) ||
    (currentAccount.role === "supervisor" && (staffAccount.role === "hubManager" || staffAccount.role === "workerManager"))){ 
        next();
    }

    //Check if currentAccount has permission to access other user accounts
    if((currentAccount.role === "hubManager" && staffAccount.role !== "hubStaff") ||
    (currentAccount.role === "warehouseManager" && staffAccount.role !== "warehouseStaff") ||
    (currentAccount.role === "supervisor" && staffAccount.role !== "hubManager" && staffAccount.role !== "workerManager") || //supervisor only can access manager accounts or their own account
    (staffAccount.workplace !== currentAccount.workplace) //If currentAccount is manager, they can access same workplace accounts
    ){
        res.status(401);
        throw new Error("SOrry u dont have access");
    }
    next();
}

module.exports = {staffAuth, roleCheck, accessCheck}
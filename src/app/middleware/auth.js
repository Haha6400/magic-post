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
    // console.log(currentAccount.email);

    //Access own account
    if((currentAccount.role == staffAccount.role) && (currentAccount.email !== staffAccount.email)){
        res.status(401);
        throw new Error("SOrry u dont have access");
    }

    //If currentAccount is supervisor: access manager account
    if(currentAccount.role === "supervisor" && 
    (staffAccount.role === "hubStaff" && staffAccount.role !== "warehouseStaff")){
        res.status(401);
        throw new Error("SOrry u dont have access");
    }

    //If currentAccount is manager: access same workplace accounts
    if((currentAccount.role === "hubManager" || currentAccount.role == "warehouseManager") && 
    (currentAccount.workplace !== staffAccount.workplace)){
        res.status(401);
        throw new Error("SOrry u dont have access");
    }

    next();
}

module.exports = {staffAuth, roleCheck, accessCheck}
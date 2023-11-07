/*
@desc Functions for account management.
Includes: 
- Create/ delete account
- Get account by email, username, id, workplace, role.
- Get all accounts
- Login, logout
- Change password
- Update account
*/

const asyncHandler = require('express-async-handler');
const staff = require("../models/staffModel");
const bcrypt = require('bcrypt');
const saltRounds = 10

/*
@des Create a new account
@route POST /api/accounts
@access hubManager, warehouseManager
*/
//TODO: Thêm access role
const createAccount = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {userName, email, phoneNumber, password, workplace, role} = req.body;
    if(!userName || !email || !phoneNumber || !password || !workplace || !role) {
        res.status(400);
        throw new Error(`Error creating account`);
    }
    
    //Check if the staff account already exists
    if (await staff.findOne({email})){
        res.status(400);
        throw new Error(`This staff's account already existed!`);
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const staffAccount = await staff.create({
        userName, 
        email, 
        phoneNumber, 
        password: hashedPassword, 
        workplace, 
        role
    });

    if(staffAccount) res.status(200).json({_id: staffAccount.id, email: staffAccount.email});
    else {
        res.status(400);
        throw new Error(`Invalid`);
    }
    res.status(200).json({message: "Create an account"})
});

/*
@des Get all accounts
@route GET /api/accounts
@access supervisor
*/
// TODO: Thêm access role
const getAllAccounts = asyncHandler(async (req, res) => {
    staff.find({}).then(function (staffAccounts){
        res.send(staffAccounts);
    })
});




module.exports = {getAllAccounts, createAccount};
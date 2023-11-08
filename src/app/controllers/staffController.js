/*
@desc Functions for account management.
Includes: 
- Create/ delete account
- CRUD account
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
const jwt = require('jsonwebtoken');
require('dotenv').config();

/*
@des Create a new account
@route POST /api/accounts
@access hubManager, warehouseManager, supervisor
*/
const createAccount = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {userName, email, phoneNumber, password, workplace, role} = req.body;
    if(!userName || !email || !phoneNumber || !password || !workplace || !role) {
        res.status(400);
        throw new Error(`Error creating account`);
    }

    /*Check the current user's access rights:
    - If the user is supervisor, they can only create accounts for hubManager and warehouseManager.
    - If the user is hubManager, they can only create accounts for hubStaff.
    - If the user is warehouseManager, they can only create accounts for warehouseStaff.
    */
    const currentAccount = req.currentAccount;
    if((currentAccount.role === "supervisor" && (role !== "hubManager" && role !== "warehouseManager")) ||
        (currentAccount.role === "hubManager" && (role !== "hubStaff")) ||
        (currentAccount.role === "warehouseManager" && (role !== "warehouseStaff"))) 
    {
        res.status(400);
        throw new Error(`Select correct staff's role that you want to create account for`);
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
@des Delete an account
@route DELETE /api/accounts/:id
@access hubManager, warehouseManager, supervisor
*/
const deleteAccount = asyncHandler(async (req, res) => {
    const staffAccount = await staff.findById(req.params.id);
    console.log("staffAccount ID: ", staffAccount.id);
    if(!staffAccount){
        res.status(404);
        throw new Error("Staff account not found");
    }
    await staff.deleteOne({_id: req.params.id});
    res.status(200).json(staffAccount);
});

/*
@des Update an account
@route PUT /api/accounts/:id
@access personal
*/
//TODO: Lười vải nhớ viết hàm Update



/*
@des Login user
@route POST /api/accounts/login
@access public
*/
const loginStaff = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error(`All fileds are mandatory`);
    }
    const account = await staff.findOne({email});
    if(!account){
        return res.json({message: 'Wrong credentials'})
    }

    //compare password with hashed password
    const match = await bcrypt.compare(password, account.password);
    if(match){
        //create JWTs
        const accessToken = jwt.sign({
            "accountInfo":{
                "userName": account.userName,
                "email": account.email,
                "role": account.role,
                "workplace": account.workplace
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "30m"}
        );
        res. status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error(`Email or password mismatch`);
    }
});


/*
@des Get all accounts
@route GET /api/accounts
@access supervisor
*/
const getAllAccounts = asyncHandler(async (req, res) => {
    console.log("OK");
    const staffAccounts = await staff.find().sort('createdAt');
    res.status(200).json({staffAccounts, count: staffAccounts.length});
});

/*
@des Get accounts by workplace
@route GET /api/accounts/:workplace
@access hubManager, warehouseManager, supervisor
*/
//TODO:

/*
@des Get accounts by userName
@route GET /api/accounts/:userName
@access hubManager, warehouseManager, supervisor
*/
//TODO:

/*
@des Get account by id
@route GET /api/accounts/:id
@access hubManager, warehouseManager, supervisor
*/
const getAccountById = asyncHandler(async (req, res) => {
    const staffAccount = await staff.findById(req.params.id);s
    res.status(200).json(staffAccount);
});


//@desc Current user info
//@route POST /api/accounts/current
//@access personal
const currentAccount = asyncHandler(async (req, res) => {
    res.status(200).json(req.currentAccount);
  });


module.exports = {getAllAccounts, createAccount, loginStaff, currentAccount, deleteAccount, 
                getAccountById};
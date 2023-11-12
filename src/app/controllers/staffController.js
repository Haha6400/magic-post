/*
@desc Functions for account management.
Includes: 
- Create/ delete account
- CRUD account
- Get account by email, username, id, branch, role.
- Get all accounts
- Login, logout
- Reset password
- Update account
*/

const asyncHandler = require('express-async-handler');
const staff = require("../models/staffModel");
const branch = require("../models/branchModel");
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');
const sendEmail = require ("../utils/sendEmail");
const mjml2html = require('mjml');
const crypto = require('crypto-js');
require('dotenv').config();

/*
@des Create a new account
@route POST /api/accounts
@access hubManager, warehouseManager, supervisor
*/
const createAccount = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {userName, email, phoneNumber, password, branchName, role} = req.body;
    if(!userName || !email || !phoneNumber || !password || !branchName|| !role) {
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
        branch_id: await branch.findOne({name: branchName}), 
        role
    });

    if(staffAccount) res.status(200).json({_id: staffAccount.id, email: staffAccount.email});
    else {
        res.status(400);
        throw new Error(`Invalid`);
    }
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
const updateAccount = asyncHandler(async(req, res) => {
    console.log("updateAccount check");
    const staffAccount = await staff.findById(req.params.id);
    // console.log(staffAccount.email);
    if(!staffAccount){
        res.status(404);
        throw new Error("Account not found");
    }
    const {email, phoneNumber} = req.body;
    console.log("email new: ", email, "phone number: ", phoneNumber);
    if(!email || !phoneNumber) {
        throw new Error("Please provide all values");
    }
    const updatedAccount = await staff.findByIdAndUpdate(staffAccount.id, req.body, {new: true});
    // res.status(200).json({updatedAccount});


    //create JWTs
    const accessToken = jwt.sign({
        "accountInfo":{
            "userName": updatedAccount.userName,
            "email": updatedAccount.email,
            "role": updatedAccount.role,
            "branch_id": await branch.findById(updatedAccount.branch_id)
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: "30m"}
    );
    res.status(200).json({accessToken});
});



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
                "_id": account.id,
                "userName": account.userName,
                "email": account.email,
                "role": account.role,
                "branch_id": await branch.findById(account.branch_id),
                "password": account.password
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
@des Get accounts by branch
@route GET /api/accounts/wp
@access hubManager, warehouseManager
*/
const getAccountsByBranch = asyncHandler(async (req, res) =>{
    const currentAccount = req.currentAccount;
    const staffBranch = await branch.findById(currentAccount.branch_id).sort('createdAt');
    console.log("staffBranch:", staffBranch);
    const staffAccounts = await staff.find({branch_id: staffBranch}).sort('createdAt');
    if(!staffAccounts){
        res.status(404);
        throw new Error("Account not found");
    }
    res.status(200).json({staffAccounts, count: staffAccounts.length});
});

/*
@des Get accounts by each branch
@route GET /api/accounts/wp/:branchName
@access supervisor
*/
const getAccountsByEachBranch = asyncHandler(async (req, res) =>{
    const staffBranch = await branch.findOne({name: req.params.branchName}).sort('createdAt');
    const staffAccounts = await staff.find({branch_id: staffBranch}).sort('createdAt');
    if(!staffAccounts){
        res.status(404);
        throw new Error("Account not found");
    }
    res.status(200).json({staffAccounts, count: staffAccounts.length});
});

/*
@des Get accounts by email
@route GET /api/accounts/e/:email
@access hubManager, warehouseManager, supervisor
*/
const getAccountByEmail = asyncHandler(async (req, res) => {
    // console.log("Get by email check");
    const staffAccount = await staff.findOne({email: req.params.email});
    // console.log("HERE");
    if(!staffAccount){
        res.status(404);
        throw new Error("Account not found");
    }
    // console.log("staffAccount: ", staffAccount);
    res.status(200).json(staffAccount);
});

/*
@des Get account by id
@route GET /api/accounts/i/:id
@access hubManager, warehouseManager, supervisor
*/
const getAccountById = asyncHandler(async (req, res) => {
    const staffAccount = await staff.findById(req.params.id);
    if(!staffAccounts){
        res.status(404);
        throw new Error("Account not found");
    }
    res.status(200).json(staffAccount);
});


//@desc Current user info
//@route POST /api/accounts/current
//@access personal
const currentAccount = asyncHandler(async (req, res) => {
    res.status(200).json(req.currentAccount);
  });

//@desc Send email inclues link to reset password
//@route POST /api/accounts/reset-password
//@access personal
const resetPasswordEmail = asyncHandler(async (req, res) => {
    try{
        const currentAccount = req.currentAccount;
        const accessToken = jwt.sign({
            "accountInfo":{
                "_id": currentAccount.id,
                "userName": currentAccount.userName,
                "email": currentAccount.email,
                "role": currentAccount.role,
                "branch_id": await branch.findById(currentAccount.branch_id),
                "password": currentAccount.password
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "30m"}
        );
        const link = `http://localhost:3000/api/accounts/reset-password/${currentAccount._id}/${accessToken}`;

        await sendEmail(currentAccount.email, "Magic Post Password Reset", link);
        // await sendEmail(currentAccount.email, "Magic Post Password Reset", text);
        res.send("password reset link sent to your email account");
    } catch (error) {
        res.send("error reset password");
        console.log("here" , error);
    }
});

//@desc Reset password
//@route POST /api/accounts/reset-password/:id/:token
//@access personal
const passwordReset = asyncHandler(async (req, res) => {
    const currentAccount = req.currentAccount;
    console.log("currentAccount._id:", currentAccount._id);
    console.log("req.params.id:", req.params.id);
    if(currentAccount._id != req.params.id){
        res.status(400);
        res.json("Invalid id");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const updateAccount = await staff.findByIdAndUpdate(req.params.id, {password: hashedPassword}, {new: true});
    // await currentAccount.accessToken.delete();
    res.status(200).json("password reset sucessfully.");

});

//@desc Send email inclues link to reset password
//@route POST /api/accounts/forgot-password
//@access personal
const forgotPasswordEmail = asyncHandler(async(req, res) => {
    try{
        const email = req.body.email;
        var message = crypto.AES.encrypt(email, 'DinhMaiGetSai').toString();
        const link = `http://localhost:3000/api/accounts/forgot-password/${message}`
        await sendEmail(email, "Magic Post Password Reset", link);
        // await sendEmail(currentAccount.email, "Magic Post Password Reset", text);
        res.send("password reset link sent to your email account");
    } catch{
        res.send("error forgot password");
        console.log("here" , error);
    }
})

//@desc Send email inclues link to reset password
//@route POST /api/accounts/forgot-password/:message
//@access personal
const passwordForgot = asyncHandler(async (req, res) => {
    const message = req.params.message;
    var bytes = crypto.AES.decrypt(message, 'DinhMaiGetSai');
    var emailStaff = bytes.toString(crypto.enc.Utf8);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const updateAccount = await staff.findOneAndUpdate({email: emailStaff}, {password: hashedPassword}, {new: true});
    // await currentAccount.accessToken.delete();
    res.status(200).json("password reset sucessfully.");

});
module.exports = {getAllAccounts, createAccount, loginStaff, currentAccount, deleteAccount, 
                getAccountById, getAccountByEmail, getAccountsByBranch, getAccountsByEachBranch,
                updateAccount, passwordReset, resetPasswordEmail, forgotPasswordEmail, passwordForgot};
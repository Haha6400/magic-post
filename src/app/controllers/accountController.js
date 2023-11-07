/*
@desc Functions for account management.
Includes: 
- Create/ delete account (only for branch managers)
- Get account by email, username, id, workplace, role.
- Get all accounts
- Login, logout
- Change password
- Update account
*/

const asyncHandler = require('express-async-handler');

/*
@des Create a new account
@route POST /api/accounts
@access hubManager, warehouseManager
*/
const createAccount = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Create an account"})
});

/*
@des Get all accounts
@route GET /api/accounts
@access supervisor
*/
const getAllAccounts = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Get all accounts"})
});




module.exports = {getAllAccounts, createAccount};
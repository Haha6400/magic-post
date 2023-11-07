/*
@desc Routes of employee account management features
Includes: 
- Create/ delete account
- Login, logout
- Change password
- Get account by email, username, id, workplace, role.
- Get all accounts
*/

const express = require("express");
const router = express.Router();
const { getAllAccounts, createAccount, loginStaff } = require("../app/controllers/staffController")

router.route("/").get(getAllAccounts);
router.post("/", createAccount);
router.post("/login", loginStaff);

module.exports = router;
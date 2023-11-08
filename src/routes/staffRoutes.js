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
const { getAllAccounts, createAccount, loginStaff, currentAccount, deleteAccount } = require("../app/controllers/staffController")
const {staffAuth, roleCheck} = require("../app/middleware/auth");

//@access PERSONALITY
router.get("/current", staffAuth, currentAccount);

//@access PUBLIC
router.post("/login", loginStaff);

//@access SUPERVISOR
router.get("/all", staffAuth, roleCheck(["supervisor"]), getAllAccounts);

//@access HUBMANAGER, WAREHOUSEMANEGER, SUPERVISOR
router.post("/create",staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), createAccount);
router.delete("/create",staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), deleteAccount);

module.exports = router; 
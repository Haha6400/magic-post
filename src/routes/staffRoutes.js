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
const { getAllAccounts, createAccount, loginStaff, currentAccount, deleteAccount, getAccountById, getAccountByEmail, getAccountsByWorkplace, getAccountsByEachWorkplace} = require("../app/controllers/staffController")
const {staffAuth, roleCheck, workplaceCheck} = require("../app/middleware/auth");

//@access PERSONAL
router.get("/current", staffAuth, currentAccount);

//@access PUBLIC
router.post("/login", loginStaff);

//@access SUPERVISOR
router.get("/all", staffAuth, roleCheck(["supervisor"]), getAllAccounts);
router.get("/wp/:workplace", staffAuth, roleCheck(["supervisor"]), getAccountsByEachWorkplace);


//@access HUBMANAGER, WAREHOUSEMANEGER, SUPERVISOR
router.post("/create",staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), createAccount);
router.delete("/:id",staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), workplaceCheck, deleteAccount);
router.get("/i/:id",staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), workplaceCheck, getAccountById);
router.get("/e/:email", staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), getAccountByEmail);

//@access HUBMANAGER, WAREHOUSEMANEGER
router.get("/wp", staffAuth, roleCheck(["hubManager", "warehouseManager"]), getAccountsByWorkplace);

module.exports = router; 
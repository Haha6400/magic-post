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
const { getAllAccounts, createAccount, loginStaff, currentAccount, deleteAccount, getAccountById, getAccountByEmail, getAccountsByWorkplace, getAccountsByEachWorkplace, updateAccount, passwordReset, resetPasswordEmail} = require("../app/controllers/staffController")
const {staffAuth, roleCheck, accessCheck} = require("../app/middleware/auth");

//TEST
router.post("/createe", createAccount);

//@access PERSONAL
router.get("/current", staffAuth, currentAccount);
router.put("/update/:id", staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor", "hubStaff", "warehouseStaff"]), accessCheck, updateAccount)
// router.put("/update/:id", staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor", "hubStaff", "warehouseStaff"]), updateAccount)

//@access PUBLIC
router.post("/login", loginStaff);

//@access SUPERVISOR
router.get("/all", staffAuth, roleCheck(["supervisor"]), getAllAccounts);
router.get("/wp/:workplace", staffAuth, roleCheck(["supervisor"]), getAccountsByEachWorkplace);


//@access HUBMANAGER, WAREHOUSEMANEGER, SUPERVISOR
router.post("/create",staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), createAccount);
router.delete("/:id",staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), accessCheck, deleteAccount);
router.get("/i/:id",staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), accessCheck, getAccountById);
router.get("/e/:email", staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), getAccountByEmail);

//@access HUBMANAGER, WAREHOUSEMANEGER
router.get("/wp", staffAuth, roleCheck(["hubManager", "warehouseManager"]), getAccountsByWorkplace);


router.post("/reset-password", staffAuth, resetPasswordEmail);
router.post("/reset-password/:id/:accessToken", staffAuth, passwordReset)

module.exports = router; 
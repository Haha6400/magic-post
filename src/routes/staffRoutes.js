/*
@desc Routes of employee account management features
Includes: 
- Create/ delete account
- Login, logout
- Change password
- Get account by email, username, id, branch, role.
- Get all accounts
*/

const express = require("express");
const router = express.Router();
const { getAllAccounts, createAccount, loginStaff, currentAccount, deleteAccount, getAccountById, getAccountByEmail, getAccountsByBranch, 
    getAccountsByEachBranch, getRoleOfCurrentAccount, updateAccount, passwordReset, resetPasswordEmail, forgotPasswordEmail, passwordForgot} = require("../app/controllers/staffController")
const {staffAuth, roleCheck, accessAccountCheck} = require("../app/middleware/auth");


//TEST
router.post("/createe", createAccount);
router.get('/role', getRoleOfCurrentAccount);

//@access PERSONAL
router.get("/current", staffAuth, currentAccount);
router.put("/update/:id", staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor", "hubStaff", "warehouseStaff"]), accessAccountCheck, updateAccount)
// router.put("/update/:id", staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor", "hubStaff", "warehouseStaff"]), updateAccount)
router.post("/reset-password", staffAuth, resetPasswordEmail);
router.post("/reset-password/:id/:accessToken", staffAuth, passwordReset)
router.post("/forgot-password", forgotPasswordEmail);
router.post("/forgot-password/:message", passwordForgot);

//@access PUBLIC
router.post("/login", loginStaff);

//@access SUPERVISOR
router.get("/all", staffAuth, roleCheck(["supervisor"]), getAllAccounts);
router.get("/wp/:branchName", staffAuth, roleCheck(["supervisor"]), getAccountsByEachBranch);


//@access HUBMANAGER, WAREHOUSEMANEGER, SUPERVISOR
router.post("/create",staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), createAccount);
router.delete("/:id",staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), accessAccountCheck, deleteAccount);
router.get("/i/:id",staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), accessAccountCheck, getAccountById);
router.get("/e/:email", staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), getAccountByEmail);

//@access HUBMANAGER, WAREHOUSEMANEGER
router.get("/wp", staffAuth, roleCheck(["hubManager", "warehouseManager"]), getAccountsByBranch);


module.exports = router; 
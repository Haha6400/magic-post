const express = require("express");
const router = express.Router();
const { getAllAccounts, createAccount, loginStaff, currentAccount, deleteAccount, getAccountById, getAccountByEmail, getAccountsByBranch,
    getAccountsByEachBranch, getRoleOfCurrentAccount, updateAccount, passwordReset, resetPasswordEmail, forgotPasswordEmail, passwordForgot,
    getAllManagerAccounts, logoutStaff } = require("../app/controllers/staffController")
const { staffAuth, roleCheck, accessAccountCheck } = require("../app/middleware/auth");


//TEST
router.post("/createe", createAccount);
router.get('/role', getRoleOfCurrentAccount);

//@access PERSONAL
router.get("/current", staffAuth, currentAccount);
router.put("/update/:id", staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor", "hubStaff", "warehouseStaff"]), accessAccountCheck, updateAccount)

router.post("/reset-password", staffAuth, resetPasswordEmail);
router.post("/reset-password/:id/:accessToken", staffAuth, passwordReset)
router.post("/forgot-password", forgotPasswordEmail);
router.post("/forgot-password/:message", passwordForgot);

//@access PUBLIC
router.post("/login", loginStaff);
router.post("/logout", staffAuth, logoutStaff)

//@access SUPERVISOR
router.get("/all", staffAuth, roleCheck(["supervisor"]), getAllAccounts);
router.get("/all/managers", staffAuth, roleCheck(["supervisor"]), getAllManagerAccounts)
router.post("/wp/supervisor", staffAuth, roleCheck(["supervisor"]), getAccountsByEachBranch);


//@access HUBMANAGER, WAREHOUSEMANEGER, SUPERVISOR
router.post("/create", staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), createAccount);
router.delete("/:id", staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), accessAccountCheck, deleteAccount);
router.get("/i/:id", staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), accessAccountCheck, getAccountById);
router.get("/e/:email", staffAuth, roleCheck(["hubManager", "warehouseManager", "supervisor"]), getAccountByEmail);

//@access HUBMANAGER, WAREHOUSEMANEGER
router.get("/wp", staffAuth, roleCheck(["hubManager", "warehouseManager"]), getAccountsByBranch);


module.exports = router; 
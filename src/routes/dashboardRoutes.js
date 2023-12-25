const express = require("express");
const router = express.Router();

const { getMonthlyIncome, getMonthlyOrders, getMonthlyIncomeByBranch, getMonthlyOrdersByBranch, allReceive, allSend, allReceive_Supervisors, allSend_Supervisors } = require('../app/controllers/dashboardController')
const { staffAuth, roleCheck, accessAccountCheck } = require("../app/middleware/auth");
const { sendConfirmList } = require("../app/controllers/branchController");
router.get('/income', getMonthlyIncome)
router.get('/count', getMonthlyOrders)
router.post('/income/:branch_id', getMonthlyIncomeByBranch)
router.get('/count/:branch_id', getMonthlyOrdersByBranch)
router.post('/all/receive', staffAuth, allReceive);
router.post('/all/send', staffAuth, allSend);
router.post("/avail", staffAuth, sendConfirmList);
router.post('/all/receive/supervisor', staffAuth, roleCheck(["supervisor"]), allReceive_Supervisors);
router.post('/all/send/supervisor', staffAuth, roleCheck(["supervisor"]), allSend_Supervisors);

module.exports = router

const express = require("express");
const router = express.Router();

const { getMonthlyIncome, getMonthlyOrders, getMonthlyIncomeByBranch, getMonthlyOrdersByBranch, allReceive, allSend, allReceive_Supervisors, allSend_Supervisors } = require('../app/controllers/dashboardController')
const { staffAuth, roleCheck, accessAccountCheck } = require("../app/middleware/auth");
const { sendConfirmList } = require("../app/controllers/branchController");
router.get('/income', getMonthlyIncome)
router.get('/count', getMonthlyOrders)
router.get('/income/:branch_id', getMonthlyIncomeByBranch)
router.get('/count/:branch_id', getMonthlyOrdersByBranch)
router.get('/all/receive', staffAuth, allReceive);
router.get('/all/send', staffAuth, allReceive);
router.get('/availale', staffAuth, sendConfirmList);
router.get('/all/receive/supervisor', staffAuth, roleCheck(["supervisor"]), allReceive_Supervisors);
router.get('/all/send/supervisor', staffAuth, roleCheck(["supervisor"]), allSend_Supervisors);

module.exports = router

const express = require("express");
const router = express.Router();

const { getMonthlyIncome, getMonthlyOrders, getMonthlyIncomeByBranch, getMonthlyOrdersByBranch, allReceive, allSend, allReceive_Supervisors, allSend_Supervisors, allSendByStatus } = require('../app/controllers/dashboardController')
const { staffAuth, roleCheck, accessAccountCheck } = require("../app/middleware/auth");
const { sendConfirmList } = require("../app/controllers/branchController");

//GET method
router.get('/income', getMonthlyIncome)
router.get('/count', getMonthlyOrders)
router.get('/count/:branch_id', getMonthlyOrdersByBranch)

//@POST method
router.post('/income/:branch_id', getMonthlyIncomeByBranch)
router.post('/all/receive', staffAuth, allReceive);
router.post('/all/send', staffAuth, allSend);
router.post("/avail", staffAuth, sendConfirmList);
router.post('/all/receive/supervisor', staffAuth, allReceive_Supervisors);
router.post('/all/send/supervisor', staffAuth, allSend_Supervisors);
router.post('/send/bystatus', staffAuth, allSendByStatus)

module.exports = router

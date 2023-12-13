const express = require("express");
const router = express.Router();

const { getMonthlyIncome, getMonthlyOrders, getMonthlyIncomeByBranch, getMonthlyOrdersByBranch, allReceive, availableReceive, allSend, availableSend } = require('../app/controllers/dashboardController')
const { staffAuth, roleCheck, accessAccountCheck } = require("../app/middleware/auth");

router.get('/income', getMonthlyIncome)
router.get('/count', getMonthlyOrders)
router.get('/income/:branch_id', getMonthlyIncomeByBranch)
router.get('/count/:branch_id', getMonthlyOrdersByBranch)
router.get('/all/receive', staffAuth, allReceive);
router.get('/all/send', staffAuth, allReceive);
router.get('/available/receive', staffAuth, allReceive);
router.get('/available/send', staffAuth, allReceive);
module.exports = router

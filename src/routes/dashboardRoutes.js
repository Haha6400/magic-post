const express = require("express");
const router = express.Router();

const { getMonthlyIncome, getMonthlyOrders, getMonthlyIncomeByBranch, getMonthlyOrdersByBranch } = require('../app/controllers/dashboardController')

router.get('/income', getMonthlyIncome)
router.get('/count', getMonthlyOrders)
router.get('/income/:branch_id', getMonthlyIncomeByBranch)
router.get('/count/:branch_id', getMonthlyOrdersByBranch)
module.exports = router
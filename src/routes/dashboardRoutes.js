const express = require("express");
const router = express.Router();

const { getMonthlyIncome, getMonthlyOrders } = require('../app/controllers/dashboardController')

router.get('/income', getMonthlyIncome)
router.get('/count', getMonthlyOrders)

module.exports = router
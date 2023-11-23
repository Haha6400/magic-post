const express = require("express");
const router = express.Router();

const { getTotalIncome } = require('../app/controllers/dashboardController')

router.get('/', getTotalIncome)

module.exports = router
const express = require('express')
const router = express.Router()

const {addCustomer, getCustomers} = require("../app/controllers/customerController")

router.route('/').get(getCustomers).post(addCustomer)

module.exports = router

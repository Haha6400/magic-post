const asyncHandler = require('express-async-handler')
const Customer = require('../models/customerModel')


const addCustomer = asyncHandler(async (req, res) => {
    const {fullname, address, phoneNumber, zipCode} = req.body;
    if (!fullname || !address || !phoneNumber || !zipCode) {
        res.status(400)
        throw new Error('All fields are mandatory')
    } else {
        Customer.findOne
    }
    const customer = Customer.create({
        fullname, address, phoneNumber, zipCode
    })
    res.status(201).json(customer)

})

const getCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find()
    res.status(200).json(customers)
})

module.exports = {addCustomer, getCustomers};

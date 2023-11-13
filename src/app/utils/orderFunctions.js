const Customer = require("../models/customerModel")
const Fee = require('../models/feeModel')
const ReceiverFee = require('../models/receiverFeeModel')
const Mass = require('../models/massModel')
const Process = require('../models/processesModel')
const branch = require("../models/branchModel");

//create customer
async function createCustomer(fullname, address, phoneNumber, branchName) {
    var customer = await Customer.findOne(
        {
            'fullname': fullname,
            'phoneNumber': phoneNumber,
        })
    if (!customer) {
        customer = await Customer.create({
            'fullname': fullname,
            'address': address,
            'phoneNumber': phoneNumber,
            'branch_id': await branch.findOne({ name: branchName })
        })
    }
    return customer;
}

//create fee
async function createFeeModel(charge, surcharge, VAT, other_fee, total_fee) {

    fee = await Fee.create({
        'charge': charge,
        'surcharge': surcharge,
        'VAT': VAT,
        'other_fee': other_fee,
        'total_fee': total_fee
    })
    return fee
}

//create receiver fee
async function createReceiverFeeModel(cod, rf_other_fee, rf_total) {

    receiver_fee = await ReceiverFee.create({
        'cod': cod,
        'rf_other_fee': rf_other_fee,
        'rf_total': rf_total,
    })
    return receiver_fee
}

//create mass
async function createMassModel(actual_mass, converted_mass) {

    mass = await Mass.create({
        'actual_mass': actual_mass,
        'converted_mass': converted_mass,
    })
    return mass
}

//create process
async function createProcesses(branchName, status) {

    processes = await Process.create({
        'branch_id': await branch.findOne({
            'name': branchName
        }),
        'status': status,
    })
    return processes
}

module.exports = { createCustomer, createFeeModel, createMassModel, createReceiverFeeModel, createProcesses }

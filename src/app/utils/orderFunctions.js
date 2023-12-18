const Customer = require("../models/customerModel");
const Fee = require("../models/feeModel");
const ReceiverFee = require("../models/receiverFeeModel");
const Mass = require("../models/massModel");
const Process = require("../models/processesModel");
const branch = require("../models/branchModel");
const Package = require("../models/packageModel");
const Order = require("../models/orderModel.js");
const { Code } = require("mongodb");

//create customer
async function createCustomer(fullname, address, phoneNumber, branchName) {
    var customer = await Customer.findOne({
        fullname: fullname,
        phoneNumber: phoneNumber,
    });
    if (!customer) {
        customer = await Customer.create({
            fullname: fullname,
            address: address,
            phoneNumber: phoneNumber,
            branch_id: await branch.findOne({ name: branchName }),
        });
    }
    return customer;
}

//create fee
async function createFeeModel(charge, surcharge, other_fee) {
    charge = parseInt(charge) || 0;
    surcharge = parseInt(surcharge) || 0;
    other_fee = parseInt(other_fee) || 0;

    fee = await Fee.create({
        charge: charge,
        surcharge: surcharge,
        vat: 0.1,
        other_fee: other_fee,
        total: 1.1 * charge + surcharge + other_fee,
    });
    return fee;
}

//create receiver fee
async function createReceiverFeeModel(cod, rf_other_fee) {
    cod = parseInt(cod) || 0;
    rf_other_fee = parseInt(rf_other_fee) || 0;

    receiver_fee = await ReceiverFee.create({
        'cod': cod,
        'other_fee': rf_other_fee,
        'total': cod,
    })
    return receiver_fee
}

//create mass
async function createMassModel(actual_mass, converted_mass) {
    mass = await Mass.create({
        actual: actual_mass,
        converted: converted_mass,
    });
    return mass;
}

//create process
async function createProcesses(branch) {
    processes = await Process.create({
        events: [
            {
                branch_id: branch,
                status: "PRE_TRANSIT",
            },
        ],
    });
    return processes;
}

async function createPackage(type, amount, price, mass) {
    package = await Package.create({
        type: type,
        amount: amount,
        price: price,
        mass_id: mass,
    });
    return package;
}

//Formatted response
async function getOrder(order_id) {
    const order = await Order.findById(order_id);
    const sender = await Customer.findById(order.sender_id);
    const receiver = await Customer.findById(order.receiver_id);
    const fee = await Fee.findById(order.fee_id);

    const receiver_fee = await ReceiverFee.findById(order.receiver_fee_id);
    const processes = await Process.findById(order.processes_id);
    const lastEvent = processes.events;
    return {
        note: order.note,
        special_service: order.special_service,
        instructions: order.instructions,
        sender_commitment: order.sender_commitment,
        order_code: order.order_code,
        senderName: sender.fullname,
        senderAddress: sender.address,
        senderPhone: sender.phoneNumber,
        receiverName: receiver.fullname,
        receiverAddress: receiver.address,
        receiverPhone: receiver.phoneNumber,
        fee: fee.total,
        receiver_fee: receiver_fee.total,
        status: lastEvent[lastEvent.length - 1].status,
    };
}

//Formatted response
async function getOrders(orders) {
    const result = [];
    for (var i in orders) {
        result.push(await getOrder(orders[i]._id));
    }
    return result;
}

async function findProcessByLastEvent(newEvent) {
    try {
        const result = await Process.findOne({
            $expr: {
                $eq: [{ $arrayElemAt: ["$events", -1] }, newEvent],
            },
        });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    createCustomer,
    createFeeModel,
    createMassModel,
    createReceiverFeeModel,
    createProcesses,
    createPackage,
    getOrder,
    getOrders,
    findProcessByLastEvent,
};

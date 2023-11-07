const asyncHandler = require('express-async-handler');
const order = require("../models/orderModel");

const createOrder = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {note} = req.body;
    if(!note){
        res.status(400);
        throw new Error(`Error creating order`);
    }

    const newOrder = await order.create({
        note
    });

    if(newOrder) res.status(200).json({_id: newOrder.id});
    else {
        res.status(400);
        throw new Error(`Invalid`);
    }
    res.status(200).json({message: "Create an order"})
});

module.exports = {createOrder};
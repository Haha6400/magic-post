const asyncHandler = require('express-async-handler');
const workplace = require("../models/workplaceModel");
const staff = require("../models/staffModel");
const workPlace = require("../models/workplaceModel");

require('dotenv').config();

const createWorkplace = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {managerId, name} = req.body;
    if(!name) {
        res.status(400);
        throw new Error(`Error creating workplace`);
    }
    if(await workPlace.findOne({name: name})){
        res.status(400);
        throw new Error(name + ' is already exists');
    }
    const workPlace = await workplace.create({
        manager_id: await staff.findById(managerId),
        name: name,
        higherWorkplace_id: await staff.findById(managerId).workplace_id
    });
    if(workPlace) res.status(200).json({_id: workPlace.id, name: workPlace.name});
    else {
        res.status(400);
        throw new Error(`Invalid`);
    }
});

module.exports = {createWorkplace}
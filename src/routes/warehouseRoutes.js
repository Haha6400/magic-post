const express = require("express");
const router = express.Router();
const { staffAuth, roleCheck, accessAccountCheck } = require("../app/middleware/auth");

const { getCurrentBranchReceivingOrders, getOrdersByWareHouseID } = require('../app/controllers/warehouseController');

//@access warehouseManager
router.get('/all/', staffAuth, roleCheck(["supervisor", "warehouseManager"]), getCurrentBranchReceivingOrders)


//@access supervisor
router.get('/all/:branch_id', staffAuth, roleCheck(["supervisor"]), getOrdersByWareHouseID)



module.exports = router;
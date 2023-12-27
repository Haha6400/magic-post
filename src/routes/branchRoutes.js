const express = require("express");
const router = express.Router();
const { createHub, createWarehouse, getAllWarehouse, getAllHub, getAllWarehouseName, getBranchNameById } = require('../app/controllers/branchController');
const { staffAuth, roleCheck } = require("../app/middleware/auth");
const { receiveConfirmList, sendConfirmList, sendConfirm, receiveConfirm } = require("../app/controllers/branchController");

//POST method
router.post("/create/hub", staffAuth, roleCheck(["supervisor"]), createHub);
router.post("/create/warehouse", staffAuth, roleCheck(["supervisor"]), createWarehouse);
router.post("/coming/receive", staffAuth, receiveConfirmList);
router.post("/coming/send", staffAuth, sendConfirmList);

//GET method
router.get("/all/warehouse", staffAuth, roleCheck(["supervisor"]), getAllWarehouse);
router.get("/all/hub", staffAuth, getAllHub);
router.get("/all/warehouse/name", staffAuth, getAllWarehouseName);
router.get("/:branchId", getBranchNameById);

//PUT method
router.put("/confirm/send/:order_code", staffAuth, sendConfirm);
router.put("/confirm/receive/:order_code", staffAuth, receiveConfirm);

module.exports = router; 
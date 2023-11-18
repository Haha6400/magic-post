const express = require("express");
const router = express.Router();
const { createHub, createWarehouse, getAllWarehouse, getAllHub } = require('../app/controllers/branchController');
const { staffAuth, roleCheck, accessAccountCheck } = require("../app/middleware/auth");

//TEST
router.post("/create/hub", staffAuth, roleCheck(["supervisor"]), createHub);
router.post("/create/warehouse", staffAuth, roleCheck(["supervisor"]), createWarehouse);
router.get("/all/warehouse", staffAuth, roleCheck(["supervisor"]), getAllWarehouse);
router.get("/all/hub", staffAuth, roleCheck(["supervisor"]), getAllHub);

module.exports = router; 
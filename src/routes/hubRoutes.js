const express = require("express");
const router = express.Router();
const {staffAuth, roleCheck, accessAccountCheck} = require("../app/middleware/auth");
const {hub_fromAllWarehouse, hub_fromSender, hub_receiveAll} = require("../app/controllers/hubController");

router.get('/fromwarehouse/all', staffAuth, hub_fromAllWarehouse);
router.get('/fromwarehouse/:warehouse_id', staffAuth, hub_fromAllWarehouse);
router.get('/fromcustomer/all', staffAuth, hub_fromSender);
router.get('/receive/all', staffAuth, hub_receiveAll);


module.exports = router; 
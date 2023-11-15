const express = require("express");
const router = express.Router();
const {staffAuth, roleCheck, accessAccountCheck} = require("../app/middleware/auth");
const {hub_fromAllWarehouse, hub_fromSender, hub_receiveAll, hub_fromWarehouseID, hub_fromAllWarehouse_Today, hub_fromAllWarehouse_ByDay,
    hub_fromSender_Today, hub_fromSender_ByDay, hub_receiveAll_Today, hub_receiveAll_ByDay} = require("../app/controllers/hubController");

/*
@access hubManager
*/
router.get('/fromwarehouse/all', staffAuth, roleCheck(["hubManager"]), hub_fromAllWarehouse);
router.get('/fromwarehouse/all/today', staffAuth, roleCheck(["hubManager"]), hub_fromAllWarehouse_Today);
router.get('/fromwarehouse/all/:fullyear/:month/:day', staffAuth, roleCheck(["hubManager"]), hub_fromAllWarehouse_ByDay);
router.get('/fromwarehouse/:warehouse_id', staffAuth, roleCheck(["hubManager"]), hub_fromWarehouseID);

router.get('/fromcustomer/all', staffAuth, roleCheck(["hubManager"]), hub_fromSender);
router.get('/fromcustomer/all/today', staffAuth, roleCheck(["hubManager"]), hub_fromSender_Today);
router.get('/fromcustomer/all/:fullyear/:month/:day', staffAuth, roleCheck(["hubManager"]), hub_fromSender_ByDay);

router.get('/receive/all', staffAuth, roleCheck(["hubManager"]), hub_receiveAll);
router.get('/receive/all/today', staffAuth, roleCheck(["hubManager"]), hub_receiveAll_Today);
router.get('/receive/all/:fullyear/:month/:day', staffAuth, roleCheck(["hubManager"]), hub_receiveAll_ByDay);


module.exports = router; 
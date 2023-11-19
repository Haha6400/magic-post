const express = require("express");
const router = express.Router();
const { staffAuth, roleCheck, accessAccountCheck } = require("../app/middleware/auth");
const { allHubReceive_Manager, allHubReceive_Supervisor, allHubSend_Manager, allHubSend_Supervisor,
    allHubReceiveByWH_Manager, allHubReceivByWH_Supervisor, allHubSendByWH_Manager, allHubSendByWH_Supervisor,
    availableHubReceive_Manager, availableHubReceive_Supervisor, availableHubSend_Manager, availableHubSend_Supervisor,
    availableHubReceiveByWH_Manager, availableHubReceivByWH_Supervisor, availableHubSendByWH_Manager, availableHubSendByWH_Supervisor } = require("../app/controllers/hubController");

/*-------------------------------------------------------ALL ORDERS-------------------------------------------------------*/
//@access hubManager
router.get('/receive/all', staffAuth, roleCheck(["hubManager"]), allHubReceive_Manager);
router.get('/receive/all/:branch_id', staffAuth, roleCheck(["hubManager"]), allHubReceiveByWH_Manager);
router.get('/send/all', staffAuth, roleCheck(["hubManager"]), allHubSend_Manager);
router.get('/send/all/:branch_id', staffAuth, roleCheck(["hubManager"]), allHubSendByWH_Manager);

//@access supervisor
router.get('/receive/s/all/:hub_id', staffAuth, roleCheck("supervisor"), allHubReceive_Supervisor);
router.get('/receive/s/all/:hub_id/:warehouse_id', staffAuth, roleCheck(["supervisor"]), allHubReceivByWH_Supervisor);
router.get('/send/s/all/:hub_id', staffAuth, roleCheck(["supervisor"]), allHubSend_Supervisor);
router.get('/send/s/all/:hub_id/:warehouse_id', staffAuth, roleCheck(["supervisor"]), allHubSendByWH_Supervisor);

/*-------------------------------------------------------ORDERS ARE AVAILABLE AT HUB-------------------------------------------------------*/
//@access hubManager
router.get('/receive/available', staffAuth, roleCheck(["hubManager"]), availableHubReceive_Manager);
router.get('/receive/available/:branch_id', staffAuth, roleCheck(["hubManager"]), availableHubReceiveByWH_Manager);
router.get('/send/available', staffAuth, roleCheck(["hubManager"]), availableHubSend_Manager);
router.get('/send/available/:branch_id', staffAuth, roleCheck(["hubManager"]), availableHubSendByWH_Manager);

//@access supervisor
router.get('/receive/s/available/:hub_id', staffAuth, roleCheck(["supervisor"]), availableHubReceive_Supervisor);
router.get('/receive/s/available/:hub_id/:warehouse_id', staffAuth, roleCheck(["supervisor"]), availableHubReceivByWH_Supervisor);
router.get('/send/s/available/:hub_id', staffAuth, roleCheck(["supervisor"]), availableHubSend_Supervisor);
router.get('/send/s/available/:hub_id/:warehouse_id', staffAuth, roleCheck(["supervisor"]), availableHubSendByWH_Supervisor);

module.exports = router; 
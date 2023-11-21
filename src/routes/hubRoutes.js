const express = require("express");
const router = express.Router();
const { staffAuth, roleCheck, accessAccountCheck } = require("../app/middleware/auth");
const { allHubReceive_Manager, allHubReceive_Supervisor, allHubSend_Manager, allHubSend_Supervisor,
    allHubReceiveByWH_Manager, allHubReceivByWH_Supervisor, allHubSendByWH_Manager, allHubSendByWH_Supervisor,
    availableHubReceive_Manager, availableHubReceive_Supervisor, availableHubSend_Manager, availableHubSend_Supervisor,
    availableHubReceiveByWH_Manager, availableHubReceivByWH_Supervisor, availableHubSendByWH_Manager, availableHubSendByWH_Supervisor,
    getOrderByStatus } = require("../app/controllers/hubController");

/*-------------------------------------------------------ALL ORDERS-------------------------------------------------------*/
//@access hubManager
router.post('/receive/all', staffAuth, roleCheck(["hubManager"]), allHubReceive_Manager);
router.post('/receive/all/wh', staffAuth, roleCheck(["hubManager"]), allHubReceiveByWH_Manager);
router.post('/send/all', staffAuth, roleCheck(["hubManager"]), allHubSend_Manager);
router.post('/send/all/wh', staffAuth, roleCheck(["hubManager"]), allHubSendByWH_Manager);

//@access supervisor
router.post('/receive/s/all', staffAuth, roleCheck("supervisor"), allHubReceive_Supervisor);
router.post('/receive/s/all/wh', staffAuth, roleCheck(["supervisor"]), allHubReceivByWH_Supervisor);
router.post('/send/s/all', staffAuth, roleCheck(["supervisor"]), allHubSend_Supervisor);
router.post('/send/s/all/wh', staffAuth, roleCheck(["supervisor"]), allHubSendByWH_Supervisor);

/*-------------------------------------------------------ORDERS ARE AVAILABLE AT HUB-------------------------------------------------------*/
//@access hubManager
router.post('/receive/available', staffAuth, roleCheck(["hubManager"]), availableHubReceive_Manager);
router.post('/receive/available/wh', staffAuth, roleCheck(["hubManager"]), availableHubReceiveByWH_Manager);
router.post('/send/available', staffAuth, roleCheck(["hubManager"]), availableHubSend_Manager);
router.post('/send/available/wh', staffAuth, roleCheck(["hubManager"]), availableHubSendByWH_Manager);

//@access supervisor
router.post('/receive/s/available', staffAuth, roleCheck(["supervisor"]), availableHubReceive_Supervisor);
router.post('/receive/s/available/wh', staffAuth, roleCheck(["supervisor"]), availableHubReceivByWH_Supervisor);
router.post('/send/s/available', staffAuth, roleCheck(["supervisor"]), availableHubSend_Supervisor);
router.post('/send/s/available/wh', staffAuth, roleCheck(["supervisor"]), availableHubSendByWH_Supervisor);

//@access hubStaff
router.post('/all', staffAuth, roleCheck(["hubStaff"]), getOrderByStatus);
module.exports = router; 
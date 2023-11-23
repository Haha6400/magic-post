const express = require("express");
const router = express.Router();
const { getAllOrders, getOrderById, createOrder,
    updateOrder, deleteOrder,
    getOrdersByBranchName,
    printOrderLabel,
    getOrderByCode,
    getTotalIncome } = require("../app/controllers/orderController")
// const {printLabel} = require("../app/utils/createLabel");
const { staffAuth, roleCheck, accessAccountCheck } = require("../app/middleware/auth");

//@Get method
router.get('/all', getAllOrders)
router.get('/branch/:branchName', getOrdersByBranchName)
router.get('/:id', getOrderById)
router.get("/label/:order_id", printOrderLabel);
router.get("/code/:order_code", getOrderByCode);
router.get('/income/total', getTotalIncome);

//@Post method
// router.post('/create', createOrder)
router.post('/create', staffAuth, roleCheck(["hubStaff", "hubManager", "supervisor"]), createOrder)

//@Put method
router.put('/update/:id', updateOrder)
// router.put("/status/update", updateStatus);

//@Delete method
router.delete('/delete/:id', deleteOrder)


module.exports = router;
const express = require("express");
const router = express.Router();
const { getAllOrders, getOrderById, createOrder,
    updateOrder, deleteOrder,
    getOrdersByBranchName,
    printOrderLabel,
    getOrderByCode } = require("../app/controllers/orderController")
const { staffAuth, roleCheck } = require("../app/middleware/auth");

//@Get method
router.get('/all', getAllOrders)
router.get('/branch/:branchName', getOrdersByBranchName)
router.get('/:id', getOrderById)
router.get("/label/:order_id", printOrderLabel);
router.get("/code/:order_code", getOrderByCode);

//@Post method
router.post('/create', staffAuth, roleCheck(["hubStaff", "hubManager", "supervisor"]), createOrder)

//@Put method
router.put('/update/:order_code',
    staffAuth, roleCheck(["hubStaff", "hubManager", "warehouseStaff", "warehouseManager", "supervisor"]),
    updateOrder)

//@Delete method
router.delete('/delete/:order_code',
    staffAuth, roleCheck(["hubStaff", "hubManager", "warehouseStaff", "warehouseManager", "supervisor"]),
    deleteOrder)

module.exports = router;
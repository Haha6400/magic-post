const express = require("express");
const router = express.Router();
const { getAllOrders, getOrder, createOrder, updateOrder, deleteOrder, getOrdersByBranchName, printOrderLabel } = require("../app/controllers/orderController")
// const {printLabel} = require("../app/utils/createLabel");

//@Get method
router.get('/all', getAllOrders)
router.get('/branch/:branchName', getOrdersByBranchName)
router.get('/:id', getOrder)
router.get("/label/:order_id", printOrderLabel);


//@Post method
router.post('/create', createOrder)

//@Put method
router.put('/update/:id', updateOrder)

//@Delete method
router.delete('/delete/:id', deleteOrder)



module.exports = router;
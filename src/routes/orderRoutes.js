const express = require("express");
const router = express.Router();
const {createOrder} = require("../app/controllers/orderController")

router.get("/", (req, res) => {
    res.json({message: "get all orders"});
});
router.post("/", createOrder);
module.exports = router;
const express = require("express");
const router = express.Router();
const {createWorkplace} = require('../app/controllers/workplaceController');

//TEST
router.post("/create", createWorkplace);
module.exports = router; 
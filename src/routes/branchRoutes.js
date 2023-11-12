const express = require("express");
const router = express.Router();
const {createBranch} = require('../app/controllers/branchController');

//TEST
router.post("/create", createBranch);
module.exports = router; 
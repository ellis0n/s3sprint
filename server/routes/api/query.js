// Description: This file contains the routes for the queries API
const express = require("express");
const router = express.Router();
const queryController = require("../../controllers/queryController");

router.post("/", queryController.postQuery);

module.exports = router;

// Description: This file contains the routes for the users API

const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");

router.post("/", usersController.loginUser);
router.post("/register", usersController.registerUser);

module.exports = router;

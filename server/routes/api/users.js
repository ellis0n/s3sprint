const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");

router.post("/", usersController.loginUser);
router.post("/register", usersController.registerUser);


module.exports = router;

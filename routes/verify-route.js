const express = require("express");
const userController = require("../controllers/user-controller.js");

const router = express.Router();

router.route('/')
    .get(userController.verifyEmail);

module.exports = router;

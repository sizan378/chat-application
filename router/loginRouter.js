
// external imports
const express = require('express');
const router = express.Router();

// internal imports
const {getLogin, userLogin} = require('../controller/loginController');
const userLoginValidator = require("../middleware/users/userLoginValidate")


// login pages
router.get("/login", getLogin )

router.post("/login", userLoginValidator, userLogin)

module.exports = router;

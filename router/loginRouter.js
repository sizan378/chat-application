
// external imports
const express = require('express');
const router = express.Router();

// internal imports
const {getLogin} = require('../controller/loginController');


// login pages
router.get("/login", getLogin )

module.exports = router;

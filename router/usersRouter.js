
// external imports
const express = require('express');
const router = express.Router();

// internal imports
const { getUsers, addUser } = require('../controller/usersController');
const profilePictureUpload = require("../middleware/users/profilePictureUpload")
const { userCreateParameterValidation, userValidationHandler } = require('../middleware/users/userCreateParameterValidation')


// users list pages
router.get("/", getUsers )

// user create
router.post("/",profilePictureUpload, userCreateParameterValidation, userValidationHandler, addUser)

module.exports = router;    
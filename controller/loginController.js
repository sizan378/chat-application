// External Import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// internal imports
const User = require("../models/person")

// get login page
function getLogin(req, res, next) {
    res.render("index", {
        title: "Login Chat-Application",
    })
    
}

async function userLogin(req, res) {
    email = req.body.email
    password = req.body.password

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email, role:user.role },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        // save user token
        user.token = token;

        // user
        res.status(200).json(user);
    } else {
        res.status(400).json({
            message: "Invalid Password"
        })
    }
}

module.exports = {getLogin, userLogin}
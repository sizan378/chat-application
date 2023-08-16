// External Import
const bcrypt = require("bcrypt");

// Internal Import
const User = require("../models/person")


// get users page
function getUsers(req, res, next) {
    res.render("users", {
        title: "Users Chat-Application",
    })
    
}

async function addUser(req, res, next) {
  let newUser
  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      picture: req.files[0].filename,
      password: hashedPassword,
    })
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save user or send error
  try {
    const result = await newUser.save()
    res.status(200).json({
      message: "user saved successfully"
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "unknown error happened",
        },
      },
    });
  }
}

module.exports = {getUsers, addUser}



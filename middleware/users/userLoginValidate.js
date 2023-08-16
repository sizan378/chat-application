

// internal imports
const User = require("../../models/person")


async function userLoginValidate(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).json({message:"All fields are required"})
        }

        const user = await User.findOne({ email })

        if (!(user)) {
            res.status(400).json({message: "Please register first"})
        }

        next();
    
    } catch (err) {
        console.log(err);
    }
}


module.exports = userLoginValidate
// external imports
const path  = require("path");
const {body, validationResult} = require("express-validator")
const fs = require('fs');

// internal imports
const User = require("../../models/person")



const userCreateParameterValidation = [
    body("name")
        .isLength({min:1})
        .withMessage("Name is required")
        .isAlpha("en-US", {ignore: " -"})
        .withMessage("Name must be anything other than alphabet")
        .trim(),

    body("email")
        .isEmail()
        .withMessage("Email is required")
        .trim()
        .custom(async(value)=>{
            try {
                const user = await User.findOne({email: value});
                if (user) {
                    throw createError("Email is already exits")
                }
            } catch (err) {
                throw createError(err.message)
            }
        }),
    body("phoneNumber")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile Number must be valid bangladeshi number")
        .custom(async(value)=>{
            try {
                const user = await User.findOne({phoneNumber: value});
                if (user) {
                    throw createError("Mobile Number is already exits")
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),

    body("password")   
];

const userValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedError = errors.mapped();
    console.log("mapped error", mappedError);
    if (Object.keys(mappedError).length === 0){
        next();
    } else {
        if (req.files.length > 0){
            const filename = req.files[0].filename;
            fs.unlink(
                path.join(__dirname, `../../public/profile_pic/picture/${filename}`),
                (err) => {
                    if (err) console.log(err);
                }
            )
        }

        res.status(500).json({
            errors: mappedError,
        });
    }
};



module.exports = {userCreateParameterValidation, userValidationHandler}
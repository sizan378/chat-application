// internal imports
const uploader = require("../../utils/profilePicUpload")

function profilePictureUpload(req, res, next) {
    const upload = uploader("picture", ["image/jpeg", "image/jpg", "image/png"], 100000, "Only jpeg, jpg and png images are allowed")

    upload.any()(req, res, (err)=>{
        if (err) {
            res.status(500).json({
                error: {
                    picture: {
                        msg: err.message,
                    },
                },
            });
        } else {
            next ();
        }
    })
}


module.exports = profilePictureUpload
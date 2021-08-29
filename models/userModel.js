const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    name: {
        type:String, 
        required: [true, "Please enter your name"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"]
    },
    role:{
        type: Number,
        default: 0 // 0 = user, 1 = admin
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dindjf2vu/image/upload/v1629069022/app-icon-set-login-icon-comments-avatar-icon-11553436380yill0nchdm_ztadup.png"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)
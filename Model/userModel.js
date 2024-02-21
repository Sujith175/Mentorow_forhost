const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter the email "]
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
})


module.exports=mongoose.model("Login",authSchema)
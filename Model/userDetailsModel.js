const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    contact: {
        type: Number,
        required: [true, "Please enter your contact number"]
    },
})


module.exports=mongoose.model("UserDetails",userSchema)
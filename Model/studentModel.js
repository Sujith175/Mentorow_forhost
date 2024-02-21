const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter your first name "]
    },
    lastName: {
        type: String,
        required: [true, "Please enter your last name"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter your phone number"]
    },
    qualification:{
       type: String,
       required:[true, "Please enter your qualification"]
    },
    specialization:{
        type: String,
    },
    experience:{
        type: String,
    },
    jobLocation:{
        type: String,
    },
    yearOfPassout:{
        type: Number,
    },
    date:{
        type: Date,
        default: Date.now(),
    }  
})


module.exports=mongoose.model("Student",studentSchema)
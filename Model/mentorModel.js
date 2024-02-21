const mongoose = require('mongoose')



const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name "]
    },
    areaOfExpertise: {
        type: String,
        required: [true, "Please enter area of expertise"]
    },
    domain: {
        type: String,
        required: [true, "Please enter domain"]
    },
    linkedinUrl: {
        type: String,
        required: [true, "Please enter linkedIn Url"]
    },
    photo:{
       type: String,
       required:[true, "Please add photo"]
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
    
})


module.exports=mongoose.model("Mentor",mentorSchema)
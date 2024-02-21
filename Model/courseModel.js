const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    
    courseName: {
        type: String,
        required: [true, "Please enter the course name "]
    },
    description: {
        type: String,
        required: [true, "Please enter course description"]
    },
    duration: {
        type: String,
        required: [true, "Please enter course duration"]
    },
    price: {
        type: Number,
        required: [true, "Please enter course price"]
    },
    courseCurriculum:{
       type: String,
       required:[true, "Please enter course curriculum"]
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
    
})


module.exports=mongoose.model("Course",courseSchema)
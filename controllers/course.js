const Course=require("../Model/courseModel");
const ErrorHandler = require('../utils/ErrorHandler')
const Auth=require("../Model/userModel")


//Add Course
 const addCourse = async(req, res, next) => {
    try {
        const { userId } = req.params
        const user = await Auth.findById({ _id: userId })
        if (!user) {
           return next(new ErrorHandler("Admin not found", 404))
        }
        const { courseName, description, duration, price, courseCurriculum } = req.body;
        if (!courseName || !description || !duration || !price || !courseCurriculum) {
            return next(new ErrorHandler("Please provide all required fields", 400))
        }

        const createCourse = await Course.create({
            courseName,
            description,
            duration,
            price,
            courseCurriculum

        })

        return res.status(200).json(createCourse)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

//get All Courses
const getAllCourse = async (req, res, next) => {
    try{
    const courses = await Course.find({})
    res.status(200).json({ courses })
    }catch(err){
        next(new ErrorHandler("Courses not available",500))
    }
}

//get single course

 const getSingleCourse = async (req, res, next) => {

    try {
        const { id: courseID } = req.params;
        const course = await Course.findOne({ _id: courseID });
        if (!course) { 
            return next(new ErrorHandler(`No course with id: ${courseID}`,404));
        }
        res.status(200).json({ course });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
 
}

//Update Course
 const updateCourse = async(req, res, next) => {
    try {
        const { userId } = req.params
        const user = await Auth.findById({ _id: userId })
        if (!user) {
           return next(new ErrorHandler("Admin not found", 404))
        }
        const courseDetails = await Course.findByIdAndUpdate(req.params.id, {
            $set: {
                courseName: req.body.courseName,
                description: req.body.description,
                duration: req.body.duration,
                price: req.body.price,
                courseCurriculum: req.body.courseCurriculum
            }
        }, {
            new: true,
            runValidators: true,
        })

        if (!courseDetails) {
            return next(new ErrorHandler(`No course with id: ${req.params.id}`, 404))
        }

        res.status(200).json(courseDetails)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}



 const deleteCourse = async(req, res, next) => {

    try {
        const { userId } = req.params
        const user = await Auth.findById({ _id: userId })
        if (!user) {
           return next(new ErrorHandler("Admin not found", 404))
        }

        const { id: courseID } = req.params;
        const course = await Course.findOneAndDelete({ _id: courseID });
        if (!course) { 
            return next(new ErrorHandler(`No course with id: ${courseID}`,404));
        }
        res.status(200).json("Course deleted successfully");
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
    

}

module.exports={addCourse,getAllCourse,getSingleCourse,updateCourse,deleteCourse}






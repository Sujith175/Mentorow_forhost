const Student = require('../Model/studentModel')
const Auth=require("../Model/userModel")
const ErrorHandler = require('../utils/ErrorHandler')

const addStudent = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phoneNumber, qualification, specialization, experience, jobLocation, yearOfPassout} = req.body;
        if (!firstName || !lastName || !email || !phoneNumber || !qualification) {
            return next(new ErrorHandler("Please provide all required fields", 400))
        }

        const createStudent = await Student.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            qualification,
            specialization,
            experience,
            jobLocation,
            yearOfPassout,
        })

        return res.status(200).json(createStudent)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

const getAllStudent = async (req, res, next) => {
    try{
        const { userId } = req.params
        const user = await Auth.findById({ _id: userId })
        if (!user) {
           return next(new ErrorHandler("Admin not found", 404))
        }
        const students = await Student.find({})
        res.status(200).json({ students})
        }catch(err){
            next(new ErrorHandler("Student not available",500))
        }
}

const getSingleStudent = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await Auth.findById({ _id: userId })
        if (!user) {
           return next(new ErrorHandler("Admin not found", 404))
        }
        const { id: studentID } = req.params;
        const student = await Student.findOne({ _id: studentID });
        if (!student) { 
            return next(new ErrorHandler(`No student with id: ${studentID}`,404));
        }
        res.status(200).json({ student });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await Auth.findById({ _id: userId })
        if (!user) {
           return next(new ErrorHandler("Admin not found", 404))
        }

        const { id: studentID } = req.params;
        const student = await Student.findOneAndDelete({ _id: studentID });
        if (!student) { 
            return next(new ErrorHandler(`No student with id: ${studentID}`,404));
        }
        res.status(200).json("Student deleted successfully");
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

module.exports = {addStudent, getAllStudent, getSingleStudent, deleteStudent}
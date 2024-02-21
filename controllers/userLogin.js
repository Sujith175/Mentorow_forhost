const UserDetails = require("../Model/userDetailsModel");
const ErrorHandler = require("../utils/ErrorHandler");
const Auth = require("../Model/userModel")

const getUserDetails = async (req, res, next) => {
    try {
        const { name, contact } = req.body;

        if (!name || !contact) {
            return next(new ErrorHandler("Please enter the details", 404))
        }

        const userDetails = await UserDetails.create({
            name,
            contact
        })

        return res.status(200).json(userDetails)
    } catch (err) {
        return next(new ErrorHandler("Error in entering details", 500))
    }

}

// get All

const getAllUserDetails = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await Auth.findById({ _id: userId })
        if (!user) {
            return next(new ErrorHandler("Admin not found", 404))
        }
        const getAll = await UserDetails.find({})
        res.status(200).json({ getAll })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }

}


//delete 

const deleteUserDetails = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await Auth.findById({ _id: userId })
        if (!user) {
           return next(new ErrorHandler("Admin not found", 404))
        }

        const { id: Id } = req.params;
        const details = await UserDetails.findOneAndDelete({ _id: Id });
        if (!details) { 
            return next(new ErrorHandler(`No user details with id: ${Id}`,404));
        }
        res.status(200).json("Course deleted successfully");
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
    
}

module.exports = { getUserDetails, getAllUserDetails, deleteUserDetails }
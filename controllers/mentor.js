const Mentor=require("../Model/mentorModel");
const ErrorHandler = require('../utils/ErrorHandler');
const Auth = require('../Model/userModel')



 const addMentor = async(req, res, next) => {

    try{
        const { userId } = req.params
        const user = await Auth.findById({ _id: userId })
        if (!user) {
           return res.status(404).json("Only admin can edit")
        }
    const { name, areaOfExpertise, domain, linkedinUrl, photo } = req.body;
    if (!name || !areaOfExpertise || !domain || !linkedinUrl || !photo) {
        return next(new ErrorHandler("Please provide all required fields", 400))
    }

    const createMentor = await Mentor.create({
        name,
        areaOfExpertise,
        domain,
        linkedinUrl,
        photo,
    })
    console.log(createMentor)

    return res.status(200).json(createMentor)

} catch (error) {
    return next(new ErrorHandler(error.message, 500))
}
}

const getAllMentor = async(req, res, next) => {
    try {
        const getMentors = await Mentor.find({})
      res.status(200).json({ getMentors })  
      } catch (error) {
          return next(new ErrorHandler(error.message, 500))
      }

}

 const getSingleMentor = async (req, res, next) => {
    try {
        
        const  mentorID  = req.params.id;
        const mentor = await Mentor.findById({ _id: mentorID });
        if (!mentor) {
            return next(ErrorHandler(`No mentor with id: ${mentorID}`, 404));
        }
        res.status(200).json({ mentor });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }

}

 const updateMentor = async(req, res, next) => {
    try {

        const { userId } = req.params
        const user = await Auth.findById({ _id: userId })
        if (!user) {
           return res.status(404).json("Only admin can edit")
        }

        const mentorDetails = await Mentor.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                areaOfExpertise: req.body.areaOfExpertise,
                domain: req.body.domain,
                linkedinUrl: req.body.linkedinUrl,
                photo: req.body.photo
            }
        }, {
            new: true,
            runValidators: true,
        })

        if (!mentorDetails) {
            return next(new ErrorHandler(`No mentor with id: ${req.params.id}`, 404))
        }

        res.status(200).json(mentorDetails)
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

 const deleteMentor = async(req, res, next) => {
    try {
        const { userId } = req.params
        const user = await Auth.findById({ _id: userId })
        if (!user) {
           return res.status(404).json("Only admin can edit")
        }

        const  mentorID  = req.params.id;
        const mentor = await Mentor.findByIdAndDelete({ _id: mentorID });
        if (!mentor) {
            return next(new ErrorHandler(`No mentor with id: ${mentorID}`, 404));
        }
        res.status(200).json("Mentor deleted successfully");
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
}

module.exports={addMentor, getAllMentor,getSingleMentor, updateMentor,deleteMentor}
const express=require("express")
const { getUserDetails, getAllUserDetails, deleteUserDetails } = require("../controllers/userLogin")


const router=express.Router()


router.post("/adduserDetails", getUserDetails)
router.get("/getAllUserDetails/:userId",getAllUserDetails)
router.delete("/deleteUserDetails/:id/:userId",deleteUserDetails)

module.exports=router




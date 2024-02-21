const express=require("express");
const { addMentor, getAllMentor, getSingleMentor, deleteMentor, updateMentor } = require("../controllers/mentor");
const router=express.Router();

router.post('/create/:userId', addMentor)
router.get('/AllMentors', getAllMentor)
router.get('/singleMentor/:id',getSingleMentor)
router.delete('/deleteMentor/:id/:userId', deleteMentor)
router.patch('/updateMentor/:id/:userId', updateMentor)


module.exports=router
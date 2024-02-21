const express = require('express')
const { addCourse, getAllCourse, getSingleCourse, deleteCourse, updateCourse } = require('../controllers/course')

const router = express.Router()

router.post('/create/:userId', addCourse)
router.get('/AllCourse', getAllCourse)
router.get('/singleCourse/:id',getSingleCourse)
router.delete('/deleteCourse/:id/:userId', deleteCourse)
router.patch('/updateCourse/:id/:userId', updateCourse)


module.exports=router
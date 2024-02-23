const express = require('express')
const { addStudent, getAllStudent, getSingleStudent, deleteStudent } = require('../controllers/student')

const router = express.Router()

router.post('/create', addStudent)
router.get('/AllStudent/:userId', getAllStudent)
router.get('/singleStudent/:id/:userId',getSingleStudent)
router.delete('/deleteStudent/:id/:userId', deleteStudent)


module.exports=router
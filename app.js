const express = require("express");
const ErrorHandler = require("./middlewares/Error");
const course = require("./routes/course");
const mentor = require("./routes/mentor");
const auth = require("./routes/auth");
const userLogin=require("./routes/userLogin")
const student = require('./routes/student')
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/course", course);
app.use("/api/mentor", mentor);
app.use("/api/auth", auth);
app.use("/api/userLogin",userLogin)
app.use("/api/student", student)

//For Error handling
app.use(ErrorHandler);

module.exports = app;

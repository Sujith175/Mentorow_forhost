const Auth = require('../Model/userModel');
const ErrorHandler = require('../utils/ErrorHandler');
const bcrypt = require('bcrypt')

const signup = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(new ErrorHandler('All fields are required', 400))
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = new Auth({
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save()
        res.json('Signup successful')
    } catch (err) {
        next(err)
    }
}


const login = async (req, res, next) => {

    try {

        const {email, password} = req.body;

        if(!email || !password || email==='' || password === ''){
            return next(new ErrorHandler("Please provide all required fields", 400))
        }
    
        const user = await Auth.findOne({email});
        if(!user) {
            return next(new ErrorHandler("Invalid credentials", 404))
        }

        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return next(new ErrorHandler('Invalid credentials', 400))
        }


        res.status(200).json(user)

    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
}

module.exports = {signup, login}
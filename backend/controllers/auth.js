// importing the user model
const UserModel = require("../models/user");

// importing status codes
const { StatusCodes }  = require('http-status-codes');

// errors
const  { BadRequestError, UnauthenticatedError } = require("../errors/index");

// register controller
const register = async(req, res)=>{
    const { name, email, password } = req.body;
    
    // validating whether the values  are present
    // any missing, throw an error
    if(!name){
        throw new BadRequestError("Please provide a name")
    }

    if(!email){
        throw new BadRequestError("Please provide an email")
    }

    if(!password){
        throw new BadRequestError("Please provide a password")
    }    

    // Creating the user
    const user = await UserModel.create(req.body);

    // Getting the created JWT
    const token = user.createJWT()

    // send back the token to the front end
    res.status(StatusCodes.CREATED).json({user:{name: user.name}, token})
}

// Login to an account
const Login = async(req, res)=>{
    // user provides an email and password in the request body
    const { email, password } = req.body 

    // check if email  and password are present
    if(!email){
        throw new BadRequestError("Please provide an email")
    }

    if(!password){
        throw new BadRequestError("Please provide a password")
    }


    // check if the user is present
    const user = await  UserModel.findOne({email})

    // throw an error if user is not present
    if(!user){
        throw new UnauthenticatedError("Invalid Email")
    }

    // compare the password, 
    // password: this is the password passed by the user right now then compared to the one in the database.
    const isPasswordCorrect = await user.comparePassword(password)


    // throw an error if the password doesn't match
    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid Password")
    }

    // create the JWT token
    const token = user.createJWT()

    // sending back a response with user's name and token
    res.status(StatusCodes.OK).json({user:{name:user.name}, token})
}

const profile = async(req, res)=>{
    const { email, name, _id } = await UserModel.findById(req.user.userId);
    res.status(StatusCodes.OK).json({ userEmail:email, userName:name, userId:_id })
}

// exporting the controllers
module.exports = {
    register,
    Login, 
    profile
}
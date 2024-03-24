require("dotenv").config();
const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')

// import jwt
const jwt = require('jsonwebtoken')

// Creating a Register User Schema.
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, 'Please provide an email'],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
        ],
        unique: [true, 'Email already exists']
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6
    },
})

// middleware to hash the password
UserSchema.pre('save', async function(next){
    // hashing the password
    // generating the random bytes to use to hash the password
    const salt = await bcrypt.genSalt(10);

    // this will point to the document and access its properties i.e password property
    this.password = await bcrypt.hash(this.password, salt)

    // passing to the next middleware
    next()

})


// a function to generate the jwt token.
// this always points to the document and we can access all the properties within it
UserSchema.methods.createJWT= function(){
    return jwt.sign({userId:this._id, name:this.name}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFETIME})
}

// compare the password
// use the compare method passing in the password from the current document and the password passed by the user when logging in
UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

// exporting the schema and setting the collection to be applied and the schema
module.exports = mongoose.model('Users', UserSchema)
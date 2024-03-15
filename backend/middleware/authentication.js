
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/index')

// setup the auth middleware
const auth = async (req, res, next)=>{
    //check the header
    const authHeader= req.headers.authorization

    // if authHeader does not exist or it does not start with 'Bearer '
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError("Authentication Invalid")
    }

    // get the token
    const token = authHeader.split(' ')[1]

    // verifying the token
    try {
        // the return of the verify method is the payload( contains the user's details passed when signing the toke)
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        // create a user property with the current details and attach it to the req
        // this will then be passed to the next middleware and accessed
        req.user = {
            userId: payload.userId,
            name: payload.name
        }

        // passing to the next middleware
        next()
    } catch (error) {

        throw new UnauthenticatedError("Authentication Invalid")
    }

}

// exporting the auth middleware
module.exports = auth
const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  // setting a custom error
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later"
  }
  
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }

  // check for validation errors
  if(err.name === 'ValidationError'){
    customError.msg = Object.values(err.errors).map((item)=>item.message).join(',')
    customError.statusCode = 400

  }

  // Checking for Duplicate errors
  if(err.code && err.code === 11000){
    customError.msg = `${Object.keys(err.keyValue)} already exists! Please use another value`
    customError.statusCode = 400
  }

  // checking for Cast errors
  if(err.name === "CastError"){
    customError.msg = `No item found with id: ${err.value._id}`
    customError.statusCode = 404
    // console.log(err)
  }


  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })

  // sending back the custom error
  return res.status(customError.statusCode).json({msg:customError.msg})
}

module.exports = errorHandlerMiddleware

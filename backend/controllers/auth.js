// register controller
const register = async(req, res)=>{
    res.status(200).json({success:true, registered:"User Registered Successfully"})
}

// exporting the controllers
module.exports = {
    register
}
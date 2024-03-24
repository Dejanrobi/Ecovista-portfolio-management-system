const express = require('express');

// invoking the router method
const router = express.Router();

const authenticationMiddleware = require("../middleware/authentication")

// importing controllers
let { register, Login, profile } = require('../controllers/auth');


// setting the routers
router.route('/register').post(register);
router.route('/login').post(Login)
router.route('/profile').get(authenticationMiddleware, profile)


// exporting the router
module.exports = router;
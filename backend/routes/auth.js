const express = require('express');

// invoking the router method
const router = express.Router();

// importing controllers
let { register } = require('../controllers/auth');


// setting the routers
router.route('/register').get(register);


// exporting the router
module.exports = router;
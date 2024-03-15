// setting the stocks route
const express = require("express");

const router = express.Router();

// importing all the controllers
const {

    getAllProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty

} = require("../controllers/RealEstate");


// setting the routes
router.route('/').post(createProperty).get(getAllProperties);
router.route('/:id').get(getProperty).delete(deleteProperty).patch(updateProperty);


// exporting the router
module.exports = router
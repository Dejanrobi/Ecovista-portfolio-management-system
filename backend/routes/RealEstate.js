// setting the stocks route
const express = require("express");

const router = express.Router();

// importing all the controllers
const {

    getAllProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    addNoOffOccupiedUnits,
    addRentAmount,
    addExpenses

} = require("../controllers/RealEstate");


// setting the routes
router.route('/').post(createProperty).get(getAllProperties);
router.route('/:id').get(getProperty).delete(deleteProperty).patch(updateProperty);
router.route('/:id/no-of-occupied-units').patch(addNoOffOccupiedUnits)
router.route('/:id/rent-amount').patch(addRentAmount)
router.route('/:id/add-expenses').patch(addExpenses)


// exporting the router
module.exports = router
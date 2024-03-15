// setting the stocks route
const express = require("express");

const router = express.Router();

// importing all the controllers
const {

    getAllBonds,
    getBond,
    createBond,
    updateBond,
    deleteBond

} = require("../controllers/Bonds");


// setting the routes
router.route('/').post(createBond).get(getAllBonds);
router.route('/:id').get(getBond).delete(deleteBond).patch(updateBond);


// exporting the router
module.exports = router
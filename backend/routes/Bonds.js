// setting the stocks route
const express = require("express");

const router = express.Router();

// importing all the controllers
const {

    getAllBonds,
    getBond,
    createBond,
    updateBond,
    deleteBond,
    searchABond

} = require("../controllers/Bonds");


// setting the routes
router.route('/').post(createBond).get(getAllBonds);
router.route('/:id').get(getBond).delete(deleteBond).patch(updateBond);
router.route('/search-bond').post(searchABond);

// exporting the router
module.exports = router
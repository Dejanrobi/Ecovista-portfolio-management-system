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
    searchABond,
    storeAllBonds,
    retrieveAllBonds

} = require("../controllers/Bonds");


// setting the routes
router.route('/').post(createBond).get(getAllBonds);

router.route('/search-bond').post(searchABond);
router.route('/store-all-bonds').get(storeAllBonds);
router.route('/retrieve-all-bonds').get(retrieveAllBonds);
router.route('/:id').get(getBond).delete(deleteBond).patch(updateBond);

// exporting the router
module.exports = router
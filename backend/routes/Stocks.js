// setting the stocks route
const express = require("express");

const router = express.Router();

// importing all the controllers
const {

    getAllStocks,
    getStock,
    createStock,
    updateStock,
    deleteStock,
    searchAStock,
    fetchAllStocks,
    retrieveAllStocks

} = require("../controllers/Stocks");


// setting the routes
router.route('/').post(createStock).get(getAllStocks).delete(deleteStock);
router.route('/search-stock').post(searchAStock)
router.route('/fetch-all-stocks').get(fetchAllStocks);
router.route('/retrieve-all-stocks').get(retrieveAllStocks);
router.route('/:id').get(getStock).delete(deleteStock).patch(updateStock);



// exporting the router
module.exports = router
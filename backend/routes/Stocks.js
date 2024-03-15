// setting the stocks route
const express = require("express");

const router = express.Router();

// importing all the controllers
const {

    getAllStocks,
    getStock,
    createStock,
    updateStock,
    deleteStock

} = require("../controllers/Stocks");


// setting the routes
router.route('/').post(createStock).get(getAllStocks);
router.route('/:id').get(getStock).delete(deleteStock).patch(updateStock);


// exporting the router
module.exports = router
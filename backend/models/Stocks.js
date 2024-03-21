require("dotenv").config();
const mongoose = require('mongoose');

// Creating a Stocks Schema

const StocksSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    buyPrice: Number,
    purchaseDate: Date,
    companyId: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'AllFetchedStocks'}
})


const StocksModel = mongoose.model('Stocks', StocksSchema);

module.exports = StocksModel;
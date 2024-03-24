require("dotenv").config();
const mongoose = require('mongoose');

// Creating a Stocks Schema

const StocksSchema = new mongoose.Schema({
    currentUser: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Users'},
    name: String,
    quantity: Number,
    buyPrice: Number,
    purchaseDate: Date,
    companyId: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'AllFetchedStocks'}
})


const StocksModel = mongoose.model('Stocks', StocksSchema);

module.exports = StocksModel;
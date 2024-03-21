require("dotenv").config();
const mongoose = require('mongoose');

// Fetch and store a stocks data

const FetchStocksSchema = new mongoose.Schema({
    symbol: String,
    companyName: String,
    marketCap: Number,
    sector: String,
    industry: String,
    beta: Number,
    price: Number,
    lastAnnualDividend: Number,
    volume: Number,
    exchange: String,
    exchangeShortName: String,
    country: String,
    isEtf: Boolean,
    isFund: Boolean,
    isActivelyTrading: Boolean
})


const FetchStocksModel = mongoose.model('AllFetchedStocks', FetchStocksSchema);

module.exports = FetchStocksModel;
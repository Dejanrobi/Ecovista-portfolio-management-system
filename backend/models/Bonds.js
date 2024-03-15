require("dotenv").config();
const mongoose = require('mongoose');

// Creating a Bonds Schema

const BondsSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    purchasePrice: Number,
    couponRate: Number,
    purchaseDate: Date,
    maturityDate: Date
})


const BondsModel = mongoose.model('Bonds', BondsSchema);

module.exports = BondsModel;
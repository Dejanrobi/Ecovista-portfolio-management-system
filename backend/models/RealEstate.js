require("dotenv").config();
const mongoose = require('mongoose');

const rentPerUnitSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    rentAmount: {
        type: Number,
        default: 0
    }
});

const noOfOccupiedUnitsSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    noOfOccupiedUnits: {
        type: Number,
        default: 0
    }
});

const expensesSchema = new mongoose.Schema({
    date: Date,
    name: String,
    amount: Number
});


// Creating a Real Estate Schema
const RealEstateSchema = new mongoose.Schema({
    currentUser: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Users'},
    name: String,
    noOfUnits: Number,
    purchasePrice:Number,
    amountLoaned: Number,
    monthlyMortgagePayment: Number,
    datePurchased: Date,
    rentPerUnitPerUnit:[rentPerUnitSchema],
    noOfOccupiedUnits: [noOfOccupiedUnitsSchema],
    expenses: [expensesSchema]
    
})


const RealEstateModel = mongoose.model('RealEstate', RealEstateSchema);

module.exports = RealEstateModel;
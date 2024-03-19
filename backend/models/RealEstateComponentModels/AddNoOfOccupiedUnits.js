require("dotenv").config();
const mongoose = require('mongoose');


// Creating a Real Estate Schema
const NoOfOccupiedUnitsSchema = new mongoose.Schema({
    date: Date,
    noOfOccupiedUnits: Number,
    apartmentId: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'RealEstate'}
    
})


const RealEstateModel = mongoose.model('RealEstate', RealEstateSchema);

module.exports = RealEstateModel;
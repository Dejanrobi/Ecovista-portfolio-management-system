// This is a stocks controller

// Importing the models
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const RealEstateModel = require("../models/RealEstate");



// Get all properties
const getAllProperties = async(req, res)=>{
    // res.send("Get All Properties");
    const allProperties = await RealEstateModel.find({});
    res.status(StatusCodes.OK).json(allProperties);
}

// Get a single property
const getProperty = async(req, res)=>{

    // res.send("Get a single Property")
    const { id:propertyId } = req.params;
   
    const singleProperty = await RealEstateModel.findById({_id:propertyId}); 
    
    if(!singleProperty){
        throw new NotFoundError(`No property found with id: ${propertyId}`)
    }

    // // returning the bond details if its found
    res.status(StatusCodes.OK).json(singleProperty);


}

// Create a property
const createProperty = async(req, res)=>{
    // res.send("Create a Property")

    const { name, noOfUnits, purchasePrice, amountLoaned, monthlyMortgagePayment } = req.body;
    
    // // Validations
    if(!name){
        throw new BadRequestError("Please provide the property's name");
    }
    // Validations
    if(!noOfUnits){
        throw new BadRequestError("Please provide the property's no of units");
    }
    // Validations
    if(!purchasePrice){
        throw new BadRequestError("Please set the property's purchase price");
    }
    if(!amountLoaned){
        throw new BadRequestError("Please set the amount loaned");
    }
    if(!monthlyMortgagePayment){
        throw new BadRequestError("Please set the Monthly Mortgage Payment");
    }

    
    
    const createdProperty = await RealEstateModel.create({
        name,
        noOfUnits,
        purchasePrice,
        amountLoaned,
        monthlyMortgagePayment
        
    });

    

    res.status(StatusCodes.OK).json(createdProperty);

    
}


// Update a property
const updateProperty = async(req, res)=>{

    // res.send("Update Property")
    const{ id:propertyId } = req.params;

    // finding the property and updating it
    const updatedProperty = await RealEstateModel.findByIdAndUpdate({_id: propertyId}, req.body, {new:true, runValidators:true});

    if(!updatedProperty){
        throw new NotFoundError(`No property found with id: ${propertyId}`)
    }
    
    res.status(StatusCodes.OK).json(updatedProperty);
}


// Delete a property
const deleteProperty = async(req, res)=>{

    // res.send("Delete Property")

    const {id:propertyId} = req.params;

    // finding the bond and deleting it.
    const deletedProperty = await RealEstateModel.findByIdAndRemove({_id:propertyId})

    if(!deletedProperty){
        throw new NotFoundError(`No property found with id: ${propertyId}`)
    }
    

    res.status(StatusCodes.OK).json({msg: `Property with id: ${propertyId} deleted successfully`})
}

// Add number of occupied units
const addNoOffOccupiedUnits = async(req, res)=>{

    const {id:propertyId} = req.params
    
    const apartMent = await RealEstateModel.findById({_id:propertyId});

    const newNoOfOccupiedUnits = [...apartMent.noOfOccupiedUnits, req.body]
    // const newApartmentData = {...apartMent, noOfOccupiedUnits:newNoOfOccupiedUnits}
    // console.log(newNoOfOccupiedUnits)
    const newApartmentData = await RealEstateModel.findByIdAndUpdate({_id: propertyId}, {noOfOccupiedUnits:newNoOfOccupiedUnits}, {new:true, runValidators:true})



    res.status(StatusCodes.OK).json(newApartmentData)
}


// Add rent Amount
const addRentAmount = async(req, res)=>{
    const { id:propertyId } = req.params

    const apartment = await RealEstateModel.findById({_id:propertyId});
    const newRentAmount = [...apartment.rentPerUnitPerUnit, req.body]
    const newApartmentData = await RealEstateModel.findByIdAndUpdate({_id:propertyId}, {rentPerUnitPerUnit:newRentAmount}, {new:true, runValidators:true})
    
    res.status(StatusCodes.OK).json(newApartmentData)
}

// Add expenses 
const addExpenses = async(req, res)=>{
    const {id:propertyId} = req.params

    const apartment = await RealEstateModel.findById({_id:propertyId});
    const newExpenses = [...apartment.expenses, req.body]
    const newApartmentData = await RealEstateModel.findByIdAndUpdate({_id:propertyId}, {expenses:newExpenses}, {new:true, runValidators:true})
    
    res.status(StatusCodes.OK).json(newApartmentData);
}

// exporting stocks controllers
module.exports = {
    getAllProperties,
    getProperty,
    createProperty,
    updateProperty,
    deleteProperty,
    addNoOffOccupiedUnits,
    addRentAmount,
    addExpenses

}



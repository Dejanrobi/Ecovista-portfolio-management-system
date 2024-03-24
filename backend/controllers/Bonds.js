// This is a stocks controller

// Importing the models
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const BondsModel = require("../models/Bonds");
const { allBonds } = require("./data");
const StoreAllBondsModel = require("../models/BondsDataStore");


// Get all bonds
const getAllBonds = async(req, res)=>{

    const { userId } = req.user;
    // res.send("Get All Bonds");
    const allBonds = await BondsModel.find({currentUser:userId}).populate('bondId');
    res.status(StatusCodes.OK).json(allBonds);
}

// Get a single bond
const getBond = async(req, res)=>{
    const { userId } = req.user;
    // res.send("Get a single bond")
    const { id:bondId } = req.params;
   
    const singleBond = await BondsModel.findById({_id:bondId, currentUser:userId}).populate('bondId'); 
    
    if(!singleBond){
        throw new NotFoundError(`No bond found with id: ${bondId}`)
    }

    // // returning the bond details if its found
    res.status(StatusCodes.OK).json(singleBond);


}

// Create a Bond
const createBond = async(req, res)=>{
    // res.send("Create a bond")

    const  currentUser = req.user;

    const { name, quantity, purchasePrice, couponRate, purchaseDate, maturityDate, bondId } = req.body;
    
    // // Validations
    if(!name){
        throw new BadRequestError("Please provide the bond's name");
    }
    // Validations
    if(!quantity){
        throw new BadRequestError("Please provide the bond's quantity");
    }
    // Validations
    if(!purchasePrice){
        throw new BadRequestError("Please set the bond's purchase price");
    }
    if(!couponRate){
        throw new BadRequestError("Please set the bond's coupon rate");
    }
    if(!purchaseDate){
        throw new BadRequestError("Please set the bond's purchase date");
    }
    if(!maturityDate){
        throw new BadRequestError("Please set the bond's maturity date");
    }
    
    
    const createdBond = await BondsModel.create({
        currentUser: currentUser.userId,
        name,
        quantity,
        purchasePrice,
        couponRate,
        purchaseDate,
        maturityDate,
        bondId
    });

    res.status(StatusCodes.OK).json(createdBond);

    
}


// Update a bond
const updateBond = async(req, res)=>{

    // res.send("Update bond")
    const{ id:bondId } = req.params;

    // finding the bond and updating it
    const updatedBond = await BondsModel.findByIdAndUpdate({_id: bondId}, req.body, {new:true, runValidators:true});

    if(!updatedBond){
        throw new NotFoundError(`No bond found with id: ${bondId}`)
    }
    
    res.status(StatusCodes.OK).json(updatedBond);
}


// Delete a bond
const deleteBond = async(req, res)=>{

    // res.send("Delete bond")

    const {id:bondId} = req.params;

    // finding the bond and deleting it.
    const deletedBond = await BondsModel.findByIdAndRemove({_id:bondId})

    if(!deletedBond){
        throw new NotFoundError(`No bond found with id: ${bondId}`)
    }
    

    res.status(StatusCodes.OK).json({msg: `Bond with id: ${bondId} deleted successfully`})
}

// Search a bond
const searchABond = async(req, res)=>{
    // filter bonds
    const filteredBonds = allBonds.filter(bond => bond.name.toLowerCase().includes(req.body.searchItem.toLowerCase()))
    res.status(StatusCodes.OK).json(filteredBonds);

}

const retrieveAllBonds = async(req, res)=>{
    const allRetreievedBonds = await StoreAllBondsModel.find({});

    res.status(StatusCodes.OK).json(allRetreievedBonds);
}

// Storing all bonds in MongoDB
const storeAllBonds = async(req, res)=>{
    res.send("Store all bonds")

    // try {
    //     await StoreAllBondsModel.insertMany(allBonds)
    //     res.send("All Bonds stored successfully");
        
    // } catch (error) {
    //     console.log(error)
        
    // }
}


// exporting stocks controllers
module.exports = {
    getAllBonds,
    getBond,
    createBond,
    updateBond,
    deleteBond,
    searchABond,
    storeAllBonds,
    retrieveAllBonds
}


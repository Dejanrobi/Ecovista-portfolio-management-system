// This is a stocks controller

// Importing the models
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const StocksModel = require("../models/Stocks");
const { allStocks } = require("./data");

// Get all stocks
const getAllStocks = async(req, res)=>{
    
    const allStocks = await StocksModel.find({});
    res.status(StatusCodes.OK).json(allStocks);
}

// Get a single stock
const getStock = async(req, res)=>{
    const { id:stockId } = req.params;
    // console.log("Stock Id: ", stockId);

    // setting a string stock Id
    const stringStockId = String(stockId)
    const singleStock = await StocksModel.findById({_id:stockId});   

    // // returning the stock details if its found
    res.status(StatusCodes.OK).json(singleStock);
    // res.json({stockId})

}

// Create a Stock
const createStock = async(req, res)=>{



    const { stockName:name, quantity, buyPrice, datePurchased:purchaseDate } = req.body;
    
    // Validations
    if(!name){
        throw new BadRequestError("Please provide the stock's name");
    }
    // Validations
    if(!quantity){
        throw new BadRequestError("Please provide the stock's quantity");
    }
    // Validations
    if(!buyPrice){
        throw new BadRequestError("Please set the stock's buying price");
    }
    if(!purchaseDate){
        throw new BadRequestError("Please set the stock's purchase date");
    }
    
    
    const createdStock = await StocksModel.create({
        name,
        quantity,
        buyPrice,
        purchaseDate
    });

    res.status(StatusCodes.OK).json(createdStock);

    
}


// Update a Stock
const updateStock = async(req, res)=>{

    const{ id:stockId } = req.params;
    // finding the stock and updating it
    const updatedStock = await StocksModel.findByIdAndUpdate({_id: stockId}, req.body, {new:true, runValidators:true});

    res.status(StatusCodes.OK).json(updatedStock);
}


// Delete a Stock
const deleteStock = async(req, res)=>{
    const {id:stockId} = req.params;

    // finding the stock and deleting it.
    const deletedStock = await StocksModel.findByIdAndRemove({_id:stockId})

    res.status(StatusCodes.OK).json({msg: `Stock with id: ${stockId} deleted successfully`})
}

// Search a stock
const searchAStock = async(req, res)=>{
    // filter stocks
    const filteredStocks = allStocks.filter(stock => stock.name.toLowerCase().includes(req.body.searchItem.toLowerCase()))
    // console.log(req.body)
    res.status(StatusCodes.OK).json(filteredStocks)
}


// exporting stocks controllers
module.exports = {
    getAllStocks,
    getStock,
    createStock,
    updateStock,
    deleteStock,
    searchAStock
}


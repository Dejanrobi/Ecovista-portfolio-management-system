// This is a stocks controller

// Importing the models
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const StocksModel = require("../models/Stocks");
const { allStocks } = require("./data");
const FetchStocksModel = require("../models/FetchStockData");

// Get all stocks
const getAllStocks = async(req, res)=>{
    
    const { userId } = req.user;

    const allStocks = await StocksModel.find({currentUser:userId}).populate('companyId');
    res.status(StatusCodes.OK).json(allStocks);
}

// Get a single stock
const getStock = async(req, res)=>{
    const { userId } = req.user;
    
    const { id:stockId } = req.params;
    // console.log("Stock Id: ", stockId);

    // setting a string stock Id
    const stringStockId = String(stockId)
    const singleStock = await StocksModel.findById({_id:stockId, currentUser:userId}).populate('companyId');   

    // // returning the stock details if its found
    res.status(StatusCodes.OK).json(singleStock);
    // res.json({stockId})

}

// Create a Stock
const createStock = async(req, res)=>{

    const  currentUser = req.user;

    const { stockName:name, quantity, buyPrice, datePurchased:purchaseDate, companyId } = req.body;
    
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
        currentUser: currentUser.userId,
        name,
        quantity,
        buyPrice,
        purchaseDate,
        companyId
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

    const  currentUser = req.user;
    const{ id:stockId } = req.params;

    // finding the stock and deleting it.
    const deletedStock = await StocksModel.findByIdAndRemove({_id:stockId, currentUser:currentUser})

    res.status(StatusCodes.OK).json(deletedStock)
}

// Search a stock
const searchAStock = async(req, res)=>{
    // filter stocks
    const filteredStocks = allStocks.filter(stock => stock.name.toLowerCase().includes(req.body.searchItem.toLowerCase()))
    // console.log(req.body)
    res.status(StatusCodes.OK).json(filteredStocks)
}

// Retrieve all stocks from the database.
const retrieveAllStocks = async(req, res)=>{
    // retrieve all stocks
    const allRetrievedStocks = await FetchStocksModel.find({})
    res.status(StatusCodes.OK).json(allRetrievedStocks);
}

const fetchAllStocks = async(req, res)=>{
//    try {
//     // fetch data from the API
//     const API_URL="https://financialmodelingprep.com/api/v3/stock-screener?priceMoreThan=150&exchange=NASDAQ,NYSE&apikey=d97b2f08a9a36a89179abfa4fb580330";
    
//     const response = await fetch(API_URL);
//     const data = await response.json();

//     // Store the data in Mongo DB
//     await FetchStocksModel.insertMany(data);

//     res.send('Data fetched and stored successfully');
//    } catch (error) {
//      console.error('Error fetching and storing data: ', error);
//      res.status(500).send('Error fetching and storing data')    
//    }
    res.status(500).send("hello");
}


// exporting stocks controllers
module.exports = {
    getAllStocks,
    getStock,
    createStock,
    updateStock,
    deleteStock,
    searchAStock,
    fetchAllStocks,
    retrieveAllStocks
}


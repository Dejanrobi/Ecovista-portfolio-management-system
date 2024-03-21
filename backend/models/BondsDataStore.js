require("dotenv").config();
const mongoose = require('mongoose');

// Fetch and store a stocks data

const StoreAllBondsSchema = new mongoose.Schema({
    symbol: String,
    etfName: String,
    totalAssets: String,
    YTD: String,
    avgVolume: String,
    closingPrice: String,
    oneDayChange: String,
    oneWeek: String,
    fourWeek: String,
    oneYear: String,
    threeYear: String,
    fiveYear: String,
    ytdff: String,
    oneWeekff: String,
    fourWeekff: String,
    oneYearff: String,
    threeYearff: String,
    fiveYearff: String,
    etfDatabaseCategory: String,
    inception: String,
    ER: String,
    commissionFree: String,
    annualdividendRate: String,
    dividendDate: String,
    dividend: String,
    annualDividendYieldPercentage: String,
    peRatio: String,
    beta: String,
    noOfHoldings: String,
    percentageInTop10: String,
    stCapGainRate: String,
    ltCapGainRate: String,
    taxForm: String,
    ltCapGainRate: String,
    lowerBollinger: String,
    upperBollinger: String,
    support1: String,
    resistance1: String,
    RSI: String,
    overallRating: String,
    liquidityRating: String,
    expensesRating: String,
    returnsRating: String,
    volatilityRating: String,
    dividendRating: String,
    concentrationRating: String,
    esgScore: String,
    esgScorePeerPercentile: String,
    esgScoreGlobalPercentile: String,
    carbonIntensity: String,
    sriExclusionCriteria: String,
    sustainableImpactSolutions: String,
})


const StoreAllBondsModel = mongoose.model('StoreAllBonds', StoreAllBondsSchema);

module.exports = StoreAllBondsModel;
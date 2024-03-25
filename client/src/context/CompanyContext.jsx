import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const CompanyContext = createContext();
    


const CompanyContextProvider = ({children})=>{

    const [mainUser, setMainUser] = useState(false);

    const [appHeaders, setAppHeaders] = useState('');

    const [entirePageLoading, setEntirePageLoading] = useState(true);
    
    const getHeaders=()=>{
        // obtain data from the local storage
        const ecoVistaToken = localStorage.getItem('https://www.ecovistaportfoliomanagement.com/-token');
        
       //  No token, set the user to false
        if(!ecoVistaToken){
           return setMainUser(false)
           // return
        }

       //  create the header 
       const ecoVistaHeader ={
           headers:{
               Authorization: `Bearer ${ecoVistaToken}`,
           },
       }
       // console.log(airbnbHeader)
       return ecoVistaHeader;


   }

   useEffect(()=>{
        setAppHeaders(getHeaders())
   },[])
    
   
    
    // Retrieved Stocks
    const [allRetrievedStocks, setAllRetrievedStocks] = useState([]);


    // fetch all retrieved stocks
    const fetchAllRetrievedStocks=async()=>{
        try {
            const { data } = await axios.get('/stocks/retrieve-all-stocks', appHeaders);

            setAllRetrievedStocks(data);
            
        } catch (error) {
            console.log(error)
        }

    }
   

    // Retrieving all added stocks from the backend
    const [allStocks, setAllStocks] = useState([]);
    const [notChangeData, setNotChangeData] = useState([]);

    const getAllStocks= async()=>{
        const { data } = await axios.get('/stocks', appHeaders)

        setAllStocks(data);
        setNotChangeData(data);
        // console.log("All stocks: ", data)
    }


//     //Fetching all Retrieved bonds
    const [allRetrievedBonds, setAllRetrievedBonds] = useState([]);

    const fetchAllRetrievedBonds=async()=>{
        try {
            const { data } = await axios.get('/bonds/retrieve-all-bonds', appHeaders);
            setAllRetrievedBonds(data);
            // console.log("All Bonds: ", data);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    // Getting all added bonds
    // Retrieving all added from the backend
    const [allBonds, setAllBonds] = useState([]);
    const [notChangedBonds, setNotChangedBonds] = useState([]);

    const getAllBonds = async()=>{
        const { data } = await axios.get('/bonds', appHeaders);

        setAllBonds(data);
        setNotChangedBonds(data)

        // console.log("All Bonds: ", data);
    }


    // Retrieving all added properties
    // Retrieving all properties
    const [allProperties, setAllProperties] = useState([]);
    const [notChangedProperties, setNotChangedProperties] = useState([]);

    const getAllProperties = async()=>{
        const { data } = await axios.get('/real-estate', appHeaders);

        setAllProperties(data)
        setNotChangedProperties(data)

        console.log("All Properties: ", data)
    }
    
    
    
    


    
    const getMainUser=async()=>{
        setEntirePageLoading(true)
               
        
        const ecoVistaHeader = getHeaders()
        // authenticating the user and checking the authorization
        // making a request to the server
        if(ecoVistaHeader){
            try {
                const {data} = await axios.get('/auth/profile', ecoVistaHeader);
    
                
                setMainUser(data)    
                
                // console.log(data)
                setEntirePageLoading(false)    
            } catch (error) {
                setMainUser(false) 
                setEntirePageLoading(false)         
            }
        }else{
            console.log("No Header")
            setEntirePageLoading(false)   
        }
  
    }


    useEffect(()=>{   
        
        getMainUser()
        
             

    },[])

    // OVERALL CALCULATIONS
    const [totalStocksValue, setTotalStocksValue] = useState(0);
    const [totalStocksInvestmentAmount, setTotalStocksInvestmentAmount] = useState(0)
    const [totalStockCapitalGains, setTotalStocksCapitalGains] = useState(0);
    
    useEffect(()=>{
        // console.log(allStocks)
        const totalStValue =  allStocks.reduce((acc, currentItem)=>{
            return acc + (currentItem?.quantity * currentItem?.companyId?.price)
        },0)

        setTotalStocksValue(totalStValue.toFixed(2));

        const totalInvAmount = allStocks.reduce((acc, currentItem)=>{
            return acc + (currentItem?.quantity * currentItem?.buyPrice)
        },0)

        setTotalStocksInvestmentAmount(totalInvAmount.toFixed(2))

        const totalCapGains = totalStValue-totalInvAmount
        setTotalStocksCapitalGains(totalCapGains.toFixed(2));

    },[allStocks])


    // BONDS OVERALL CALCULATIONS
    const [totalBondsCurrentValue, setTotalBondsCurrentValue] = useState(0)
    const [totalBondsFaceValue, setTotalBondsFaceValue] = useState(0)
    const [totalBondsCapitalGainsValue, setTotalBondsCapitalGainsValue] = useState(0)
    const [totalBondAnnualInterest, setTotalBondAnnualInterest] = useState(0)
    const [averageBondCouponRate, setAverageBondCouponRate]= useState(0)

    useEffect(()=>{

        const totalBndCdValue =  allBonds.reduce((acc, currentItem)=>{
            return acc + (currentItem?.quantity * currentItem?.bondId?.closingPrice)
        },0)

        setTotalBondsCurrentValue(totalBndCdValue.toFixed(2));

        const totalBndFcValue =  allBonds.reduce((acc, currentItem)=>{
            return acc + (currentItem?.quantity * currentItem?.purchasePrice)
        },0)

        setTotalBondsFaceValue(totalBndFcValue.toFixed(2))

        const totalBndCGaiValue =  totalBndCdValue - totalBndFcValue;
        setTotalBondsCapitalGainsValue(totalBndCGaiValue);

        const totalBondAnuInterest =  allBonds.reduce((acc, currentItem)=>{
            return acc + ((currentItem?.quantity * currentItem?.purchasePrice)*(currentItem?.couponRate/100))
        },0)

        setTotalBondAnnualInterest(totalBondAnuInterest.toFixed(2));


       

        const avgBond = allBonds.reduce((accumulator, currentValue, currentIndex, array) => {
            accumulator += currentValue.couponRate;
            if (currentIndex === array.length - 1) {
                return accumulator / array.length;
            } else {
                return accumulator;
            }
        }, 0);

        setAverageBondCouponRate(avgBond.toFixed(2));


    },[allBonds])

    // REAL ESTATE OVERALL CALCULATIONS
    // const [rentAverageOccupancyRate, setRentAverageOccupancyRate] = useState(0);
    const [totalRentalIncome, setTotalRentalIncome] = useState(0);
    const [totalMortgagePayment, setTotalMortgagePayment] = useState(0);
    const [totalAverageOccupancyRate, setTotalAverageOccupancyRate] = useState(0)
    const [totalApartmentExpenses, setTotalApartmentExpenses] = useState(0);
    
    function calculateTotalAmountForCurrentMonth(expenses) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
        let totalAmount = 0;
    
        expenses.forEach(expense => {
        const expenseDate = new Date(expense.date);
        const expenseMonth = expenseDate.getMonth() + 1;
    
        if (expenseMonth === currentMonth) {
            totalAmount += expense.amount;
        }
        });
    
        return totalAmount;
    }

    useEffect(()=>{
        const totRentIncome =  allProperties.reduce((acc, currentItem)=>{
            const lastOccupiedUnits = currentItem.noOfOccupiedUnits[currentItem.noOfOccupiedUnits.length-1]
            const lastAmount = currentItem.rentPerUnitPerUnit[currentItem.rentPerUnitPerUnit.length-1];
            // console.log(lastOccupiedUnits?.noOfOccupiedUnits)
            // console.log(lastAmount?.rentAmount)
            return acc + ( (lastOccupiedUnits?.noOfOccupiedUnits?lastOccupiedUnits.noOfOccupiedUnits:0) * (lastAmount?.rentAmount?lastAmount.rentAmount:0))
        },0)
        setTotalRentalIncome(totRentIncome.toFixed(2));
        // console.log(totRentIncome)

        const totalMortPayment =  allProperties.reduce((acc, currentItem)=>{
            return acc + (currentItem?.monthlyMortgagePayment)
        },0)
        setTotalMortgagePayment(totalMortPayment.toFixed(2));

       

        const avgOcRate = allProperties.reduce((accumulator, currentValue, currentIndex, array) => {
            const lastOccupiedUnits = currentValue.noOfOccupiedUnits[currentValue.noOfOccupiedUnits.length-1]
            const percentOccupiedUnits = ((lastOccupiedUnits?.noOfOccupiedUnits?lastOccupiedUnits.noOfOccupiedUnits:0)/currentValue.noOfUnits)*100
            // console.log(`${currentIndex}: ${percentOccupiedUnits}`)
            accumulator += (percentOccupiedUnits);
            if (currentIndex === array.length - 1) {
                return accumulator / array.length;
            } else {
                return accumulator;
            }
        }, 0);

        setTotalAverageOccupancyRate(avgOcRate.toFixed(2))

        // console.log("Avg OccupiedUnits: ", avgOcRate)

        const totalMontExpenses =  allProperties.reduce((acc, currentItem)=>{
            return acc + (currentItem?.expenses?.length > 0? calculateTotalAmountForCurrentMonth(currentItem?.expenses):(0))
        },0)

        setTotalApartmentExpenses(totalMontExpenses.toFixed(2));


    },[allProperties])

    useEffect(()=>{
        if(appHeaders){
            getAllBonds();
            getAllProperties();
            getAllStocks();
        }

    },[appHeaders])

    return(
        <CompanyContext.Provider
            value={{
                fetchAllRetrievedStocks,
                allRetrievedStocks,
                allStocks,
                setAllStocks,
                notChangeData,
                setNotChangeData,
                getAllStocks,

                allRetrievedBonds,
                fetchAllRetrievedBonds,
                allBonds,
                setAllBonds,
                notChangedBonds,
                setNotChangedBonds,
                getAllBonds,

                allProperties,
                setAllProperties,
                notChangedProperties,
                setNotChangedProperties,
                getAllProperties,

                

                entirePageLoading,
                setEntirePageLoading,

                mainUser,
                getHeaders,

                totalStocksValue,
                setTotalStocksValue,
                totalStocksInvestmentAmount,
                setTotalStocksInvestmentAmount,
                totalStockCapitalGains,
                setTotalStocksCapitalGains,

                totalBondsCurrentValue,
                totalBondsFaceValue,
                totalBondsCapitalGainsValue,
                totalBondAnnualInterest,
                averageBondCouponRate,

                totalRentalIncome,
                totalMortgagePayment,
                totalAverageOccupancyRate,
                totalApartmentExpenses



            }}
        >
            {children}
        </CompanyContext.Provider>
    )
}

export const CompanyGlobalContext=()=>{
    return useContext(CompanyContext)
}

export { CompanyContextProvider }
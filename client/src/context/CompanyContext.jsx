import React, { createContext, useContext, useState } from "react";
import axios from 'axios';

const CompanyContext = createContext();


const CompanyContextProvider = ({children})=>{
   
    // Retrieved Stocks
    const [allRetrievedStocks, setAllRetrievedStocks] = useState([]);


    // fetch all retrieved stocks
    const fetchAllRetrievedStocks=async()=>{

        try {
            const { data } = await axios.get('/stocks/retrieve-all-stocks');

            setAllRetrievedStocks(data);
            
        } catch (error) {
            console.log(error)
        }

    }

    

    // Retrieving all added stocks from the backend
    const [allStocks, setAllStocks] = useState([]);
    const [notChangeData, setNotChangeData] = useState([]);

    const getAllStocks= async()=>{
        const { data } = await axios.get('/stocks')

        setAllStocks(data);
        setNotChangeData(data);
        // console.log("All stocks: ", data)
    }

    //Fetching all Retrieved bonds
    const [allRetrievedBonds, setAllRetrievedBonds] = useState([]);

    const fetchAllRetrievedBonds=async()=>{
        try {
            const { data } = await axios.get('/bonds/retrieve-all-bonds');
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
        const { data } = await axios.get('/bonds');

        setAllBonds(data);
        setNotChangedBonds(data)

        console.log("All Bonds: ", data);
    }




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
                getAllBonds


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
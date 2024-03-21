import React, { useEffect, useState } from 'react'

import { stocksData } from '../../Data/data'

import axios from "axios";

// CSS
import "./TableLayout.css"
import { Link } from 'react-router-dom'
import { CompanyGlobalContext } from '../../context/CompanyContext';

const TableLayout = ({openPopup}) => {

    const { allStocks,
        setAllStocks,
        notChangeData,
        setNotChangeData,
        getAllStocks } = CompanyGlobalContext();

    // // Fetching the stocks.
    // const fetchStocks = ()=>{

    //     const search_call = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=microsoft&apikey=LLO3LCAW8O27B693"
    //     const individual_stock_call = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=LLO3LCAW8O27B693"
    //     const API_KEY = 'LLO3LCAW8O27B693';
    //     let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=${API_KEY}`

    //     fetch(API_Call)
    //         .then(
    //             function(response){
    //                 return response.json();
    //             }
    //         )
    //         .then(
    //             function(data){
    //                 console.log(data)
    //             }
    //         )
    // }

    // useEffect(()=>{
    //     fetchStocks();
    // },[])

    

    // tableSearchInput
    const [searchInput, setSearchInput] = useState('');

    

    // filter stock items
    const filterStockItems=()=>{
        const filteredStocks = notChangeData.filter((stock)=> stock.name.toLowerCase().includes(searchInput.toLowerCase()))
        setAllStocks(filteredStocks);
        // console.log(filteredStocks)

    }

    useEffect(()=>{
        getAllStocks();
    },[])

    useEffect(()=>{
        filterStockItems();
    },[searchInput])
  
    return (
    <div>
      <table className='stocks-table'>

            
            <thead>
                <tr>
                    <th colSpan="8">
                        <div className="other-heads">
                            <div className='search'>
                                <div className='icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                    </svg>

                                </div>
                                <input 
                                    placeholder='Search'
                                    onChange={(e)=>setSearchInput(e.target.value)}
                                 />
                            </div> 

                            
                                <button onClick={openPopup} className='add-stock-btn tiny-head'>ADD A STOCK</button>
                           

                        </div>
                        

                    </th>               
                </tr>
                               
                <tr>
                    <th >Symbol</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Buy Price</th>
                    <th>Current Price</th>
                    <th>Current Value</th>
                    <th>Capital Gain</th>
                    <th>% Gain</th>
                </tr>
            </thead>
            <tbody>
                {allStocks.map((stock, index) => {
                    const buyValue = (stock.quantity * stock.buyPrice)
                    const currentValue = Number(stock.quantity * stock.companyId.price)
                    const capitalGains = currentValue - (stock.quantity*stock.buyPrice)
                    let percentageGain = (capitalGains/(currentValue))*100

                    if (capitalGains <0){
                        percentageGain = (capitalGains/buyValue)*100
                    }
                    return (
                        <tr key={index}>
                        
                                <td >
                                    <Link to={`/stocks/${stock._id}`} className='symbol'>{stock.companyId.symbol}</Link>                                
                                    {/* <Link to={`/stocks/${stock._id}`} className='symbol'>{stock.name.substring(0,4).toUpperCase()}</Link>                                 */}
                                </td>
                                <td>{stock.name}</td>
                                <td>{stock.quantity}</td>
                                <td>${stock.buyPrice}</td>
                                <td>${stock.companyId.price}</td>
                                <td>${currentValue.toFixed(2)}</td>
                                <td className={`${capitalGains>0?'green-color':'red-color'}`} >${capitalGains.toFixed(2)}</td>
                                <td className={`percentage-gain ${percentageGain>0?'green-color':'red-color'}`}>
                                    
                                    <div className='icon'> 
                                        {percentageGain>0 ?(
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
                                            </svg>
                                        ):(
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                                            </svg>

                                        )
                                        
                                        }
                                    </div>
                                    <div className='stk-table-text'>
                                        {percentageGain.toFixed(2)}%
                                    </div>
                                    
                                
                                </td>
                            
                            
                        </tr>
                    )
                }
                    
                   
                    
                )}
            </tbody>
        </table>
    </div>
  )
}

export default TableLayout

import React, { useEffect, useState } from 'react'

// CSS
import "./AddStock.css";
import axios from 'axios';
// import { searchedStocks } from '../../Data/data';
import { loadingRound } from '../../assets/assets';

import loadinggif from '../../assets/loadinground.gif'
import { CompanyGlobalContext } from '../../context/CompanyContext';

const AddStock = ({closePopup}) => {

    // company context
    const { allRetrievedStocks, getAllStocks, getHeaders } = CompanyGlobalContext();

    const ecoVistaHeaders = getHeaders();
 
    const [error, setError]= useState('');
    
    useEffect(()=>{
        console.log(error)

        setTimeout(() => {
            setError('')
        }, 2000);
    },[error])
    // Input values
    const [companyId, setCompanyId] = useState('');
    const [stockName, setStockName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [buyPrice, setBuyPrice] = useState('');
    const [datePurchased, setDatePurchased] = useState('');
    // console.log("Stock Name: ", stockName);
    // console.log("Quantity: ", quantity);
    // console.log("Buy Price: ", buyPrice);
    // console.log("Date Purchased: ", datePurchased);

    const submitAStock= async()=>{
        if(!stockName){
           return setError('Please enter a stock name')
        }
        if(!quantity){
            return setError('Please enter the stock quantity')
        }
        if(!buyPrice){
            return setError('Please enter the stock purchase price')
        }
        if(!datePurchased){
            return setError('Please enter the stock purchase date')
        }

        try {
            const {data} = await axios.post('/stocks', {
            
                stockName,
                quantity,
                buyPrice,
                datePurchased,
                companyId
            }, ecoVistaHeaders)
    
    
            console.log(data);
            getAllStocks();
            closePopup();
            
        } catch (error) {
            setError(error.response.data.msg)
            
        }

        




    }

    const API_KEY = 'LXVEB0O0Q5GK9FIA';
    // const API_CALL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=microsoft&apikey=${API_KEY}`

    const [loadingSearch, setLoadingSearch] = useState(false)
    const [noSearchItem, setNoSearchItem] = useState(false);

    const [stockSearchedInput, setStockSearchedInput] = useState ('');

    const [finalSearchedData, setFinalSearchedData] = useState([])

    // Find stocks
    const findSearchedStocks = async()=>{
        // if(!stockSearchedInput){
        //     setFinalSearchedData([])
        //     setNoSearchItem(false)
        //     return
        // }
       
        // setLoadingSearch(true)

        const finalData = allRetrievedStocks.filter(stock => stock.companyName.toLowerCase().trim().includes(stockSearchedInput.toLowerCase()))
        // console.log(finalData);
        
        // // const { data }  = await axios.post('/stocks/search-stock', {searchItem: stockSearchedInput});
        if(finalData.length > 0){
            setNoSearchItem(false)
            setFinalSearchedData(finalData);
            setLoadingSearch(false);
        }else{
        
            setFinalSearchedData([]);
            setNoSearchItem(true);
            setLoadingSearch(false);

        }
    
            
            
        

    }

    const executeSearch=(e)=>{
        
       
        setStockSearchedInput(e.target.value);
        if(!e.target.value){
            setFinalSearchedData([])
            setNoSearchItem(false)
            return
        }
        
       
        findSearchedStocks();

    }

    
    const handleKeyPress = (event)=>{
        if(event.key === 'Enter'){
            findSearchedStocks();
        }
    }

    const selectedCompany = (companyId)=>{
        const selectedItem = finalSearchedData.filter((stock)=> stock._id === companyId)
        setCompanyId(selectedItem[0]._id)
        setStockName(selectedItem[0].companyName)
        setFinalSearchedData([])
        // console.log("Selected item: ", selectedItem[0])
        // console.log("Company Id: ", companyId);
        // console.log('Company name: ', stockName)

    }
    



  return (
    <div className='add-stock-component'>
        <div className="add-stock-modal">
            <div className="add-stock-modal-div">
                    {
                        error && (
                            <p className='error-text'>{error}</p>
                        )
                    }
                <div className='add-stock-head'>
                    
                    
                    <div >

                        <h2>Add a Stock</h2>
                        <p>Add a stock that you’ve just purchased</p>
                    </div>
                    <div className='close-icon' onClick={closePopup} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </div>
                </div>
                
                <div className='search-container'> 
                    <div className="search-div">
                        <input type='text' placeholder='Search for stock'
                            
                            value={stockSearchedInput}
                            onChange={(e)=>{executeSearch(e)}}
                            // onKeyPress={handleKeyPress}
                        />

                        {
                            loadingSearch ? (
                                <div className="search-icon loading-gif">
                                    <img src={loadinggif} alt="" />
                                </div>
                            ):(
                                <div className='search-icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>
                                </div>

                            )
                        }

                       
                    
                    </div>
                    {
                       finalSearchedData.length> 0 &&(
                        <div className='search-suggestions'>
                            {
                                finalSearchedData.map((stock, index)=>(
                                    <div className='stock-details' key={stock._id} onClick={()=>selectedCompany(stock._id)}>
                                        <div className='stock-region'>
                                            <p className='tiny-text'>{stock.symbol}</p>
                                            
                                        </div>
                                        <div className='stock-name'>
                                            <p className='tiny-head'>{stock.companyName}</p>                     
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                       ) 
                    }

                    {
                        noSearchItem && finalSearchedData.length==0 && (
                            <div className='search-suggestions no-search-item'>
                                <p className='tiny-text'>No searched stock</p>
                            </div>
                        )
                    }
                    {/* <div className='search-suggestions'>
                        {
                            finalSearchedData.length> 0 &&(
                                finalSearchedData.map((stock, index)=>(
                                    <div className='stock-details' key={index}>
                                        <div className='stock-region'>
                                            <p className='tiny-text'>{stock.region}</p>
                                            
                                        </div>
                                        <div className='stock-name'>
                                            <p className='tiny-head'>{stock.name}</p>                     
                                        </div>
                                    </div>
                                ))
                            )
                        }

                       
                    </div> */}
                </div>
                

                <div className="inputs-div">
                    <input 
                        type="text" 
                        disabled
                        placeholder='Stock name' 
                        value={stockName}
                        onChange={(e)=>setStockName(e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder='Quantity' 
                        value={quantity}
                        onChange={(e)=>setQuantity(e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder='Buy Price' 
                        value={buyPrice}
                        onChange={(e)=>setBuyPrice(e.target.value)}
                    />
                    <input 
                        type="date" 
                        placeholder='Date Purchased' 
                        value={datePurchased}
                        onChange={(e)=>setDatePurchased(e.target.value)}
                    />
                </div>

                <div className="add-stock-btn">
                    <button className='tiny-head' onClick={submitAStock}>ADD STOCK</button>
                </div>

            </div>

        </div>
      
    </div>
  )
}

export default AddStock

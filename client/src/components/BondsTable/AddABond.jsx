import React, { useEffect, useState } from 'react'


// CSS
import "./AddABond.css";
import axios from 'axios';

import loadinggif from "../../assets/loadinground.gif";
const AddABond = ({closePopup}) => {

    const [error, setError]= useState('');
    
    useEffect(()=>{
        // console.log(error)
        setTimeout(() => {
            setError('')
        }, 2000);
    },[error])

    // Input Values
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [couponRate, setCouponRate] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [maturityDate, setMaturityDate] = useState('');


    // Submit a Bond
    const submitABond = async()=>{
        if(!name){
            return setError("Please enter the bond's name");
        }
        if(!quantity){
            return setError("Please enter the bond's quantity");
        }
        if(!purchasePrice){
            return setError("Please enter the bond's Purchase price");
        }
        if(!couponRate){
            return setError("Please enter the bond's Coupon Rate");
        }
        if(!purchaseDate){
            return setError("Please enter the bond's Purchase Date");
        }
        if(!maturityDate){
            return setError("Please enter the bond's Maturity Date");
        }


        const {data} = await axios.post('/bonds', {
            name,
            quantity,
            purchasePrice,
            couponRate,
            purchaseDate,
            maturityDate
        })

        console.log(data);
    }

    const [loadingSearch, setLoadingSearch] = useState(false)
    const [noSearchItem, setNoSearchItem] = useState(false);

    const [bondSearchedInput, setBondSearchedInput] = useState ('');

    const [finalSearchedData, setFinalSearchedData] = useState([])

    // Find stocks
    const findSearchedBonds = async()=>{
        if(!bondSearchedInput){
            setFinalSearchedData([])
            setNoSearchItem(false)
            return
        }
        try {
            setLoadingSearch(true)
            
            const { data }  = await axios.post('/bonds/search-bond', {searchItem: bondSearchedInput});
           if(data.length > 0){
            setNoSearchItem(false)
            setFinalSearchedData(data);
            setLoadingSearch(false);
           }else{
            
            setFinalSearchedData([]);
            setNoSearchItem(true);
            setLoadingSearch(false);

           }
    
            
            
        } catch (error) {
            console.log(error)
        }

    }

    
    const handleKeyPress = (event)=>{
        if(event.key === 'Enter'){
            findSearchedBonds();
        }
    }

  return (
    <div className='add-stock-component'>
        <div className="add-stock-modal overflow-stock-modal">
            <div className="add-stock-modal-div ">
                    {
                        error && (
                            <p className='error-text'>{error}</p>
                        )
                    }
                <div className='add-stock-head'>
                    <div >
                        <h2>Add a Bond</h2>
                        <p>Add a bond that you’ve just purchased</p>
                    </div>
                    <div className='close-icon' onClick={closePopup} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </div>
                </div>
                
                <div className="search-container">
                    <div className="search-div">
                        <input type='text' placeholder='Search for bond'
                            value={bondSearchedInput}
                            onChange={(e)=>{setBondSearchedInput(e.target.value)}}
                            onKeyPress={handleKeyPress}
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
                                finalSearchedData.map((bond, index)=>(
                                    <div className='stock-details' key={index}>
                                        <div className='stock-region'>
                                            <p className='tiny-text'>{bond.symbol}</p>
                                            
                                        </div>
                                        <div className='stock-name'>
                                            <p className='tiny-head'>{bond.name}</p>                     
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

                </div>


                <div className="inputs-div add-bond-inputs">
                    
                    <input type="text" 
                        placeholder='Bond name' 
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <input type="number" 
                        placeholder='Quantity' 
                        value={quantity}
                        onChange={(e)=>setQuantity(e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder='Purchase Price' 
                        value={purchasePrice}
                        onChange={(e)=>setPurchasePrice(e.target.value)}
                    />
                    <input 
                        type="number" 
                        placeholder='Coupon Rate' 
                        value={couponRate}
                        onChange={(e)=>setCouponRate(e.target.value)}
                    />
                    <input 
                        type="date" 
                        placeholder='Date Purchased' 
                        value={purchaseDate}
                        onChange={(e)=>setPurchaseDate(e.target.value)}
                    />
                    <input 
                        type="date" 
                        placeholder='Maturity Date' 
                        value={maturityDate}
                        onChange={(e)=>setMaturityDate(e.target.value)}
                    />
                </div>

                <div className="add-stock-btn">
                    <button className='tiny-head' onClick={submitABond}>ADD BOND</button>
                </div>

            </div>

        </div>
      
    </div>
  )
}

export default AddABond

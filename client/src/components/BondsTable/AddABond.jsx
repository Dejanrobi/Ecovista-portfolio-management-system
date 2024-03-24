import React, { useEffect, useState } from 'react'


// CSS
import "./AddABond.css";
import axios from 'axios';

import loadinggif from "../../assets/loadinground.gif";
import { CompanyGlobalContext } from '../../context/CompanyContext';
const AddABond = ({closePopup}) => {
    const {allRetrievedBonds, getAllBonds, getHeaders } = CompanyGlobalContext();

    const ecoVistaHeaders = getHeaders();
    
    const [error, setError]= useState('');
    
    useEffect(()=>{
        // console.log(error)
        setTimeout(() => {
            setError('')
        }, 2000);
    },[error])

    // Input Values
    const [bondId, setBondId] = useState('');
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


        try {
            const {data} = await axios.post('/bonds', {
                name,
                quantity,
                purchasePrice,
                couponRate,
                purchaseDate,
                maturityDate,
                bondId
            }, ecoVistaHeaders)
    
            console.log(data);
            getAllBonds();
            closePopup();
            
        } catch (error) {
            setError(error.response.data.msg)
            
        }
        
    }

    const [loadingSearch, setLoadingSearch] = useState(false)
    const [noSearchItem, setNoSearchItem] = useState(false);

    const [bondSearchedInput, setBondSearchedInput] = useState ('');

    const [finalSearchedData, setFinalSearchedData] = useState([])

    // Find stocks
    const findSearchedBonds = async()=>{

        const finalBondsData = allRetrievedBonds.filter(bond => bond.etfName.toLowerCase().includes(bondSearchedInput.toLowerCase()))
        // console.log(finalBondsData);
        if(finalBondsData.length > 0){
            setNoSearchItem(false)
            setFinalSearchedData(finalBondsData);
            setLoadingSearch(false)
        }else{
            setFinalSearchedData([]);
            setNoSearchItem(true);
            setLoadingSearch(false);
        }


    }

    
    const executeSearch=()=>{
        // console.log(e.target.value)
        
        if(!bondSearchedInput){
            setFinalSearchedData([]);
            setNoSearchItem(false);
            return
        }
        findSearchedBonds();
    }

    useEffect(()=>{
        executeSearch()
    },[bondSearchedInput])
    // const handleKeyPress = (event)=>{
    //     if(event.key === 'Enter'){
    //         findSearchedBonds();
    //     }
    // }

    const selectedBond = (bondId)=>{
        const selectedItem = finalSearchedData.filter((bond)=> bond._id === bondId);

        setBondId(selectedItem[0]._id);
        setName(selectedItem[0].etfName);
        setFinalSearchedData([]);
        // console.log("BondId: ", bondId);
        // console.log("Bond name: ", name)
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
                                    <div className='stock-details' key={bond._id} onClick={()=>selectedBond(bond._id)}>
                                        <div className='stock-region'>
                                            <p className='tiny-text'>{bond.symbol}</p>
                                            
                                        </div>
                                        <div className='stock-name'>
                                            <p className='tiny-head'>{bond.etfName}</p>                     
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
                        disabled
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

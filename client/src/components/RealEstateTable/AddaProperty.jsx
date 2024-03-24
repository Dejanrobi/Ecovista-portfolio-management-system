import React, { useEffect, useState } from 'react'

import "./AddProperty.css"
import axios from 'axios';
import { CompanyGlobalContext } from '../../context/CompanyContext';

const AddaProperty = ({closePopup, getAllProperties}) => {

    const { getHeaders } = CompanyGlobalContext()
    const ecoVistaHeaders = getHeaders();

    const [error, setError]= useState('');
    
    useEffect(()=>{
        // console.log(error)
        setTimeout(() => {
            setError('')
        }, 2000);
    },[error])


    // Input values
    const [name, setName] = useState('');
    const [noOfUnits, setNoOfUnits] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [amountLoaned, setAmountLoaned] = useState('');
    const [monthlyMortgagePayment, setMonthlyMortgagePayment] = useState('');
    const [datePurchased, setDatePurchased] = useState('');


    // Submit a property
    const submitAProperty = async()=>{
        if(!name){
            return setError("Please enter the property's name");
        }
        if(!noOfUnits){
            return setError("Please enter the property's No of Units");
        }
        if(!purchasePrice){
            return setError("Please enter the property's Purchase Price");
        }
        if(!amountLoaned){
            return setError("Please enter the property's Loaned Amount");
        }
        if(!monthlyMortgagePayment){
            return setError("Please enter the property's Monthly Mortgage Payment");
        }
        if(!datePurchased){
            return setError("Please enter the property's purchase date");
        }

        try {
            const { data } = await axios.post('/real-estate', {
                name,
                noOfUnits,
                purchasePrice,
                amountLoaned,
                monthlyMortgagePayment,
                datePurchased
            }, ecoVistaHeaders)
    
            console.log(data);
            getAllProperties()
            closePopup()
            
        } catch (error) {
            setError(error.response.data.msg)
            
        }

        
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
                        <h2>Add a Property</h2>
                        <p>Add a Property that you have just purchased </p>
                    </div>
                    <div className='close-icon' onClick={closePopup} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </div>
                </div>
                

                

                <div className="inputs-div add-property-inputs">
                    <input type="text" 
                        placeholder='Property name' 
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                    />
                    <input type="number" 
                        placeholder='No. of Units' 
                        value={noOfUnits}
                        onChange={(e)=> setNoOfUnits(e.target.value)}
                    />
                    <input type="number" 
                        placeholder='Purchase Price' 
                        value={purchasePrice}
                        onChange={(e)=> setPurchasePrice(e.target.value)}
                    />
                    <input type="number" 
                        placeholder='Amount Loaned' 
                        value={amountLoaned}
                        onChange={(e)=> setAmountLoaned(e.target.value)}
                    />
                    <input type="number" 
                        placeholder='Monthly Mortgage Payment' 
                        value={monthlyMortgagePayment}
                        onChange={(e)=> setMonthlyMortgagePayment(e.target.value)}
                    />
                    <input type='date' 
                        placeholder='Date purchased' 
                        value={datePurchased}
                        onChange={(e)=> setDatePurchased(e.target.value)}
                    />
                    
                    
                </div>

                <div className="add-stock-btn">
                    <button className='tiny-head' onClick={submitAProperty}>ADD PROPERTY</button>
                </div>

            </div>

        </div>
    
    </div>
  )
}

export default AddaProperty

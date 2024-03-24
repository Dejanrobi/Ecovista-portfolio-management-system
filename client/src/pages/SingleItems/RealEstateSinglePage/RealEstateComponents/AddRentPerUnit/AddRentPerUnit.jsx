import React, { useEffect, useState } from 'react'

// CSS
import "./AddRentPerUnit.css";
import axios from 'axios';
import { CompanyGlobalContext } from '../../../../../context/CompanyContext';

const AddRentPerUnit = ({getSingleApartment, closePopup, apartmentId}) => {

    const { getHeaders } = CompanyGlobalContext();
    const ecoVistaHeaders = getHeaders();
  
    const [error, setError]= useState('');
    
    useEffect(()=>{
        // console.log(error)
        setTimeout(() => {
            setError('')
        }, 2000);
    },[error])

    // inputValues
    const [date, setDate] = useState('')
    const [rentAmount, setRentAmount] = useState('')

    // Submit Rent Amount
    const submitRentAmount = async()=>{
        if(!date){
            return setError("Please enter the Date");
        }
        if(!rentAmount){
            return setError("Please enter the Rent Amount");
        }

        try {
            const { data } = await axios.patch(`real-estate/${apartmentId}/rent-amount`, {
                date,
                rentAmount
            }, ecoVistaHeaders)
            console.log(data);
            await getSingleApartment();
            closePopup()

            
            
        } catch (error) {
            setError(error.response.data.msg)
            // console.log(error)
            
        }
    }

  
    return (
    <div className='add-stock-component'>
        <div className="add-stock-modal add-no-of-occupied-units-modal">
            <div className="add-stock-modal-div">

                    {
                        error && (
                            <p className='error-text'>{error}</p>
                        )
                    }
                <div className='add-stock-head'>
                    <div >
                        <h2>Rent Per Unit</h2>
                        <p>Set the rental amount per unit</p>
                    </div>
                    <div className='close-icon' onClick={closePopup} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </div>
                </div>
                

                

                <div className="inputs-div inputs-div-no-of-occupied-units">
                    <input type="date" placeholder='Date' 
                        value={date}
                        onChange={(e)=>setDate(e.target.value)}
                    />
                    <input type="number" placeholder='Amount' 
                        value={rentAmount}
                        onChange={(e)=>setRentAmount(e.target.value)}                 
                    />
                    
                </div>

                <div className="add-stock-btn add-stock-btn-no-of-occupied-units">
                    <button className='tiny-head' onClick={submitRentAmount}>SET</button>
                </div>

            </div>

        </div>

    </div>
  )
}

export default AddRentPerUnit

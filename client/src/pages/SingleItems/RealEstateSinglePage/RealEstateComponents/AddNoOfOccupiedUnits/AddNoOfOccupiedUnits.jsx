import React, { useEffect, useState } from 'react'

// CSS
import "./AddNoOfOccupiedUnits.css";
import axios from 'axios';
import { CompanyGlobalContext } from '../../../../../context/CompanyContext';

const AddNoOfOccupiedUnits = ({ getSingleApartment,closePopup, apartmentId}) => {

    const { getHeaders } = CompanyGlobalContext();
    const ecoVistaHeaders = getHeaders();

    const [error, setError]= useState('');
    
    useEffect(()=>{
        // console.log(error)
        setTimeout(() => {
            setError('')
        }, 2000);
    },[error])

    // input values
    const [date, setDate] = useState('')
    const [noOfOccupiedUnits, setNoOfOccupiedUnits] = useState('')

    // submit Number of occupied units
    const submitNoOffOccupiedUnits= async()=>{

        if(!date){
            return setError("Please enter the date");
        }

        if(!noOfOccupiedUnits){
            return setError("Please enter the No. of Occupied units");
        }

        try {
            const { data } = await axios.patch(`/real-estate/${apartmentId}/no-of-occupied-units`, {
                date,
                noOfOccupiedUnits
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
                        <h2>No off Occupied Units</h2>
                        <p>Set the number of occupied units</p>
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
                    <input type="number" placeholder='No. of Occupied Units'
                        value={noOfOccupiedUnits}
                        onChange={(e)=>setNoOfOccupiedUnits(e.target.value)}
                    />
                    
                </div>

                <div className="add-stock-btn add-stock-btn-no-of-occupied-units">
                    <button className='tiny-head' onClick={submitNoOffOccupiedUnits}>SET</button>
                </div>

            </div>

        </div>
    
    </div>
  )
}

export default AddNoOfOccupiedUnits

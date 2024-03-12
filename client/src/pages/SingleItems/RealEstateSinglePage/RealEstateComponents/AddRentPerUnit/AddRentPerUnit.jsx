import React from 'react'

// CSS
import "./AddRentPerUnit.css";

const AddRentPerUnit = ({closePopup}) => {
  return (
    <div className='add-stock-component'>
        <div className="add-stock-modal add-no-of-occupied-units-modal">
            <div className="add-stock-modal-div">
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
                    <input type="date" placeholder='Date' />
                    <input type="number" placeholder='Amount' />
                    
                </div>

                <div className="add-stock-btn add-stock-btn-no-of-occupied-units">
                    <button className='tiny-head'>SET</button>
                </div>

            </div>

        </div>

    </div>
  )
}

export default AddRentPerUnit

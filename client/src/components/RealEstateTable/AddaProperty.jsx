import React from 'react'

import "./AddProperty.css"

const AddaProperty = ({closePopup}) => {
  return (
    <div className='add-stock-component'>
        <div className="add-stock-modal">
            <div className="add-stock-modal-div">
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
                    <input type="text" placeholder='Property name' />
                    <input type="number" placeholder='No. of Units' />
                    <input type="number" placeholder='Purchase Price' />
                    <input type="number" placeholder='Amount Loaned' />
                    <input type="number" placeholder='Monthly Mortgage Payment' />
                    
                </div>

                <div className="add-stock-btn">
                    <button className='tiny-head'>ADD PROPERTY</button>
                </div>

            </div>

        </div>
    
    </div>
  )
}

export default AddaProperty

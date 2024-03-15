import React from 'react'


// CSS
import "./AddABond.css";
const AddABond = ({closePopup}) => {
  return (
    <div className='add-stock-component'>
        <div className="add-stock-modal overflow-stock-modal">
            <div className="add-stock-modal-div ">
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
                

                <div className="search-div">
                    <input type='text' placeholder='Search for bond'/>
                    <div className='search-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                
                </div>

                <div className="inputs-div add-bond-inputs">
                    
                    <input type="text" placeholder='Bond name' />
                    <input type="number" placeholder='Quantity' />
                    <input type="number" placeholder='Purchase Price' />
                    <input type="number" placeholder='Coupon Rate' />
                    <input type="date" placeholder='Date Purchased' />
                    <input type="date" placeholder='Maturity Date' />
                </div>

                <div className="add-stock-btn">
                    <button className='tiny-head'>ADD BOND</button>
                </div>

            </div>

        </div>
      
    </div>
  )
}

export default AddABond

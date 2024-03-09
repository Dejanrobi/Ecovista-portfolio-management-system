import React from 'react'

// CSS
import "./AddStock.css";

const AddStock = ({closePopup}) => {
  return (
    <div className='add-stock-component'>
        <div className="add-stock-modal">
            <div className="add-stock-modal-div">
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
                

                <div className="search-div">
                    <input type='text' placeholder='Search for stock'/>
                    <div className='search-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                
                </div>

                <div className="inputs-div">
                    <input type="text" placeholder='Stock name' />
                    <input type="number" placeholder='Quantity' />
                    <input type="number" placeholder='Buy Price' />
                    <input type="date" placeholder='Date Purchased' />
                </div>

                <div className="add-stock-btn">
                    <button className='tiny-head'>ADD STOCK</button>
                </div>

            </div>

        </div>
      
    </div>
  )
}

export default AddStock

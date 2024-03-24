import React from 'react'

import "./Logout.css"

const Logout = ({closePopup, logoutPopup}) => {
  return (
    <div className='add-stock-component'>
        <div className="add-stock-modal add-no-of-occupied-units-modal">
            <div className="add-stock-modal-div">

                   
                <div className='add-stock-head'>
                    <div >
                        <h2>Logout</h2>
                        <p>Are you sure you want to logout?</p>
                    </div>
                    <div className='close-icon' onClick={closePopup} >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>

                    </div>
                </div>
                

                

                <div className="inputs-div inputs-div-no-of-occupied-units">
                    
                    
                    
                </div>

                <div className="add-stock-btn  logout-button-set">
                    <button className='tiny-head logout-cancel'  onClick={closePopup}>CANCEL</button>
                    <button className='tiny-head logout-btn' onClick={logoutPopup} >LOGOUT</button>
                </div>

            </div>

        </div>

    </div>
  )
}

export default Logout

import React from 'react'
import { mainPageLoading } from '../../assets/assets'


import "./LoadingPage.css";
const LoadingPage = () => {
  return (
    <div className='loading-class'>      
            <img src={mainPageLoading} alt="Loading..." />          
    </div>
  )
}

export default LoadingPage

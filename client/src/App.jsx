import { useState } from 'react'

// import CSS
import "./index.css";
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Stocks from './pages/Stocks';
import Bonds from './pages/Bonds';
import RealEstate from './pages/RealEstate';
import Settings from './pages/Settings';
import Support from './pages/Support';
import SingleStockPage from './pages/SingleItems/SingleStockPage/SingleStockPage';
import SingleBondsPage from './pages/SingleItems/SingleBondsPage/SingleBondsPage';
import RealEstateSinglePage from './pages/SingleItems/RealEstateSinglePage/RealEstateSinglePage';
import TestCode from './pages/TestCode';
import LoginPage from './pages/LoginPage/LoginPage';

import axios from "axios";
import RegisterPage from './pages/RegisterPage.jsx/RegisterPage';
import { CompanyGlobalContext } from './context/CompanyContext';
import LoadingPage from './pages/LoadingPage/LoadingPage';

// baseURL
axios.defaults.baseURL = import.meta.env.VITE_API_BASEURL

function App() {

  const { entirePageLoading, setEntirePageLoading, mainUser } = CompanyGlobalContext();
  

  return (
    <>
    {
      entirePageLoading ? (
        <LoadingPage/>

      ):(
        <>
          {
            mainUser ? (
              <Routes>
                <Route path='/' element={<Layout/>}>
                  <Route path='/' element={<Dashboard/>} />
                  <Route path='/dashboard' element={<Dashboard/>} />
                  <Route path='/stocks' element={<Stocks/>} />
                  <Route path='/bonds' element={<Bonds/>} />
                  <Route path='/real-estate' element={<RealEstate/>} />
                  
                 
          
                  {/* Single Item Routes */}
                  <Route path='/stocks/:stockId' element={<SingleStockPage/>} />
                  <Route path='/bonds/:bondId' element={<SingleBondsPage/>} />
                  <Route path='/real-estate/:realEstateId' element={<RealEstateSinglePage/>} />
                  
                  {/* Navigate Back */}
                  <Route path='/login' element={<Navigate to="/"/>}/>
                  <Route path='/register' element={<Navigate to="/"/>}/>
                  
                </Route>
                
              </Routes>
            ):(

              <Routes>
                
                <Route path='/' element={<LoginPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>

                {/* Navigate Back */}
                <Route path='/dashboard' element={<Navigate to="/login"/>}/>
                <Route path='/stocks' element={<Navigate to="/login"/>}/>
                <Route path='/bonds' element={<Navigate to="/login"/>}/>
                <Route path='/real-estate' element={<Navigate to="/login"/>}/>
              </Routes>

            )
          }
        </>
        
      )
    }
   
      
      
    </>
  )
}

export default App

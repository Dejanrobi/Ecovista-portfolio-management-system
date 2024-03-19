import { useState } from 'react'

// import CSS
import "./index.css";
import { Route, Routes } from 'react-router-dom';
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

import axios from "axios";

// baseURL
axios.defaults.baseURL = import.meta.env.VITE_API_BASEURL

function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/stocks' element={<Stocks/>} />
        <Route path='/bonds' element={<Bonds/>} />
        <Route path='/real-estate' element={<RealEstate/>} />
        <Route path='/settings' element={<Settings/>} />
        <Route path='/support' element={<Support/>} />

        {/* Single Item Routes */}
        <Route path='/stocks/:stockId' element={<SingleStockPage/>} />
        <Route path='/bonds/:bondId' element={<SingleBondsPage/>} />
        <Route path='/real-estate/:realEstateId' element={<RealEstateSinglePage/>} />
        
        
      </Route>
    </Routes>
      
      
    </>
  )
}

export default App

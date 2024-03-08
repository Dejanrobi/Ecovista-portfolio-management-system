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
      </Route>
    </Routes>
      
      
    </>
  )
}

export default App

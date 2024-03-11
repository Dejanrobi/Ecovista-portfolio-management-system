import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

import "./Layout.css";

const Layout = () => {
  return (
    <div className='layout-container '>
      <Navbar/>
      <Outlet className="outlet-width"/>
    </div>
  )
}

export default Layout

import React, { useEffect, useState } from 'react'

// Import CSS

import "./Navbar.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logout from '../pages/LogoutComponent/Logout';
import { CompanyGlobalContext } from '../context/CompanyContext';

const Navbar = () => {

  const { mainUser }  = CompanyGlobalContext()
  // console.log(mainUser)

  const mainUserShorten = mainUser?.userName.split(' ').map(word => word.charAt(0)).join('');
  // const [pathName, setPathName] = useState(window.location.pathname)
  // useEffect(() => {
  //   // Get the current URL path nam   

  //   // Extract the page name from the URL path
  //   const pageName = pathName.split('/').filter(Boolean).pop();
  //   console.log(pageName)

  //   setCurrentPage(pageName);
  // }, []);

  const location  = useLocation();
  let pathName = location.pathname.replace(/^\/+/g, '');
  // console.log('Current URL:', pathName);
  
  

  if(pathName === ''){
    pathName='dashboard'
  }
  function activeLink(active=null){
    let classes = 'nav-link';

    if(pathName.includes(active)){
      classes+= ' active-nav-link'
    }

    return classes
  }

  const navigate = useNavigate()

  const logoutMainUser = ()=>{
    localStorage.removeItem('https://www.ecovistaportfoliomanagement.com/-token');
    navigate("/");
    window.location.reload();
    
  }


  // Logout component
  const [logoutOpen, setLogoutOpen] = useState(false);

  const closeLogoutCom = ()=>{
    setLogoutOpen(false)
  }

  

  return (
    <div className='  '>

      <div className=' navbar-section padding-tb-lr'>

      <div className="top-nav-section">
        <div className='company-logo'>
          <Link to={"/"}>
            <h1>Eco Vista</h1>
          </Link>
          
        </div>

        <div className='navigation-links'>
          <Link  to={"/"}   className={activeLink('dashboard')} >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            </div>
            <p>Dashboard</p>
          </Link>
          <Link to={"/stocks"}  className={activeLink('stocks')} >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
              </svg>

            </div>
            <p>Stocks</p>
          </Link>
          <Link to={"/bonds"}  className={activeLink('bonds')} >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>

            </div>
            <p>Bonds</p>
          </Link>
          <Link to={"/real-estate"}  className={activeLink('real-estate')} >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
              </svg>

            </div>
            <p>Real Estate</p>
          </Link>

        </div>

      </div>

      <div className="bottom-nav-section margin-tb">
        <div className='other-links'>
          {
            mainUser && (
              <div className='user-details'>
                <div className="user-image">
                  <p>{mainUserShorten}</p>
                </div>
                <div className="user-name">
                  <p>{mainUser?.userName}</p>
                </div>
              </div>

            )
          }
          
          {/* <Link to={"/support"}  className={activeLink('support')} >
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
              </svg>


            </div>
            <p>Support</p>
          </Link> */}

          <div onClick={()=>{setLogoutOpen(true)}}   className={`logout-link ${activeLink('settings')}`}  >
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>



              </div>
              <p>Logout</p>
            </div>

        </div>  

      </div>
     
        
      </div>
      

      
      {
        logoutOpen && (
          <Logout closePopup={closeLogoutCom} logoutPopup={logoutMainUser}/>
        )
      }
      

    </div>
      
      
   
  )
}

export default Navbar

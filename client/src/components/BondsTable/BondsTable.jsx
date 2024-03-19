import React, { useEffect, useState } from 'react'



// CSS
import "./BondsTable.css";
import { bondsData } from '../../Data/data';
import { Link } from 'react-router-dom';
import axios from 'axios';
const BondsTable = ({openPopup}) => {

    // Retrieving all bonds from the backend
    const [allBonds, setAllBonds] = useState([]);
    const [notChangedBonds, setNotChangedBonds] = useState([]);

    // tableSearchInput
    const [searchInput, setSearchInput] = useState('');

    const getAllBonds = async()=>{
        const { data } = await axios.get('/bonds');

        setAllBonds(data);
        setNotChangedBonds(data)

        // console.log("All Bonds: ", data);
    }

    const filterBondsItems=()=>{
        const filteredBonds = notChangedBonds.filter((bond)=>bond.name.toLowerCase().includes(searchInput.toLowerCase()))
        setAllBonds(filteredBonds)
    }

    useEffect(()=>{
        getAllBonds();
    },[])

    useEffect(()=>{
        filterBondsItems();
    },[searchInput])

    // Date options
    const dateOptions = { 
        month: 'short', // Abbreviated month name (e.g., Feb.)
        day: '2-digit', // Two-digit day of the month (e.g., 25)
        year: 'numeric' // Full four-digit year (e.g., 2023)
    };

  return (
    <div>
       <table className='stocks-table'>

            
            <thead>
                <tr>
                    <th colSpan="9">
                        <div className="other-heads">
                            <div className='search'>
                                <div className='icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                    </svg>

                                </div>
                                <input placeholder='Search' 
                                    onChange={(e)=>setSearchInput(e.target.value)}
                                />
                            </div> 

                            
                                <button onClick={openPopup} className='add-stock-btn tiny-head'>ADD A BOND</button>
                        

                        </div>
                        

                    </th>               
                </tr>
                            
                <tr className='tiny-head'>
                    <th  className='tiny-head'>Purchase Date</th>
                    <th className='tiny-head'>Symbol</th>
                    <th className='tiny-head'>Name</th>
                    <th className='tiny-head'>Maturity Date</th>
                    <th className='tiny-head'>Quantity</th>
                    <th className='tiny-head'>Purchase Price</th>
                    <th className='tiny-head'>Coupon Rate</th>
                    <th className='tiny-head'>Current Price</th>
                    <th className='tiny-head'>% Gain</th>
                </tr>
            </thead>
            <tbody>
                {allBonds.map((bond, index) => (
                    <tr key={index}>
                        <td className='tiny-text'>{new Date(bond.purchaseDate).toLocaleDateString('en-US', dateOptions)}</td>
                        <td className='symbol tiny-text'>
                            <Link to={`/bonds/${bond._id}`} className='symbol'>{bond.name.substring(0,4).toUpperCase().replace(/\s/g, '')}</Link>                             
                        </td>                       
                        <td className='tiny-text'>{bond.name}</td>
                        <td className='tiny-text'>{new Date(bond.maturityDate).toLocaleDateString('en-US', dateOptions)}</td>
                        <td className='tiny-text'>{bond.quantity}</td>
                        <td className='tiny-text'>${bond.purchasePrice}</td>
                        <td className=' tiny-text green-color'>{bond.couponRate}%</td>
                        {/* <td className='tiny-text'>${bond.currentPrice}</td> */}
                        {/* <td className='percentage-gain tiny-text'>
                            <div>
                                {bond.gains}%
                            </div>
                            <div className='icon'> 
                                {parseFloat(bond.gains) >0 ?(
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
                                    </svg>
                                ):(
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
                                    </svg>
                                )
                                
                                }
                            </div>
                            
                            
                            </td> */}
                    </tr>
                ))}
            </tbody>
            </table>
    </div>
  )
}

export default BondsTable

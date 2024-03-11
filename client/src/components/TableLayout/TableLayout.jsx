import React from 'react'

import { stocksData } from '../../Data/data'

// CSS
import "./TableLayout.css"
import { Link } from 'react-router-dom'

const TableLayout = ({openPopup}) => {
  return (
    <div>
      <table className='stocks-table'>

            
            <thead>
                <tr>
                    <th colSpan="8">
                        <div className="other-heads">
                            <div className='search'>
                                <div className='icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                    </svg>

                                </div>
                                <input placeholder='Search' />
                            </div> 

                            
                                <button onClick={openPopup} className='add-stock-btn tiny-head'>ADD A STOCK</button>
                           

                        </div>
                        

                    </th>               
                </tr>
                               
                <tr>
                    <th >Symbol</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Buy Price</th>
                    <th>Current Price</th>
                    <th>Current Value</th>
                    <th>Capital Gain</th>
                    <th>% Gain</th>
                </tr>
            </thead>
            <tbody>
                {stocksData.map((stock, index) => (
                    
                    <tr key={index}>
                        
                            <td >
                                <Link to={"/stocks/12345678910"} className='symbol'>{stock.symbol}</Link>                                
                            </td>
                            <td>{stock.name}</td>
                            <td>{stock.quantity}</td>
                            <td>${stock.buyPrice}</td>
                            <td>${stock.currentPrice}</td>
                            <td>${stock.currentValue}</td>
                            <td>${stock.capitalGain}</td>
                            <td className='percentage-gain'>
                                <div>
                                    {stock.percentageGain}%
                                </div>
                                <div className='icon'> 
                                    {parseFloat(stock.percentageGain) >0 ?(
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
                                
                            
                            </td>
                        
                        
                    </tr>
                    
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TableLayout

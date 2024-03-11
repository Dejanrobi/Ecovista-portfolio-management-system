import React from 'react'

// CSS
import "./RealEstateTable.css";
import { realEstateData } from '../../Data/data';
import { Link } from 'react-router-dom';


const RealEstateTable = ({openPopup}) => {
  return (
    <div>
       <table className='stocks-table'>

            
        <thead>
            <tr>
                <th colSpan="10">
                    <div className="other-heads">
                        <div className='search'>
                            <div className='icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                </svg>

                            </div>
                            <input placeholder='Search' />
                        </div> 

                        
                            <button onClick={openPopup} className='add-stock-btn tiny-head'>ADD A PROPERTY</button>
                    

                    </div>
                    

                </th>               
            </tr>
                        
            <tr className='tiny-head'>
                <th  className='tiny-head '>Property Name</th>
                <th className='tiny-head'>Amount Loaned</th>
                <th className='tiny-head'>No. of Units</th>
                <th className='tiny-head'>Rental Per Unit</th>
                <th className='tiny-head'>Occupancy Rate</th>
                <th className='tiny-head'>Total Rental Income</th>
                <th className='tiny-head'>Monthly Mortgage Payment</th>
                <th className='tiny-head'>Profits after Mortgage Payment</th>
                <th className='tiny-head'>Other Expenses</th>
                <th className='tiny-head'>Cashflow</th>
            </tr>
        </thead>
        <tbody>
            {realEstateData.map((apartment, index) => (
                <tr key={index}>
                    <td className='tiny-text symbol'>
                        <Link to={"/real-estate/12345678910"} className='tiny-text symbol'>{apartment.propertyName}</Link>                               
                    </td>
                    <td className='tiny-text'>KES{apartment.amountLoaned}</td>
                    <td className='tiny-text'>{apartment.noOfUnits}</td>
                    <td className='tiny-text'>KES{apartment.rentalPerUnits}</td>
                    <td className={`tiny-text ${apartment.occupancyRate>90 ? 'green-color':"red-color"}`}>{apartment.occupancyRate}%</td>
                    <td className='tiny-text'>KES{apartment.totalRentalIncome}</td>
                    <td className='tiny-text'>KES{apartment.monthlyMortgagePayment}</td>
                    <td className='tiny-text'>KES{apartment.profitsAfterMortgagePayment}</td>
                    <td className='tiny-text'>KES{apartment.otherExpenses}</td>
                    <td className='tiny-text'>KES{apartment.cashFlow}</td>
                    
                    
                    
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default RealEstateTable

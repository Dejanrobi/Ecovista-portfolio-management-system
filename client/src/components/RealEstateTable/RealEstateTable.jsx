import React, { useEffect, useState } from 'react'

// CSS
import "./RealEstateTable.css";
// import { realEstateData } from '../../Data/data';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CompanyGlobalContext } from '../../context/CompanyContext';



const RealEstateTable = ({openPopup}) => {

    
    const { 
        allProperties,
        setAllProperties,
        notChangedProperties,
        setNotChangedProperties,
        getAllProperties
    } = CompanyGlobalContext()
    
    
    // const ecoVistaHeaders = getHeaders();

   

    // tableSearchInput
    const [searchInput, setSearchInput] = useState('');

    

    const filterPropertyItems=()=>{
        const filteredProperties = notChangedProperties.filter((property)=>property.name.toLowerCase().includes(searchInput.toLowerCase()))
        setAllProperties(filteredProperties)
    }

    useEffect(()=>{
        getAllProperties();
    },[])

    useEffect(()=>{
        filterPropertyItems()
    },[searchInput])


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
                            <input placeholder='Search' 
                                onChange={(e)=>setSearchInput(e.target.value)}
                            />
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
            {allProperties.map((apartment, index) => {

                // calculatetotalamount
                function calculateTotalAmountForCurrentMonth(expenses) {
                    const currentDate = new Date();
                    const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
                    let totalAmount = 0;
                
                    expenses.forEach(expense => {
                    const expenseDate = new Date(expense.date);
                    const expenseMonth = expenseDate.getMonth() + 1;
                
                    if (expenseMonth === currentMonth) {
                        totalAmount += expense.amount;
                    }
                    });
                
                    return totalAmount;
                }
                // Calculate apartment expenses
                const calculateOtherExpenses =()=>{
                    let totalExpenses = 0;
            
                    apartment.expenses?.map((expense)=> totalExpenses+= expense.amount)
                    return totalExpenses;
                }
                const apartmentRentPerUnit =  Number(apartment.rentPerUnitPerUnit.length > 0 ? apartment.rentPerUnitPerUnit[apartment.rentPerUnitPerUnit.length-1].rentAmount : 0)
                const apartmentOccupiedUnits = Number(apartment.noOfOccupiedUnits.length > 0 ? apartment.noOfOccupiedUnits[apartment.noOfOccupiedUnits.length-1].noOfOccupiedUnits : 0)
                const apartmentOccupancyRate = ((apartmentOccupiedUnits/Number(apartment.noOfUnits))*100).toFixed(2)
                const apartmentTotalRentalIncome = apartmentRentPerUnit * apartmentOccupiedUnits;
                const apartmentProfitsAfterMortgagePayment = (Number(apartmentTotalRentalIncome)-Number(apartment.monthlyMortgagePayment))
                const apartmentOtherExpenses = Number(apartment.expenses.length > 0 ? calculateTotalAmountForCurrentMonth(apartment.expenses) : 0)
                const apartmentCashFlow = (apartmentProfitsAfterMortgagePayment-apartmentOtherExpenses);

                return(                
                    <tr key={index}>
                        <td className='tiny-text symbol'>
                            <Link to={`/real-estate/${apartment._id}`} className='tiny-text symbol'>{apartment.name}</Link>                               
                        </td>
                        <td className='tiny-text'>KES{apartment.amountLoaned}</td>
                        <td className='tiny-text'>{apartment.noOfUnits}</td>
                        <td className='tiny-text'>KES{apartmentRentPerUnit}</td>
                        <td className={`tiny-text ${apartmentOccupancyRate>90 ? 'green-color':"red-color"}`}>{apartmentOccupancyRate}%</td>
                        <td className='tiny-text'>KES{apartmentTotalRentalIncome}</td>
                        <td className='tiny-text'>KES{apartment.monthlyMortgagePayment}</td>
                        <td className={`tiny-text ${apartmentProfitsAfterMortgagePayment>0 ? 'green-color':"red-color"}`}>KES{apartmentProfitsAfterMortgagePayment}</td>
                        <td className='tiny-text'>KES{apartmentOtherExpenses}</td>
                        <td className={`tiny-text ${apartmentCashFlow>90 ? 'green-color':"red-color"}`}>KES{apartmentCashFlow}</td>                        
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default RealEstateTable

import React, { useEffect, useState } from 'react'

// CSS
import "./RealEstateSinglePage.css";
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader/PageHeader';

// Other expenses
// import { otherExpensesData } from '../../../Data/data';
import AddNoOfOccupiedUnits from './RealEstateComponents/AddNoOfOccupiedUnits/AddNoOfOccupiedUnits';
import AddExpense from './RealEstateComponents/AddExpense/AddExpense';
import AddRentPerUnit from './RealEstateComponents/AddRentPerUnit/AddRentPerUnit';
import axios from 'axios';

const RealEstateSinglePage = () => {

    // GET SINGLE APARTMENT
    const [singleApartment, setSingleApartment] = useState({});

    const { realEstateId } = useParams();
    // console.log("Real Estate Id: ", realEstateId);

    const getSingleApartment = async()=>{
      try {
        const { data } = await axios.get(`/real-estate/${realEstateId}`)       
        console.log(data)

        setSingleApartment(data)
        return data;
      } catch (error) {
        console.log(error)        
      }
    }

    useEffect(()=>{
      getSingleApartment();
    },[])
  
    const [currentHead, setCurrentHead] = useState(null);
  
    function setHeadColor(headColor=null){
      let classdetail="";
      
      if(headColor==='chart' && currentHead===null){
        classdetail+= " active-head";
      }
      if(headColor===currentHead){
        classdetail+=" active-head"
        if (headColor==="chart"){
          scrollToChart()
        }
        if (headColor==="news"){
          scrollToNews()
        }
        if (headColor==="analytics"){
          scrollToAnalytics()
        }
      }
  
      return classdetail;
    }
  
  
  
    // SCROLLS
    const scrollToNews = () => {
      const newsDiv = document.getElementById('news-section');
      newsDiv.scrollIntoView({ behavior: 'smooth' });
    };
  
    const scrollToChart = () => {
      const chartDiv = document.getElementById('chart-section');
      chartDiv.scrollIntoView({ behavior: 'smooth' });
    };
  
    const scrollToAnalytics = () => {
      const analyticsDiv = document.getElementById('analytics-section');
      analyticsDiv.scrollIntoView({ behavior: 'smooth' });
    };

    const [addNoOfOccupiedUnits, setNoOfOccupiedUnits] = useState(false);
    const [addRentPerUnit, setRentPerUnit] = useState(false);
    const [addExpense, setExpense] = useState(false);

    // No of occupied units
    const closeAddNoOfOccupiedUnits=()=>{
      setNoOfOccupiedUnits(false)
    }
  
    const openAddNoOfOccupiedUnits=()=>{
      setNoOfOccupiedUnits(true);
    }
  
    // Rent per unit
    const closeRentPerUnit=()=>{
      setRentPerUnit(false)
    }
  
    const openRentPerUnit=()=>{
      setRentPerUnit(true);
    }

    // Add Expense
    const closeAddExpense=()=>{
      setExpense(false)
    }
  
    const openAddExpense=()=>{
      setExpense(true);
    }

    // Date options
    const dateOptions = { 
      month: 'short', // Abbreviated month name (e.g., Feb.)
      day: '2-digit', // Two-digit day of the month (e.g., 25)
      year: 'numeric' // Full four-digit year (e.g., 2023)
    };

    

    // Calculate apartment expenses
    const calculateOtherExpenses =()=>{
      let totalExpenses = 0;

      singleApartment.expenses?.map((expense)=> totalExpenses+= expense.amount)
      return totalExpenses;
    }
    
    // console.log("All expenses: ", calculateOtherExpenses())
    

  // APARTMENT CALCULATIONS
  const apartmentRentPerUnit =  Number(singleApartment.rentPerUnitPerUnit?.length > 0 ? singleApartment.rentPerUnitPerUnit[singleApartment.rentPerUnitPerUnit?.length-1].rentAmount : 0)
  const apartmentOccupiedUnits = Number(singleApartment.noOfOccupiedUnits?.length > 0 ? singleApartment.noOfOccupiedUnits[singleApartment.noOfOccupiedUnits?.length-1].noOfOccupiedUnits : 0)
  const apartmentOccupancyRate = (apartmentOccupiedUnits/Number(singleApartment.noOfUnits))*100
  const apartmentTotalRentalIncome = apartmentRentPerUnit * apartmentOccupiedUnits;
  const apartmentProfitsAfterMortgagePayment = (Number(apartmentTotalRentalIncome)-Number(singleApartment.monthlyMortgagePayment))
  
  const apartmentOtherExpenses = Number(singleApartment.expenses?.length > 0 ?  calculateOtherExpenses(): 0)
  const apartmentCashFlow = (apartmentProfitsAfterMortgagePayment-apartmentOtherExpenses);
  

      
  
  return (
    <div className="single-page padding-tb-lr">

        <div className="single-page-head">
        <div className="main-page-head">
            <PageHeader header={singleApartment.name}/>

            <div className="bread-crumbs">
            <p><Link to={"/real-estate"} className='stocks-single-bread-crumb'>Real Estate</Link> / {singleApartment.name}</p>
            <hr className='bread-crumbs-line' />
            </div>
        </div>
        
        </div>


        <div className="stock-content real-estate-content">
        <div className="stock-details">
            <div className="stock-details-main real-estate-details-main">

            
            <h3 className='stock-symbol'>{singleApartment.name?.substring(0,4).toUpperCase().replace(/\s/g, '')}</h3>
            
            <div className="stock-more-details  real-estate-more-details  coupon-container-bottom">
            <p className="name">No of Units:</p>
            <p className="value">{singleApartment.noOfUnits}</p>
            <div></div>
            <p className="name">Rent per Unit:</p>
            <p className="value">KES {apartmentRentPerUnit}</p>
            <div>
              <button className='button-set' onClick={openRentPerUnit} >SET</button>
            </div>
            
            <p className="name">No of occupied units:</p>
            <p className="value">{apartmentOccupiedUnits}</p>
            <div>
              <button className='button-set' onClick={openAddNoOfOccupiedUnits}>SET</button>
            </div>
            <p className="name">Occupancy Rate:</p>
            <p className={`value ${apartmentOccupancyRate>90?'green-color':'red-color'}`}>{apartmentOccupancyRate}%</p>
            <div></div>
            <p className="name">Rental Income:</p>
            <p className="value">KES {apartmentTotalRentalIncome}</p>
            <div></div>
            </div>

            <div className="stock-more-details bonds-more-details coupon-container-bottom">
                <p className="name">Purchase Price:</p>
                <p className="value">KES {singleApartment.purchasePrice}</p>
                <p className="name">Mortgage Payment:</p>
                <p className="value">KES {singleApartment.monthlyMortgagePayment}</p>
                <p className="name">Profits after Mortgage Payment:</p>
                <h4 className={`value ${apartmentProfitsAfterMortgagePayment>0?'green-color':'red-color'}`}>KES {apartmentProfitsAfterMortgagePayment}</h4>

            </div>
            <div className=" coupon-container-bottom">
                <div className='stock-more-details real-estate-more-details'>
                  <p className="name">Other expenses:</p>
                  <p className="value">${apartmentOtherExpenses}</p>
                  <button className='button-set' onClick={openAddExpense}>ADD EXPENSE</button>
                </div>

                
                    {
                      singleApartment.expenses?.length > 0 ?(
                        <div className="other-expense-table">
                        
                          <div className="row-div-head">
                            <p className='head tiny-head'>Date</p>
                            <p className='head tiny-head'>Name</p>
                            <p className='head tiny-head'>Amount</p>
                          </div>
                          
                          <div className="main-row-div">
                            {
                                singleApartment.expenses?.map((expense, index)=>(
                                  <div className="row-div-content" key={index}>
                                    <p className='content tiny-text'>{new Date(expense.date).toLocaleDateString('en-US', dateOptions)}</p>
                                    <p className='content tiny-text'>{expense.name}</p>
                                    <p className='content tiny-text'>${expense.amount}</p>
                                  </div>
                                ))
                              }
                          </div>
                        
                        </div>
                        
                      ):(
                        <div className='no-expenses-table'><p>No expenses</p></div>
                      )
                    }
                    

                     
                    

                
                
            </div>

            <div className="stock-value bonds-current-value">
            <h4 className='name'>Total Cashflow:</h4>
            <h2 className={`value ${apartmentCashFlow>0?'green-color':'red-color'}`}>${apartmentCashFlow}</h2>
            
            </div>

            </div>
        </div>
        <div className="stock-visualization">
            <div className="visualization-head">
            
                <h4 className={setHeadColor('chart')} onClick={()=>{setCurrentHead('chart')}}>Chart</h4>
                <h4 className={setHeadColor('news')} onClick={()=>{setCurrentHead('news')} }>News</h4>
                <h4 className={setHeadColor('analytics')} onClick={()=>{setCurrentHead('analytics')}}>Analytics</h4>
            
            </div>

            <div id='chart-section' className="chart-content">

            </div>

            <div id='news-section' className="news-content">
            <h3>Meta News</h3>

            <div className="news-items">
                <div className="single-news">
                <p className='time tiny-text'>18 minutes ago</p>
                <h4>Meta Price Pumps to $480, Can Doge Bulls Send It to $500</h4>
                <p className='description tiny-text'>Meta is up over 100% against the US Dollar. META rallied toward the $0.20
                resistance and....</p>
                </div>
                <div className="single-news">
                <p className='time tiny-text'>18 minutes ago</p>
                <h4>Meta Price Pumps to $480, Can Doge Bulls Send It to $500</h4>
                <p className='description tiny-text'>Meta is up over 100% against the US Dollar. META rallied toward the $0.20
                resistance and....</p>
                </div>
                <div className="single-news">
                <p className='time tiny-text'>18 minutes ago</p>
                <h4>Meta Price Pumps to $480, Can Doge Bulls Send It to $500</h4>
                <p className='description tiny-text'>Meta is up over 100% against the US Dollar. META rallied toward the $0.20
                resistance and....</p>
                </div>
                <div className="single-news">
                <p className='time tiny-text'>18 minutes ago</p>
                <h4>Meta Price Pumps to $480, Can Doge Bulls Send It to $500</h4>
                <p className='description tiny-text'>Meta is up over 100% against the US Dollar. META rallied toward the $0.20
                resistance and....</p>
                </div>
                <div className="single-news">
                <p className='time tiny-text'>18 minutes ago</p>
                <h4>Meta Price Pumps to $480, Can Doge Bulls Send It to $500</h4>
                <p className='description tiny-text'>Meta is up over 100% against the US Dollar. META rallied toward the $0.20
                resistance and....</p>
                </div>
            </div>

            <div id='analytics-section' className="analytics-content news-content">
                <h3>Analytics</h3>
            </div>
            </div>
        </div>
        </div>

        {/* ADD No of Occupied Units */}

        {
          addNoOfOccupiedUnits&& (
            <AddNoOfOccupiedUnits getSingleApartment={getSingleApartment} closePopup={closeAddNoOfOccupiedUnits} apartmentId={realEstateId} />
          )
        }

        {/* ADD EXPENSE */}
        {
          addExpense && (
            <AddExpense getSingleApartment={getSingleApartment} closePopup={closeAddExpense} apartmentId={realEstateId} />
          )
        }

        {/* SET RENTAL PER UNIT */}
        {
          addRentPerUnit && (
            <AddRentPerUnit getSingleApartment={getSingleApartment} closePopup={closeRentPerUnit} apartmentId={realEstateId} />
          )
        }
    </div>
  )
}

export default RealEstateSinglePage

import React, { useState } from 'react'

// CSS
import "./RealEstateSinglePage.css";
import { useParams } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader/PageHeader';

// Other expenses
import { otherExpensesData } from '../../../Data/data';
import AddNoOfOccupiedUnits from './RealEstateComponents/AddNoOfOccupiedUnits/AddNoOfOccupiedUnits';
import AddExpense from './RealEstateComponents/AddExpense/AddExpense';
import AddRentPerUnit from './RealEstateComponents/AddRentPerUnit/AddRentPerUnit';

const RealEstateSinglePage = () => {

    const { stockId } = useParams();
    // console.log("Stock Id: ",stockId)
  
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
  
  return (
    <div className="single-page padding-tb-lr">

        <div className="single-page-head">
        <div className="main-page-head">
            <PageHeader header="Njoro Dana Plaza"/>

            <div className="bread-crumbs">
            <p>Real Estate / Njoro Dana Plaza</p>
            <hr className='bread-crumbs-line' />
            </div>
        </div>
        
        </div>


        <div className="stock-content real-estate-content">
        <div className="stock-details">
            <div className="stock-details-main real-estate-details-main">

            
            <h3 className='stock-symbol'>NDP</h3>
            
            <div className="stock-more-details  real-estate-more-details  coupon-container-bottom">
            <p className="name">No of Units:</p>
            <p className="value">100</p>
            <div></div>
            <p className="name">Rent per Unit:</p>
            <p className="value">KES 6000</p>
            <div>
              <button className='button-set' onClick={openRentPerUnit} >SET</button>
            </div>
            
            <p className="name">No of occupied units:</p>
            <p className="value">90</p>
            <div>
              <button className='button-set' onClick={openAddNoOfOccupiedUnits}>SET</button>
            </div>
            <p className="name">Occupancy Rate:</p>
            <p className="value">90%</p>
            <div></div>
            <p className="name">Rental Income:</p>
            <p className="value">KES 540,000</p>
            <div></div>
            </div>

            <div className="stock-more-details bonds-more-details coupon-container-bottom">
                <p className="name">Purchase Price:</p>
                <p className="value">KES 15,000,000</p>
                <p className="name">Mortgage Payment:</p>
                <p className="value">KES 300,00000</p>
                <p className="name">Profits after Mortgage Payment:</p>
                <h4 className="value">KES 200,000</h4>

            </div>
            <div className=" coupon-container-bottom">
                <div className='stock-more-details real-estate-more-details'>
                  <p className="name">Other expenses:</p>
                  <p className="value">50,000</p>
                  <button className='button-set' onClick={openAddExpense}>ADD EXPENSE</button>
                </div>

                <div className="other-expense-table">
                    <div className="row-div-head">
                      <p className='head tiny-head'>Date</p>
                      <p className='head tiny-head'>Name</p>
                      <p className='head tiny-head'>Amount</p>
                    </div>
                    
                    <div className="main-row-div">
                      {
                          otherExpensesData.map((expense)=>(
                            <div className="row-div-content">
                              <p className='content tiny-text'>{expense.date}</p>
                              <p className='content tiny-text'>{expense.name}</p>
                              <p className='content tiny-text'>{expense.amount}</p>
                            </div>
                          ))
                        }
                    </div>
                     
                    

                </div>
                
            </div>

            <div className="stock-value bonds-current-value">
            <h4 className='name'>Total Cashflow:</h4>
            <h2 className='value'>$1800</h2>
            
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
            <AddNoOfOccupiedUnits closePopup={closeAddNoOfOccupiedUnits} />
          )
        }

        {/* ADD EXPENSE */}
        {
          addExpense && (
            <AddExpense closePopup={closeAddExpense} />
          )
        }

        {/* SET RENTAL PER UNIT */}
        {
          addRentPerUnit && (
            <AddRentPerUnit closePopup={closeRentPerUnit} />
          )
        }
    </div>
  )
}

export default RealEstateSinglePage

import React, { useEffect, useState } from 'react'

// CSS
import "./SingleStockPage.css";
import PageHeader from '../../../components/PageHeader/PageHeader';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const SingleStockPage = () => {

  const [singleStock, setSingleStock] = useState({});



  const { stockId } = useParams();
  // console.log("Stock Id: ",stockId)

  const getSingleStock= async()=>{
    try {
      
      const { data } = await axios.get(`/stocks/${stockId}`)
      // console.log(data)
      setSingleStock(data)
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    getSingleStock();
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


  // Date options
  const dateOptions = { 
      month: 'short', // Abbreviated month name (e.g., Feb.)
      day: '2-digit', // Two-digit day of the month (e.g., 25)
      year: 'numeric' // Full four-digit year (e.g., 2023)
  };

  // Item Values
  const buyValue = singleStock.quantity*singleStock.buyPrice;
  const currentValue = 480000
  const capitalGains = currentValue-buyValue
  return (
    <div className="single-page padding-tb-lr">

      <div className="single-page-head">
        <div className="main-page-head">
          <PageHeader header={singleStock.name}/>

          <div className="bread-crumbs">
            <p><Link to={"/stocks"} className='stocks-single-bread-crumb'>Stocks</Link> / {singleStock.name}</p>
            <hr className='bread-crumbs-line' />
          </div>
        </div>
        
      </div>


      <div className="stock-content">
        <div className="stock-details">
          <div className="stock-details-main">

          
          <h3 className='stock-symbol'>{singleStock.name?.substring(0,4).toUpperCase()}</h3>
          <div className="stock-price">
            <h2 className='stock-price-amount'>$480</h2>
            <div className='stock-gain'>
              <h4>20.34%</h4>
              <div className='stock-trend'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                </svg>

              </div>
            </div>         
          </div>
          <div className="stock-more-details">
            <p className="name">Date purchased:</p>
            <p className="value">{new Date(singleStock.purchaseDate).toLocaleDateString('en-US', dateOptions)}</p>
            <p className="name">Quantity:</p>
            <p className="value">{singleStock.quantity}</p>
            <p className="name">Buy price:</p>
            <p className="value">${singleStock.buyPrice}</p>
            <p className="name">Buy value:</p>
            <p className="value">${buyValue}</p>
          </div>

          <div className="stock-value">
            <h3 className='name'>Current Value:</h3>
            <h2 className='value'>$480000</h2>
            <h4 className='name'>Capital gains:</h4>
            <h4 className='value green-color capital-gain'>${capitalGains}</h4>
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
    </div>
  )
}

export default SingleStockPage

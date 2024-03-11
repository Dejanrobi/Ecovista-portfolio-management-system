import React, { useState } from 'react'

// CSS
import "./SingleStockPage.css";
import PageHeader from '../../../components/PageHeader/PageHeader';
import { useParams } from 'react-router-dom';

const SingleStockPage = () => {

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


  return (
    <div className="single-page padding-tb-lr">

      <div className="single-page-head">
        <div className="main-page-head">
          <PageHeader header="Meta Platforms Inc"/>

          <div className="bread-crumbs">
            <p>Stocks/Meta Platforms Inc</p>
            <hr className='bread-crumbs-line' />
          </div>
        </div>
        
      </div>


      <div className="stock-content">
        <div className="stock-details">
          <div className="stock-details-main">

          
          <h3 className='stock-symbol'>META</h3>
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
            <p className="value">05/03/2024</p>
            <p className="name">Quantity:</p>
            <p className="value">100</p>
            <p className="name">Buy price:</p>
            <p className="value">$180</p>
            <p className="name">Buy value:</p>
            <p className="value">$18000</p>
          </div>

          <div className="stock-value">
            <h3 className='name'>Current Value:</h3>
            <h2 className='value'>$480000</h2>
            <h4 className='name'>Capital gains:</h4>
            <h4 className='value green-color capital-gain'>$18000</h4>
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

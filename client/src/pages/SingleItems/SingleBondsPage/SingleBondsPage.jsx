import React, { useState } from 'react'

// CSS
import "./SingleBondsPage.css";
import { useParams } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader/PageHeader';

const SingleBondsPage = () => {

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
            <PageHeader header="1 Month Treasury"/>

            <div className="bread-crumbs">
            <p>Bonds / 1 Month Treasury</p>
            <hr className='bread-crumbs-line' />
            </div>
        </div>
        
        </div>


        <div className="stock-content">
        <div className="stock-details">
            <div className="stock-details-main">

            
            <h3 className='stock-symbol'>US1M</h3>
            <div className="stock-price">
            <h2 className='stock-price-amount'>$90</h2>
            <div className='stock-gain'>
                <h4>20.34%</h4>
                <div className='stock-trend'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                </svg>

                </div>
            </div>         
            </div>
            <div className="stock-more-details bonds-more-details coupon-container-bottom">
            <p className="name">Purchase Date:</p>
            <p className="value">Feb, 25, 2024</p>
            <p className="name">Maturity Date:</p>
            <p className="value">Nar. 25, 2024</p>
            <p className="name">Quantity:</p>
            <p className="value">20</p>
            <p className="name">Purchase price:</p>
            <p className="value">$60</p>
            <p className="name">Purchase value value:</p>
            <p className="value">$1200</p>
            </div>

            <div className="stock-more-details coupon-container-bottom">
                <p className="name">Coupon Rate:</p>
                <p className="value green-color">16.919%</p>
                <p className="name">Coupon Amount:</p>
                <h4 className="value">$203</h4>

            </div>

            <div className="stock-value bonds-current-value">
            <h3 className='name'>Current Value:</h3>
            <h2 className='value'>$1800</h2>
            <h4 className='name'>Capital gains:</h4>
            <h4 className='value green-color capital-gain'>$600</h4>
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

export default SingleBondsPage

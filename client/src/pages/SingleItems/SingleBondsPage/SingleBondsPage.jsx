import React, { useEffect, useState } from 'react'

// CSS
import "./SingleBondsPage.css";
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader/PageHeader';
import axios from 'axios';

const SingleBondsPage = () => {

    // GET SINGLE BOND
    const [singleBond, setSingleBond] = useState({});
    
    const { bondId } = useParams();
    // console.log("Bond Id: ", bondId);


    const getSingleBond = async()=>{
      try {
        const { data } = await axios.get(`/bonds/${bondId}`)
        console.log(data)

        setSingleBond(data);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      getSingleBond();
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

  // BOND VALUE CALCULATIONS
  const purchaseValue = singleBond.quantity*singleBond.purchasePrice
  const couponAmount =  (purchaseValue * (singleBond.couponRate/100)).toFixed(2)

  const currentValue = singleBond.quantity*singleBond?.bondId?.closingPrice
  const capitalGains = currentValue-purchaseValue;
  
  const priceGain = Number(singleBond?.bondId?.closingPrice) - Number(singleBond.purchasePrice)
  let priceGainPercentage = (priceGain/singleBond?.bondId?.closingPrice)*100

  if(priceGain < 0){
    priceGainPercentage = (priceGain/singleBond.purchasePrice)*100
  }
  
  // Setting the chart's data
  const dates = stockData.prices.map(entry => entry.date);
  const prices = stockData.prices.map(entry => entry.price);

  const ctx = document.getElementById('stockChart').getContext('2d');
    const stockChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates.reverse(), // Reverse the array to display in chronological order
        datasets: [{
          label: 'Stock Price',
          data: prices.reverse(), // Reverse the array to match the order of labels
          borderColor: 'blue',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price'
            }
          }
        }
      }
    });
  
  return (
    <div className="single-page padding-tb-lr">

        <div className="single-page-head">
        <div className="main-page-head">
            <PageHeader header={singleBond.name}/>

            <div className="bread-crumbs">
            <p><Link to={"/bonds"} className='stocks-single-bread-crumb'>Bonds</Link> / {singleBond.name}</p>
            <hr className='bread-crumbs-line' />
            </div>
        </div>
        
        </div>


        <div className="stock-content">
        <div className="stock-details">
            <div className="stock-details-main">

            
            <h3 className='stock-symbol'>{singleBond?.bondId?.symbol}</h3>
            <div className="stock-price">
            <h2 className='stock-price-amount'>${singleBond?.bondId?.closingPrice}</h2>
            <div className={`stock-gain ${priceGainPercentage > 0 ?'green-color': 'red-color'}`}>
                <h4>{priceGainPercentage.toFixed(2)}%</h4>
                <div className='stock-trend'>
                  {
                    priceGainPercentage > 0? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                      </svg>
                    ):(
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                      </svg>

                    )
                  }
   

                </div>
            </div>         
            </div>
            <div className="stock-more-details bonds-more-details coupon-container-bottom">
            <p className="name">Purchase Date:</p>
            <p className="value">{new Date(singleBond.purchaseDate).toLocaleDateString('en-US', dateOptions)}</p>
            <p className="name">Maturity Date:</p>
            <p className="value">{new Date(singleBond.maturityDate).toLocaleDateString('en-US', dateOptions)}</p>
            <p className="name">Quantity:</p>
            <p className="value">{singleBond.quantity}</p>
            <p className="name">Purchase price:</p>
            <p className="value">${singleBond.purchasePrice}</p>
            <p className="name">Purchase value value:</p>
            <p className="value">${purchaseValue}</p>
            </div>

            <div className="stock-more-details coupon-container-bottom">
                <p className="name">Coupon Rate:</p>
                <p className="value green-color">{singleBond.couponRate}%</p>
                <p className="name">Coupon Amount:</p>
                <h4 className="value">${couponAmount}</h4>

            </div>

            <div className="stock-value bonds-current-value">
            <h3 className='name'>Current Value:</h3>
            <h2 className='value'>${currentValue.toFixed(2)}</h2>
            <h4 className='name'>Capital gains:</h4>
            <h4 className={`value ${capitalGains > 0 ? 'green-color': 'red-color'} capital-gain`}>${capitalGains}</h4>
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
              <canvas id="stockChart" width="100%" height="100%"></canvas>

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

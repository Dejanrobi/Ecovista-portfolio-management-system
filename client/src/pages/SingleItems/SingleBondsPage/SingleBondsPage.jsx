import React, { useEffect, useState } from 'react'

// CSS
import "./SingleBondsPage.css";
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader/PageHeader';
import axios from 'axios';

// CHART COMPONENTS
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import LineChart from '../ChartComponents/LineChart';
import { CompanyGlobalContext } from '../../../context/CompanyContext';


Chart.register(CategoryScale)

const SingleBondsPage = () => {

  const { getHeaders } = CompanyGlobalContext();
  const ecoVistaHeaders = getHeaders();

    // GET SINGLE BOND
    const [singleBond, setSingleBond] = useState({});
    
    const { bondId } = useParams();
    // console.log("Bond Id: ", bondId);


    const getSingleBond = async()=>{
      try {
        const { data } = await axios.get(`/bonds/${bondId}`, ecoVistaHeaders)
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
  

  // CHART DATA
  const [bondChartData, setBondChartData] = useState([])

  // generate the bond's data

  function generateBondData(currentPrice) {
      
    // console.log("current price: ", currentPrice)
      // Get today's date
      const today = new Date();

      // Initialize an array to store price data
      const prices = [];

      // Generate prices for the past 30 days
      for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() - i); // Subtract i days from today's date

          // Generate a random price between 0 and slightly above the current price
          const randomPrice = Math.random() * (currentPrice + 10);

          // Format date to YYYY-MM-DD
          const formattedDate = date.toISOString().split('T')[0];

          // Add the date and price to the prices array
          prices.push({ date: formattedDate, price: Number(randomPrice.toFixed(2)) });
      }

      
      
      // Reverse the prices array to order from oldest to newest
      prices.reverse();
      prices.pop();

      const formattedDate = today.toISOString().split('T')[0];
      prices.push({ date: formattedDate, price: Number(currentPrice) })

      console.log(prices)

      // Return the stock data object
      return prices
  }

  // preparing the data that we want to present
  const [chartData, setChartData] = useState({
    labels: bondChartData.map((data) => data.date), 
    datasets: [
      {
        label: "price ",
        data: bondChartData.map((data) => data.price),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "#0066FF",
        borderWidth: 2
      }
    ]
  });


  useEffect(()=>{
    if(singleBond._id){
      const generateData = generateBondData(singleBond?.bondId?.closingPrice);
      setBondChartData(generateData);     
      
    } 

  },[singleBond])

  useEffect(()=>{

    if(bondChartData.length >0){
     setChartData({
      labels: bondChartData.map((data) => data.date), 
      datasets: [
        {
          label: "price ",
          data: bondChartData.map((data) => data.price),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0"
          ],
          borderColor: "#0066FF",
          borderWidth: 2
        }
      ]
    })
    }

  }, [bondChartData])


  console.log(bondChartData)


  

 
    
      
  
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
            <h2 className='stock-price-amount'>KES {singleBond?.bondId?.closingPrice}</h2>
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
            <p className="value">KES {singleBond.purchasePrice}</p>
            <p className="name">Purchase value value:</p>
            <p className="value">KES {purchaseValue}</p>
            </div>

            <div className="stock-more-details coupon-container-bottom">
                <p className="name">Coupon Rate:</p>
                <p className="value green-color">{singleBond.couponRate}%</p>
                <p className="name">Coupon Amount:</p>
                <h4 className="value">KES {couponAmount}</h4>

            </div>

            <div className="stock-value bonds-current-value">
            <h3 className='name'>Current Value:</h3>
            <h2 className='value'>KES {currentValue.toFixed(2)}</h2>
            <h4 className='name'>Capital gains:</h4>
            <h4 className={`value ${capitalGains > 0 ? 'green-color': 'red-color'} capital-gain`}>KES {capitalGains}</h4>
            </div>

            </div>
        </div>
        <div className="stock-visualization">
            <div className="visualization-head">
            
                <h4 className={setHeadColor('chart')} onClick={()=>{setCurrentHead('chart')}}>Chart</h4>
                {/* <h4 className={setHeadColor('news')} onClick={()=>{setCurrentHead('news')} }>News</h4> */}
                {/* <h4 className={setHeadColor('analytics')} onClick={()=>{setCurrentHead('analytics')}}>Analytics</h4> */}
            
            </div>

            <div id='chart-section' className="chart-content">
                <div className='chart-inner-content'> 
                  {/* <PierChart  chartData={chartData}/> */}
                  {/* <BarChart chartData={chartData} /> */}
                  {
                    bondChartData.length > 0  && (
                      <LineChart  chartData={chartData} head="Bond Performance" past="PAST 30 DAYS" />
                    )
                  }
                  

                </div>
                
                
              </div>
            {/* <div id='news-section' className="news-content">
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
            </div> */}
        </div>
        </div>
    </div>
  )
}

export default SingleBondsPage

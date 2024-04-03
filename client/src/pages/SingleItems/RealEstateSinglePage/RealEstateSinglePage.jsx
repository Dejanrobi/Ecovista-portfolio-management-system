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

// CHART COMPONENTS
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import LineChart from '../ChartComponents/LineChart';
import PierChart from '../ChartComponents/PierChart';
import { CompanyGlobalContext } from '../../../context/CompanyContext';

Chart.register(CategoryScale)


const RealEstateSinglePage = () => {

    const { getHeaders } = CompanyGlobalContext();
    
    
    const ecoVistaHeaders = getHeaders();

    // GET SINGLE APARTMENT
    const [singleApartment, setSingleApartment] = useState({});

    const { realEstateId } = useParams();
    // console.log("Real Estate Id: ", realEstateId);

    const getSingleApartment = async()=>{
      try {
        const { data } = await axios.get(`/real-estate/${realEstateId}`, ecoVistaHeaders)       
        // console.log(data)

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
  
  const apartmentOtherExpenses = Number(singleApartment.expenses?.length > 0 ?  calculateTotalAmountForCurrentMonth(singleApartment.expenses): 0)
  const apartmentCashFlow = (apartmentProfitsAfterMortgagePayment-apartmentOtherExpenses);
  // console.log(singleApartment?.expenses);

  function calculateTotalAmountPerMonth(expenses) {
    const monthlyTotals = {};
  
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
  
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
  
      monthlyTotals[month] += expense.amount;
    });
  
    // Convert the object to an array of objects with month and expense
    const result = Object.keys(monthlyTotals).map(month => ({
      month: parseInt(month),
      expense: monthlyTotals[month]
    }));
  
    return result;
  }
  

  useEffect(()=>{
    if(singleApartment?.expenses?.length > 0){
      console.log("Monthly expenses: ",calculateTotalAmountPerMonth(singleApartment.expenses))
    }

  },[singleApartment])

  const rentDataTest = [
    { date: '2023-03-01', amount: 1000 }, // Example rent data
    { date: '2023-04-01', amount: 1050 },
    { date: '2023-06-01', amount: 1100 },
    { date: '2024-03-01', amount: 1600 },
  ]

  const [rentAmountsPerUnit, setRentAmountsPerUnit] = useState([]);
  const [monthlyOccupiedUnits, setMonthlyOccupiedUnits] = useState([]);

  const [last12MonthsRent, setLast12MonthsRent] = useState([])
  const [last12MonthsOccupiedUnits, setLast12MonthsOccupiedUnits] = useState([])
  const [totalLast12MonthsRentAmount, setTotalLast12MonthsRentAmount] = useState([])

  useEffect(()=>{
    if(singleApartment._id){
      // console.log(singleApartment)
      setRentAmountsPerUnit(singleApartment.rentPerUnitPerUnit)
      setMonthlyOccupiedUnits(singleApartment.noOfOccupiedUnits)
    }

  },[singleApartment])

 const getLast12MonthsRent = (rentData, amountVar) => {
    
    const currentDate = new Date();
    const last12Months = [];
    currentDate.setMonth(currentDate.getMonth() - 12); // Subtract 12 months from current date

    let currentRent = 0;

    for (let i = 0; i <= 12; i++) {
      const month = currentDate.getMonth() + 1; // Months are zero-indexed in JavaScript
      const year = currentDate.getFullYear();
      const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-01`;

      const originalDateString = formattedDate;
      const originalDate = new Date(originalDateString);
      const newFormattedDateString = `${originalDate.getFullYear()}-${
        (originalDate.getMonth() + 1).toString().padStart(2, "0")
      }-01T00:00:00.000Z`;
      // const newDateFormat = 
       // Assuming rent is set at the beginning of the month
      //  const rentEntry = rentData.map((entry)=> entry.date === newFormattedDateString
      //   )

      const rentEntry = rentData.find(entry => entry.date === newFormattedDateString);

      if (rentEntry) {
        currentRent = rentEntry[`${amountVar}`];
      }else if (currentRent === 0){

        let max= {date: "0000-00-01T00:00:00.000Z"} ;
        for (let i = 0; i < rentData.length; i++) {
            if (rentData[i].date < newFormattedDateString && rentData[i].date > max.date) {

                max = rentData[i];
            }
            
        }
        currentRent = max[`${amountVar}`];

       
       
        // const currentRentData = rentData.find(entry => entry.date < newFormattedDateString);
        // currentRent = currentRentData[`${amountVar}`];
        // console.log(newFormattedDateString)
      }
      last12Months.unshift({ date: formattedDate, amount: currentRent });

      currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
    }

    last12Months.pop()

    return last12Months;

    
    
  }


  const getLast12MonthOccupiedUnits = (occupiedUnits)=>{

  }
  
  useEffect(()=>{
    // console.log(getLast12MonthsRent(rentAmountsPerUnit))
    if(rentAmountsPerUnit.length > 0){
      setLast12MonthsRent(getLast12MonthsRent(rentAmountsPerUnit, 'rentAmount'))
      // console.log(rentAmountsPerUnit)
    }
  }, [rentAmountsPerUnit])

  useEffect(()=>{
    if(monthlyOccupiedUnits.length > 0){
      setLast12MonthsOccupiedUnits(getLast12MonthsRent(monthlyOccupiedUnits, 'noOfOccupiedUnits'))
      console.log(monthlyOccupiedUnits)
    }    

  },[monthlyOccupiedUnits])

  // Calculate the 12 months rent amount
  const calculate12MonthsRent = ()=>{
    let last12MonthsTotalRent = []

    for(let i=0; i< last12MonthsOccupiedUnits.length ; i++){
      let unit = last12MonthsOccupiedUnits[i]
      let rent  = last12MonthsRent.find(amount=>amount.date === unit.date)

      last12MonthsTotalRent.push({date: unit.date, rentTotal: unit.amount * rent.amount})
    }

    setTotalLast12MonthsRentAmount(last12MonthsTotalRent.reverse());
    
  }

  useEffect(()=>{
    if(last12MonthsOccupiedUnits.length > 0 && last12MonthsRent.length > 0){
      // console.log("occupied units: ",last12MonthsOccupiedUnits)
      // console.log("rent per unit: ", last12MonthsRent)
      calculate12MonthsRent();

    }

  },[last12MonthsOccupiedUnits, last12MonthsRent])


  const [chartData, setChartData] = useState({
    labels: totalLast12MonthsRentAmount.map((data) => data.date), 
    datasets: [
      {
        label: "Total Rent ",
        data: totalLast12MonthsRentAmount.map((data) => data.rentTotal),
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
    if(totalLast12MonthsRentAmount.length > 0){
      setChartData(
        {
          labels: totalLast12MonthsRentAmount.map((data) => data.date), 
          datasets: [
            {
              label: "Total Rent ",
              data: totalLast12MonthsRentAmount.map((data) => data.rentTotal),
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
        }

      )
    }

  }, [totalLast12MonthsRentAmount])

  // useEffect(()=>{
  //   console.log(getLast12MonthsRent(rentDataTest))
        
  // },[])

  // preparing the data that we want to present.

  // OCCUPANCY RATE CHART
  const chartTotalNoOfUnits = singleApartment.noOfUnits;
  const chartOccupiedUnits = apartmentOccupiedUnits;
  const notOccupiedUnits = Number(singleApartment.noOfUnits)- apartmentOccupiedUnits;


  const occDataArr = [
    {
      name: "Occupied Units",
      value: chartOccupiedUnits
    },
    {
      name: "Empty Units",
      value: notOccupiedUnits
    }
  ]

  const testData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234
    }
  ]
  
  const [occupancyRateChartData, setOccupancyRateChartData] = useState({
    labels: occDataArr.map((data) => data.name), 
    datasets: [
      {
        label: "Users Gained ",
        data: occDataArr.map((data) => data.value),
        backgroundColor: [
          "#0066FF",
          "#E20000"
          
        ],
        borderColor: "black",
        borderWidth: 1
      }
    ]

  })

  useEffect(()=>{
    if(singleApartment._id){
      setOccupancyRateChartData(
        {
          labels: occDataArr.map((data) => data.name), 
          datasets: [
            {
              label: "number",
              data: occDataArr.map((data) => data.value),
              backgroundColor: [
                "#0066FF",
                "#E20000"
                
              ],
              borderColor: "black",
              borderWidth: 1
            }
          ]
      
        }
      )
    }

  },[singleApartment])
  
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
              <button className='button-set' onClick={openRentPerUnit} >EDIT</button>
            </div>
            
            <p className="name">No of occupied units:</p>
            <p className="value">{apartmentOccupiedUnits}</p>
            <div>
              <button className='button-set' onClick={openAddNoOfOccupiedUnits}>EDIT</button>
            </div>
            <p className="name">Occupancy Rate:</p>
            <p className={`value ${apartmentOccupancyRate>90?'green-color':'red-color'}`}>{apartmentOccupancyRate.toFixed(2)}%</p>
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
                  <p className="value">KES{apartmentOtherExpenses}</p>
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
                                    <p className='content tiny-text'>KES{expense.amount}</p>
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
            <h2 className={`value ${apartmentCashFlow>0?'green-color':'red-color'}`}>KES{apartmentCashFlow}</h2>
            
            </div>

            </div>
        </div>
        <div className="stock-visualization">
            <div className="visualization-head">
            
                <h4 className={setHeadColor('chart')} onClick={()=>{setCurrentHead('chart')}}>Chart</h4>
                
                <h4 className={setHeadColor('analytics')} onClick={()=>{setCurrentHead('analytics')}}>Analytics</h4>
            
            </div>

            <div id='chart-section' className="chart-content real-estate-chart">
                    <div className="chart-inner-content">
                      {
                        totalLast12MonthsRentAmount.length > 0 && (
                          <LineChart chartData={chartData} head="Total Rent Per Month" past="LAST 12 MONTHS" />
                        )
                      }
                    </div>
            </div>

            <div id='news-section' className="news-content">
            

            <div id='analytics-section' className="analytics-content news-content ">
                <h3>Analytics</h3>
                <div id='chart-section' className="chart-content real-estate-chart real-estate-occupied-outside">
                        <div className="chart-inner-content real-estate-occupied-pie">
                          <PierChart chartData={occupancyRateChartData} />
                        </div>
                </div>
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

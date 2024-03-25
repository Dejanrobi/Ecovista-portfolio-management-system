import React from 'react'
import PageHeader from '../components/PageHeader/PageHeader'


// CSS
import "./Dashboard.css"
import { Link } from 'react-router-dom'
import { CompanyGlobalContext } from '../context/CompanyContext'
const Dashboard = () => {

  const {

    totalStocksInvestmentAmount,
    totalStockCapitalGains,
    totalStocksValue,

    totalBondsFaceValue,
    totalBondsCurrentValue,
    totalBondsCapitalGainsValue,

    totalRentalIncome,
    totalMortgagePayment,
    totalApartmentExpenses

   } = CompanyGlobalContext();
   

   let stocksPercentageGains = ((totalStockCapitalGains/totalStocksValue)*100).toFixed(2)
   if(stocksPercentageGains<0){
    stocksPercentageGains = ((totalStockCapitalGains/totalStocksInvestmentAmount)*100).toFixed(2)
   }

   let bondsPercentageGain = ((totalBondsCapitalGainsValue/totalBondsCurrentValue)*100).toFixed(2)
   if(bondsPercentageGain<0){
      bondsPercentageGain = ((totalBondsCapitalGainsValue/totalBondsFaceValue)*100).toFixed(2)
   }

   let totalPortfolioValue = (Number(totalStocksValue)+ Number(totalBondsCurrentValue) + Number(totalRentalIncome)).toFixed(2)
   let totalPortInvestmentAmount = (Number(totalStocksInvestmentAmount) + Number(totalBondsFaceValue) + Number(totalMortgagePayment)).toFixed(2)
   let totalPortProfits = (totalPortfolioValue - totalPortInvestmentAmount).toFixed(2)
   let totalPortGains = ((totalPortProfits/totalPortfolioValue)*100).toFixed(2)

   if(totalPortGains <0){
      totalPortGains = ((totalPortProfits/totalPortInvestmentAmount)*100).toFixed(2)
   }
   return (
    <div className='padding-tb-lr'>
      
        <PageHeader header="Dashboard"/>

        <div className="dashboard-summary ">
          <div className='single-summary-dashboard'>
            <div className='icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z" clipRule="evenodd" />
              </svg>

            </div>
            <div className='sum-name'>
              <p>TOTAL PORTFOLIO VALUE</p>
            </div>
            <div className='sum-value'>
              <h2>KES {totalPortfolioValue}</h2>
            </div>
            {/* <div className='sum-gain'>
              
                <h4 className={`gain-percentage ${totalPortGains > 0 ? 'green-color':'red-color'}`}>{totalPortGains}%</h4>
                <h4 className={`gain-icon ${totalPortGains > 0 ? 'green-color':'red-color'}`}>
                  {
                    totalPortGains > 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
                    </svg>
                    ):(
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                      </svg>

                    )
                  }
                 

                </h4>
              
            </div> */}
          </div>
          <div className='single-summary-dashboard'>
            <div className='icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a4.124 4.124 0 0 0 1.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 0 0-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 0 0 .933-1.175l-.415-.33a3.836 3.836 0 0 0-1.719-.755V6Z" clipRule="evenodd" />
              </svg>


            </div>
            <div className='sum-name'>
              <p>INVESTMENT AMOUNT</p>
            </div>
            <div className='sum-value'>
              <h2>KES {totalPortInvestmentAmount}</h2>
            </div>
            <div className='sum-gain'>
              
                <h4 className='gain-percentage'></h4>
                <h4 className='gain-icon'>
                

                </h4>
              
            </div>
          </div>
          <div className='single-summary-dashboard'>
            <div className='icon'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
                <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
              </svg>


            </div>
            <div className='sum-name'>
              <p>PROFITS</p>
            </div>
            <div className='sum-value'>
              <h2>KES {totalPortProfits}</h2>
            </div>
            <div className='sum-gain'>
              
                <h4 className={`gain-percentage ${totalPortGains > 0 ? 'green-color':'red-color'}`}>{totalPortGains}%</h4>
                <h4 className={`gain-icon ${totalPortGains > 0 ? 'green-color':'red-color'}`}>
                  {
                    totalPortGains > 0 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
                    </svg>
                    ):(
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                      </svg>

                    )
                  }
                 

                </h4>
              
            </div>
          </div>
        </div>

        <div className="asset-allocation ">
          <h3>Asset Allocation</h3>

          <div className="all-assets-allocations">
            <Link to={"/stocks"} className="single-asset-allocations">
              <div className='allocation-head'>
                
                <div className='head-content'>
                  <div className='icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm4.5 7.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Zm3.75-1.5a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0V12Zm2.25-3a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0V9.75A.75.75 0 0 1 13.5 9Zm3.75-1.5a.75.75 0 0 0-1.5 0v9a.75.75 0 0 0 1.5 0v-9Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4>Stocks</h4>
                </div>

                <div>
                  <hr />
                </div>
              </div>

              <div className="allocation-content">
                <div className='name'>
                  <p>Total allocation: </p>
                </div>
                <div className='value'>
                  <p>KES {totalStocksInvestmentAmount}</p>
                </div>
                <div className='name'>
                  <p>Gains: </p>
                </div>
                <div className='value'>
                  <div className='asset-gain'>
                    <p className={` ${stocksPercentageGains>0?'green-color':'red-color'}`}>{stocksPercentageGains}%</p>
                    <div className={`icon ${stocksPercentageGains>0?'green-color':'red-color'}`}>
                      {
                        stocksPercentageGains >0 ?(
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
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
                <div className='name'>
                  <p>Profit: </p>
                </div>
                <div className='value'>
                  <p>KES {totalStockCapitalGains}</p>
                </div>
              </div>

              <div className="total-amount">
                <h4 className='total-name'>Total Amount: </h4>
                <h4 className='total-value'>KES {totalStocksValue}</h4>
              </div>

            </Link>
            <Link to={"/bonds"} className="single-asset-allocations">
              <div className='allocation-head'>
                
                <div className='head-content'>
                  <h4 className='icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
                      <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
                      <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
                    </svg>

                  </h4>
                  <h4>Bonds</h4>
                </div>

                <div>
                  <hr />
                </div>
              </div>

              <div className="allocation-content">
                <div className='name'>
                  <p>Total allocation: </p>
                </div>
                <div className='value'>
                  <p>KES {totalBondsFaceValue}</p>
                </div>
                <div className='name'>
                  <p>Gains: </p>
                </div>
                <div className='value'>
                  <div className={`asset-gain`}>
                    <p className={` ${bondsPercentageGain>0?'green-color':'red-color'}`}>{bondsPercentageGain}%</p>
                    <div className={`icon ${bondsPercentageGain>0?'green-color':'red-color'}`}>
                      {
                        bondsPercentageGain >0 ?(
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
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
                <div className='name'>
                  <p>Profit: </p>
                </div>
                <div className='value'>
                  <p>KES {totalBondsCapitalGainsValue}</p>
                </div>
              </div>

              <div className="total-amount">
                <h4 className='total-name'>Total Amount: </h4>
                <h4 className='total-value'>KES {totalBondsCurrentValue}</h4>
              </div>

            </Link>
            <Link to={"real-estate"} className="single-asset-allocations">
              <div className='allocation-head'>
                
                <div className='head-content'>
                  <h4 className='icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5h-15ZM9 6a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm-.75 3.75A.75.75 0 0 1 9 9h1.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM9 12a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H9Zm3.75-5.25A.75.75 0 0 1 13.5 6H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM13.5 9a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 9h-1.5Zm-.75 3.75a.75.75 0 0 1 .75-.75H15a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75ZM9 19.5v-2.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 9 19.5Z" clipRule="evenodd" />
                    </svg>

                  </h4>
                  <h4>Real Estate</h4>
                </div>

                <div>
                  <hr />
                </div>
              </div>

              <div className="allocation-content">
                <div className='name'>
                  <p>Rental Income: </p>
                </div>
                <div className='value'>
                  <p>KES {totalRentalIncome}</p>
                </div>
                <div className='name'>
                  <p>Mortgage Payment: </p>
                </div>
                <div className='value'>
                 <p>KES {totalMortgagePayment}</p>
                </div>
                <div className='name'>
                  <p>Expenses: </p>
                </div>
                <div className='value'>
                 <p>KES {totalApartmentExpenses}</p>
                </div>
                
              </div>

              <div className="total-amount">
                <h4 className='total-name'>Cashflow: </h4>
                <h4 className='total-value'>KES {(totalRentalIncome - totalMortgagePayment-totalApartmentExpenses)}</h4>
              </div>

            </Link>
          </div>
        </div> 
      

    </div>
  )
}

export default Dashboard

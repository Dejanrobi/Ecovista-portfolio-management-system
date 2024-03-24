import React from 'react'

// import CSS
import "./SingleSummary.css";

const SingleSummary = ({sumIcon, sumName, sumValue, sumPercentage, sumOverPercentage, occupancyRate  }) => {
  return (
    <div >
        <div className='single-summary '>
            
          {
            sumIcon && (
                <div className='icon'>
                    {sumIcon}       
                </div>
            )
          }

          {
            sumName && (
                <div className='sum-name'>
                    <p>{sumName}</p>
                </div>
            )
          }
          {
            sumValue && (
                <div className='sum-value'>
                    <h2>KES {sumValue}</h2>
                </div>
            )
          }

          {
            sumPercentage && (
                <div className={`sum-gain `}>
            
                  <h3 className={`gain-percentage  ${sumPercentage > 0 ?'green-color': 'red-color'}`}>{sumPercentage}%</h3>
                    <h4 className={`gain-icon ${sumPercentage > 0 ?'green-color': 'red-color'}`}>
                        {
                            sumPercentage > 0 ? (
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

            )
          }
          
          {
            sumOverPercentage && (
                <div className='sum-gain'>
            
              <h3 className='gain-percentage'>{sumOverPercentage}%</h3>
                
            
          </div>

            )
          }
          
          {
            occupancyRate && (
              occupancyRate > 90 ?(
                <h3 className='green-color'>{occupancyRate}%</h3>
              ):(
                <h3 className='red-color'>{occupancyRate}%</h3>
              )
            )
          }
         
          
        </div>
      
    </div>
  )
}

export default SingleSummary

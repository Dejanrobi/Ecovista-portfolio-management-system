import React from 'react'

// import CSS
import "./SingleSummary.css";

const SingleSummary = ({sumIcon, sumName, sumValue, sumPercentage  }) => {
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
                <div className='sum-gain'>
            
              <h4 className='gain-percentage'>{sumPercentage}%</h4>
                <h4 className='gain-icon'>
                    {
                        sumPercentage > 0 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
                            </svg>
                        ):(
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 0 1 .968-.431l5.942 2.28a.75.75 0 0 1 .431.97l-2.28 5.94a.75.75 0 1 1-1.4-.537l1.63-4.251-1.086.484a11.2 11.2 0 0 0-5.45 5.173.75.75 0 0 1-1.199.19L9 12.312l-6.22 6.22a.75.75 0 0 1-1.06-1.061l6.75-6.75a.75.75 0 0 1 1.06 0l3.606 3.606a12.695 12.695 0 0 1 5.68-4.974l1.086-.483-4.251-1.632a.75.75 0 0 1-.432-.97Z" clipRule="evenodd" />
                            </svg>
                        )
                    }
                    

                </h4>
            
          </div>

            )
          }
          
         
          
        </div>
      
    </div>
  )
}

export default SingleSummary
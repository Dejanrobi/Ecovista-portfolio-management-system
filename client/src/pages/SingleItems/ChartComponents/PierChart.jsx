import React from 'react'
import { Pie } from 'react-chartjs-2'

const PierChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
         
          // maintainAspectRatio: false,
            
            width: 400,
            height: 200,
        }}
      />
    </div>
  )
}

export default PierChart

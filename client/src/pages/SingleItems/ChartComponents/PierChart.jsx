import React from 'react'
import { Pie } from 'react-chartjs-2'

const PierChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <div className="chart-container">
        <h2 style={{ textAlign: "center" }}>No of Occupied Units</h2>
        <Pie
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Occupied and Empty Units"
              },
              width:'400',
              height: '400'
            },
            
          }}
        />
      </div>
    </div>
  )
}

export default PierChart

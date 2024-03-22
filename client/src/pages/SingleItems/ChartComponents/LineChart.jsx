import React from 'react'
import { Line } from 'react-chartjs-2'

const LineChart = ({chartData, head}) => {
  return (
    <div className="chart-container">
      <h3 style={{ textAlign: "center" }}>{head}</h3>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "(PAST 30 DAYS)"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  )
}

export default LineChart

import React, { useState } from 'react'

import { Chart } from 'chart.js'
import BarChart from './SingleItems/ChartComponents/BarChart'
import { singleStockChData } from '../Data/data'
import PageHeader from '../components/PageHeader/PageHeader'

import "./TestCode.css";

import PierChart from './SingleItems/ChartComponents/PierChart'



const TestCode = () => {

    // preparing the data that we want to present
  const [chartData, setChartData] = useState({
    labels: singleStockChData.map((data) => data.year), 
    datasets: [
      {
        label: "Users Gained ",
        data: singleStockChData.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });
  return (
    <div className='padding-tb'>
      <PageHeader header="Test Code" />

      <div className='bar-chart-styles'>
        <BarChart chartData={chartData}/>

      </div>
      <div className='bar-chart-styles'>
        <PierChart chartData={chartData}/>

      </div>
      
    </div>
  )
}

export default TestCode

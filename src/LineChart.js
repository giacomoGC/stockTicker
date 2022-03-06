import React from "react";
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart(props) {
    const [monthsCount, setMonthsCount] = useState();

    useEffect(() => {
        //setMonthsCount(props.lineChartData['Time Series (Digital Currency Monthly)']);
        //console.log(monthsCount);
      }, [])

    //const data = props.data;
    const options = {
        responsive: true,
        plugins: {
            title: {
            display: true,
            text: 'Chart.js Line Chart',
            },
        },
    };
    const labels = ['January', 'February', 'March'];
    const graphData = {
        labels,
        datasets: [
            {
            label: 'Dataset 1',
            data: [20, 15, 20],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    return (
        <div className="lineChart">
            <Line
                options={options}
                data={graphData}
            /> 
            <p>{typeof(props.lineChartData)}</p>
            <p>{JSON.stringify(props.lineChartData['Time Series (Digital Currency Monthly)'], undefined, 2)}</p>
        </div>
        
    )
}


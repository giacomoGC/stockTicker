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
    const [highValues, setHighValues] = useState();
    const [labels, setLabels] = useState();
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [selectedYear, setSelectedYear] = useState('all');
    const [selectedDates, setSelectedDates] = useState([]);
    const [startDate, setStartDate] = useState('');

    // Count months from api call result
    useEffect(() => {
        if(props.lineChartData) {
            setMonthsCount(Object.keys(props.lineChartData).length);
        }
        else {
            console.log("No months!");
        }
      }, [props.lineChartData])

    // Set selected year
    useEffect(() => {
        let today = new Date();   
        let todaysYear = today.getFullYear();

        setCurrentYear(todaysYear);

    }, [selectedYear]);

    useEffect(() => {
        if(props.lineChartData) {
            let datesArr = [];
            let valuesArr = [];
            let labelsArr = [];
            let lineChartDataArr = Object.entries(props.lineChartData);
            let filteredLineChartDataArr = [];

            if (selectedYear == 'all') {               
                lineChartDataArr.forEach( (key, value) => {
                    datesArr.push(key[0]);
                    labelsArr.push(key[0]);
                    valuesArr.push(key[1]['2a. high (EUR)']);
                })
            }
            else {
                lineChartDataArr.forEach( (key, value) => {
                    if(key.toString().includes(selectedYear)) {
                        filteredLineChartDataArr.push(key);
                    }
                })
                
                filteredLineChartDataArr.forEach( (key, value) => {
                    filteredLineChartDataArr.push(key[0]);
                    labelsArr.push(key[0]);
                    valuesArr.push(key[1]['2a. high (EUR)']);
                })
            }

            // TODO Store all data, not only dates info, maybe use 1 more state array
            setSelectedDates(datesArr.reverse());
            setLabels(labelsArr.reverse());
            setHighValues(valuesArr.reverse());
        }
        else {
            console.log("No data!");
        }
      }, [props.lineChartData, selectedYear])

    useEffect(() => {
        //console.log(selectedDates.length);
        //console.log(highValues.length);
    }, [selectedDates, selectedYear, highValues]);  

    
    // Render chart
    const options = {
        responsive: true,
        plugins: {
            title: {
            display: true,
            text: 'GC BTC Line Chart',
            },
        },
    };
    const graphData = {
        labels: labels,
        datasets: [
            {
            label: 'Highest value',
            data: highValues,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
        tension: 0.4
    };

    const handleYearChange = (event) => {
        console.log(event.target.value);
        setSelectedYear(event.target.value);
    }

    return (
        <div className="lineChart">
            <Line
                options={options}
                data={graphData}
            /> 
            {/* {<p>{JSON.stringify(props.lineChartData, undefined, 2)}</p>} */}
            <select onChange={handleYearChange}>
                <option value="all">2019-2022</option>
                <option value={currentYear}>{currentYear}</option>
                <option value={currentYear - 1}>{currentYear - 1}</option>
                <option value={currentYear - 2}>{currentYear - 2}</option>
            </select>
        </div>
        
    )
}


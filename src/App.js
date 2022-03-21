import { useEffect, useState } from 'react';
import { LineChart } from './LineChart.js';
import { TodayValue } from './TodayValue.js';
import { getStonks } from './api.js';

function App() {
  const [tickerData, setTickerData] = useState();
  const [timeSeries, setTimeSeries] = useState();
  const [apiKey, setApiKey] = useState();
  const [historicalTickerData, setHistoricalTickerData] = useState('');
  const [url, setUrl] = useState(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=${apiKey}`);

  useEffect(() => {
    async function getKey() {
      const response = await fetch('http://localhost:8000/apiKey', {
        "method": "GET",
        "headers": {'User-Agent': 'request'}
      })
      .catch(err => {
        console.error(err);
      });
      const json = await response.json();
      setApiKey(json);
    }
    
    getKey();
  }, [])

  useEffect(() => {
    getStonks(url)
      .then((data) => {
        setTickerData(data);
        setTimeSeries(data['Time Series (Digital Currency Monthly)']);
      })
  }, [url])

  return (
    <div className="App">
      <br />
      {<LineChart lineChartData={timeSeries} />}
      <TodayValue data={timeSeries} />
      {/* {<p>{JSON.stringify(timeSeries, undefined, 2)}</p>} */}
    </div>
  );
}

export default App;

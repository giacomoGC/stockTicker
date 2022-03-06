import { useEffect, useState } from 'react';
import { LineChart } from './LineChart.js';

function App() {
  const [tickerData, setTickerData] = useState();
  const [historicalTickerData, setHistoricalTickerData] = useState('');
  const [price, setPrice] = useState(-1);
  const [ticker, setTicker] = useState('GME');
  const [range, setRange] = useState('1');
  const [startDay, setStartDay] = useState('2022-02-15');
  const [endDay, setEndDay] = useState('2022-02-15');
  const [url, setUrl] = useState("https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=SODHIHBS3VVG5YSB");
  
  useEffect(() => {
    getStonks(url)
      .then((data) => {
        setTickerData(data);
      })
  }, [url])

  // useEffect(() => {
  //   getStonks(historicalUrl)
  //     .then((historicalData) => {
  //       setHistoricalTickerData(historicalData);
  //     })
  // }, [historicalUrl])

  useEffect(() => {
    //console.log(tickerData['Time Series (Digital Currency Monthly)']);
  }, [tickerData, range, startDay, endDay])

  let setStartDayTimeout = '';
  let setEndDayTimeout = '';

  async function getStonks(url) {
    const response = await fetch(url, {
      "method": "GET",
      "headers": {'User-Agent': 'request'}
    })
    .catch(err => {
      console.error(err);
    });
    return response.json();
  }

  return (
    <div className="App">
      <br />
      <LineChart lineChartData={tickerData} />
      {/* <p>{JSON.stringify(tickerData)}</p> */}
    </div>
  );
}

export default App;

import React from "react";
import { useEffect, useState, useRef } from 'react';
import { getStonks } from './api.js';

export function TodayValue(props) {
  const [lastValue, setLastValue] = useState();
  const [currentValue, setCurrentValue] = useState();
  const [tickerData, setTickerData ] = useState();
  const [url, setUrl] = useState("https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=BTC&market=EUR&interval=1min&apikey=75F3O9T8UBWNVLLG");
  
  //const prevValue = useRef();

  useEffect(() => {
    getStonks(url)
    .then((data) => {
      setTickerData(data);
    });
  }, [])

  useEffect( () => {
    if(tickerData) {
      //prevValue.current = Object.entries(tickerData['Time Series Crypto (1min)'])[0];
      setCurrentValue(Object.entries(tickerData['Time Series Crypto (1min)'])[0]);
      setLastValue(Object.entries(tickerData['Time Series Crypto (1min)'])[1])
      //setLastValue(prevValue.current);
    }
  }, [tickerData]);

  return (
    <div>
      <h1>{JSON.stringify(currentValue)}</h1>
      <h3>Previous value: {JSON.stringify(lastValue)}</h3>
      <p></p>
    </div>
    
  )
}
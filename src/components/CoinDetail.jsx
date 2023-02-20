import React, { useState, useEffect } from 'react';
import axios from 'axios';
const CoinDetail = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const response = await axios.get('https://api.upbit.com/v1/ticker?markets=KRW-BTC');
      setData(response.data);
    }, 1000); // 

    // Clean up the interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className=''>
      {data.map(item => (
        <div key={item.market}>
          <div className=''>
          <h3>비트코인</h3>
          <p className='text-2xl'>{item.trade_price}
          <span className='text-lg ml-1'>KRW</span></p>
          </div>
          {/* <p>{item.high_price}</p>
          <p>{item.low_price}</p>
          <p>{item.opening_price}</p> */}
          <p>전일대비 </p>
        </div>
      ))}
    
    </div>
  );
};

export default CoinDetail;

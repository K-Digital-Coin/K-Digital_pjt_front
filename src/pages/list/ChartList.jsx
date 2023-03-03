import React, { useRef, useEffect, useState } from "react";
import client from "../../config/axiosConfig";



const CoinChart = () => {


  useEffect(()=>{
    const timer = setInterval(()=>{
      client
      .get('/api/member/me')
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    },1000000)
    return () => clearInterval(timer);
  }, []);



  return (
  // <div className="grid lg:grid-rows-3 grid-flow-col bg-black ">
  // <div className="col-span-4">
  <div>
    <div>
 
      <ul>
        <li>Ma 지표모델</li>
        <li>BBP 지표모델</li>
        <li>BBC 지표모델</li>
        <li>BBM 지표모델</li>
        <li>MACD 지표모델</li>

      </ul>
    





  {/* <MainChart/>비트코인 실시간 차트 
  <CoinChart2/> */}
  </div>
  </div>
  );
};

export default CoinChart;

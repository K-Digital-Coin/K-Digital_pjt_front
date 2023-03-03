import React, { useRef, useEffect, useState } from "react";
import client from "../../config/axiosConfig";
import MainChart from "../../components/MainChart"
import CoinChart2 from "../../components/CoinChart2";


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
  <div className="grid lg:grid-rows-3 grid-flow-col bg-black ">
  <div className="col-span-4">

    





  <MainChart/>{/* 비트코인 실시간 차트 */}
  <CoinChart2/>  
  </div>
  </div>
  );
};

export default CoinChart;

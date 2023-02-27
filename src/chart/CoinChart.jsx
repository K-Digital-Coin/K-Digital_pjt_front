import React, { useRef, useEffect, useState } from "react";
import CoinDetail from "../components/CoinDetail";
import client from '../config/axiosConfig'
import Chart1 from '../chart/Chart1'
import MainChart from "./MainChart";
import Listbar from "../components/ListBar"

const CoinChart = () => {


  useEffect(()=>{
    const timer = setInterval(()=>{
      client
      .get('/api/member/me')
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    },10000)
    return () => clearInterval(timer);
  }, []);



  return (<div className="grid grid-rows-3 grid-flow-col">
  
  <div className="col-span-4">
  <MainChart/>
  <Chart1/>
  <Chart1/>
  <Chart1/>
  </div>
  <Listbar/>
  </div>
  );
};

export default CoinChart;

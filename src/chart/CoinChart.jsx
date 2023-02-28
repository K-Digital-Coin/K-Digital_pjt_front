import React, { useRef, useEffect, useState } from "react";
import client from '../config/axiosConfig'
import Chart1 from '../chart/Chart1'
import MainChart from "./MainChart";
import Listbar from "../components/ListBar"
import CoinChart2 from "./CoinChart2";
import { Chart } from "chart.js";


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
  <div className="grid grid-rows-3 grid-flow-col bg-black">
  <div className="col-span-4">
  <MainChart/>
  <CoinChart2/>
  </div>
  <Listbar/>
  </div>
  );
};

export default CoinChart;

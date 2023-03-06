import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";

// 기존 차트 버젼
const MainLineChart = ({ hCoins, pCoins }) => {
  const historyCoins = hCoins;
  const predictCoins = pCoins;
  
  const [options, setOptions] = useState({ 
    title: {
      text: "비트코인 차트",
      align: "Center",
      style :{
        fontSize :"25px",
        fontWeight : "bold",
        colors : "#ffffff"
      }
    },
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        format: "yyyy-MM-dd HH:mm",
        style: {
          fontWeight: "bold",
          fontSize: "14px",
          colors : "#ffffff"
        }
      },
    },
    yaxis : {
      labels :{
        formatter: function(val) {
          return val.toLocaleString({minimumFractionDigits: 2});
        },
        style : {
          fontWeight: "bold",
          fontSize: "16px",
          colors : "#ffffff"
        },
      }
    },

    tooltip: {
      enabled: false,
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    setSeries([
      {
        name: "history",
        type: "line",
        data: historyCoins,
      },
      {
        name: "predcit",
        type: "line",
        data: predictCoins,
      },
    ]);
  }, [historyCoins, predictCoins]);

  return (
    <ApexChart options={options} series={series} type="line" height={400} />
  );
};

export default MainLineChart;

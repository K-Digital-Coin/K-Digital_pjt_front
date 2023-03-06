import React, { useState, useEffect } from "react";
import ApexChart from "react-apexcharts";

const PredictChart = ({ hCoins, pCoins }) => {
  const historyCoins = hCoins;
  const predictCoins = pCoins;

  const [options, setOptions] = useState({
    title: {
      text: "비트코인 예측차트",
      align: "Center",
      style: {
        fontSize: "25px",
        fontWeight: "bold",
        color: "blue",
      },
    },
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        format: "MM-dd HH:mm",
        style: {
          fontWeight: "bold",
          fontSize: "14px",
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toLocaleString({ minimumFractionDigits: 2 });
        },
        style: {
          fontWeight: "bold",
          fontSize: "13px",
          colors: "#ffffff",
        },
      },
    },
    tooltip: {
      enabled: true,
      x: {
        format: "MM-dd HH:mm",
      },
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    setSeries([
      {
        name: "current",
        type: "line",
        data: historyCoins,
      },
      {
        name: "predict",
        type: "line",
        data: predictCoins,
      },
    ]);
  }, [historyCoins, predictCoins]);

  return <ApexChart options={options} series={series} height={300} />;
};
export default PredictChart;

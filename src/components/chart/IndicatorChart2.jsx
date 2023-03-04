import React, { useState, useEffect } from "react";
import ApexChart from "react-apexcharts";

const IndicatorChart2 = ({ cCoins, pCoins }) => {
  const currentCoins = cCoins;
  const predictCoins = pCoins;

  const [options, setOptions] = useState({
    stroke: {
      width: [4, 4],
      curve: "straight",
    },
    xaxis: {
      type: "datetime",
      tickAmount: 10,
      labels: {
        datetimeUTC: false,
        format: "yyyy-MM-dd HH:mm",
      },
    },
    tooltip: {
      x: {
        show: true,
        format: "MM-dd HH:mm",
        formatter: undefined,
      },
    },
  });

  const [series, setSeries] = useState([
    {
      name: "current",
      type: "line",
      data: [],
    },
    {
      name: "predict",
      type: "line",
      data: [],
    },
  ]);

  useEffect(() => {
    setSeries([
      {
        name: "current",
        type: "line",
        data: currentCoins,
      },
      {
        name: "predict",
        type: "line",
        data: predictCoins,
      },
    ]);
  }, [currentCoins, predictCoins]);

  return <ApexChart options={options} series={series} height={250} />;
};
export default IndicatorChart2;
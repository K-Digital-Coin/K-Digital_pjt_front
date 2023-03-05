import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";

// 기존 차트 버젼
const MainCandleChart = ({ cNumber, hCoins }) => {
  const chartNumber = cNumber;
  const historyCoins = hCoins;
  const [options, setOptions] = useState({
    title: {
      text: "비트코인 차트",
      align: "Center",
    },
    stroke: {
      width: 1,
      curve: "straight",
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        format: "yyyy-MM-dd HH:mm",
      },
    },

    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      x: {
        type: "datetime",
        format: "MM-dd HH:mm",
      },
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    setSeries([
      {
        name: "history",
        data: historyCoins,
      },
    ]);
  }, [historyCoins, chartNumber]);

  return (
    <ApexChart
      options={options}
      series={series}
      type="candlestick"
      height={400}
    />
  );
};

export default MainCandleChart;

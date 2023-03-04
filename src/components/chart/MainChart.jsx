import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";

// 기존 차트 버젼
const MainChart = ({ cNumber, hCoins, cCoins, pCoins }) => {
  const chartNumber = cNumber;
  const historyCoins = hCoins;
  const currentCoins = cCoins;
  const predictCoins = pCoins;
 console.log(historyCoins)
  const [options, setOptions] = useState({
    title: {
      text: "비트코인 차트",
      align: "Center",
    },
    stroke: {
      width: [1, 2, 2],
      curve: "straight",
    },
    xaxis: {
      type: "datetime",
      tickAmount: 10, // x축 눈금 개수
      labels: {
        datetimeUTC: true, // UTC 시간이 아닌 로컬 시간을 사용하도록 설정
        format: "yyyy-MM-dd HH:mm:ss", // format 바꾸기
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      x: {
        format: "MM-dd HH:mm",
      },
      y: {
        formatter: function (val, { seriesIndex, dataPointIndex, w }) {
          if (seriesIndex === 0) {
            // 캔들스틱 데이터인 경우
            const item = w.config.series[seriesIndex].data[dataPointIndex];
            const tooltipContent = `
              <div>시가: ${item.openingPrice} KRW</div>
              <div>고가: ${item.highPrice} KRW</div>
              <div>저가: ${item.lowPrice} KRW</div>
              <div>종가: ${item.tradePrice} KRW</div>
            `;
            return tooltipContent;
          } else {
            // 라인 데이터인 경우
            return val + "KRW";
          }
        },
      },
    },
    annotations: {
      xaxis: [
        {
          x: new Date("2023-02-18 15:00:00").getTime(),
          borderColor: "#999",
          borderWidth: 1,
          label: {
            text: "과거시세",
            orientation: 'horizontal',
            offsetY : 10,
            offsetX : -12,
            style: {
              color: "#fff",
              background: "#cc0707",
            },
          
          },
        },
      ],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "history",
      type: "candlestick",
      data: [],
    },
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
        name: "history",
        type: "candlestick",
        data: historyCoins,
      },
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
  }, [historyCoins, currentCoins, chartNumber]);

  return (
    <>
      <div className="relative max-w-full">
        <ApexChart
          options={options}
          series={series}
          height={400}
          className="text-blue-400 z-10"
        />
      </div>
    </>
  );
};

export default MainChart;
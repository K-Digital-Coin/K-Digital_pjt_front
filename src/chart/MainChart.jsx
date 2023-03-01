import React, { useRef, useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { useInterval } from "../useInterval"; // useInterval 커스텀 훅
import CoinDetail from "../components/CoinDetail";

const MainChart = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState("minute");

  // useInterval 커스텀 훅 사용
  useInterval(() => {
    // upbit api 요청
    fetch(
      `https://api.upbit.com/v1/candles/${selectedInterval}s/1?market=KRW-BTC&count=60`
    )
      .then((res) => res.json())
      .then((data) => {
        // 차트 데이터 생성
        const newData = data.map((item) => ({
          x: new Date(item.candle_date_time_kst),
          y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
        }));
        setChartData(newData);
      })
      .catch((err) => console.log(err));
  }, 5000); // 5초마다 api 요청

  useEffect(() => {
    // 차트 설정
    const options = {
      series: [
        {
          name: "candle",
          type: "candlestick",
          data: chartData,
        },
      ],
      chart: {
        height: 400,
        type: "candlestick",
      },
      xaxis: {
        type: "datetime",
        tickAmount: 10, // x축 눈금 개수
        labels: {
          datetimeUTC: false, // UTC 시간이 아닌 로컬 시간을 사용하도록 설정
          format: "HH:mm:ss", // x축 레이블 형식
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    };

    // 차트 렌더링
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [chartData]);

  const handleIntervalChange = (interval) => {
    setSelectedInterval(interval);
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2>Bitcoin Chart</h2>
        <div className="chart-interval">
          <button
            className={`${selectedInterval === "minute" ? "active" : ""} btn-interval`}
            onClick={() => handleIntervalChange("minute")}
          >
            1분
          </button>
          <button
            className={`${selectedInterval === "hour" ? "active" : ""} btn-interval`}
            onClick={() => handleIntervalChange("hour")}
          >
            1시간
          </button>
          <button
            className={`${selectedInterval === "day" ? "active" : ""} btn-interval`}
            onClick={() => handleIntervalChange("day")}
          >
            1일
          </button>
        </div>
      </div>
      <div className="text-blue-400" ref={chartRef}></div>
      <CoinDetail />
    </div>
  );
};

export default MainChart;
import React, { useRef, useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import { useInterval } from "../useInterval"; // useInterval 커스텀 훅
import CoinDetail from "../components/CoinDetail";
import CoinPredict from "../components/CoinPredict";

const MainChart = () => {
  const chartRef = useRef(null);
  const [minuteData, setMinuteData] = useState([]);
  const [hourData, setHourData] = useState([]);
  const [dayData, setDayData] = useState([]);

  // useInterval 커스텀 훅 사용
  useInterval(() => {
    // upbit api 요청
    fetch(
      "https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&count=60"
    )
      .then((res) => res.json())
      .then((data) => {
        // 차트 데이터 생성
        const chartData = {
          name: "candle",
          type: "candlestick",
          data: data.map((item) => ({
            x: new Date(item.candle_date_time_kst),
            y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
          })),
        };
        setMinuteData([chartData]);
      })
      .catch((err) => console.log(err));
  }, 5000); // 5초마다 api 요청

  useEffect(() => {
    // 차트 설정
    const options = {
      series: minuteData, // 기본적으로 분 단위 데이터를 사용
      chart: {
        height: 400,
        type: "candlestick",
      },
      // title: {
      //   text: "",
      //   align: "center",
      // },
      xaxis: {
        type: "datetime",
        tickAmount: 10, // x축 눈금 개수
        labels: {
          datetimeUTC: false, // UTC 시간이 아닌 로컬 시간을 사용하도록 설정
          // format: "yyyy-MM-dd HH:mm:ss", // format 바꾸기
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

    // 분, 시, 일 단위 데이터 변경시 차트 업데이트
    chart.updateSeries(minuteData);
    chartRef.current.classList.add("minute");

    return () => {
      chart.destroy();
    };
  }, [minuteData]);

console.log(minuteData)
  return (<>
  <CoinDetail/>
  <div ref={chartRef} className=" text-blue-400 w-4/6">
  </div>
  </>
  );
};

export default MainChart;

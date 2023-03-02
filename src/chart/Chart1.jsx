import React, { useRef, useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import client from '../config/axiosConfig'
import CoinChart2 from "./CoinChart2";



const CoinChart3 = () => {
  const chartRef = useRef(null);
  const [minuteData, setMinuteData] = useState([]);
  const [loading, setLoading] = useState(true)

  




  useEffect(()=>{
    client
    .get('/api/historyCoins')
    .then((data)=>{
      const chartData = {
        name: "candle",
        type: "candlestick",
        data: data.list.map((item) => ({
          x: new Date(item.candle_date_time_kst),
          y: [item.opening_price, item.high_price, item.low_price, item.trade_price],
        })),
      };
      setMinuteData([chartData]); // 응답 데이터를 state에 저장
      setLoading(false); // 로딩 상태를 false로 변경
    })
    .catch((error)=>{
      console.log(error);
      setLoading(true); // 에러 발생 시 로딩 상태를 false로 변경
    })
  },[])
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
        tickAmount: 1000, // x축 눈금 개수
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
    
    return () => {
      chart.destroy();
    };
  }, [minuteData]);

  return (
    <>
      <div ref={chartRef} className="text-blue-400 w-3/5"></div>
    </>
  );
};

export default CoinChart3;

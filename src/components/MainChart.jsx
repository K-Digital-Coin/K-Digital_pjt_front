import React, { useRef, useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import client from "../config/axiosConfig";
import CoinChart2 from "./CoinChart2";

// 기존 차트 버젼
const MainChart= () => {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const [historyCoins, setHistoryCoins] = useState([]);
  const [predictCoins, setPredictCoins] = useState([]);
  const [VolumeCoins, setVolumeCoins] = useState([]);
  const [indicatorCoins, setIndicatorCoins] = useState([])
  let socket;

  const clear = () => {
    setHistoryCoins([...historyCoins.slice(0, 100)]);
    setPredictCoins([]);
  };

  const predict = () => {
    try {
      if (socket) {
        socket.close();
      }
      socket = new WebSocket("ws://localhost:8080/coin");
      socket.onopen = () => {
        console.log("WebSocket Open");
      };
      socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        const currentData = {
          x: new Date(data[0].candleDateTimeKst),
          y: [
            parseFloat(data[0].openingPrice),
            parseFloat(data[0].highPrice),
            parseFloat(data[0].lowPrice),
            parseFloat(data[0].tradePrice),
          ],
        };
        const predictData = {
          x: new Date(data[1].dateTime),
          y: data[1].price,
        };
        setHistoryCoins((prev) => [...prev, currentData]);
        setPredictCoins((prev) => [...prev, predictData]);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getHistoryCoins = async () => {
    try {
      const historyResponse = await client.get("/api/historyCoins");
      const historyData = historyResponse.data.data.list.map((item) => ({
        x: new Date(item.candleDateTimeKst),
        y: [item.openingPrice, item.highPrice, item.lowPrice, item.tradePrice],
      }));
      const VolumeData = historyResponse.data.data.list.map((item)=>({
        x: new Date(item.candleDateTimeKst),
        y : parseFloat(item.candleAccTradeVolume)  
      }))
      const indicatorResponse = await client.get("/api/indicators")
      console.log(indicatorResponse)
      const indicatorData = indicatorResponse.data.data.list.map((item)=>({
        x : new Date(item.dateTime),
        y :   item.ma
      }))


      setIndicatorCoins([...indicatorData, ...indicatorCoins])
      setHistoryCoins([...historyData, ...historyCoins]);
      setVolumeCoins([...VolumeData, ...VolumeCoins])
    } catch (error) {
      console.log(error);
    }
  };
 


  useEffect(() => {
    getHistoryCoins();

  }, []);

  useEffect(() => {
    // console.log(historyCoins);
    // console.log(VolumeCoins)
    // console.log(predictCoins);
    console.log(indicatorCoins)

    const options = {
      series: [
        {
          name: "시세",
          type: "candlestick",
          data: historyCoins,
        },
        {
          name : 'ma',
          type : 'line',
          data : indicatorCoins
        }
      ],
      chart: {
        height: 350,
        type: "line",
      },
      annotations: {
        xaxis: [
          {
            x: new Date().getTime(),
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                fontSize: "20px",
                color: "#fff",
                background: "#00E396",
              },
              orientation: "horizontal",
              offsetY: 5,
              text: "현재 시각",
            },
          },
        ],
      },
      title: {
        text: "비트코인 차트",
        align: "Center",
      },
      stroke: {
        width: [3, 1],
      },
      xaxis: {
        type: "datetime",
        tickAmount: 50, // x축 눈금 개수
        labels: {
          datetimeUTC: false, // UTC 시간이 아닌 로컬 시간을 사용하도록 설정
          format: "yyyy-MM-dd HH:mm:ss", // format 바꾸기
          // format: "HH:mm:ss", // x축 레이블 형식
        },
      },
     
    };
    const options2 = {
      series: [
        {
          name : "거래량",
          type: "column",
          data: VolumeCoins
        },
      ],
      chart: {
        height: 350,
        type: "bar",
    
      },
      title: {
        text: "거래량",
        align: "Center",
      },
      xaxis: {
        type: "datetime",
        tickAmount: 50, // x축 눈금 개수
        labels: {
          datetimeUTC: false, // UTC 시간이 아닌 로컬 시간을 사용하도록 설정
          format: "yyyy-MM-dd HH:mm:ss", // format 바꾸기
          // format: "HH:mm:ss", // x축 레이블 형식
        },
      },
      dataLabels: {
        enabled: false
      },
      
    }
    

    const chart = new ApexCharts(chartRef.current, options);
    const chart2 = new ApexCharts(chartRef2.current, options2)
    chart.render();
    chart2.render()

    chart.updateSeries([
      {
        name: "시세",
        type: "candlestick",
        data: historyCoins,
      },
    ]);

    chart2.updateSeries([
      {
        name: "거래량",
        type: "bar",
        data: VolumeCoins,
      },
    ]);


   
    // chartRef.current.classList.add("minute");

    return () => {
      chart.destroy();
      chart2.destroy();
    };
  }, [historyCoins]);

  return (
    <>
      <div className="relative">
        <button
          className="absolute z-20 flex items-center right-20 mr-36
        bg-blue-900 hover:bg-blue-300 rounded border-spacing-2"
          onClick={() => clear()}
        >
          초기화
        </button>
        <button
          className="absolute z-20 flex items-center right-0 mr-36
        bg-blue-900 hover:bg-blue-300 rounded border-spacing-2"
          onClick={() => predict()}
        >
          예측 시작
        </button>
        <div ref={chartRef} className="text-blue-400 z-10"></div>
        <div ref={chartRef2} className="text-blue-400 z-10"></div>
      </div>
    
      {/* <CoinChart2/> */}
      <div className="text-white">
      <div>
        {predictCoins.map((item)=>
        <p>
        예측된 비트코인의 시세는 :{parseFloat(item.y)}</p>
      )}</div>
      </div>
    </>
  );
};

export default MainChart;

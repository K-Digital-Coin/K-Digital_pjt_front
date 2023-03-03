import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import client from "../config/axiosConfig";

// 기존 차트 버젼
const TestChart = () => {
  const [historyCoins, setHistoryCoins] = useState([]);
  const [predictCoins, setPredictCoins] = useState([]);
  const [options, setOptions] = useState({
    title: {
      text: "비트코인 차트",
      align: "Center",
    },
    stroke: {
      width: [1, 5],
      curve: "straight",
    },
    fill: {
      colors: ["", "yellow"],
    },
    xaxis: {
      type: "datetime",
      tickAmount: 10, // x축 눈금 개수
      labels: {
        datetimeUTC: false, // UTC 시간이 아닌 로컬 시간을 사용하도록 설정
        format: "yyyy-MM-dd HH:mm", // format 바꾸기
      },
      categories: "1234",
    },
    tooltip: {
      shared: true,
      x: {
        format: "MM-dd HH:mm",
      },
    },
  });

  const [series, setSeries] = useState([
    {
      name: "history",
      type: "candlestick",
      data: [],
    },
    {
      name: "predict",
      type: "line",
      data: [],
    },
  ]);

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
      setHistoryCoins([...historyData, ...historyCoins]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistoryCoins();
  }, []);

  useEffect(() => {
    setSeries([
      {
        name: "history",
        type: "candlestick",
        data: historyCoins,
      },
      {
        name: "predict",
        type: "line",
        data: predictCoins,
      },
    ]);
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
        <Chart
          options={options}
          series={series}
          // type="candlestick"
          height={500}
          className="text-blue-400 z-10"
        />
      </div>
    </>
  );
};

export default TestChart;
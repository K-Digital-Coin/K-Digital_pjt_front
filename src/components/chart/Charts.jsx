import React, { useState, useEffect } from "react";
import IndicatorChart from "../../components/chart/IndicatorChart";
import IndicatorChart2 from "../../components/chart/IndicatorChart2";
import MainChart from "../../components/chart/MainChart";
import client from "../../config/axiosConfig";

const Charts = ({ chartNumber, targetNumber }) => {
  const number = chartNumber;
  const tNumber = targetNumber;
  const [historyCoins, setHistoryCoins] = useState([]);
  const [currentCoins, setCurrentCoins] = useState([]);
  const [predictCoins, setPredictCoins] = useState([]);

  let socket;

  const clear = () => {
    setHistoryCoins([...historyCoins.slice(0, 100)]);
    setCurrentCoins([]);
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
          y: parseFloat(data[0].tradePrice),
        };
        const predictData = {
          x: new Date(data[1].dateTime),
          y: Math.round(data[1].price),
        };
        setCurrentCoins((prev) => [...prev, currentData]);
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
      setHistoryCoins([...historyCoins, ...historyData]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHistoryCoins();
  }, []);

  useEffect(() => {
    clear()
  }, [number, tNumber]);

  return (
    <div>
      <button
        className="absolute z-20 flex items-center right-20 mr-44 text-white
        bg-[#1261c4] hover:bg-red-300 rounded border-spacing-2 font-semibold"
        onClick={() => clear()}
      >
        초기화
      </button>
      <button
        className="absolute z-20 flex items-center right-0 mr-44 text-white
        bg-[#0c3887] hover:bg-red-300 rounded border-spacing-2 font-semibold"
        onClick={() => predict()}
      >
        예측 시작
      </button>
      <MainChart
        cNumber={chartNumber}
        hCoins={historyCoins}
        cCoins={currentCoins}
        pCoins={predictCoins}
      />
      <div className="flex flex-row">
        <div className="basis-1/4">
          <IndicatorChart />
        </div>
        <div className="basis-3/4">
          <IndicatorChart2 cCoins={currentCoins} pCoins={predictCoins} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
import React, { useState, useEffect } from "react";
import AccuracyChart from "./AccuracyChart";
import PredictChart from "../../components/chart/PredictChart";
import ErrorChart from "../chart/ErrorChart";
import MainCandleChart from "./MainCandleChart";
import MainLineChart from "./MainLineChart";
import client from "../../config/axiosConfig";

const Charts = () => {
  const [historyCoins, setHistoryCoins] = useState([]);
  const [tradeHistoryCoins, setTradeHistoryCoins] = useState([]);
  const [predictCoins, setPredictCoins] = useState([]);
  const [onPredict, setOnPredict] = useState();
  const [errorPercentage, setErrorPercentage] = useState([]);
  const [accuracy, setAccuracy] = useState(0);

  const clear = () => {
    setOnPredict(false);
    setHistoryCoins([...historyCoins.slice(0, 100)]);
    setTradeHistoryCoins([...tradeHistoryCoins.slice(0, 100)]);
    setPredictCoins([]);
    setErrorPercentage([]);
    setAccuracy(0);
  };

  const predict = () => {
    try {
      setOnPredict(true);
      let socket;
      if (socket) {
        socket.close();
      }
      socket = new WebSocket("ws://localhost:8080/coin");
      socket.onopen = () => {
        console.log("WebSocket Open");
      };
      socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        const tradeHistoryData = {
          x: new Date(data[0].candleDateTimeKst),
          y: parseFloat(data[0].tradePrice),
        };
        const predictData = {
          x: new Date(data[1].dateTime),
          y: Math.round(data[1].price),
        };
        const error = {
          x: new Date(data[0].candleDateTimeKst),
          y: (
            ((tradeHistoryData.y - predictData.y) / tradeHistoryData.y) *
            100
          ).toFixed(6),
        };
        setTradeHistoryCoins((prev) => [...prev, tradeHistoryData]);
        setPredictCoins((prev) => [...prev, predictData]);
        setErrorPercentage((prev) => [...prev, error]);
        setAccuracy((prev) => prev + 1);
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
      const tradeHistoryData = historyResponse.data.data.list.map((item) => ({
        x: new Date(item.candleDateTimeKst),
        y: item.tradePrice,
      }));
      setHistoryCoins(historyData);
      setTradeHistoryCoins(tradeHistoryData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setOnPredict(false);
    getHistoryCoins();
  }, []);

  useEffect(() => {
    clear();
  }, []);

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
      {!onPredict ? (
        <MainCandleChart hCoins={historyCoins} />
      ) : (
        <MainLineChart hCoins={tradeHistoryCoins} pCoins={predictCoins} />
      )}

      <div className="flex flex-row">
        <div className="basis-1/4">
          <AccuracyChart acc={accuracy} />
        </div>
        <div className="basis-3/4">
          <PredictChart
            hCoins={tradeHistoryCoins.slice(100)}
            pCoins={predictCoins}
          />
          <ErrorChart ePercentage={errorPercentage} />
        </div>
      </div>
    </div>
  );
};

export default Charts;

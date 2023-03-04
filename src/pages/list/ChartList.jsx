import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import client from "../../config/axiosConfig";

const ChartList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      client
        .get("/api/member/me")
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }, 1000000);
    return () => clearInterval(timer);
  }, []);



  return (
    // <div className="grid lg:grid-rows-3 grid-flow-col bg-black ">
    // <div className="col-span-4">
    <div className="text-white flex justify-center">
      <div>
        <ul className="flex space-x-14">
          <li onClick={() => navigate("/Chart/1")}>Ma 지표모델</li>
          <li onClick={() => navigate("/Chart/2")}>BBP 지표모델</li>
          <li onClick={() => navigate("/Chart/3")}>BBC 지표모델</li>
          <li onClick={() => navigate("/Chart/4")}>BBM 지표모델</li>
          <li onClick={() => navigate("/Chart/5")}>MACD 지표모델</li>
        </ul>
      </div>
    </div>
  );
};

export default ChartList;

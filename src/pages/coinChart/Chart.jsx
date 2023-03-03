import React from "react";
import MainChart from "../../components/chart/MainChart";
import IndicatorChart from "../../components/chart/IndicatorChart";

const Chart = () => {
  return (
    <div className=" bg-black ">
      <div className="">
        <MainChart />
        <IndicatorChart />
      </div>
    </div>
  );
};

export default Chart;
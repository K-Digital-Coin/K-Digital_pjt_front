import React, { useEffect, useRef, useState } from "react";
import ApexChart from "react-apexcharts";

const IndicatorChart = ({indiNumber}) => {
  const [options, setOptions] = useState({
    // colors: ["#20E647"],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "70%",
        },
        fill : {
          type : 'gradient'
        },
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "white",
            fontSize: "20px",
          },
          value: {
            color: "white",
            fontSize: "20px",
            show: true,
          },
        },
      },
    },
   
    stroke: {
      lineCap: "round",
    },
    labels: ["Accuracy"],
  });

  const [series, setSeries] = useState([80]);

  return (
    <div className="flex">
      <ApexChart
        options={options}
        series={series}
        type="radialBar"
        height={200}
      />
    </div>
  );
};

export default IndicatorChart;
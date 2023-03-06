import React, { useState, useEffect } from "react";
import ApexChart from "react-apexcharts";

const ErrorChart = ({ ePercentage }) => {
  const errorPercentage = ePercentage;

  const [options, setOptions] = useState({
    stroke: {
      width: 1,
    },
    title: {
      text: "실제가격 - 예측가격 오차",
      align: "Center",
      style: {
        fontSize: "25px",
        fontWeight: "bold",
        color: "red",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        format: "MM-dd HH:mm",
        style: {
          fontWeight: "bold",
          fontSize: "14px",
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      min: -1,
      max: 1,
      labels: {
        style: {
          fontWeight: "bold",
          fontSize: "13px",
          colors: "#ffffff",
        },
      },
    },
    markers: {
      size: 3,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      x: {
        format: "MM-dd HH:mm",
      },
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    setSeries([
      {
        name: "error",
        data: errorPercentage,
      },
    ]);
  }, [errorPercentage]);

  return (
    <ApexChart options={options} series={series} type="line" height={300} />
  );
};
export default ErrorChart;

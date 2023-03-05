import React, { useState, useEffect } from "react";
import ApexChart from "react-apexcharts";

const ErrorChart = ({ ePercentage }) => {
  const errorPercentage = ePercentage;

  const [options, setOptions] = useState({
    stroke: {
      width: 1,
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
        format: "MM-dd HH:mm",
      },
    },
    yaxis: {
      min: -1,
      max: 1,
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

import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";

const AccuracyChart = ({ acc }) => {
  const accuracy = acc;
  const [options, setOptions] = useState({
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "70%",
        },
        fill: {
          type: "gradient",
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

  const [series, setSeries] = useState([]);

  useEffect(() => {
    setSeries([accuracy]);
  }, [accuracy]);

  return (
    <div className="flex mt-12">
      <ApexChart
        options={options}
        series={series}
        type="radialBar"
        height={200}
      />
    </div>
  );
};

export default AccuracyChart;

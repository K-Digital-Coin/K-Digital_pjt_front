import React, { useRef, useEffect, useState } from "react";
import ApexCharts from "apexcharts";


// 차트 버젼(버튼추가했으나 x축 폭변경안됨)
const CoinChart2 = () => {
  const chartRef = useRef(null);
  const [isHourly, setIsHourly] = useState(true);

  console.log(new Date(1538778600000))
  useEffect(() => {
    const options = {
      series: [
        {
          name: "candle",
          type: "candlestick",
          data: [
            {
              x: new Date("2018-04-18T11:17:00"),
              y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            {
              x: new Date("2018-04-18T11:18:00"),
              y: [6632.01, 6643.59, 6620, 6630.11]
            },
            {
              x: new Date("2018-04-18T11:19:00"),
              y: [6630.71, 6648.95, 6623.34, 6635.65]
            },
            {
              x: new Date("2018-04-18T11:20:00"),
              y: [6635.65, 6651, 6629.67, 6638.24]
            },
            {
              x: new Date("2018-04-18T11:21:00"),
              y: [6638.24, 6640, 6620, 6624.47]
            },
            {
              x: new Date("2018-04-18T12:22:00"),
              y: [6624.53, 6636.03, 6621.68, 6624.31]
            },
            {
              x: new Date("2018-04-18T12:23:00"),
              y: [6624.61, 6632.2, 6617, 6626.02]
            },
            {
              x: new Date("2018-04-18T12:24:00"),
              y: [6627, 6627.62, 6584.22, 6603.02]
            },
            {
              x: new Date("2018-04-18T12:25:00"),
              y: [6605, 6608.03, 6598.95, 6604.01]
            },
            {
              x: new Date("2018-04-18T12:26:00"),
              y: [6604.5, 6614.4, 6602.26, 6608.02]
            },
          ],
        },
      ],
      chart: {
        height: 350,
        type: "line",
      },
      title: {
        text: "비트코인 차트",
        align: "Center",
      },
      stroke: {
        width: [3, 1],
      },
      tooltip: {
        shared: true,
        custom: [
          function ({ seriesIndex, dataPointIndex, w }) {
            return w.globals.series[seriesIndex][dataPointIndex];
          },
          function ({ seriesIndex, dataPointIndex, w }) {
            var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
            var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
            var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
            var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
            return "";
          },
        ],
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM \'yy',
            day: 'dd MMM',
            hour: 'HH:mm',
          },
          format: isHourly ? 'HH:mm' : 'HH:mm:ss'
        },
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();  
    };
  }, [isHourly]);

  return (
    <>
      <div ref={chartRef} className="text-white w-4/5" />
      <button onClick={() => setIsHourly(!isHourly)}>
        {isHourly ? "Show by minute" : "Show by hour"}
      </button>
    </>
  );
};

export default CoinChart2;

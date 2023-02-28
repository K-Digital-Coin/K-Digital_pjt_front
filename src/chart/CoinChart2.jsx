import React, { useRef, useEffect } from "react";
import ApexCharts from "apexcharts";
import data from "../Data"

// 기존 차트 버젼
const CoinChart2 = () => {
  const chartRef = useRef(null);
  const CoinData = data
  console.log(CoinData)
  console.log(CoinData.list[1].candle_date_time_kst)
  

  useEffect(() => {
    const options = {
      series: [
        {
          name: "candle",
          type: "candlestick",
          data: [
            CoinData.list.map((item)=>({
              x : new Date(item.candle_date_time_kst),
              y: [item.opening_price, item.high_price, item.low_price, item.trade_price],   
            }))
          ]   
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
      xaxis: {
        type: "datetime",
      },
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();  
    };
  }, []);

  


  return (<>
  <div ref={chartRef} className="text-blue-400 w-4/5">
  </div>
  </>
  );
};

export default CoinChart2;
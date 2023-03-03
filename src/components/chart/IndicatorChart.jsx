import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import IndicatorChart2 from '../../components/chart/IndicatorChart2'

const CircleChart = () => {
  
  
  const chartRef = useRef(null);

  useEffect(() => {
    const optionsCircle = {
      chart: {
        type: 'radialBar',
        height: 320,
        offsetY: -30,
        offsetX: 20,
      },
      plotOptions: {
        radialBar: {
          size: undefined,
          inverseOrder: false,
          hollow: {
            margin: 5,
            size: '60%',
            background: 'transparent',
          },
          track: {
            show: true,
            background: '#40475D',
            strokeWidth: '10%',
            opacity: 1,
            margin: 2, // margin is in pixels
          },
        },
      },
      series: [71, 63],
      labels: ['정확도', '예측도'],
      legend: {
        show: true,
        position: 'left',
        offsetX: -30,
        offsetY: 10,
        formatter: function (val, opts) {
          return val + ' - ' + opts.w.globals.series[opts.seriesIndex] + '%';
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
    };

    const chart = new ApexCharts(chartRef.current, optionsCircle);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);





  return (<>
    <div className='flex w-2/4'>
    <div className='' ref={chartRef}></div>


    </div>
    </>);
};

export default CircleChart;

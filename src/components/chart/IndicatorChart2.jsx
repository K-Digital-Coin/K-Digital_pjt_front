import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';


  const IndicatorChart2 = () => {
    const chartRef = useRef(null);
    
    useEffect(() => {
    const optionsColumn = {
    chart: {
    height: 350,
    type: 'bar',
    animations: {
    enabled: false
    },
    events: {
    animationEnd: function (chartCtx, opts) {
    const newData = chartCtx.w.config.series[0].data.slice()
    newData.shift()
    window.setTimeout(function () {
    chartCtx.updateOptions({
    series: [{
    data: newData
    }],
    xaxis: {
    min: chartCtx.minX,
    max: chartCtx.maxX
    },
    subtitle: {
    text: + '%',
    }
    }, false, false)
    }, 300)
    }
    },
    toolbar: {
    show: false
    },
    zoom: {
    enabled: false
    }
    },
    dataLabels: {
    enabled: false
    },
    stroke: {
    width: 0,
    },
    series: [{
    name: 'Load Average',
    data:(new Date("12/12/2016 00:20:00").getTime(), 12, {
    min: 10,
    max: 110
    })
    }],
    title: {
    text: 'Load Average',
    align: 'left',
    style: {
    fontSize: '12px'
    }
    },
    subtitle: {
    text: '20%',
    floating: true,
    align: 'right',
    offsetY: 0,
    style: {
    fontSize: '22px'
    }
    },
    fill: {
    type: 'gradient',
    gradient: {
    shade: 'dark',
    type: 'vertical',
    shadeIntensity: 0.5,
    inverseColors: false,
    opacityFrom: 1,
    opacityTo: 0.8,
    stops: [0, 100]
    }
    },
    xaxis: {
    type: 'datetime',
    range: 2700000
    },
    legend: {
    show: true
    },
    };
    const chartColumn = new ApexCharts(chartRef.current, optionsColumn);
    chartColumn.render();
    
    return () => {
      chartColumn.destroy();
    };
    }, []);
    
    return <div id="columnchart" ref={chartRef}></div>;
    };
    
export default IndicatorChart2;
import React, { useEffect } from "react";
import Chart from "react-apexcharts";

export default props => {
  

  const series = props.dataList;
  console.log(props.dataList)

  

  const options = {
    background: 'transparent',
    redrawOnParentResize: true,

    chart: {

      id: 'realtime',
      toolbar: {
        enabled: false,
        show: false
      },
   
  
      legend: {
        show: false
      },

      zoom: {
        enabled: false
      },
      animations: {
        dynamicAnimation: {
          enabled: true,
         speed: 150
       },
        animateGradually: {
          enabled: false,
          delay: 0
      },
        enabled: true,
        speed: 800,
 
      },
      zoom: {
        enabled: true,
        type: 'x',  
        autoScaleYaxis: false,  
        zoomedArea: {
          fill: {
            color: '#90CAF9',
            opacity: 0.4
          },
          stroke: {
            color: '#0D47A1',
            opacity: 0.4,
            width: 1
          }
        }
      }
  
    },
    stroke: {
      width: 2,
    },
    tooltip: {
      enabled: false
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
      tickAmount: 10,
      range: 6000,
      type: 'datetime'
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { show: false },
      tickAmount: 1,
      range: 1
    },
    grid: {
      show: false,
      borderColor: '#90A4AE',
      strokeDashArray: 0,
      position: 'front',
      xaxis: {
        title: {
          text: null
      },
        show: false,
          lines: {
              show: false
          }
      },   
      yaxis: {
        show: false,
        title: {
          text: null
      },
        show: false,
          lines: {
              show: false
          }
      },  
      row: {
          colors: undefined,
          opacity: 0
      },  
      column: {
          colors: undefined,
          opacity: 0
      },  

  }

    
  };
  return <Chart type="line" height="100px" options={options} series={props.dataList} />;
};

import React, { Component } from "react";
import Chart from "react-apexcharts";


export default function DonutChart(props){
      const options = {
        labels: ["Over", "Under"],
        colors: ['#F46228','#FFFFFF'],
        legend: {show:false},
        tooltip: {show: false},
        datalabels: {enabled:false},
        chart: {offsetY: -20, offsetX:-50, width:'30%'},
        stroke: {width:0},
        fill: {type: 'solid'},
        plotOptions: {
          pie: {
            startAngle: 10,
            donut: {
              size: '92%',
              dataLabels: {
                enabled: false
              },
              labels: {
                show: true,
                name: {
                  show: true,
                  offsetY: 38,
                }
              }
            }
          }
        }
      };

      return (
        <div className="donut">
          <Chart options={options} series={props} type="donut" width="450" />
        </div>
      );
}
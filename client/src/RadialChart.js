import React, { Component } from "react";
import Chart from "react-apexcharts";


export default function DonutChart(props){
      const options = {
        labels: ["Over", "Under"],
        colors: ['#F46228','#BABABA'],
        legend: {show:false},
        tooltip: {show: false},
        datalabels: {enabled:false}
      };

      return (
        <div className="donut">
          <Chart options={options} series={props} type="donut" width="450" />
        </div>
      );
}
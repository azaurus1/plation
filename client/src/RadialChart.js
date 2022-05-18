import React, { Component } from "react";
import Chart from "react-apexcharts";


export default function DonutChart(props){
      const options = {
        labels: ["Over", "Under"],
        colors: ['#FF0000','#00FF00'],
      };

      return (
        <div className="donut">
          <Chart options={options} series={props} type="donut" width="380" />
        </div>
      );
}
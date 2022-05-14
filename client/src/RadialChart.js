import React, { Component } from "react";
import Chart from "react-apexcharts";


export default function DonutChart(){
      const options = {
        labels: ["Over", "Under"],
      };
      const series = [3,15];

      return (
        <div className="donut">
          <Chart options={options} series={series} type="donut" width="380" />
        </div>
      );
}
import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"],
  datasets: [
    {
      label: "This week",
      fill: false,
      lineTension: 0.4,
      backgroundColor: "#FF596F",
      borderColor: "#FF596F",
      borderCapStyle: "round",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "round",
      pointBorderColor: "#FF596F",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      borderWidth: 3,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#FF596F",
      pointHoverBorderColor: "#FF596F",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [5000, 10000, 4000, 14000, 7000, 18000, 8000, 20000]
    },
    {
      label: "Previous week",
      fill: false,
      lineTension: 0.4,
      backgroundColor: "#C3C3C3",
      borderColor: "#C3C3C3",
      borderCapStyle: "round",
      borderDash: [5],
      borderDashOffset: 0.0,
      borderJoinStyle: "round",
      pointBorderColor: "#C3C3C3",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "#C3C3C3",
      pointHoverBorderColor: "#C3C3C3",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [8000, 15000, 7000, 11000, 3000, 13000, 4000, 10000]
    }
  ]
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          // forces step size to be 5 units
          min: 0,
          max: 20000,
          stepSize: 5000 // <----- This prop sets the stepSize
        }
      }
    ]
  }
};
class RevenueGraph extends Component {
  render() {
    return (
      <div className="RevenueGraph">
        <Line data={data} options={options} />
      </div>
    );
  }
}
export default RevenueGraph;

import React, { Component } from "react";
import { Doughnut, Chart } from "react-chartjs-2";

const data = {
  labels: ["Completed", "Remain"],
  datasets: [
    {
      data: [18, 82],
      borderWidth: [2],
      backgroundColor: ["#36A2EB", "#fff"],
      hoverBackgroundColor: ["#36A2EB", "#fff"]
    }
  ],
  text: "82%"
};

const options = {
  legend: {
    display: false
  },
  cutoutPercentage: 92,
  responsive: true,
  maintainAspectRatio: false
};

//For showing the text in the middle
const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);

    const chart = this.chart.chart;
    const ctx = chart.ctx;
    const width = chart.width;
    const height = chart.height;

    const fontSize = (height / 114).toFixed(2);
    ctx.font = fontSize + "em Verdana";
    ctx.textBaseline = "middle";

    const text = chart.config.data.text,
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;

    ctx.fillText(text, textX, textY);
  }
});
class DealsDoughnut extends Component {
  render() {
    return (
      <div className="DealsDoughnut">
        {" "}
        <Doughnut options={options} data={data} />
      </div>
    );
  }
}
export default DealsDoughnut;

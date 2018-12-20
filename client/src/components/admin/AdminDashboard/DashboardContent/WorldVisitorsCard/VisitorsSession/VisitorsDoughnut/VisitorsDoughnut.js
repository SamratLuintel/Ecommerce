import React from "react";
import { Doughnut } from "react-chartjs-2";

const data = {
  labels: ["Firefox", "Chrome", "Internet Explorer", "Opera", "Safari"],
  datasets: [
    {
      data: [2500, 3550, 500, 1000, 2000],
      backgroundColor: ["#FF7588", "#40C7CA", "#16D39A", "#FFA87D", "#2DCEE3"],
      hoverBackgroundColor: [
        "#FF7588",
        "#40C7CA",
        "#16D39A",
        "#FFA87D",
        "#2DCEE3"
      ]
    }
  ],
  text: "Browser"
};

const options = {
  legend: {
    display: false
  },
  cutoutPercentage: 80,
  responsive: true,
  maintainAspectRatio: false
};

//IF you want to remove the centered text go and adjust the HitRateDoughnut.js
//My apology for my lazyness, Future Maintainer

const VisitorsDoughnut = () => {
  return (
    <div className="VisitorsDoughnut">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default VisitorsDoughnut;

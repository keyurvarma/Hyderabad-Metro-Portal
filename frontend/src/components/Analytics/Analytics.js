import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "./analytics.css";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly purchases",
    },
  },
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        maxBarThickness: 10,
      },
    ],
  },
};

const labels = ["May", "June", "July", "August", "September", "October"];

export const data = {
  labels,
  datasets: [
    {
      label: "Tickets bought",
      data: [12, 19, 3, 5, 2, 15],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};
export const pieData = {
  labels: [
    "Ameerpet",
    "Uppal",
    "KPHB Colony",
    "LB Nagar",
    "Raidurg",
    "Miyapur",
  ],
  datasets: [
    {
      label: "Visited Stations",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export function Analytics() {
  return (
    <div className="monthsGraph bg-light bg-gradient">
      <Bar options={options} data={data} width={"500px"} height={"380px"} />
      <Pie
        data={pieData}
        options={{ maintainAspectRatio: false, responsive: false }}
        width={"400px"}
        height={"300px"}
      />
    </div>
  );
}

"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = (props: {}) => {
  const [showChart, setShowChart] = useState(false);
  const seismicData = {
    labels: [
      "Shallow (0-70 km)",
      "Intermediate (70-300 km)",
      "Deep (300-700 km)",
    ],
    datasets: [
      {
        label: "Seismic Events by Depth",
        data: [65, 25, 10], // Replace with your actual counts/percentages
        backgroundColor: [
          "#FF6384", // Red for shallow
          "#36A2EB", // Blue for intermediate
          "#FFCE56", // Yellow for deep
        ],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 2,
        hoverBackgroundColor: ["#FF6384CC", "#36A2EBCC", "#FFCE56CC"],
        hoverBorderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
  };
  return (
    <>
      <div className=" p-4">
        <h1 className="text-center text-lg font-semibold mb-2">
          Seismic Pie Chart
        </h1>
        <div className="h-64 w-full">
          <Pie data={seismicData} options={options} />
        </div>
      </div>
    </>
  );
};

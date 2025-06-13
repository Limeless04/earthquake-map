"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEarthquakeStore } from "@/providers/StateProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = (props: {}) => {

  const { data } = useEarthquakeStore((state) => state)


  // Count events by depth category
  const depthCounts = {
    shallow: 0,
    intermediate: 0,
    deep: 0,
  };


  data.forEach((event) => {
    const depth = event.properties.depth;
    if (depth <= 30) {
      depthCounts.shallow += 1;
    } else if (depth > 30 && depth <= 100) {
      depthCounts.intermediate += 1;
    } else {
      depthCounts.deep += 1;
    }
  });

  const seismicData = {
    labels: [
      "Shallow (0-30 km)",
      "Intermediate (30-100 km)",
      "Deep (> 100 km)",
    ],
    datasets: [
      {
        label: "Seismic Events by Depth",
        data: [
          depthCounts.shallow,
          depthCounts.intermediate,
          depthCounts.deep,
        ],
        backgroundColor: ["#FF0000", "#FFFF00", "#00AA00"], // Base colors
        borderColor: ["#FF0000", "#FFFF00", "#00AA00"], // Match border with background
        borderWidth: 2,
        hoverBackgroundColor: ["#FF0000CC", "#FFFF00CC", "#00AA00CC"], // Semi-transparent on hover
        hoverBorderColor: ["#FF0000", "#FFFF00", "#00AA00"],
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
      <div className="p-4">
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

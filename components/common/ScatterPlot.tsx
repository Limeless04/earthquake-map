import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const distributionData = {
  datasets: [
    {
      label: "Magnitude vs Time",
      data: [
        { x: "Jul 2022", y: 6.7 },
        { x: "Sep 2022", y: 7.1 },
        { x: "Nov 2022", y: 6.5 },
        { x: "Jan 2023", y: 7.2 },
        { x: "Mar 2023", y: 6.8 },
        { x: "May 2023", y: 7.5 },
        { x: "Jul 2023", y: 6.9 },
        { x: "Sep 2023", y: 6.6 },
        { x: "Nov 2023", y: 7.0 },
        { x: "Jan 2024", y: 6.7 },
      ],
      backgroundColor: "#facc15",
    },
  ],
};

export const ScatterPlot = (props: {}) => {
  return (
    <Scatter
      data={distributionData}
      options={{
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { x: { type: "category" }, y: { min: 6.0, max: 9.5 } },
      }}
    />
  );
};

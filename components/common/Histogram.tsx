import { Bar } from "react-chartjs-2";
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

const histogramData = {
  labels: [
    "Jan 2023",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan 2024",
  ],
  datasets: [
    {
      label: "Earthquakes per Month",
      data: [12, 9, 11, 14, 10, 13, 8, 12, 15, 9, 11, 10, 7],
      backgroundColor: "#3b82f6",
    },
  ],
};
export const HistogramCharts = () => {
  return (
    <Bar
      data={histogramData}
      options={{ responsive: true, plugins: { legend: { display: false } } }}
    />
  );
};

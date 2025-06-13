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
import { useEarthquakeStore } from "@/providers/StateProvider";

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



const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getSortableKey = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`; // e.g., "2022-03"
};

const getDisplayLabel = (key: string) => {
  const [year, month] = key.split("-");
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
};

export const HistogramCharts = () => {
  const { data } = useEarthquakeStore((state) => state)

  // Count earthquakes per month
  const counts: Record<string, number> = {};

  data.forEach((item) => {
    const date = new Date(item.properties.time);
    const key = getSortableKey(date); // e.g. "2022-03"
    counts[key] = (counts[key] || 0) + 1;
  });

  const sortedKeys = Object.keys(counts).sort();


  const histogramData = {
    labels: sortedKeys.map(getDisplayLabel), // convert to "Jan 2022"
    datasets: [
      {
        label: "Earthquakes per Month",
        data: sortedKeys.map((key) => counts[key]),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <Bar
      data={histogramData}
      options={{ responsive: true, plugins: { legend: { display: false } } }}
    />
  );
};

import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import 'chartjs-adapter-date-fns';
import { useEarthquakeStore } from "@/providers/StateProvider";

ChartJS.register(
  CategoryScale,
  TimeScale,    
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const ScatterPlot = () => {
  const { data } = useEarthquakeStore((state) => state);
  console.log(data)
  // Format data: one dot per earthquake
  const points = data.map((item) => {
    return {
      x: new Date(item.properties.time), // Use actual time
      y: item.properties.mag,
    };
  });

  const distributionData = {
    datasets: [
      {
        label: "Magnitude over Time",
        data: points,
        backgroundColor: "#facc15",
        pointRadius: 4,
      },
    ],
  };
  return (
    <Scatter
      data={distributionData}
      options={{
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            type: "time",
            time: {
              unit: "month", // or "day" depending on granularity
              tooltipFormat: "PPpp", // formatted tooltip
            },
            title: { display: true, text: "Time" },
          },
          y: {
            title: { display: true, text: "Magnitude" },
            min: 0,
            max: 10,
          },
        },
      }}
    />
  );
};

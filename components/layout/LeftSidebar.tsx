import { Card, CardContent } from "@/components/ui/card";
import { PieChart } from "../common/PieChart";
export const LeftSidebar = () => {
  return (
    <aside className="md:col-span-2 space-y-4">
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">Number of Events</h2>
          <p>World Area, M &gt; 6.5, Past 3 Years</p>
          <p className="text-4xl text-center font-bold">108</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <label className="block font-semibold">Filter by Magnitude</label>
          <input
            type="range"
            min="6.5"
            max="9.5"
            step="0.1"
            className="w-full"
          />
          <label className="block font-semibold mt-4">Filter by Date</label>
          <input type="range" min="2022" max="2025" className="w-full" />
        </CardContent>
      </Card>
      <Card>
        <PieChart />
      </Card>
    </aside>
  );
};

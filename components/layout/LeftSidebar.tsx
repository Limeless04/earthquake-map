"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PieChart } from "../common/PieChart";
import { useSettingStore } from "@/providers/SettingProvider";
export const LeftSidebar = () => {
  const { showCount, showFilter, showPieChart } = useSettingStore(
    (state) => state,
  );

  return (
    <aside
      className="md:col-span-2 space-y-4 md:absolute   
      md:top-20 
    md:left-0
    md:w-80 
    md:h-full 
    md:p-4 
    md:overflow-y-auto z-50"
    >
      {showCount && (
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Number of Events</h2>
            <p>World Area, M &gt; 6.5, Past 3 Years</p>
            <p className="text-4xl text-center font-bold">108</p>
          </CardContent>
        </Card>
      )}

      {showFilter && (
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
      )}

      {showPieChart && (
        <Card>
          <PieChart />
        </Card>
      )}
    </aside>
  );
};

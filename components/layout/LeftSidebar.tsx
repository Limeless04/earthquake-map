"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PieChart } from "../common/PieChart";
import { useSettingStore, useEarthquakeStore } from "@/providers/StateProvider";
import { Button } from "../ui/button";
export const LeftSidebar = () => {
  const { showCount, showFilter, showPieChart } = useSettingStore(
    (state) => state,
  );

  const { filters, filteredData, filterByMagnitude, filterByDate, resetFilters } = useEarthquakeStore(
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
            <p className="text-4xl text-center font-bold">{filteredData.length}</p>
          </CardContent>
        </Card>
      )}

      {showFilter && (
        <Card>
          <CardContent>
            <label className="block font-semibold">Filter by Magnitude</label>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{filters.magnitudeRange.min}</span>
              <span>{filters.magnitudeRange.max}</span>
            </div>
            <input
              type="range"
              min={filters.magnitudeRange.min}
              max="10"
              step="0.1"
              className="w-full"
              onChange={(e) => filterByMagnitude(6.5, parseFloat(e.target.value))}
            />
            <label className="block font-semibold mt-4">Filter by Date</label>
            <span className="block text-center text-lg text-gray-600">
              {filters.dateRange.start ? filters.dateRange.start.getFullYear() : "Select Year"}
            </span>
            <input type="range" min="2022" max="2025" className="w-full" onChange={(e) => filterByDate(new Date(parseInt(e.target.value), 0, 1), new Date(parseInt(e.target.value), 11, 31))} />

            <Button onClick={resetFilters} className="w-full" >
              Reset Filters
            </Button>
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

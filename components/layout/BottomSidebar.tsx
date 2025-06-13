"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScatterPlot } from "../common/ScatterPlot";
import { HistogramCharts } from "../common/Histogram";
import { useSettingStore } from "@/providers/StateProvider";
export const BottomSidebar = () => {
  const { showHistogram, showScatter } = useSettingStore((state) => state);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
      {showHistogram && (
        <Card className="w-full max-w-md md:w-[500px]">
          <CardContent>
            <h2 className="text-lg font-semibold">
              Monthly Earthquake Histogram
            </h2>
            <HistogramCharts />
          </CardContent>
        </Card>
      )}

      {showScatter && (
        <Card className="w-full max-w-md md:w-[500px]">
          <CardContent>
            <h2 className="text-lg font-semibold">
              Earthquake Magnitude Distribution
            </h2>
            <ScatterPlot />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

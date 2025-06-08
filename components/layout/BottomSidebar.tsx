"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScatterPlot } from "../common/ScatterPlot";
import { HistogramCharts } from "../common/Histogram";
import { useSettingStore } from "@/providers/SettingProvider";
export const BottomSidebar = (props: {}) => {
  const { showHistogram, showScatter } = useSettingStore((state) => state);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
      {showHistogram && (
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">
              Monthly Earthquake Histogram
            </h2>
            <HistogramCharts />
          </CardContent>
        </Card>
      )}

      {showScatter && (
        <Card>
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

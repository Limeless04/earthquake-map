"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScatterPlot } from "../common/ScatterPlot";
import { HistogramCharts } from "../common/Histogram";
export const BottomSidebar = (props: {}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">
            Monthly Earthquake Histogram
          </h2>
          <HistogramCharts />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold">
            Earthquake Magnitude Distribution
          </h2>
          <ScatterPlot />
        </CardContent>
      </Card>
    </div>
  );
};

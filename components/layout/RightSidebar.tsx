"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useEarthquakeStore, useSettingStore } from "@/providers/StateProvider";
import clsx from "clsx";
import {
  MapPin,
  Clock,
  Gauge,
  Compass,
  Zap,
  ListOrdered,
} from "lucide-react"; 

export const RightSidebar = () => {
  const { showEvent, showListEvent } = useSettingStore((state) => state);

  const { getLatestEvent, getLatestFiveEvents } = useEarthquakeStore((state) => state)
  const latest = getLatestEvent();
  const fiveLatest = getLatestFiveEvents();

  return (
    <aside
      className={clsx(
        "md:col-span-2 space-y-4 md:absolute md:top-20 md:right-0 md:w-80 md:h-full md:p-4 md:overflow-y-auto",
        {
          "z-50 pointer-events-auto": showEvent || showListEvent, // Show when either is true
          "z-0 pointer-events-none": !(showEvent || showListEvent), // Hide when both are false
        }
      )}
    >
      {/* Latest Event Card */}
      {showEvent && latest && (
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-red-500" /> Latest Event
            </h2>
            <p className="text-sm flex items-center gap-1 mt-1">
              <MapPin className="h-4 w-4 text-gray-500" />{" "}
              {latest.properties.place || "Unknown Location"}
            </p>
            <ul className="text-sm space-y-1 mt-2">
              <li className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" /> OT:{" "}
                {new Date(latest.properties.time).toLocaleString("en-US", {
                  timeZone: "UTC",
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}{" "}
                UTC
              </li>
              <li className="flex items-center gap-1">
                <Compass className="h-4 w-4 text-gray-500" /> Latitude:{" "}
                {latest.geometry.coordinates[1].toFixed(2)} (
                {latest.geometry.coordinates[1] < 0 ? "S" : "N"})
              </li>
              <li className="flex items-center gap-1">
                <Compass className="h-4 w-4 text-gray-500" /> Longitude:{" "}
                {latest.geometry.coordinates[0].toFixed(2)} (
                {latest.geometry.coordinates[0] < 0 ? "W" : "E"})
              </li>
              <li className="flex items-center gap-1">
                <Gauge className="h-4 w-4 text-gray-500" /> Magnitude:{" "}
                <span className="font-bold text-base">
                  {latest.properties.mag}
                </span>
              </li>
              <li className="flex items-center gap-1">
                <p className="h-4 w-4 text-gray-500">↓</p> Depth:{" "}
                {latest.geometry.coordinates[2]} Km
              </li>
            </ul>
            <div className="mt-3 text-xs text-gray-600">
              Moment Tensor Scale: ~10<sup>18</sup> Nm
            </div>
          </CardContent>
        </Card>
      )}

      {/* List of 5 Events Card */}
      {showListEvent && fiveLatest.length > 0 && (
        <Card className="overflow-y-auto max-h-80">
          <CardContent>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <ListOrdered className="h-5 w-5 text-blue-500" /> Recent Events
            </h2>
            <ul className="space-y-3 mt-3 text-sm">
              {fiveLatest.map((event) => (
                <li key={event.properties.id} className="flex items-baseline gap-1">
                  <span className="text-gray-400">•</span>
                  <strong className="text-base">
                    M{event.properties.mag.toFixed(1)}
                  </strong>{" "}
                  – {event.properties.place || "Unknown"} (
                  {new Date(event.properties.time).toISOString().split("T")[0]})
              </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </aside>
  );
};
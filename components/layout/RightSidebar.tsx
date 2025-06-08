"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useSettingStore } from "@/providers/SettingProvider";
import clsx from "clsx";

export const RightSidebar = (props: {}) => {
  const { showEvent, showListEvent } = useSettingStore((state) => state);

  return (
    <aside
      className={clsx(
        "md:col-span-2 space-y-4 md:absolute md:top-20 md:right-0 md:w-80 md:h-full md:p-4 md:overflow-y-auto",
        {
          "z-50 pointer-events-auto": showEvent,
          "z-0 pointer-events-none": !showEvent,
        },
      )}
    >
      {showEvent && (
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold">Latest Event</h2>
            <p className="text-sm">Near North Coast of Papua New Guinea</p>
            <ul className="text-sm space-y-1 mt-2">
              <li>OT: 20 May 2025, 15:06:06 UTC</li>
              <li>Latitude: -3.6 (S)</li>
              <li>Longitude: 144.8 (E)</li>
              <li>Magnitude: 6.5</li>
              <li>Depth: 60 Km</li>
            </ul>
            <div className="mt-2 text-xs">Moment Tensor Scale 10^18 Nm</div>
          </CardContent>
        </Card>
      )}

      {showListEvent && (
        <Card className="overflow-y-auto max-h-80">
          <CardContent>
            <h2 className="text-lg font-semibold">List Events</h2>
            <ul className="space-y-2 mt-2 text-sm">
              <li>
                <strong>M: 7.5</strong> - Drake Passage (2025/05/02)
              </li>
              <li>
                <strong>M: 6.6</strong> - Macquarie Island (2025/04/29)
              </li>
              <li>
                <strong>M: 7.0</strong> - New Britain, PNG (2025/04/20)
              </li>
              <li>
                <strong>M: 6.8</strong> - Reykjanes Ridge (2025/04/10)
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </aside>
  );
};

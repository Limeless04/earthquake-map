"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { useSettingStore } from "@/providers/StateProvider";

export const SettingsDropdown = (props: {}) => {
  const {
    show,
    showHistogram,
    showScatter,
    showPieChart,
    showEvent,
    showListEvent,
    showCount,
    showFilter,
    toggleShow,
    toggleCount,
    toggleScatter,
    toggleHistogram,
    togglePieChart,
    toggleFilter,
    toggleEvent,
    toggleListEvent,
  } = useSettingStore((state) => state);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="text-[var(--primary)]">
          Settings <ChevronDownIcon className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64">
        {/* === DISPLAY SECTION === */}
        <DropdownMenuLabel className="text-xs uppercase text-right text-muted-foreground tracking-widest">
          General Display
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between gap-2">
          <Label htmlFor="toggle-all-charts" className="text-sm">
            Show All Charts
          </Label>
          <Switch
            id="toggle-all-charts"
            checked={show}
            onCheckedChange={toggleShow}
            onClick={(e) => e.stopPropagation()}
          />
        </DropdownMenuItem>

        {/* === BOTTOM SECTION === */}
        <DropdownMenuLabel className="text-xs text-right uppercase text-muted-foreground tracking-widest mt-2">
          Bottom Section
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between gap-2">
          <Label htmlFor="toggle-histogram-charts" className="text-sm">
            Show Histogram
          </Label>
          <Switch
            id="toggle-histogram-charts"
            checked={showHistogram}
            onCheckedChange={toggleHistogram}
            onClick={(e) => e.stopPropagation()}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between gap-2">
          <Label htmlFor="toggle-scatter-plots" className="text-sm">
            Show Scatter Plot
          </Label>
          <Switch
            id="toggle-scatter-plots"
            checked={showScatter}
            onCheckedChange={toggleScatter}
            onClick={(e) => e.stopPropagation()}
          />
        </DropdownMenuItem>

        {/* === LEFT SIDEBAR === */}
        <DropdownMenuLabel className="text-xs text-right uppercase text-muted-foreground tracking-widest mt-2">
          Left Sidebar
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between gap-2">
          <Label htmlFor="toggle-filter" className="text-sm">
            Show Filter
          </Label>
          <Switch
            id="toggle-filter"
            checked={showFilter}
            onCheckedChange={toggleFilter}
            onClick={(e) => e.stopPropagation()}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between gap-2">
          <Label htmlFor="toggle-counts" className="text-sm">
            Show Event Count
          </Label>
          <Switch
            id="toggle-counts"
            checked={showCount}
            onCheckedChange={toggleCount}
            onClick={(e) => e.stopPropagation()}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between gap-2">
          <Label htmlFor="toggle-pie-chart" className="text-sm">
            Show Pie Chart
          </Label>
          <Switch
            id="toggle-pie-chart"
            checked={showPieChart}
            onCheckedChange={togglePieChart}
            onClick={(e) => e.stopPropagation()}
          />
        </DropdownMenuItem>

        {/* === RIGHT SIDEBAR === */}
        <DropdownMenuLabel className="text-xs text-right uppercase text-muted-foreground tracking-widest mt-2">
          Right Sidebar
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between gap-2">
          <Label htmlFor="toggle-events" className="text-sm">
            Show Latest Event
          </Label>
          <Switch
            id="toggle-events"
            checked={showEvent}
            onCheckedChange={toggleEvent}
            onClick={(e) => e.stopPropagation()}
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between gap-2">
          <Label htmlFor="toggle-list-event" className="text-sm">
            Show Event List
          </Label>
          <Switch
            id="toggle-list-event"
            checked={showListEvent}
            onCheckedChange={toggleListEvent}
            onClick={(e) => e.stopPropagation()}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

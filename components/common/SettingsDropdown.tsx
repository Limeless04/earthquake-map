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
import { useSettingStore } from "@/providers/SettingProvider";

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
        <Button variant="outline" size="sm">
          {" "}
          {/* Added variant and size */}
          Setting <ChevronDownIcon className="ml-1 h-4 w-4" />{" "}
          {/* Added margin to icon */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Display Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Label htmlFor="toggle-all-charts" className="cursor-pointer">
            Show All Charts
          </Label>
          <Switch
            id="toggle-all-charts"
            checked={show}
            onCheckedChange={toggleShow}
            // If you want the dropdown to stay open after interaction with the switch
            // you might need to stop event propagation.
            // However, by default, Radix DropdownMenu closes on any interaction inside its content.
            // If you need it to stay open, you'd need to use DropdownMenuPrimitive.Item and prevent default behavior.
            // For simple toggles, closing is often acceptable.
            onClick={(e) => e.stopPropagation()} // Prevents dropdown from closing when switch is clicked
          />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Label htmlFor="toggle-histogram-charts" className="cursor-pointer">
            Show Histgoram
          </Label>
          <Switch
            id="toggle-histogram-charts"
            checked={showHistogram}
            onCheckedChange={toggleHistogram}
            onClick={(e) => e.stopPropagation()} // Prevents dropdown from closing when switch is clicked
          />
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Label htmlFor="toggle-scatter-plots" className="cursor-pointer">
            Show Scatter Plot
          </Label>
          <Switch
            id="toggle-scatter-plots"
            checked={showScatter}
            onCheckedChange={toggleScatter}
            onClick={(e) => e.stopPropagation()} // Prevents dropdown from closing when switch is clicked
          />
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Label htmlFor="toggle-filter" className="cursor-pointer">
            Show Filter
          </Label>
          <Switch
            id="toggle-scatter-plots"
            checked={showFilter}
            onCheckedChange={toggleFilter}
            onClick={(e) => e.stopPropagation()} // Prevents dropdown from closing when switch is clicked
          />
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Label htmlFor="toggle-counts" className="cursor-pointer">
            Show Count Event
          </Label>
          <Switch
            id="toggle-counts"
            checked={showCount}
            onCheckedChange={toggleCount}
            onClick={(e) => e.stopPropagation()} // Prevents dropdown from closing when switch is clicked
          />
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Label htmlFor="toggle-events" className="cursor-pointer">
            Show All Event
          </Label>
          <Switch
            id="toggle-events"
            checked={showEvent}
            onCheckedChange={toggleEvent}
            onClick={(e) => e.stopPropagation()} // Prevents dropdown from closing when switch is clicked
          />
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Label htmlFor="toggle-list-event" className="cursor-pointer">
            Show List Event
          </Label>
          <Switch
            id="toggle-list-event"
            checked={showListEvent}
            onCheckedChange={toggleListEvent}
            onClick={(e) => e.stopPropagation()} // Prevents dropdown from closing when switch is clicked
          />
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Label htmlFor="toggle-pie-chart" className="cursor-pointer">
            Show Pie Chart
          </Label>
          <Switch
            id="toggle-pie-chart"
            checked={showPieChart}
            onCheckedChange={togglePieChart}
            onClick={(e) => e.stopPropagation()} // Prevents dropdown from closing when switch is clicked
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

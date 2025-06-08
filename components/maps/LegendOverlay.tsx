import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import { useEffect } from "react";

// Define the type for a single color item
interface LegendColorItem {
  fillColor: string;
  displayName?: string; // Add displayName for flexibility, or derive from key
}

// Define the props interface for the Legend component
interface LegendProps {
  fillColors: Record<string, LegendColorItem>;
  title?: string; // Optional title prop
}
export function Legend({ fillColors, title = "Legend" }: LegendProps) {
  const { map } = useLeafletContext();

  useEffect(() => {
    if (!map) return;

    const LegendControl = L.Control.extend({
      onAdd: function (map: L.Map) {
        const div = L.DomUtil.create("div", "info legend");
        // For example:
        // Apply Tailwind classes for styling
        div.className =
          "p-4 rounded-lg shadow-lg text-sm " +
          "bg-[var(--background)] text-[var(--primary)] opacity-80 " +
          "font-sans";

        let legendItemsHtml = "";
        // Use Object.entries to iterate over key-value pairs
        Object.entries(fillColors).forEach(([key, value]) => {
          const color = value.fillColor;
          // Use the displayName from the prop if provided, otherwise derive from key
          const itemDisplayName =
            value.displayName || key.charAt(0).toUpperCase() + key.slice(1);

          legendItemsHtml += `
            <div class="flex items-center mb-1 last:mb-0">
              <i class="w-5 h-5 block rounded-sm mr-2 border border-gray-300" style="background: ${color};"></i>
              <span>${itemDisplayName}</span>
            </div>
          `;
        });

        div.innerHTML = `
          <h4 class="text-lg font-bold mb-3 text-center">${title}</h4>
          ${legendItemsHtml}
        `;
        return div;
      },

      onRemove: function (map: L.Map) {
        // Nothing to do here
      },
    });

    // Create an instance of your custom control and add it to the map
    const legend = new LegendControl({ position: "bottomright" });
    legend.addTo(map);

    // Cleanup function to remove the legend when the component unmounts
    return () => {
      legend.remove();
    };
  }, [map]);

  return null;
}

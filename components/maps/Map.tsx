"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  CircleMarker,
  LayersControl,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useTheme } from "next-themes";
import { useEarthquakeData } from "@/hooks/useEarthquakeData";
import SquircleLoading from "../loading/SpinnerLoading";
import { DepthCategory } from "@/lib/utils/normalizeFeature";

import { Legend } from "./LegendOverlay";

type LatLng = [number, number]; // [lat, lng]

const wrappedPositions = (coordinates: [number, number, number]): LatLng[] => {
  const [lng, lat] = coordinates;

  return [
    [lat, lng],
    [lat, lng - 360],
    [lat, lng + 360],
  ];
};

export default function MapClient() {
  const { theme } = useTheme();
  const location: LatLngExpression = [-5.0, 120.0];

  const { data, error: fetchError, isLoading } = useEarthquakeData();

  const fillColors: Record<
    DepthCategory,
    {
      fillColor: string;
      displayName?: string;
    }
  > = {
    shallow: { fillColor: "red", displayName: "Shallow Depth" },
    intermediate: { fillColor: "yellow", displayName: "Intermediate Depth" },
    deep: { fillColor: "green", displayName: "Deep Depth" },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[80vh]">
        {" "}
        {/* Adjust height as needed, e.g., 80vh */}
        <SquircleLoading />
      </div>
    );
  }

  if (fetchError) {
    throw Error("Something wrong went fetching data.");
  }

  return (
    <MapContainer
      center={location}
      zoom={5}
      zoomControl={false}
      worldCopyJump={true}
      scrollWheelZoom={true}
      style={{
        height: "80vh",
        width: "80vw",
        zIndex: 1,
        borderRadius: "1em",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">Carto</a>'
        url={
          theme === "light"
            ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        }
      />

      <TileLayer
        attribution="&copy; 2025 Website AEIC"
        url="
https://aeic.bmkg.go.id/
        "
      />

      <LayersControl position="topright">
        {/* Base Layers (only one visible at a time) */}
        <LayersControl.BaseLayer name="OpenStreetMap">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="CartoDB Dark Matter">
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="CartoDB Light Matter">
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        </LayersControl.BaseLayer>
      </LayersControl>

      <Legend fillColors={fillColors} title="Seismic Depth" />
      {data &&
        data.map((point) => {
          const coords = point.geometry.coordinates;
          const depth = point.properties.depthCategory;
          const fillColor = fillColors[depth];
          return wrappedPositions(coords).map(([lat, lng], i) => (
            <CircleMarker
              key={`${point.properties.id}-${i}`}
              center={[lat, lng]}
              pathOptions={{ ...fillColor, stroke: false }}
              radius={point.properties.approxRadius}
            >
              <Popup>
                <strong>{point.properties.place}</strong>
                <br />
                Magnitude: {point.properties.mag}
                <br />
                Depth: {point.properties.depth} km
              </Popup>
            </CircleMarker>
          ));
        })}
    </MapContainer>
  );
}

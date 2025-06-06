"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useTheme } from "next-themes";
import { useEarthquakeData } from "@/hooks/useEarthquakeData";

type LatLng = [number, number]; // [lat, lng]

const wrappedPositions = (coordinates: [string, string, number]): LatLng[] => {
  const [lngStr, latStr] = coordinates;
  const lng = parseFloat(lngStr);
  const lat = parseFloat(latStr);

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
  return (
    <MapContainer
      center={location}
      zoom={5}
      zoomControl={false}
      worldCopyJump={true}
      scrollWheelZoom={true}
      style={{
        height: "100vh",
        width: "100%",
        zIndex: 1,
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
      {data &&
        data.flatMap((point) => {
          const coords = point.geometry.coordinates;
          return wrappedPositions(coords).map(([lat, lng], i) => (
            <Marker key={`${point.properties.id}-${i}`} position={[lat, lng]}>
              <Popup>
                <strong>{point.properties.place}</strong>
                <br />
                Magnitude: {point.properties.mag}
                <br />
                Depth: {point.properties.depth} km
              </Popup>
            </Marker>
          ));
        })}
    </MapContainer>
  );
}

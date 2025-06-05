"use client";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function MapClient() {
  const [location, setLocation] = useState<LatLngExpression | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        setError("Unable to retrieve location: " + err.message);
        // fallback position (e.g. center of the map)
        setLocation([0, 0]);
      },
    );
  }, []);

  console.log(location);

  if (!location) {
    return <p>Loading map and getting location...</p>;
  }
  return (
    <MapContainer
      center={location}
      zoom={5}
      zoomControl={false}
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
      <Marker position={location}>
        <Popup>
          Your current location <br />
          (via <i>navigator.geolocation</i>)
        </Popup>
      </Marker>
    </MapContainer>
  );
}

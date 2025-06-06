"use client";

import dynamic from "next/dynamic";
import { useEarthquakeData } from "@/hooks/useEarthquakeData";
const MapClient = dynamic(() => import("@/components/maps/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
export default function Home() {
  const { data, error: fetchError, isLoading } = useEarthquakeData();
  return (
    <div className="flex min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col h-full w-full">
        <MapClient />
      </main>
    </div>
  );
}

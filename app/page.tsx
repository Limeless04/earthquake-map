"use client";
import SquircleLoading from "@/components/loading/SpinnerLoading";


import dynamic from "next/dynamic";
const MapClient = dynamic(() => import("@/components/maps/Map"), {
  ssr: false,
  loading: () => (
    // This div will take up the full available height and center its content
    <div className="flex items-center justify-center w-full h-[80vh]">
      {" "}
      {/* Adjust height as needed, e.g., 80vh */}
      <SquircleLoading />
    </div>
  ),
});
export default function Home() {
  return (
    <div className="flex min-h-[60vh] min-w-[80vw] items-center justify-center  p-4 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center justify-center h-full w-full border border-[var(--border)] rounded-lg p-4">
        <MapClient />
      </main>
    </div>
  );
}

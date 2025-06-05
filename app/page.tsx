"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
export default function Home() {
  return (
    <div className="flex min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col h-full w-full">
        <MapClient />
      </main>
    </div>
  );
}

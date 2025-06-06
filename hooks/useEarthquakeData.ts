import useSWR from "swr";

export type EarthquakeFeature = {
  type: "Feature";
  properties: {
    id: string;
    time: string;
    mag: string;
    place: string;
    fase: string;
    status: string;
    depth: string;
  };
  geometry: {
    type: "Point";
    coordinates: [string, string, number]; // [lng, lat, depth]
  };
};
export const useEarthquakeData = (): {
  data?: EarthquakeFeature[];
  error: any;
  isLoading: boolean;
} => {
  const gistBase = process.env.NEXT_PUBLIC_GITHUB_GIST;
  const shouldFetch = !!gistBase;
  const url = shouldFetch ? `${gistBase}/earthquake-data` : null;

  const fetcher = async (url: string) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        cache: "no-cache",
      });

      if (!res.ok) {
        throw new Error(`Fetch failed: ${res.status}`);
      }

      const data = await res.json();

      if (!data) throw new Error("Empty response");

      return data;
    } finally {
      clearTimeout(timeout);
    }
  };

  const { data, error, isLoading } = useSWR<EarthquakeFeature[]>(url, fetcher);
  return {
    data,
    error,
    isLoading,
  };
};

import useSWR from "swr";
import { EarthquakeFeature } from "@/lib/types/earthquake";
import {
  NormalizedFeature,
  normalizeFeature,
} from "@/lib/utils/normalizeFeature";

export const useEarthquakeData = (): {
  data?: NormalizedFeature[];
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

  const {
    data: rawData,
    error,
    isLoading,
  } = useSWR<EarthquakeFeature[]>(url, fetcher);
  const data: NormalizedFeature[] | undefined = rawData
    ? rawData.map(normalizeFeature)
    : [];

  return {
    data,
    error,
    isLoading,
  };
};

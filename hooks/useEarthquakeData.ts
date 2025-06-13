// "use client";	

import useSWR from "swr";
import { EarthquakeFeature } from "@/lib/types/earthquake";
import { NormalizedFeature } from "@/lib/utils/normalizeFeature";
import { useEarthquakeStore } from "@/providers/StateProvider";

export const useEarthquakeData = (): {
  data?: NormalizedFeature[];
  error: any;
  isLoading: boolean;
} => {
  const gistBase = process.env.NEXT_PUBLIC_GITHUB_GIST;
  const shouldFetch = !!gistBase;
  const url = shouldFetch ? `${gistBase}/earthquake-data` : null;

  const { setData, setError, setLoading, filteredData, error, isLoading } = useEarthquakeStore((state) => state);

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

  useSWR<EarthquakeFeature[]>(url, fetcher, {
    onSuccess: (data) => {
      setData(data);
      setLoading(false);
    },
    onError: (error) => {
      setError(error);
      setLoading(false);
    },
    onLoadingSlow: () => setLoading(true),
  });

  return {
    data: filteredData,
    error,
    isLoading,
  };
};

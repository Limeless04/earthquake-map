import { createStore } from "zustand/vanilla";
import type { NormalizedFeature } from "@/lib/utils/normalizeFeature";
import { EarthquakeFeature } from "@/lib/types/earthquake";
import { normalizeFeature } from "@/lib/utils/normalizeFeature";
import { startOfDay, endOfDay } from 'date-fns';

export type EarthquakeState = {
  data: NormalizedFeature[];
  filteredData: NormalizedFeature[];
  isLoading: boolean;
  error: any;
  filters: {
    magnitudeRange: {
      min: number;
      max: number;
    };
    dateRange: {
      start: Date | null;
      end: Date | null;
    };
  };
};

export type EarthquakeAction = {
  setData: (data: EarthquakeFeature[]) => void;
  setError: (error: any) => void;
  setLoading: (loading: boolean) => void;
  filterByMagnitude: (min: number, max: number) => void;
  filterByDate: (start: Date | null, end: Date | null) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  getLatestEvent: () => NormalizedFeature | null;
  getLatestFiveEvents: () => NormalizedFeature[];
};

export type EarthquakeStore = EarthquakeState & EarthquakeAction;

export const defaultInitState: EarthquakeState = {
  data: [],
  filteredData: [],
  isLoading: false,
  error: null,
  filters: {
    magnitudeRange: {
      min: 0,
      max: 10,
    },
    dateRange: {
      start: null,
      end: null,
    },
  },
};

export const createEarthquakeStore = (
  initState: EarthquakeState = defaultInitState,
) => {
  return createStore<EarthquakeStore>()((set, get) => ({
    ...initState,

    setData: (data: EarthquakeFeature[]) => {
      const normalizedData = data.map(normalizeFeature);
      set((state) => ({
        data: normalizedData,
        filteredData: normalizedData,
      }));
    },

    setError: (error: any) => set({ error }),
    setLoading: (loading: boolean) => set({ isLoading: loading }),

    filterByMagnitude: (min: number, max: number) => {
      set((state) => ({
        filters: {
          ...state.filters,
          magnitudeRange: { min, max },
        },
      }));
      get().applyFilters();
    },

    filterByDate: (start: Date | null, end: Date | null) => {
      set((state) => ({
        filters: {
          ...state.filters,
          dateRange: { start, end },
        },
      }));
      get().applyFilters();
    },

    resetFilters: () => {
      set((state) => ({
        filters: defaultInitState.filters,
        filteredData: state.data,
      }));
    },

    applyFilters: () => {
      const { data, filters } = get();
      let filtered = [...data];

      // Apply magnitude filter
      filtered = filtered.filter(
        (item) =>
          item.properties.mag >= filters.magnitudeRange.min &&
          item.properties.mag <= filters.magnitudeRange.max
      );

      // Apply date filter
      if (filters.dateRange.start && filters.dateRange.end) {
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.properties.time);
          return (
            itemDate >= startOfDay(filters.dateRange.start!) &&
            itemDate <= endOfDay(filters.dateRange.end!)
          );
        });
      }

      set({ filteredData: filtered });
    },

    getLatestEvent: () => {
      const allData = get().data;
      if (!allData.length) return null;
      return [...allData].sort(
        (a, b) => new Date(b.properties.time).getTime() - new Date(a.properties.time).getTime()
      )[0];
    },

    getLatestFiveEvents: () => {
      const allData = get().data;
      if (!allData.length) return [];
      return [...allData]
        .sort((a, b) => new Date(b.properties.time).getTime() - new Date(a.properties.time).getTime())
        .slice(0, 5);
    },
  }));
};

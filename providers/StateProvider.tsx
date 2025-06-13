// stores/StateProvider.tsx
"use client";

import { type ReactNode, useRef, createContext, useContext } from "react";
import { useStore } from "zustand";

import { type SettingStore, createSettingStore } from "@/stores/SettingsStore";
import { type EarthquakeStore, createEarthquakeStore } from "@/stores/EarthquakeStore";

type SettingStoreApi = ReturnType<typeof createSettingStore>;
type EarthquakeStoreApi = ReturnType<typeof createEarthquakeStore>;

type CombinedStores = {
    settingStore: SettingStoreApi;
    earthquakeStore: EarthquakeStoreApi;
};

const StateContext = createContext<CombinedStores | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
    const settingRef = useRef<SettingStoreApi | null>(null);
    const earthquakeRef = useRef<EarthquakeStoreApi | null>(null);

    if (!settingRef.current) {
        settingRef.current = createSettingStore();
    }

    if (!earthquakeRef.current) {
        earthquakeRef.current = createEarthquakeStore();
    }

    return (
        <StateContext.Provider
            value={{
                settingStore: settingRef.current,
                earthquakeStore: earthquakeRef.current,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

// Custom hook to access SettingStoreuseSettingStore
export const useSettingStore = <T,>(
    selector: (store: SettingStore) => T,
): T => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useSettingStore must be used within StateProvider");
    }
    return useStore(context.settingStore, selector);
};

// Custom hook to access EarthquakeStore
export const useEarthquakeStore = <T,>(
    selector: (store: EarthquakeStore) => T,
): T => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useEarthquakeStore must be used within StateProvider");
    }
    return useStore(context.earthquakeStore, selector);
};

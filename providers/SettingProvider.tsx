"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type SettingStore, createSettingStore } from "@/stores/SettingsStore";

export type SettingStoreApi = ReturnType<typeof createSettingStore>;

export const SettingStoreContext = createContext<SettingStoreApi | undefined>(
  undefined,
);

export interface SettingStoreProviderProps {
  children: ReactNode;
}

export const SettingStoreProvider = ({
  children,
}: SettingStoreProviderProps) => {
  const storeRef = useRef<SettingStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createSettingStore();
  }

  return (
    <SettingStoreContext.Provider value={storeRef.current}>
      {children}
    </SettingStoreContext.Provider>
  );
};

export const useSettingStore = <T,>(
  selector: (store: SettingStore) => T,
): T => {
  const settingStoreContext = useContext(SettingStoreContext);

  if (!settingStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(settingStoreContext, selector);
};

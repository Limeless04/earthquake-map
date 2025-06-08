import { createStore } from "zustand/vanilla";

export type SettingState = {
  show: boolean;
  showCount: boolean;
  showFilter: boolean;
  showPieChart: boolean;
  showHistogram: boolean;
  showScatter: boolean;
  showEvent: boolean;
  showListEvent: boolean;
};

export type SettingAction = {
  toggleShow: () => void;
  toggleCount: () => void;
  toggleFilter: () => void;
  togglePieChart: () => void;
  toggleHistogram: () => void;
  toggleScatter: () => void;
  toggleEvent: () => void;
  toggleListEvent: () => void;
};

export type SettingStore = SettingState & SettingAction;

export const defaultInitState: SettingState = {
  show: true,
  showCount: true,
  showFilter: true,
  showPieChart: true,
  showHistogram: true,
  showScatter: true,
  showEvent: true,
  showListEvent: true,
};

export const createSettingStore = (
  initState: SettingState = defaultInitState,
) => {
  return createStore<SettingStore>()((set) => ({
    ...initState,
    toggleShow: () =>
      set((state) => ({
        show: !state.show,
        showCount: !state.showCount,
        showFilter: !state.showFilter,
        showPieChart: !state.showPieChart,
        showHistogram: !state.showHistogram,
        showScatter: !state.showScatter,
        showEvent: !state.showEvent,
        showListEvent: !state.showListEvent,
      })),
    toggleCount: () => set((state) => ({ showCount: !state.showCount })),
    toggleFilter: () => set((state) => ({ showFilter: !state.showFilter })),
    togglePieChart: () =>
      set((state) => ({ showPieChart: !state.showPieChart })),
    toggleHistogram: () =>
      set((state) => ({ showHistogram: !state.showHistogram })),
    toggleScatter: () => set((state) => ({ showScatter: !state.showScatter })),
    toggleEvent: () => set((state) => ({ showEvent: !state.showEvent })),
    toggleListEvent: () =>
      set((state) => ({ showListEvent: !state.showListEvent })),
  }));
};

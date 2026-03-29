import { create } from "zustand";
import type { TrackerState } from "./tracker.type";

export const useTrackerStore = create<TrackerState>()(() => ({
  // TODO: Define initial state
}));

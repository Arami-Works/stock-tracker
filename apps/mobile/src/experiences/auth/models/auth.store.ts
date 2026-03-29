import { create } from "zustand";
import type { AuthState } from "./auth.type";

export const useAuthStore = create<AuthState>()(() => ({
  // TODO: Define initial state
}));

import { create } from "zustand";
import type { AuthSignInState } from "./auth-signIn.type";

export const useAuthSignInStore = create<AuthSignInState>()(() => ({
  // TODO: Define initial state
}));

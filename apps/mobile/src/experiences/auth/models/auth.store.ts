import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";
import type { AuthState } from "./auth.type";

export const useAuthStore = create<AuthState>()(() => ({
  session: null,
  isLoading: true,
  isAuthenticated: false,
}));

export const setSession = (session: Session | null) =>
  useAuthStore.setState({
    session,
    isAuthenticated: !!session,
    isLoading: false,
  });

export const setLoading = (isLoading: boolean) =>
  useAuthStore.setState({ isLoading });

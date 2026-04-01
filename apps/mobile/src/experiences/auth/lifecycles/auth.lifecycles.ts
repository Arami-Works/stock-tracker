import { useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { setSession } from "../models/auth.store";

export const useAuthLifecycle = () => {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
};

import { useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { setSession } from "../models/auth.store";

const SESSION_TIMEOUT_MS = 5000;

export const useAuthLifecycle = () => {
  useEffect(() => {
    let settled = false;

    const timeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        setSession(null);
      }
    }, SESSION_TIMEOUT_MS);

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          setSession(session);
        }
      })
      .catch(() => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          setSession(null);
        }
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);
};

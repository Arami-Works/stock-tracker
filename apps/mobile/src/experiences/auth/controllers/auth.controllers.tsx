import {
  memo,
  createContext,
  useContext,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../../../lib/supabase";
import { apolloClient } from "../../../lib/apollo/provider";

interface AuthControllersOutput {
  signOut: () => Promise<void>;
  isSigningOut: boolean;
}

const ControllersContext = createContext<AuthControllersOutput | null>(null);

interface AuthControllersProps {
  children: ReactNode;
}

export const AuthControllers = memo<AuthControllersProps>(({ children }) => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const signOut = useCallback(async () => {
    setIsSigningOut(true);
    try {
      await supabase.auth.signOut();
      await apolloClient.resetStore();
    } finally {
      setIsSigningOut(false);
    }
  }, []);

  const value: AuthControllersOutput = {
    signOut,
    isSigningOut,
  };

  return (
    <ControllersContext.Provider value={value}>
      {children}
    </ControllersContext.Provider>
  );
});

AuthControllers.displayName = "AuthControllers";

export const useAuthControllers = () => {
  const context = useContext(ControllersContext);
  if (!context) {
    throw new Error("useAuthControllers must be used within AuthControllers");
  }
  return context;
};

import { memo, createContext, useContext, type ReactNode } from "react";

interface AuthControllersOutput {
  // TODO: Define controller outputs
}

const ControllersContext = createContext<AuthControllersOutput | null>(null);

interface AuthControllersProps {
  children: ReactNode;
}

export const AuthControllers = memo<AuthControllersProps>(({ children }) => {
  const value: AuthControllersOutput = {
    // TODO: Initialize controllers
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

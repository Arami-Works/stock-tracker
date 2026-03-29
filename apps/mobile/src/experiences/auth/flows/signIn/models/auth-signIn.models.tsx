import { memo, type ReactNode } from "react";

interface AuthSignInModelsProps {
  children: ReactNode;
}

export const AuthSignInModels = memo<AuthSignInModelsProps>(({ children }) => {
  return <>{children}</>;
});

AuthSignInModels.displayName = "AuthSignInModels";

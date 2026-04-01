import { memo, type ReactNode } from "react";
import { useAuthLifecycle } from "../lifecycles/auth.lifecycles";

interface AuthModelsProps {
  children: ReactNode;
}

export const AuthModels = memo<AuthModelsProps>(({ children }) => {
  useAuthLifecycle();

  return <>{children}</>;
});

AuthModels.displayName = "AuthModels";

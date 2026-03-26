import { memo, type ReactNode } from 'react';

interface AuthModelsProps {
  children: ReactNode;
}

export const AuthModels = memo<AuthModelsProps>(({ children }) => {
  return <>{children}</>;
});

AuthModels.displayName = 'AuthModels';

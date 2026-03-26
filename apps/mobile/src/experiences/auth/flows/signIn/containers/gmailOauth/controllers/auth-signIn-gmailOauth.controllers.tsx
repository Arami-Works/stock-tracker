import { memo, createContext, useContext, type ReactNode } from 'react';

interface AuthSignInGmailOauthControllersOutput {
  // TODO: Define controller outputs
}

const ControllersContext = createContext<AuthSignInGmailOauthControllersOutput | null>(null);

interface AuthSignInGmailOauthControllersProps {
  children: ReactNode;
}

export const AuthSignInGmailOauthControllers = memo<AuthSignInGmailOauthControllersProps>(({ children }) => {
  const value: AuthSignInGmailOauthControllersOutput = {
    // TODO: Initialize controllers
  };

  return (
    <ControllersContext.Provider value={value}>
      {children}
    </ControllersContext.Provider>
  );
});

AuthSignInGmailOauthControllers.displayName = 'AuthSignInGmailOauthControllers';

export const useAuthSignInGmailOauthControllers = () => {
  const context = useContext(ControllersContext);
  if (!context) {
    throw new Error('useAuthSignInGmailOauthControllers must be used within AuthSignInGmailOauthControllers');
  }
  return context;
};

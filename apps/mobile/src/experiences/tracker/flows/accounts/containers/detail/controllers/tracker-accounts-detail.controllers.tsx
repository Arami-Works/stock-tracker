import { memo, createContext, useContext, type ReactNode } from 'react';

interface TrackerAccountsDetailControllersOutput {
  // TODO: Define controller outputs
}

const ControllersContext = createContext<TrackerAccountsDetailControllersOutput | null>(null);

interface TrackerAccountsDetailControllersProps {
  children: ReactNode;
}

export const TrackerAccountsDetailControllers = memo<TrackerAccountsDetailControllersProps>(({ children }) => {
  const value: TrackerAccountsDetailControllersOutput = {
    // TODO: Initialize controllers
  };

  return (
    <ControllersContext.Provider value={value}>
      {children}
    </ControllersContext.Provider>
  );
});

TrackerAccountsDetailControllers.displayName = 'TrackerAccountsDetailControllers';

export const useTrackerAccountsDetailControllers = () => {
  const context = useContext(ControllersContext);
  if (!context) {
    throw new Error('useTrackerAccountsDetailControllers must be used within TrackerAccountsDetailControllers');
  }
  return context;
};

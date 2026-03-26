import { memo, createContext, useContext, type ReactNode } from 'react';

interface TrackerHistoryBrowseControllersOutput {
  // TODO: Define controller outputs
}

const ControllersContext = createContext<TrackerHistoryBrowseControllersOutput | null>(null);

interface TrackerHistoryBrowseControllersProps {
  children: ReactNode;
}

export const TrackerHistoryBrowseControllers = memo<TrackerHistoryBrowseControllersProps>(({ children }) => {
  const value: TrackerHistoryBrowseControllersOutput = {
    // TODO: Initialize controllers
  };

  return (
    <ControllersContext.Provider value={value}>
      {children}
    </ControllersContext.Provider>
  );
});

TrackerHistoryBrowseControllers.displayName = 'TrackerHistoryBrowseControllers';

export const useTrackerHistoryBrowseControllers = () => {
  const context = useContext(ControllersContext);
  if (!context) {
    throw new Error('useTrackerHistoryBrowseControllers must be used within TrackerHistoryBrowseControllers');
  }
  return context;
};

import { memo, createContext, useContext, type ReactNode } from "react";

interface TrackerDashboardHomeControllersOutput {
  // TODO: Define controller outputs
}

const ControllersContext =
  createContext<TrackerDashboardHomeControllersOutput | null>(null);

interface TrackerDashboardHomeControllersProps {
  children: ReactNode;
}

export const TrackerDashboardHomeControllers =
  memo<TrackerDashboardHomeControllersProps>(({ children }) => {
    const value: TrackerDashboardHomeControllersOutput = {
      // TODO: Initialize controllers
    };

    return (
      <ControllersContext.Provider value={value}>
        {children}
      </ControllersContext.Provider>
    );
  });

TrackerDashboardHomeControllers.displayName = "TrackerDashboardHomeControllers";

export const useTrackerDashboardHomeControllers = () => {
  const context = useContext(ControllersContext);
  if (!context) {
    throw new Error(
      "useTrackerDashboardHomeControllers must be used within TrackerDashboardHomeControllers",
    );
  }
  return context;
};

import { memo, type ReactNode } from "react";

interface TrackerModelsProps {
  children: ReactNode;
}

export const TrackerModels = memo<TrackerModelsProps>(({ children }) => {
  return <>{children}</>;
});

TrackerModels.displayName = "TrackerModels";

import { memo } from "react";
import { TrackerDashboardHomeModels } from "./models";
import {
  TrackerDashboardHomeControllers,
  useTrackerDashboardHomeControllers,
} from "./controllers";
import { TrackerDashboardHomeViews } from "./views";

const ConnectedViews = memo(() => {
  const controllers = useTrackerDashboardHomeControllers();
  return <TrackerDashboardHomeViews {...controllers} />;
});

ConnectedViews.displayName = "TrackerDashboardHomeConnectedViews";

export const TrackerDashboardHomeContainer = memo(() => {
  return (
    <TrackerDashboardHomeModels>
      <TrackerDashboardHomeControllers>
        <ConnectedViews />
      </TrackerDashboardHomeControllers>
    </TrackerDashboardHomeModels>
  );
});

TrackerDashboardHomeContainer.displayName = "TrackerDashboardHomeContainer";

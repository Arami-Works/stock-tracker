import { memo } from "react";
import { TrackerHistoryBrowseModels } from "./models";
import { TrackerHistoryBrowseControllers } from "./controllers";
import { TrackerHistoryBrowseViews } from "./views";

export const TrackerHistoryBrowseContainer = memo(() => {
  return (
    <TrackerHistoryBrowseModels>
      <TrackerHistoryBrowseControllers>
        <TrackerHistoryBrowseViews />
      </TrackerHistoryBrowseControllers>
    </TrackerHistoryBrowseModels>
  );
});

TrackerHistoryBrowseContainer.displayName = "TrackerHistoryBrowseContainer";

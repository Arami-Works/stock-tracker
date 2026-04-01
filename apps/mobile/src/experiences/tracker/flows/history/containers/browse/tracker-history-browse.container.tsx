import { memo, Suspense } from "react";
import { TrackerHistoryBrowseModels } from "./models";
import {
  TrackerHistoryBrowseControllers,
  useTrackerHistoryBrowseControllers,
} from "./controllers";
import { TrackerHistoryBrowseViews } from "./views";
import { QueryErrorBoundary } from "@/shared/components/query-error-boundary";

const ConnectedViews = memo(() => {
  const controllers = useTrackerHistoryBrowseControllers();
  return (
    <TrackerHistoryBrowseViews
      screenState={controllers.screenState}
      purchases={controllers.purchases}
      selectedFilter={controllers.selectedFilter}
      onFilterSelect={controllers.onFilterSelect}
    />
  );
});

ConnectedViews.displayName = "TrackerHistoryBrowseConnectedViews";

export const TrackerHistoryBrowseContainer = memo(() => {
  return (
    <QueryErrorBoundary
      fallback={({ retry }) => (
        <TrackerHistoryBrowseViews screenState="error" onRetry={retry} />
      )}
    >
      <Suspense fallback={<TrackerHistoryBrowseViews screenState="loading" />}>
        <TrackerHistoryBrowseModels>
          <TrackerHistoryBrowseControllers>
            <ConnectedViews />
          </TrackerHistoryBrowseControllers>
        </TrackerHistoryBrowseModels>
      </Suspense>
    </QueryErrorBoundary>
  );
});

TrackerHistoryBrowseContainer.displayName = "TrackerHistoryBrowseContainer";

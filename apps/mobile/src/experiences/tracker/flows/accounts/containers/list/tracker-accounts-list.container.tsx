import { memo, Suspense } from "react";
import { TrackerAccountsListModels } from "./models";
import {
  TrackerAccountsListControllers,
  useTrackerAccountsListControllers,
} from "./controllers";
import { TrackerAccountsListViews } from "./views";
import { QueryErrorBoundary } from "@/shared/components/query-error-boundary";

const ConnectedViews = memo(() => {
  const controllers = useTrackerAccountsListControllers();
  return (
    <TrackerAccountsListViews
      screenState={controllers.screenState}
      accounts={controllers.accounts}
    />
  );
});

ConnectedViews.displayName = "TrackerAccountsListConnectedViews";

export const TrackerAccountsListContainer = memo(() => {
  return (
    <QueryErrorBoundary
      fallback={({ retry }) => (
        <TrackerAccountsListViews screenState="error" onRetry={retry} />
      )}
    >
      <Suspense fallback={<TrackerAccountsListViews screenState="loading" />}>
        <TrackerAccountsListModels>
          <TrackerAccountsListControllers>
            <ConnectedViews />
          </TrackerAccountsListControllers>
        </TrackerAccountsListModels>
      </Suspense>
    </QueryErrorBoundary>
  );
});

TrackerAccountsListContainer.displayName = "TrackerAccountsListContainer";

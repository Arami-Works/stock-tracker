import { memo } from 'react';
import { TrackerDashboardModels } from './models';
import { TrackerDashboardControllers } from './controllers';
import { TrackerDashboardViews } from './views';

export const TrackerDashboardFlow = memo(() => {
  return (
    <TrackerDashboardModels>
      <TrackerDashboardControllers>
        <TrackerDashboardViews />
      </TrackerDashboardControllers>
    </TrackerDashboardModels>
  );
});

TrackerDashboardFlow.displayName = 'TrackerDashboardFlow';

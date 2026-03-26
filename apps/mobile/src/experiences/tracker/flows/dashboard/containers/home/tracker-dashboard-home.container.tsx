import { memo } from 'react';
import { TrackerDashboardHomeModels } from './models';
import { TrackerDashboardHomeControllers } from './controllers';
import { TrackerDashboardHomeViews } from './views';

export const TrackerDashboardHomeContainer = memo(() => {
  return (
    <TrackerDashboardHomeModels>
      <TrackerDashboardHomeControllers>
        <TrackerDashboardHomeViews />
      </TrackerDashboardHomeControllers>
    </TrackerDashboardHomeModels>
  );
});

TrackerDashboardHomeContainer.displayName = 'TrackerDashboardHomeContainer';

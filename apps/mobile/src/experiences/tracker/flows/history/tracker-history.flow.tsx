import { memo } from 'react';
import { TrackerHistoryModels } from './models';
import { TrackerHistoryControllers } from './controllers';
import { TrackerHistoryViews } from './views';

export const TrackerHistoryFlow = memo(() => {
  return (
    <TrackerHistoryModels>
      <TrackerHistoryControllers>
        <TrackerHistoryViews />
      </TrackerHistoryControllers>
    </TrackerHistoryModels>
  );
});

TrackerHistoryFlow.displayName = 'TrackerHistoryFlow';

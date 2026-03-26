import { memo } from 'react';
import { TrackerAccountsModels } from './models';
import { TrackerAccountsControllers } from './controllers';
import { TrackerAccountsViews } from './views';

export const TrackerAccountsFlow = memo(() => {
  return (
    <TrackerAccountsModels>
      <TrackerAccountsControllers>
        <TrackerAccountsViews />
      </TrackerAccountsControllers>
    </TrackerAccountsModels>
  );
});

TrackerAccountsFlow.displayName = 'TrackerAccountsFlow';

import { memo } from 'react';
import { TrackerAccountsDetailModels } from './models';
import { TrackerAccountsDetailControllers } from './controllers';
import { TrackerAccountsDetailViews } from './views';

export const TrackerAccountsDetailContainer = memo(() => {
  return (
    <TrackerAccountsDetailModels>
      <TrackerAccountsDetailControllers>
        <TrackerAccountsDetailViews />
      </TrackerAccountsDetailControllers>
    </TrackerAccountsDetailModels>
  );
});

TrackerAccountsDetailContainer.displayName = 'TrackerAccountsDetailContainer';

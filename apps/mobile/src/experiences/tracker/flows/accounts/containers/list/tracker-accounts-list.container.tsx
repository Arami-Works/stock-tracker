import { memo } from 'react';
import { TrackerAccountsListModels } from './models';
import { TrackerAccountsListControllers } from './controllers';
import { TrackerAccountsListViews } from './views';

export const TrackerAccountsListContainer = memo(() => {
  return (
    <TrackerAccountsListModels>
      <TrackerAccountsListControllers>
        <TrackerAccountsListViews />
      </TrackerAccountsListControllers>
    </TrackerAccountsListModels>
  );
});

TrackerAccountsListContainer.displayName = 'TrackerAccountsListContainer';

import { memo } from 'react';
import { TrackerModels } from './models';
import { TrackerControllers } from './controllers';
import { TrackerViews } from './views';

export const TrackerExperience = memo(() => {
  return (
    <TrackerModels>
      <TrackerControllers>
        <TrackerViews />
      </TrackerControllers>
    </TrackerModels>
  );
});

TrackerExperience.displayName = 'TrackerExperience';

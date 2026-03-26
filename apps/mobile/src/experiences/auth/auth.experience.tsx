import { memo } from 'react';
import { AuthModels } from './models';
import { AuthControllers } from './controllers';
import { AuthViews } from './views';

export const AuthExperience = memo(() => {
  return (
    <AuthModels>
      <AuthControllers>
        <AuthViews />
      </AuthControllers>
    </AuthModels>
  );
});

AuthExperience.displayName = 'AuthExperience';

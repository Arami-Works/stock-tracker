import { memo } from "react";
import { AuthSignInModels } from "./models";
import { AuthSignInControllers } from "./controllers";
import { AuthSignInViews } from "./views";

export const AuthSignInFlow = memo(() => {
  return (
    <AuthSignInModels>
      <AuthSignInControllers>
        <AuthSignInViews />
      </AuthSignInControllers>
    </AuthSignInModels>
  );
});

AuthSignInFlow.displayName = "AuthSignInFlow";

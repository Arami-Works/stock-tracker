import { memo } from "react";
import { AuthSignInGmailOauthModels } from "./models";
import { AuthSignInGmailOauthControllers } from "./controllers";
import { AuthSignInGmailOauthViews } from "./views";

export const AuthSignInGmailOauthContainer = memo(() => {
  return (
    <AuthSignInGmailOauthModels>
      <AuthSignInGmailOauthControllers>
        <AuthSignInGmailOauthViews />
      </AuthSignInGmailOauthControllers>
    </AuthSignInGmailOauthModels>
  );
});

AuthSignInGmailOauthContainer.displayName = "AuthSignInGmailOauthContainer";

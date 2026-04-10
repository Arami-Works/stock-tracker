import {
  memo,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Platform } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "../../../../../../../lib/supabase";

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!;

interface AuthSignInGmailOauthControllersOutput {
  signInWithGoogle: () => void;
  isSigningIn: boolean;
}

const ControllersContext =
  createContext<AuthSignInGmailOauthControllersOutput | null>(null);

interface AuthSignInGmailOauthControllersProps {
  children: ReactNode;
}

export const AuthSignInGmailOauthControllers =
  memo<AuthSignInGmailOauthControllersProps>(({ children }) => {
    const [isSigningIn, setIsSigningIn] = useState(false);

    // Use only the web client ID across all platforms.
    // expo-auth-session opens Google OAuth in a browser — platform-specific
    // client IDs are for the native Google Sign-In SDK, not expo-auth-session.
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
      clientId: GOOGLE_WEB_CLIENT_ID,
    });

    useEffect(() => {
      if (response?.type !== "success") return;

      const { id_token, code } = response.params;

      setIsSigningIn(true);

      const signIn = async () => {
        let token = id_token;

        if (!token && code) {
          // Native uses authorization code flow — exchange code for id_token.
          // PKCE verifier proves identity without requiring a client secret.
          const params = new URLSearchParams({
            code,
            client_id: GOOGLE_WEB_CLIENT_ID,
            redirect_uri: request?.redirectUri ?? "",
            grant_type: "authorization_code",
            code_verifier: request?.codeVerifier ?? "",
          });
          const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params.toString(),
          });
          const tokens = await tokenRes.json();
          token = tokens.id_token;
        }

        if (token) {
          await supabase.auth.signInWithIdToken({
            provider: "google",
            token,
          });
        }
      };

      signIn().finally(() => setIsSigningIn(false));
    }, [response, request]);

    useEffect(() => {
      if (Platform.OS === "android") {
        WebBrowser.warmUpAsync();
        return () => {
          WebBrowser.coolDownAsync();
        };
      }
    }, []);

    const signInWithGoogle = useCallback(() => {
      setIsSigningIn(true);
      promptAsync().finally(() => {
        if (response?.type !== "success") {
          setIsSigningIn(false);
        }
      });
    }, [promptAsync, response]);

    const value: AuthSignInGmailOauthControllersOutput = {
      signInWithGoogle,
      isSigningIn,
    };

    return (
      <ControllersContext.Provider value={value}>
        {children}
      </ControllersContext.Provider>
    );
  });

AuthSignInGmailOauthControllers.displayName = "AuthSignInGmailOauthControllers";

export const useAuthSignInGmailOauthControllers = () => {
  const context = useContext(ControllersContext);
  if (!context) {
    throw new Error(
      "useAuthSignInGmailOauthControllers must be used within AuthSignInGmailOauthControllers",
    );
  }
  return context;
};

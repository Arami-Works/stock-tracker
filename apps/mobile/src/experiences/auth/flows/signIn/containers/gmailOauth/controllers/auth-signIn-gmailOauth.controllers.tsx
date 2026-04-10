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
const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
const GOOGLE_ANDROID_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;

/** Derives {reversed_client_id}:/oauthredirect for native OAuth clients */
function nativeRedirectUri(clientId: string): string {
  return `${clientId.split(".").reverse().join(".")}:/oauthredirect`;
}

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

    // iOS: iOS OAuth client + reversed client ID redirect URI.
    // Android: Android OAuth client + reversed client ID redirect URI.
    // Both native clients must have "Custom URI scheme" enabled in Google Console.
    // Web: web client ID with http://localhost:8094.
    const platform = Platform.OS;
    const nativeClientId =
      platform === "ios"
        ? GOOGLE_IOS_CLIENT_ID
        : platform === "android"
          ? GOOGLE_ANDROID_CLIENT_ID
          : undefined;
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
      {
        clientId: GOOGLE_WEB_CLIENT_ID,
        iosClientId: platform === "ios" ? GOOGLE_IOS_CLIENT_ID : undefined,
        androidClientId:
          platform === "android" ? GOOGLE_ANDROID_CLIENT_ID : undefined,
      },
      nativeClientId ? { native: nativeRedirectUri(nativeClientId) } : {},
    );

    useEffect(() => {
      if (response?.type !== "success") return;

      const { id_token, code } = response.params;

      setIsSigningIn(true);

      const signIn = async () => {
        let token = id_token;

        if (!token && code) {
          // Native uses authorization code flow — exchange code for id_token.
          // PKCE verifier proves identity without requiring a client secret.
          const clientId = nativeClientId ?? GOOGLE_WEB_CLIENT_ID;
          const params = new URLSearchParams({
            code,
            client_id: clientId,
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

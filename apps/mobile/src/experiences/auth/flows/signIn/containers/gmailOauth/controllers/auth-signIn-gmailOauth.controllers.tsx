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

const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!;

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

    const [_request, response, promptAsync] = Google.useIdTokenAuthRequest({
      clientId: GOOGLE_CLIENT_ID,
    });

    useEffect(() => {
      if (response?.type === "success") {
        const { id_token } = response.params;
        setIsSigningIn(true);
        supabase.auth
          .signInWithIdToken({ provider: "google", token: id_token })
          .finally(() => setIsSigningIn(false));
      }
    }, [response]);

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

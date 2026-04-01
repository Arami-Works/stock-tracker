import { memo } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useAuthSignInGmailOauthControllers } from "../controllers/auth-signIn-gmailOauth.controllers";

export const AuthSignInGmailOauthViews = memo(() => {
  const { signInWithGoogle, isSigningIn } =
    useAuthSignInGmailOauthControllers();

  return (
    <View style={styles.container} testID="auth-signIn-gmailOauth-screen">
      <Text style={styles.title} testID="auth-signIn-title">
        Stock Tracker
      </Text>
      <Text style={styles.subtitle} testID="auth-signIn-subtitle">
        Sign In
      </Text>
      <Pressable
        style={styles.button}
        onPress={signInWithGoogle}
        disabled={isSigningIn}
      >
        {isSigningIn ? (
          <ActivityIndicator color="#FF2D55" />
        ) : (
          <Text style={styles.buttonText}>Sign in with Google</Text>
        )}
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF2D55",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.8,
    marginTop: 8,
  },
  button: {
    marginTop: 32,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#FF2D55",
    fontSize: 16,
    fontWeight: "600",
  },
});

AuthSignInGmailOauthViews.displayName = "AuthSignInGmailOauthViews";

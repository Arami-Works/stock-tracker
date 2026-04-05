import { memo } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, ProgressIndicator } from "@aramiworks/ui";
import { useAuthSignInGmailOauthControllers } from "../controllers/auth-signIn-gmailOauth.controllers";

export const AuthSignInGmailOauthViews = memo(() => {
  const { signInWithGoogle, isSigningIn } =
    useAuthSignInGmailOauthControllers();

  return (
    <View style={styles.container} testID="auth-signIn-gmailOauth-screen">
      <Text role="display" size="small" color="white" testID="auth-signIn-title">
        Stock Tracker
      </Text>
      <Text role="body" size="large" color="white" opacity={0.8} marginTop={8} testID="auth-signIn-subtitle">
        Sign In
      </Text>
      <View style={styles.buttonWrapper}>
        {isSigningIn ? (
          <ProgressIndicator type="circular" size={32} />
        ) : (
          <Button
            variant="elevated"
            onPress={signInWithGoogle}
            disabled={isSigningIn}
            minWidth={200}
            color="$primary"
          >
            Sign in with Google
          </Button>
        )}
      </View>
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
  buttonWrapper: {
    marginTop: 32,
    alignItems: "center",
  },
});

AuthSignInGmailOauthViews.displayName = "AuthSignInGmailOauthViews";

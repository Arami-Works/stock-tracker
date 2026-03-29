import { memo } from "react";
import { View, Text, StyleSheet } from "react-native";

export const AuthSignInGmailOauthViews = memo(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Tracker</Text>
      <Text style={styles.subtitle}>Sign In</Text>
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
});

AuthSignInGmailOauthViews.displayName = "AuthSignInGmailOauthViews";

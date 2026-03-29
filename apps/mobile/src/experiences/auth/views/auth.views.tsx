import { memo } from "react";
import { View, Text } from "react-native";

export const AuthViews = memo(() => {
  return (
    <View>
      <Text>Auth</Text>
    </View>
  );
});

AuthViews.displayName = "AuthViews";

import { memo } from "react";
import { View, Text } from "react-native";

export const TrackerViews = memo(() => {
  return (
    <View>
      <Text>Tracker</Text>
    </View>
  );
});

TrackerViews.displayName = "TrackerViews";

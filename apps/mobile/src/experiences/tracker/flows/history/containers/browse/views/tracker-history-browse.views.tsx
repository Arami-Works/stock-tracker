import { memo } from "react";
import { View, Text, StyleSheet } from "react-native";

export const TrackerHistoryBrowseViews = memo(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <Text style={styles.subtitle}>Browse</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1C1E",
  },
  subtitle: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 4,
  },
});

TrackerHistoryBrowseViews.displayName = "TrackerHistoryBrowseViews";

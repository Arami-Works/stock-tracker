import { memo } from "react";
import { View, Text, StyleSheet } from "react-native";

type EligibilityBadgeStatus = "eligible" | "notEligible";

type TrackerEligibilityBadgeViewProps = {
  status?: EligibilityBadgeStatus;
};

export const TrackerEligibilityBadgeView = memo(
  ({ status = "eligible" }: TrackerEligibilityBadgeViewProps) => {
    const isEligible = status === "eligible";

    return (
      <View
        style={[
          styles.badge,
          { backgroundColor: isEligible ? "#E8F7ED" : "#FFE8ED" },
        ]}
      >
        <Text
          style={[styles.text, { color: isEligible ? "#219654" : "#FF2D55" }]}
        >
          {isEligible ? "✓  탱크 구매 자격 충족" : "✕  탱크 구매 자격 미충족"}
        </Text>
      </View>
    );
  },
);

TrackerEligibilityBadgeView.displayName = "TrackerEligibilityBadgeView";

const styles = StyleSheet.create({
  badge: {
    height: 36,
    borderRadius: 18,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  text: {
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 14,
  },
});
